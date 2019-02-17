import {Logger} from 'lines-logger';


declare module 'vue/types/vue' {

    interface Vue {
        logger: Logger;
    }
}
