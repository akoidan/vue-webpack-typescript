![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/akoidan/vue-webpack-typescript)[![HitCount](http://hits.dwyl.io/akoidan/vue-webpack-typescript.svg)](http://hits.dwyl.io/akoidan/vue-webpack-typescript)

This project is generated via [vue-webpack-minimal](https://github.com/akoidan/vue-webpack-minimal)

# Why would I use this?:
 - Predefined architecture 
 - Hot reloading
 - Production build for static files with hash files, git hash, minimizing css/js files
 - Compile time measurement
 - Typescript, everything included vue component, vuex state/mutations is type safe
 - TravisCi config with codecov and mocha typescript tests
 - Configured sass and variables extracting from json files which you can use in vue/ts.
 - Lints for all files including vue single file component. Vue single file lints: style, template, typescript
 - Polyfills for backwards compatibility including ie9

# Development setup:

## Run project
```bash
yarn install
yarn start
# open http://localhost:9084
```

## WebStorm IDE

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


# How to get started.

## Libraries

- [typescript](http://www.typescriptlang.org/docs/home.html) (or ts shortly) allows to write typesafe code:
```typescript
const a: number = 3;
```
  - To get started with ts I would recommend watching [this](https://www.youtube.com/watch?v=ahCwqrYpIuM) 10 minute video  
  - To get started with decorators I recommend [this video](https://www.youtube.com/watch?v=O6A-u_FoEX8) 
  - For advanced learning I recommend checking [what's new](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) in every version of typescript. You may find a lot of interesting things.
- [vue](https://vuejs.org/v2/guide/) allows to write [SFC](https://vuejs.org/v2/guide/single-file-components.html) that would generate html to the page. Vue is only responsible for UI layer, this is not an MVC framework. The only thing that it does is creates `<div></div` codeblocks. Everything else is handled by libraries below .
- [vuex](https://vuex.vuejs.org/) - state management pattern. It allows multiple vue components to have single model/data (source of truth). So if you have a user object like `{age: 3, name: 'eric'}` it can be accessible in multiple places. This is redux/mobx analogue for React.
- [vueRouter](https://router.vuejs.org/guide/#html) - allows navigation across pages in vue, w/o sending get request to the server. And produces access to URL parameters. The examples of routes is [here](src/utils/router.ts):
```typescript
new VueRouter({
  routes: [{
    path: '/posts', // this is url address
    component: PostsPage // this is vue component
  }]
});
```
- [sass](https://sass-lang.com/guide) allows to write code that would be compiled into css
```sass
$font-stack:    Helvetica, sans-serif
body
  font: 100% $font-stack
  a
    display: block
```
- [vue-class-component](https://github.com/vuejs/vue-class-component) allow to write vue component in class manner instead of an object:
```javascript
export default class App extends Vue {
  // initial data
  msg = 123

  // use prop values for initial data
  helloMsg = 'Hello, ' + this.propMessage

  // lifecycle hook
  mounted () {
    this.greet()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    alert('greeting: ' + this.msg)
  }
}
```

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) vue-class-component forces you to have decorators above the class like this:
```javascript
@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {}
```
 instead we can just say:
```typescript
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

@Component
export class MyComp extends Vue {
  
  @Ref
  button: HTMLInputElement;

  @Prop readonly propA!: number;

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Emit() 
  changedProps() {}
}
```
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators). Check [store/users](src/store/users.ts) instead of writing vuex modules as a dict, we can say:
 ```javascript
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class UserState extends VuexModule {
  count = 0
  @Mutation
  increment(delta: number) {
    this.count += delta
  }
  // action 'decr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  decr() {
    return 5
  }
}
``` 
Inject your state like this into vue component:
```typescript
class A extends Vue {
    @UserState
    public readonly count!: number;
}
```
- [mocha](https://mochajs.org/#bdd) - test library: allows to write 
```javascript
describe('console', () => {
  it('should print', () => {
    console.log('Hello world')
  })
})
```
- [chai](https://www.chaijs.com/api/bdd/) and [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/) - assertion libraries
```javascript
expect([1, 2]).to.be.an('array').that.does.not.include(3);
```
- [sinon](https://sinonjs.org/releases/v7.5.0/) - stub/mock library (analogue patch in python)
```javascript
const myAPI = { method: function () {} };
const spy = sinon.spy();
const mock = sinon.mock(myAPI);
mock.expects("method").once().throws();
```
- [sinon-chai](https://github.com/domenic/sinon-chai) - instead of using ugly sinon construction, we want BDD tests like:
```javascript
expect(mySpy).to.have.been.calledWith("foo");
```
- [lines-logger](https://github.com/akoidan/lines-logger) - every time you log in production a puppy dies. lines-logger provides a single interface to console.log, and display the origin source file location:
```typescript
logger.log('Hello world')(); // pay attention to () in the end.
```
## Project compilation libs:
- [webpack](https://webpack.js.org/) allows to combine (bundle) multiple input javascript files into a single output file. Provides plugins and loaders api that allows transformation like typescript or sass. [webpack.config.js](webpack.config.js) is used to build project. Take a look at it to understand how source files are being processed. Its start point is `entry: ['./src/user.ts']`. Since webpack can only handle `.js` files, to let webpack know about everything else we should pass the code through a corresponding loader. Everything is imported in this files are being processed by section `loaders`. 
- @types/XXX is types declaration for liraries. Ts only knows about specific types like dom and etc. Everything custom should be installed separately.
- node-sass-utils - allow to access json via css, thus sharing variables across js and css
- [instanbul](https://istanbul.js.org/) - code coverage with cli interface, generates html cov report
- [nyc](https://github.com/istanbuljs/nyc) - cli interface to instanbul
- webpack-cli allows to run webpack from the command line
- Loaders: css-loader, ts-loader, sass-loader, vue-loader, url-loader, tslint-loader, vue-template-compiler, style-loader, file-loader
- eslint-loader and eslint are used only for SFC templates. 
- [ts-lint](https://palantir.github.io/tslint/rules/) stricts the rules for code (eslint/pylint) analogue
- [tslint-microsoft-contrib](https://github.com/microsoft/tslint-microsoft-contrib#supported-rules) more awesome rules to ts-lint
- [stylelint](https://github.com/stylelint/stylelint) linter for css files.
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) lints your `<template` in vue SFC.
- ts-node allows to compile typescript to memory instead of files and run it
- [ts-polyfill](https://github.com/ryanelian/ts-polyfill) typescript compiles into es5 compatible code, but it doesn't provides objects and functions that are es6 compatible, like Promises or include method on an array.
- typescript-tslint-plugin (allows to run tslint from tsc instead of a separate process. So typescript output would be appended by ts-lint. Thus IDE would show lint output as well (ts-lint doesn't work in some IDEs with custom rules)
- webpack-dev-server is used for development purposes with hot reloading, every time you save the file it will automatically apply. This doesn't affect node running files, only watching files. So files like webpack.config.js or development.json aren't affected. Take a look at [development.json](development.json). To build project for production take a look at [production.json](production.json) and run `npm run prod`. This generates static files in `./dist` directory.
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss#list-of-rules) - linter rules specific to sass
- [stylelint-order](https://github.com/hudochenkov/stylelint-order) appends stylelint with order rules. This forces css attributes/imports to have specific order. 
- optimize-css-assets-webpack-plugin (minimizes css)
- html-webpack-plugin ( compiles html from index.ejs)
- hard-source-webpack-plugin (increases dev server speed compilation by caching)
- clean-webpack-plugin (deletes the dist before build)
- compression-webpack-plugin (generates .tar.gz files in dist directories)
- mini-css-extract-plugin (gets all css files from .vue components and creates a single .css file in production build)
- [webpack-subresource-integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) ( generates integrity attribute on scripts tag)
- stylelint-webpack-plugin (during webpack build find all the css and lints it via stylelint)
- speed-measure-webpack-plugin shows information about compilation speed. Helps to find out why compilation goes slow.

## Configuration
 - Every vue component has injected `.$logger` object, to log something to console use `this.logger.log('Hello {}', {1:'world'})();` Note calling function again in the end. Logger is disabled for production. For more info visit [lines-logger](https://github.com/akoidan/lines-logger)
 - Every component has an injected `$.api` object. You should do http calls with `$this.$api`. If you prefer redux style you can call http in vuex actions.
 - If you're using git as your version control tool `window.GIT_VERSION` will be exported to global scope

development.json and production.json have the following format:
  ```json
  {
    "IS_DEBUG": "true/false: turns off logs for production",
    "PUBLIC_PATH": "specifies public url for images/js/css/fonts instead of relative path like './main.js",
    "API_URL": "public http api url e.g. https://jsonplaceholder.typicode.com"
  }
  ```

## Ignore errors:
 - Exclude from coverage: `/* istanbul ignore if */` [guide](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)
 - ignore tslint error: `// tslint:disable-next-line:variable-name` [guide](https://palantir.github.io/tslint/usage/rule-flags/)
 - ignore typescript error: `// @ts-ignore: next-line` [guide](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments)
 - ignore stylelint error: `/* stylelint-disable-line */` [guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md) 
# TODO
 - @for sass loops doesn't work in linter https://github.com/AleshaOleg/postcss-sass/issues/53
 - https://github.com/bahmutov/cypress-vue-unit-test
