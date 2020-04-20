declare namespace Cypress {
  interface cy {

    /**
     * Stores access token in localStorage to authenticate the user
     */
    signIn(): Chainable<null>;

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
     * Creates a stub for HTTP request on Pact server.
     * Since PACT server provides CORS, this information can be ommited. (options, preflight, accept headers, etc)
     */
    pactAddInteraction({
      status,
      state,
      responseBody,
      withRequest,
      uponReceiving,
    }: {
      status: number;
      responseBody: unknown;
      state: string;
      withRequest: {
        body?: object;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        path: string;
      };
      uponReceiving: string;
    }): Chainable<null>;
  }
}
