[![HitCount](http://hits.dwyl.io/akoidan/vue-webpack-typescript.svg)](http://hits.dwyl.io/akoidan/vue-webpack-typescript) [![Build Status](https://api.travis-ci.org/akoidan/vue-webpack-typescript.svg?branch=master)](https://travis-ci.org/akoidan/vue-webpack-typescript) [![codecov](https://codecov.io/gh/akoidan/vue-webpack-typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/akoidan/vue-webpack-typescript) [![Github actions](https://github.com/akoidan/vue-webpack-typescript/workflows/CI/badge.svg)](https://github.com/akoidan/vue-webpack-typescript/actions)

# Vue-webpack-typescript project starter

This project is generated via [vue-webpack-minimal](https://github.com/akoidan/vue-webpack-typescript) and features:
 - Project CRUD skeleton [vue.pychat.org](https://vue.pychat.org)
 - typescript loading with babel with typechecking in a parallel thread. Everything (vuex, cypress, vue-data) is type safe!
 - vue with vuetify, vuex, router, sass, vuex-module-decorators, vue-property-decorator support typescript
 - cypress with code-coverage support, unit test support, screenshot assert and typescript support.
 - lint: a compilation of very strict lint rules for everything: vue, styles (sass), typescript that don't conflict with each other.
 - base example of CRUD pages with written api classes, tests and predefined structure
 
## Vue3 status

Atm 09/2020, vue3 is released as stable version 3.0.0, but the ecosystem around is still in progress. Other libraries like [vuetify](https://vuetifyjs.com/en/introduction/roadmap/#v30-titan) / [vue-class-component](https://github.com/vuejs/vue-class-component/issues/406) and vue-property-decorator are still integrating incoming changes from vue3, especially composition API. I would not use vue in q3 2020 for production purposes for new projects. As it's still bare and the libraries you do require would be a pain in the ass. All updates for vue3 you can check in branch [vue3](https://github.com/akoidan/vue-webpack-typescript/tree/vue3)   

## Get started

### Install dependencies:
 - `yarn install --frozen-lockfile`
 - [OPTIONAL] If compilation above crashes on binaries, do  `nvm use`. In total you need [yarn](https://classic.yarnpkg.com/en/docs/install/) and [nvm](https://github.com/nvm-sh/nvm)

### Run development server

This runs the development server w/o a linter on.

```bash
yarn start
```

### Tests

There're multiple things you can do with test:
 - Build into static files and run headless cypress against it
 - Run development server and run headfull cypress against it
 - Check coverage and generate reports for test

#### Headless cypress upon static server

The command bellow builds static files with coverage babel plugin information, creates a http server and runs cypress (e2e) tests located in the [integrationFolder](cypress/integration) against that server in headless mode.

```bash
yarn test
```

You can check reports in `.nyc` directory, including coverage information.

#### Headful cypress upon webpack-dev-server

This command is useful during development. You can click and inspect in live mode in cypress, and just develop while you're tests are ran automatically on file save somewhere. I usually have cypress test on one display, IDE on another one, and browser on 3rd one. So I instantly see what changes my code introduces.

1. Start dev-server in test mode. `yarn start` won't work, cause of missing coverage info and some other polyfills and tweaks required.

```bash
yarn start:test
```

2. Open cypress debug mode. This mode means you can inspect the cypress UI directly in browser and your test could automatically run upon file save.

```bash
yarn run test:cypress:debug
```

### Lint

To check the styleguide use:

```bash
yarn lint
```

### Build for productions to static files:


```bash
yarn run build:prod
```

## Configurations

### Environment variables

- `APP_TEST` - adds required code for testing to output files when set to True (istanbul coverage, XHR polyfill for cypress)
- `APP_API_URL` - public http api url e.g. <https://jsonplaceholder.typicode.com>
- `APP_PUBLIC_PATH` - specifies public url for images/js/css/fonts instead of relative path like './main.js
- `APP_VERSION` - git version
- `APP_FILE_MODE` - sets, whether static files should be built for file mode (dragging index.html to browser) or not.
 That turns off history mode in browser and removes crossOriginLoading links

### Configuration files

- Every vue component has injected `.$logger` object, to log something to console use `this.logger.log('Hello {}', {1:'world'})();` Note calling function again in the end. Logger is disabled for production. For more info visit [lines-logger](https://github.com/akoidan/lines-logger)
- Every component has injected `$.api` object. You should do http calls with `$this.$api`. If you prefer redux style you can call http in vuex actions.
- If you're using git as your version control tool `window.APP_VERSION` will be exported to global scope.
- [.nycrc.json](.nycrc.json) is a [configuration](https://github.com/istanbuljs/nyc#configuration-files) for istanbul code coverage. It can customize reports formats, coverage percentage and other build related things.
- [.stylelintrc](.stylelintrc) is a [configuration](https://stylelint.io/user-guide/rules) for css linting
- [.drone.yml](.drone.yml) is a [configuration](https://docker-runner.docs.drone.io/configuration/overview/) file for Drone CI.
- [.github/workflows/main.yml](.github/workflows/main.yml) is a [configuration](https://docs.github.com/en/free-pro-team@latest/actions/quickstart) file for Github Actions.
- [.eslintrc.json](.eslintrc.json) is a [configuration](https://eslint.org/docs/user-guide/configuring) for ts linting
- [.mocharc.json](.mocharc.json) is a [configuration](https://mochajs.org/#configuring-mocha-nodejs) for testing library mocha (deprecated mocha.opts)
- [cypress.json](cypress.json) is a [configuration](https://docs.cypress.io/guides/references/configuration.html#Global) for cypress e2e testing
- [package.json](package.json) is a [configuration](https://docs.npmjs.com/files/package.json) for yarn (npm), since it doesn't have versions of sublibs they are stored in [yarn.lock](yarn.lock)
- [tsconfig.json](tsconfig.json) is a [configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for typescript. While this files is used to build static files for FE, [cypress/tsconfig](cypress/tsconfig.json) is used to build files that would run test in cypress.
- [webpack](build) is a directory with webpack [configurations](https://webpack.js.org/configuration/)
- [mocha.opts](test/mocha.opts) is a [configuration](https://mochajs.org/api/mocha) for unit test (mocha).

### WebStorm IDE

#### Indentation

Set indentation to `2` `2` `4`for html, sass, js, ts in settings -> editor -> code style

#### Set template

1. New
1. Edit files templates...
1. Vue single file component

```vue
<template>
  <div>#[[$END$]]#</div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch, Ref} from "vue-property-decorator";

@Component
export default class ${COMPONENT_NAME} extends Vue {

}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
```

#### Disable tslint

Tslint is not used for files, since it's deprecated. Use eslint instead and disable tslint

1. Settings
1. Typescript
1. Tslint
1. Disable tslint

#### Disable inspections [Optional]
To avoid mixing warnings from eslint and jetbrains, you can turn them off by default
1. project preferences
1. editor
1. inspection
1. javascript
1. turn off everything, but leave: Code quality tools -> eslint

#### Max line length

1. Editor
1. Code style
1. Hard wrap at 120

#### Exclude directories from indexing
Mark `nyc` and `dist` directories ex excluded. Mouse 2 on the directory in the project explorer tree -> mark directory as -> excluded

## Style guide and how to

### Code samples with libs it belongs to

#### [typescript](http://www.typescriptlang.org/docs/home.html)

Typescript (or ts shortly) allows to write typesafe code:

```typescript
const a: number = 3;
```

- To get started with ts I would recommend watching [this](https://www.youtube.com/watch?v=ahCwqrYpIuM) 10 minute video
- To get started with decorators I recommend [this video](https://www.youtube.com/watch?v=O6A-u_FoEX8)
- For advanced learning I recommend checking [what's new](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) in every version of typescript. You may find a lot of interesting things.

#### [vue](https://vuejs.org/v2/guide/)

Vue  allows to write [SFC](https://vuejs.org/v2/guide/single-file-components.html) that would generate html to the page. Vue is only responsible for UI layer, this is not an MVC framework. The only thing that it does is creates `<div></div` codeblocks. Everything else is handled by libraries below .

#### [vuex](https://vuex.vuejs.org/)

Vuex is a state management pattern. It allows multiple vue components to have single model/data (source of truth). So if you have a user object like `{age: 3, name: 'eric'}` it can be accessible in multiple places. This is redux/mobx analogue for React.

#### [vueRouter](https://router.vuejs.org/guide/#html)

Vue router  allows navigation across pages in vue, w/o sending get request to the server. And produces access to URL parameters. The examples of routes is [here](src/utils/router.ts):

```typescript
new VueRouter({
  routes: [{
    path: '/posts', // this is url address
    component: PostsPage // this is vue component
  }]
});
```

#### [sass](https://sass-lang.com/guide)

Sass allows to write code that would be compiled into css

```sass
$font-stack:    Helvetica, sans-serif
body
  font: 100% $font-stack
  a
    display: block
```

#### [vue-class-component](https://github.com/vuejs/vue-class-component)

Vue class component allows to write vue component in class manner instead of object:

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

#### [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

Since vue-class-component forces you to have decorators above the class like this:

```javascript
@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {}
```

the following construction can be used instead:

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

#### [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators).

This is a wrapper with static getters for vuex. Check [store/users](src/store/store.ts) instead of writing vuex modules as a dict, for instance:

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

State can be injected into the vue component this way:

```typescript
class A extends Vue {
    @UserState
    public readonly count!: number;
}
```

#### [mocha](https://mochajs.org/#bdd)

This test library: allows to write

```javascript
describe('console', () => {
  it('should print', () => {
    console.log('Hello world')
  })
})
```

#### [chai](https://www.chaijs.com/api/bdd/) and [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/)

Those are assertion libraries that adds bdd assertions:

```javascript
expect([1, 2]).to.be.an('array').that.does.not.include(3);
```

#### [sinon](https://sinonjs.org/releases/v7.5.0/)

This is mocking library that allows you to write:

```javascript
const myAPI = { method: function () {} };
const spy = sinon.spy();
const mock = sinon.mock(myAPI);
mock.expects("method").once().throws();
```

#### [sinon-chai](https://github.com/domenic/sinon-chai)

To to write tests in BDD-like:

```javascript
expect(mySpy).to.have.been.calledWith("foo");
```

#### [lines-logger](https://github.com/akoidan/lines-logger)

This wrapper provides a single interface to console.log and displays the origin source file location:

```typescript
logger.log('Hello world')(); // pay attention to () in the end.
```

#### [cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file)

A testing framework that allows running test-cases directly in chrome (alternative to Selenium, that runs it on server)
 That part you've already seen on mocha above can be appended with cypress assertions and helpers:

```typescript
it("should contain 5 elements", (): void => {
  cy.get("[data-cy=filtered-users-container]").children().should("have.length", 1);
});
```

### Build process libraries

- [webpack](https://webpack.js.org/) allows to combine (bundle) multiple input javascript files into a single output file. Provides plugins and loaders api that allows transformation like typescript or sass. All configs are located under [webpack](build) directory, take a look at it to understand how source files are being processed. Its start point is `entry: ['./src/user.ts']`. Since webpack can only handle `.js` files, to let webpack know about everything else we should pass the code through a corresponding loader. Everything is imported in this files are being processed by section `loaders`.
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
- webpack-dev-server is used for development purposes with hot reloading, every time you save the file it will automatically apply. This doesn't affect node running files, only watching files. So files like webpack/base.config.js. To build project for production set `APP_PUBLIC_PATH` and run `yarn run buiild:prod`. This generates static files in `./dist` directory.
- webpack-cli allows to run webpack from the command line
- Loaders: sass-loader (pipes sass into css), css-loader - resolves import css files inside js modules, ' vue-loader (resolves vue sfc), vue-template-compiler (compiles <template into dom api), style-loader (packs css into js file with eval and pushes it to syle tag, file-loader (saves it as a file, and puting exported path to file as an url)
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
- servor allows to serve static files for cypress test.
- [istanbul](https://istanbul.js.org/) - code coverage with cli interface, generates html cov report
- [nyc](https://github.com/istanbuljs/nyc) - cli interface to istanbul
- @cypress/code-coverage - allows to add istanbul coverage to cypress
- @cypress/webpack-preprocessor allows to transpile cypress test via typescript
- @istanbuljs/nyc-config-typescript - allows to coverage .ts files during test
- @testing-library/cypress - adds cypress test
- istanbul-lib-coverage the source code that allow direct cypress coverage integration - alpha version fixes mocha ts-node cannot read start

### Lint libraries

- @typescript-eslint/eslint-plugin": "2.7.1-alpha.17", - <https://github.com/typescript-eslint/typescript-eslint/pull/1189>
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

### Continuous integration
This project has support for continuous integration servers:

 - Project supports with [DroneCI](https://docs.drone.io/).
 - [TravisCI](https://travis-ci.org/) pipelines out of the box.
 - [Github actions](https://docs.github.com/en/free-pro-team@latest/actions). Config  

You don't need to have all of them. So I recommend leave only 1. I would personally use droneci if I want it to be on my server. Or github actions for serverless.

### Tips

#### How to ignore linting errors

- Exclude from coverage: `/* istanbul ignore if */` [guide](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)
- ignore tslint error: `// tslint:disable-next-line:variable-name` [guide](https://palantir.github.io/tslint/usage/rule-flags/)
- ignore eslint error:  `// eslint-disable-line no-prototype-builtins` [guide](https://eslint.org/docs/user-guide/configuring)
- ignore typescript error: `// @ts-ignore: next-line` [guide](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments)
- ignore stylelint error: `/* stylelint-disable-line */` [guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

#### Where I find icons?
Repo uses material desing icons (mdi). Check [materialdesignicons.com](https://materialdesignicons.com/). And `node_modules/@mdi/font/scss/_variables.scss` directory, this vars are prefixed with `mdi-`, like `mdi-home`.

#### What's the import order in typescript:
 1. Multiple imports go before singular
 1. Uppercase letter go before lowercase
 1. Imports are aligned alphabetically

For example:
```typescript
import VueRouter, {RawLocation, Route, RouteRecord} from "vue-router"; // Multiple imports with `VueRouter` that starts with an UpperCase letter
import {globalLogger, jwtStorage} from "@/utils/singletons"; // multiple imports start with lowercase `globalLogger`
import DemoPage from "@/components/pages/DemoPage.vue"; // single import with lowercase
import HomePage from "@/components/pages/HomePage.vue"; // single import with lowercase but alphabetically next
import {ROUTER_HISTORY_MODE} from "@/utils/consts"; // this is still a single import from a capital letter
import {defaultModule} from "@/store/default"; // this is a single import with a lower letter
```

#### Debugging
 - Take a look at [vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
 - window has many useful objects like `consts`, `vue`, `store`, `router`, `api`, so you can do things like `store.dispatch('alertError', 'Hello')` directly from chrome dev console

#### Be aware
 - cypress test is run on different browser when you run it locally, the source of truth is drone/ci here. Thing like screenshot could also be different. So this things should be aligned in the future if any issues occur.
 - if build process is killed or get stack that could be because of out of memory. The only option is to build frontend on machine with more memory and copy files

## TODO
 - https://github.com/cypress-io/code-coverage/pull/332
 - ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/akoidan/vue-webpack-typescript) 
 - @for sass loops doesn't work in linter https://github.com/AleshaOleg/postcss-sass/issues/53
 - https://github.com/bahmutov/cypress-vue-unit-test
 - https://github.com/vuejs/eslint-plugin-vue/issues/987
 - https://github.com/istanbuljs/nyc/issues/1148
 - https://github.com/benmosher/eslint-plugin-import/issues/1543
 - https://github.com/typescript-eslint/typescript-eslint/pull/801#issuecomment-555160908
 - https://github.com/mysticatea/eslint-plugin-node
 - https://github.com/bahmutov/start-server-and-test/issues/283
