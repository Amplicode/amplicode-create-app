import * as path from "path";
import * as fs from "fs";

export const TEMPLATED_FILES = [
  'App.tsx.ejs',
  'vite.config.ts.ejs',
  'package.json',
  'index.html'
];

export const dirIsEmpty = (path: string) => {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export const copyFile = (srcPath: string, destPath: string) => {
  const stat = fs.statSync(srcPath);

  if (stat.isDirectory()) {
    copyDir(srcPath, destPath);
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

export const copyDir = (srcDir: string, destDir: string) => {
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir).filter((f) => !TEMPLATED_FILES.includes(f))) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copyFile(srcFile, destFile);
  }
}

export const isValidAppName = (appName: string) => {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    appName,
  )
}
