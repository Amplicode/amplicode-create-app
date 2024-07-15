import * as minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import { dirIsEmpty, isValidAppName } from './utils';
import { URL } from 'url';
import * as child_process from "child_process";
import * as packageJson from "./../package.json";

const argv = minimist(process.argv.slice(2));

const ANSWERS = {
    appName: argv.appName,
    targetDir: argv.targetDir || '.',
    template: argv.template,
    serverUrl: argv.serverUrl,
    restBasePath: argv.restBasePath,
    schema: argv.schema, // '[{"entity":"owner","screens":["list","show"]}]'
};

const RENAME_FILES = {
    _gitignore: '.gitignore',
};

const EJS_EXT = '.ejs';

const DEFAULT_VERSIONS = {
    "raStorybookVersion": {
        packageName: "@amplicode/amplicode-ra-storybook",
        defaultVersion: "0.9.3"
    },
    "muiStorybook": {
        packageName: "@amplicode/amplicode-mui-storybook",
        defaultVersion: "0.9.1"
    }
};

const getTemplateDir = () =>
    path.resolve(__dirname, '..', 'templates', ANSWERS.template);

const getTargetDir = () => path.resolve(__dirname, ANSWERS.targetDir);

const checkRequiredArgs = () => {
    if (argv.help) {
        console.log(`Required arguments:
  --appName:      Valid package name in kebab-case (e.g my-new-app)
  --template:     Template name (e.g react-admin)
  --serverUrl:    Valid server url (e.g http://localhost:8080)
  --restBasePath: Rest base path (e.g /rest)`
        )
    }

    ['appName', 'template', 'serverUrl'].forEach(required => {
        if (!Object.keys(argv).includes(required)) {
            console.log(`Required argument "${required}" is not provided. Type --help for more information.`);
            process.exit(1);
        }
    });
}

const validateAppName = () => {
    const isValid = isValidAppName(ANSWERS.appName);

    if (!ANSWERS.appName || !isValid) {
        console.log(
            'Please specify valid appName. Use lower case and dashes only.',
        );
        process.exit(1);
    }
};

const checkTargetFolderExists = () => {
    let result = null;

    try {
        result = fs.statSync(getTargetDir());
    } catch {
        // ok, will create later if everething is ok
    }

    return result;
};

const checkTargetFolderIsEmpty = () => {
    if (!dirIsEmpty(getTargetDir())) {
        console.log(
            `"${getTargetDir()}" is not empty. Please specify an empty targetDir.`,
        );
        process.exit(1);
    }
};

const checkTemplate = () => {
    try {
        fs.statSync(getTemplateDir());
    } catch {
        console.log(
            `Template does not exist. Please specify template from the list: 'react-admin'.`,
        );
        process.exit(1);
    }
};

const withHttpProtocol = (serverUrl: string) => {
    if (!serverUrl.startsWith('http')) {
        return `http://${serverUrl}`;
    }

    return serverUrl;
}

const checkServerUrl = () => {
    try {
        new URL(ANSWERS.serverUrl);
    } catch (error) {
        console.log(
            'Invalid serverUrl. Please specify valid serverUrl. E.g: http://localhost:8080',
        );
        process.exit(1);
    }
};

function ensureDirectory(dirName: string) {
    if (fs.existsSync(dirName) && fs.statSync(dirName).isDirectory())
        return;

    const parentDir = path.dirname(dirName);

    ensureDirectory(parentDir);

    fs.mkdirSync(dirName);
}

const processTemplate = () => {
    const templateData = {
        resources: getResources(),
        appName: ANSWERS.appName,
        server_url: withHttpProtocol(ANSWERS.serverUrl),
        restBasePath: ANSWERS.restBasePath,
        generatorVersion: packageJson.version,
        ...Object.fromEntries(
            Object.entries(DEFAULT_VERSIONS)
                .map(([varName, { defaultVersion, packageName }]) => {
                    try {
                        let lastVersion = child_process.execSync(`npm view ${packageName} version`)
                            .toString()
                            .replace(/\r?\n/g, '');
                        return [varName, lastVersion];
                    } catch (e) {
                        return [varName, defaultVersion];
                    }
                })
        )
    };

    let templateDir = getTemplateDir();

    const files = collectFilesRecursive(templateDir)
        .map(filePath => path.relative(templateDir, filePath));

    for (const file of files) {

        let targetFileName =
            RENAME_FILES[file as keyof typeof RENAME_FILES] ?? file;
        if (file.endsWith(EJS_EXT)) {
            targetFileName = file.substring(0, file.length - EJS_EXT.length);

            const template = fs.readFileSync(
                path.join(templateDir, file),
                'utf-8',
            );
            const appData = ejs.render(template, templateData);

            ensureDirectory(path.dirname(path.join(getTargetDir(), targetFileName)));
            fs.writeFileSync(path.join(getTargetDir(), targetFileName), appData);
        } else {
            ensureDirectory(path.dirname(path.join(getTargetDir(), targetFileName)));
            fs.copyFileSync(
                path.join(templateDir, file),
                path.join(getTargetDir(), targetFileName)
            );
        }
    }
};

const collectFilesRecursive = (basePath: string): string[] => {
    const files = fs.readdirSync(basePath);

    return files.flatMap(fileName => {
        let filePath = path.join(basePath, fileName);
        let stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            return collectFilesRecursive(filePath);
        }
        return filePath;
    });
};

const getResources = () => {
    if (!ANSWERS.schema || typeof ANSWERS.schema !== 'string') {
        return [];
    }

    let resources;

    try {
        const parsedSchema = JSON.parse(ANSWERS.schema);

        if (
            !Array.isArray(parsedSchema) ||
            parsedSchema.some(
                resource => typeof resource !== 'object' || !resource.entity,
            )
        ) {
            resources = null;
        } else {
            resources = parsedSchema;
        }
    } catch (error) {
        resources = null;
    }

    if (!resources) {
        console.log(
            'Invalid schema. Please specify valid stringified schema. E.g: \'[{"entity":"owner","screens":["list","show"]}]\'',
        );
        process.exit(1);
    }

    return resources;
};

async function installDependencies() {
    let npmInstall = child_process.spawn(
        'npm',
        ['install'],
        {
            cwd: getTargetDir(),
            stdio: ['inherit', 'inherit', 'inherit']
        }
    );

    await new Promise(resolve => {
        npmInstall.on('exit', (code) => {
            resolve(undefined);
        });
    })
}

const init = async () => {
    checkRequiredArgs();

    validateAppName();

    checkTemplate();

    const targetFolderExists = checkTargetFolderExists();

    if (targetFolderExists) {
        checkTargetFolderIsEmpty();
    }

    checkServerUrl();

    if (!targetFolderExists) {
        console.log(`Creating ${getTargetDir()}`);

        fs.mkdirSync(getTargetDir());
    }

    console.log('Process template');
    processTemplate();

    process.exit(0);
};

init();
