This project is generated via [vue-webpack-minimal](https://github.com/akoidan/vue-webpack-minimal)


### To get started install dependencies first:
```bash
yarn install
# npm install # if you don't have yarn
```

### Stack
The technologies stack used in project:
- Typescript, tslint-microsoft-contrib
- Vue, Vuex, VueRouter, lines-logger
- Vuex-class, Vue-property-decorator
- Webpack and loaders
- Sass

It's highly recommended to get familiar with each of this technologies before starting working on this project.

### Development setup
Webpack-dev-server is used for development purposes with hot reloading, every time you save the file it will automatically apply. This doesn't affect node running files, only watching files. So files like webpack.config.js or development.json aren't affected. Take a look at [development.json](development.json). To run dev-server use `npm run dev`. You can navigate to http://localhost:9084

### Production setup
To build project for production take a look at [production.json](production.json) and run `npm run prod`. This generates static files in `./dist` directory.

### Build configuration
[webpack.config.js](webpack.config.js) is used to build project. Take a look at it to understand how source files are being processed. Its start point is `entry: ['./src/main.ts']`. Everything is imported in this files are being processed by section `loaders`.
development.json and production.json have the following format:
```javascript
{
  "IS_DEBUG": true, // turns off logs for production
  "PUBLIC_PATH": null // specifies public url for images/js/css/fonts instead of relative path like './main.js'
}
```

### Logging
Every vue component has injected `.logger` object, to log something to console use `this.logger.log('Hello {}', {1:'world'})();` Note calling function again in the end. Logger is disabled for production. For more info visit [lines-logger](https://github.com/akoidan/lines-logger)

### Linting
Stick to [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) rules.

### Built version
If you're using git as your version control tool `window.GIT_VERSION` will be exported to global scope

### Components style
This project uses [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) (that's has a dependency [vue-class-component](https://github.com/vuejs/vue-class-component)) [vuex-class](https://github.com/ktsn/vuex-class). You should write your component as the following:

```javascript
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component
export class MyComp extends Vue {

  @State
  private foo!: number;

  @Getter
  private readonly bar!: number;

  @Action
  private readonly baz!: Function;

  @Mutation
  private readonly qux!: Function;

  @Prop(Number) readonly propA!: number;

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Emit()
  changedProps() {}

  created () {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```

