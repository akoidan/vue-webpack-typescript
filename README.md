![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/akoidan/vue-webpack-typescript) [![HitCount](http://hits.dwyl.io/akoidan/vue-webpack-typescript.svg)](http://hits.dwyl.io/akoidan/vue-webpack-typescript) [![Build Status](https://api.travis-ci.org/akoidan/vue-webpack-typescript.svg?branch=master)](https://travis-ci.org/akoidan/vue-webpack-typescript) [![codecov](https://codecov.io/gh/akoidan/vue-webpack-typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/akoidan/vue-webpack-typescript)

This project is generated via [vue-webpack-minimal](https://github.com/akoidan/vue-webpack-minimal)

# Why would I use this?:
 - Vue + Sass + Typescript
 - cypress with test coverage
 - eslint with typescript + vue integration, stylelint for sass

# Commands

## Install dependencies
```bash
yarn install
```

## Run development server
 - The commands below runs the development server w/o a linter. Use this commands if you take advantages from IDE plugins for eslint. This would not spam stdout and won't slow down your build
```bash 
yarn start # this will serve project on http://localhost:9084
```
 - If you don't wanna use or have issues with integrated eslint into your IDE. you can always produce warnings to stdout
 
 ```bash 
yarn run start:lint # this will serve project on http://localhost:9084
 ```

## Test
To run the test simply type. This command with build static files and run unit and cypress test against started static files server
```
yarn test
```
During development you may also find useful the command bellow. It would start cypress against running webpack-dev-server from `yarn start`
```
yarn run test:cypress:debug
```

## Lint
To check the styleguide use:
```
yarn run lint
```
If you're configuring or updating libs you may also want to check if all the rules are included into `.eslintrc.json` with
```
yarn run lint:new 
```

## Build into static files
For production build you can use
```
yarn run build:prod
```
The [production.json](production.json) will be used as DefineWebpackPlugin into [const.ts](src/utils/consts.ts)

# Get started

# Brief libraries and code overview

- [typescript](http://www.typescriptlang.org/docs/home.html) (or ts shortly) allows to write typesafe code:
```typescript
const a: number = 3;
```
   * To get started with ts I would recommend watching [this](https://www.youtube.com/watch?v=ahCwqrYpIuM) 10 minute video  
   * To get started with decorators I recommend [this video](https://www.youtube.com/watch?v=O6A-u_FoEX8) 
   * For advanced learning I recommend checking [what's new](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) in every version of typescript. You may find a lot of interesting things.
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
 ```typescript
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
- [cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file) - testing framework that allows running test-cases directly in chrome (alternative to Selenium, that runs it on server)
 That part you've already seen on mocha above can be appended with cypress assertions and helpers:
```typescript
it("should contain 5 elements", (): void => {
  cy.get("[data-cy=filtered-users-container]").children().should("have.length", 1);
});
```

### Build process libraries
- [webpack](https://webpack.js.org/) allows to combine (bundle) multiple input javascript files into a single output file. Provides plugins and loaders api that allows transformation like typescript or sass. [webpack.config.js](webpack.config.js) is used to build project. Take a look at it to understand how source files are being processed. Its start point is `entry: ['./src/user.ts']`. Since webpack can only handle `.js` files, to let webpack know about everything else we should pass the code through a corresponding loader. Everything is imported in this files are being processed by section `loaders`. 
- node-sass allows to compile sass into css, it doesn't know anything about webpack and loaders
- node-sass-utils - allow to access json via css, thus sharing variables across js and css
- hard-source-webpack-plugin (increases dev server speed compilation by caching)
- optimize-css-assets-webpack-plugin (minimizes css)
- clean-webpack-plugin (deletes the dist before build)
- compression-webpack-plugin (generates .tar.gz files in dist directories)
- mini-css-extract-plugin (gets all css files from .vue components and creates a single .css file in production build)
- [webpack-subresource-integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) ( generates integrity attribute on scripts tag)
- stylelint-webpack-plugin (during webpack build find all the css and lints it via stylelint)
- speed-measure-webpack-plugin shows information about compilation speed. Helps to find out why compilation goes slow.
- html-webpack-plugin ( compiles html from index.ejs)
- webpack-dev-server is used for development purposes with hot reloading, every time you save the file it will automatically apply. This doesn't affect node running files, only watching files. So files like webpack.config.js or development.json aren't affected. Take a look at [development.json](development.json). To build project for production take a look at [production.json](production.json) and run `yarn run buiild:prod`. This generates static files in `./dist` directory.
- webpack-cli allows to run webpack from the command line
- Loaders: css-loader, sass-loader, vue-loader, url-loader, tslint-loader, vue-template-compiler, style-loader, file-loader 
- fork-ts-checker-webpack-plugin - runs typescript compiler into a separate thread
- source-map-support - adds support for source map (show source file in browser instead of transpiled one)

### Typescript compilation libraries
Typescript is compiled via babel, this means that it doesn't have typechecks, this speeds up build a lot! But since we still want to take advantages of typechecks we run typescript compiler runs in a separate process, giving errors to stdout.
 - typescript compiler ts into js, we use babel instead of this, it just runs in a separate thread
 - @babel/plugin-proposal-class-properties - allows class properties like class A { a: number }
 - @babel/plugin-proposal-decorators - adds es6 decorators, e.g. @Component
 - babel-plugin-transform-typescript-metadata - allows babel decorator to work the same way as ts, this is required for libs like vue-property-decorator with @Prop annotation
 - @babel/preset-env - transpiles code into browser compatible one, TODO this breaks decorators
 - babel-preset-typescript-vue vue files are not supported by typescript loader (only via ts-loader), we need to mangle the output of vue to be able for babel to handle them
 - ts-node doesn't do anything but allows IDEs like Webstorm to run ts unit test via m2 -> run 
 - @types/XXX are types declaration for 3rd party libraries. Ts only knows about specific types like dom and etc. Everything custom should be installed separately.
 - babel - global loader and transpiler that allows ts compilation into es and allowing additional babel plugins for use. [here's why you need babel with ts](https://iamturns.com/typescript-babel/)
 
### Test libraries
- ts-loader - load test with typescript
- start-server-and-test - allows to simultaneously start 2 processes during testing: cypress and frotnend
- http-server allows to serve static files for cypress test. 
- [istanbul](https://istanbul.js.org/) - code coverage with cli interface, generates html cov report
- [nyc](https://github.com/istanbuljs/nyc) - cli interface to istanbul
 - @cypress/code-coverage - allows to add istanbul coverage to cypress
 - @cypress/webpack-preprocessor allows to transpile cypress test via typescript
 - @istanbuljs/nyc-config-typescript - allows to coverage .ts files during test
 - @testing-library/cypress - adds cypress test
 - istanbul-lib-coverage the source code that allow direct cypress coverage integration - alpha version fixes mocha ts-node cannot read start

### Linting  libraries
 - @typescript-eslint/eslint-plugin": "2.7.1-alpha.17", - https://github.com/typescript-eslint/typescript-eslint/pull/1189
 - [eslint](https://eslint.org/) javascript set of linting rules. 
 - eslint-loader - allows webpack to pass js via eslint
 - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) lints your `<template` in vue SFC.
 - @vue/eslint-config-typescript - adds config to eslint for vue typescript specific rules
 - eslint parser check [.eslintrc.json](.eslintrc.json) for set of rules 
 - @typescript-eslint/eslint-plugin - adds ts specific rules to eslint
 - @typescript-eslint/parser - allows eslint to parse ts files 
 - [stylelint-scss](https://github.com/kristerkari/stylelint-scss#list-of-rules) - linter rules specific to sass
 - [stylelint-order](https://github.com/hudochenkov/stylelint-order) appends stylelint with order rules. This forces css attributes/imports to have specific order.
 - [stylelint](https://github.com/stylelint/stylelint) linter for css files.

### How to ignore linting errors
 - Exclude from coverage: `/* istanbul ignore if */` [guide](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)
 - ignore tslint error: `// tslint:disable-next-line:variable-name` [guide](https://palantir.github.io/tslint/usage/rule-flags/)
 - ignore eslint error:  `// eslint-disable-line no-prototype-builtins` [guide](https://eslint.org/docs/user-guide/configuring)
 - ignore typescript error: `// @ts-ignore: next-line` [guide](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments)
 - ignore stylelint error: `/* stylelint-disable-line */` [guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

### Configuration
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
 
[.nycrc.json](.nycrc.json) is a [configuration](https://github.com/istanbuljs/nyc#configuration-files) for istanbul code coverage. It can customize reports formats, coverage percentage and other build related things. 
 
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
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
```

### Disable tslint 
Tslint is not used for files, since it's deprecated. Use eslint instead and disable tslint 

1. Settings
2. Typescript
3. Tslint
4. Disable tslint

### Max line length
1. Editor
2. Code style
3. Hard wrap at 120

### Indentation
 - set indentation to 2 2 4 for html ,css, js, ts in settings -> editor -> code style
 
# TODO
 - @for sass loops doesn't work in linter https://github.com/AleshaOleg/postcss-sass/issues/53
 - https://github.com/bahmutov/cypress-vue-unit-test
 - https://github.com/vuejs/eslint-plugin-vue/issues/987
 - https://github.com/istanbuljs/nyc/issues/1148
 - https://github.com/benmosher/eslint-plugin-import/issues/1543
 - https://github.com/typescript-eslint/typescript-eslint/pull/801#issuecomment-555160908
 - https://github.com/mysticatea/eslint-plugin-node
