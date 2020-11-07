declare namespace Cypress { // eslint-disable-line @typescript-eslint/no-unused-vars
  interface cy {

    /**
     * Finds <v-text-field/> with a specified label and types text there
     */
    vType(label: string, text: string): Chainable<null>;

    /**
     * Finds <v-button/> with a specified text and clicks on it
     */
    vClick(label: string): Chainable<null>;

    /**
     * Finds <v-select/> with a specified label and select specified option
     */
    vSelect(label: string, option: string): Chainable<null>;

    /**
     * Finds <v-checkbox>/> with a specified content and clicks on it
     */
    vCheck(text: string): Chainable<null>;

    /**
     * Verifies that http cypress stub has been called #N times
     * use route(...}.as('alias') to give request a name
     */
    assertCalledTimes(alias: string, timeCalled: number): Chainable<null>;
  }
}
