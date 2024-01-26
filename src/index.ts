import * as minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as parsePath from 'parse-path';
import { TEMPLATED_FILES, copyFile, dirIsEmpty, isValidAppName } from './utils';
import { URL } from 'url';

const argv = minimist(process.argv.slice(2));

const ANSWERS = {
  appName: argv.appName,
  targetDir: argv.targetDir || '.',
  template: argv.template,
  serverUrl: argv.serverUrl,
  schema: argv.schema, // '[{"entity":"owner","screens":["list","show"]}]'
};

const RENAME_FILES = {
  _gitignore: '.gitignore',
};

const getTemplateDir = () =>
  path.resolve(__dirname, '..', 'templates', ANSWERS.template);

const getTargetDir = () => path.resolve(__dirname, ANSWERS.targetDir);

const checkRequiredArgs = () => {
  if (argv.help) {
    console.log('Required arguments:\n  --appName:      Valid package name in kebab-case (e.g my-new-app)\n  --template:     Template name (e.g react-admin)\n  --serverUrl:    Valid server url (e.g http://localhost:8080)')
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

const copyStructure = () => {
  const files = fs.readdirSync(getTemplateDir());

  for (const file of files.filter(f => !TEMPLATED_FILES.includes(f))) {
    const targetFileName =
      RENAME_FILES[file as keyof typeof RENAME_FILES] ?? file;
    copyFile(
      path.join(getTemplateDir(), file),
      path.join(getTargetDir(), targetFileName),
    );
  }
};

const getResouces = () => {
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

const registerApp = (resources: any) => {
  const appTemplate = fs.readFileSync(
    path.join(getTemplateDir(), 'src', `App.tsx.ejs`),
    'utf-8',
  );

  const appData = ejs.render(appTemplate, { resources });

  fs.writeFileSync(path.join(getTargetDir(), 'src', 'App.tsx'), appData);
};

const registerPkg = () => {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(
        path.join(getTemplateDir(), `package.json`),
        'utf-8',
      ),
    );

    packageJson.name = ANSWERS.appName;

    fs.writeFileSync(
      path.join(getTargetDir(), 'package.json'),
      JSON.stringify(packageJson, null, 2) + '\n',
    );
  } catch (e) {
    console.log('package.json parse error:', e);
  }
};

const configureVite = () => {
  const viteTemplate = fs.readFileSync(
    path.join(getTemplateDir(), `vite.config.ts.ejs`),
    'utf-8',
  );

  const { protocol, resource, port } = parsePath(ANSWERS.serverUrl);

  const server_url = `${protocol}://${resource}`;

  const viteData = ejs.render(viteTemplate, { server_url, port });

  fs.writeFileSync(path.join(getTargetDir(), 'vite.config.ts'), viteData);
};

const copyIndex = () => {
  const indexTemplate = fs.readFileSync(
    path.join(getTemplateDir(), 'index.html'),
    'utf-8',
  );

  const indexData = ejs.render(indexTemplate, { appTitle: ANSWERS.appName });

  fs.writeFileSync(path.join(getTargetDir(), 'index.html'), indexData);
};

const init = () => {
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

  console.log('Copy structure');
  copyStructure();

  console.log('Register app sources');
  registerApp(getResouces());

  console.log('Register package.json');
  registerPkg();

  console.log('Configure vite');
  configureVite();

  console.log('Copy index');
  copyIndex();

  process.exit(0);
};

init();
