import {Logger} from 'lines-logger';

declare module 'vue/types/vue' {

    interface Vue {
        logger: Logger;
    }
}

declare global {
    interface Window {
        GIT_VERSION: string|undefined;
    }
}
