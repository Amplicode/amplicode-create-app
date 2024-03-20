# Amplicode Admin UI Generator [![npm version](https://img.shields.io/npm/v/@amplicode/create-amplicode.svg)](https://www.npmjs.com/package/@amplicode/create-amplicode)

Scaffold an amplicode app base structure

## Options

--appName - Name of the new application in kebab case (e.g: 'amplicode-app')   
--template - Template of the application (e.g: 'react-admin', now only one available)   
--serverUrl - Rest api uri (e.g: 'http://localhost:8000')   
--targetDir - New emty directory (default: './')   
--schema - Array of resources (default: []) // [{entity: 'owner', screens: ['list', 'show']}]

Example: npx --yes @amplicode/create-amplicode@latest --appName amp-rest --template react-admin --serverUrl http://localhost:8080/ --targetDir "$(pwd)/ampl-test" --restBasePath /rest