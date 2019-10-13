![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/akoidan/vue-webpack-typescript)[![HitCount](http://hits.dwyl.io/akoidan/vue-webpack-typescript.svg)](http://hits.dwyl.io/akoidan/vue-webpack-typescript)


This project is generated via [vue-webpack-minimal](https://github.com/akoidan/vue-webpack-minimal)

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

# Typescript Vue project starter.

## Stack


## To get started:

```bash
npx vue-cli init deathangel908/vue-webpack-minimal project-directory
```
### To get started install dependencies first:
```bash
yarn install
# npm install # if you don't have yarn
```

### Stack
The technologies stack used in project:
- [typescript](https://github.com/microsoft/TypeScript)
- [vue](https://github.com/vuejs/vue), [vuex](https://github.com/vuejs/vuex), [vueRouter](https://github.com/vuejs/vue-router), [lines-logger](https://github.com/akoidan/lines-logger)
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators), [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [webpack](https://github.com/webpack) and its loaders
- [sass](https://github.com/sass/sass)
- [tslint-microsoft-contrib](https://github.com/microsoft/tslint-microsoft-contrib), [stylelint](https://github.com/stylelint/stylelint), [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

It's highly recommended to get familiar with each of this technologies before starting working on this project.

### Development setup
Webpack-dev-server is used for development purposes with hot reloading, every time you save the file it will automatically apply. This doesn't affect node running files, only watching files. So files like webpack.config.js or development.json aren't affected. Take a look at [development.json](development.json). To run dev-server use `npm run dev`. You can navigate to http://localhost:9084

### Production setup
To build project for production take a look at [production.json](production.json) and run `npm run prod`. This generates static files in `./dist` directory.

### Build configuration
[webpack.config.js](webpack.config.js) is used to build project. Take a look at it to understand how source files are being processed. Its start point is `entry: ['./src/user.ts']`. Everything is imported in this files are being processed by section `loaders`.
development.json and production.json have the following format:
```json
{
  "IS_DEBUG": "true/false: turns off logs for production",
  "PUBLIC_PATH": "specifies public url for images/js/css/fonts instead of relative path like './main.js",
  "API_URL": "public http api url e.g. https://jsonplaceholder.typicode.com"
}
```

### Global variables
 - Every vue component has injected `.$logger` object, to log something to console use `this.logger.log('Hello {}', {1:'world'})();` Note calling function again in the end. Logger is disabled for production. For more info visit [lines-logger](https://github.com/akoidan/lines-logger)
 - Every component has an injected `$.api` object. You should do http calls with `$this.$api`. If you prefer redux style you can call http in vuex actions.

### Linting
 - Typescript is linted with [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib)
 - Sass is linted with [stylelint](https://github.com/stylelint/stylelint)
 - Vue files are linted with [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

### Built version
If you're using git as your version control tool `window.GIT_VERSION` will be exported to global scope

### Components style
This project uses [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) (that's has a dependency [vue-class-component](https://github.com/vuejs/vue-class-component)) [vuex-class](https://github.com/ktsn/vuex-class). You should write your component as the following:

```typescript
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import {userModule, UserState} from '@/store/users'; // vuex module example


@Component
export class MyComp extends Vue {
  
  @Ref
  button: HTMLInputElement;

  @Prop readonly propA!: number;
  
  @UserState
  public readonly users!: User[];

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Emit() 
  changedProps() {}

  async created() {
    userModule.setUsers(await this.$api.getUsers());
  }
}
```

## Webstorm

### Set template
 1. New
 2. Edit files templates...
 3. Vue single file component

```vue
<template>
    <div>#[[$END$]]#</div>
</template>

<script lang="ts">
  import {State} from '@/store/users';
  import {Component, Prop, Vue, Watch, Ref} from 'vue-property-decorator';

  @Component
  export default class ${COMPONENT_NAME} extends Vue {
   
  }
</script>
<style lang="sass" scoped>

</style>
```

### Disable tslint
Tslint is already included to tsconfig so IDEs like webstorm would support linting

 1. Settings
 2. Typescript
 3. Tslint
 4. Disable tslint
