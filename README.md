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
  "IS_DEBUG": true, // turns off logs for production
  "PUBLIC_PATH": null, // specifies public url for images/js/css/fonts instead of relative path like './main.js'
  "API_URL": "https://jsonplaceholder.typicode.com" // public http api url
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
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import Component from 'vue-class-component'
import {userModule} from '@/store/users'; // vuex module example

@Component
export class MyComp extends Vue {


  @Prop(Number) readonly propA!: number;

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Emit()
  changedProps() {}

  get users() {
    // example mounting state from vuex store module
    return userModule.users;
  }

  created() {
    // example of settings store from ajax
    userModule.setUsers(await this.$api.getUsers());
  }
}
```
