# Typescript Vue project starter.

## Stack
The technologies stack used in project:
- [typescript](https://github.com/microsoft/TypeScript)
- [vue](https://github.com/vuejs/vue), [vuex](https://github.com/vuejs/vuex), [vueRouter](https://github.com/vuejs/vue-router), [lines-logger](https://github.com/akoidan/lines-logger)
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators), [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [webpack](https://github.com/webpack) and its loaders
- [sass](https://github.com/sass/sass)
- [tslint-microsoft-contrib](https://github.com/microsoft/tslint-microsoft-contrib), [stylelint](https://github.com/stylelint/stylelint), [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

## Why would I use this?:
 - Predefined architecture 
 - Hot reloading
 - Production build for static files with hash files, git hash, minimizing css/js files
 - Compile time measurement
 - Typescript, everything included vue component, vuex state/mutations is type safe
 - TravisCi config with codecov and mocha typescript tests
 - Configured sass and variables extracting from json files which you can use in vue/ts.
 - Lints for all files including vue single file component. Vue single file lints: style, template, typescript
 - Polyfills for backwards compatibility including ie9

I tried too hard finding everything above inside single template and single file webpack.config.js and end up building this template myself. If you find something similar to this project please create new [issue](https://github.com/akoidan/vue-webpack-typescript/issues/new) or let me know.

## To get started:

```bash
npx vue-cli init deathangel908/vue-webpack-minimal project-directory
```
