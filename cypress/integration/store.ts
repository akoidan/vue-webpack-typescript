import * as chaiAsPromised from "chai-as-promised";
import chai from "chai";

chai.use(chaiAsPromised);

// This test checks src/store module which is a Vue store (Vuex)
describe("Store", (): void => {
  describe("alerts", (): void => {
    it("alerts success", (): void => {
      cy.visit("/");
      cy.window().
        then((win: Window) => {
          win.store.dispatch("alertSuccess", "Unique success alert example"); // eslint-disable-line @typescript-eslint/no-floating-promises
          cy.contains("Unique success alert example");
        });
    });

    it("alerts error", (): void => {
      cy.visit("/");
      cy.window().
        then((win: Window) => {
          win.store.dispatch("alertError", "Unique error alert example"); // eslint-disable-line @typescript-eslint/no-floating-promises
          cy.contains("Unique error alert example");
        });
    });

    it("removes old alerts if they stack", (): void => {
      cy.visit("/");
      cy.window().
        then((win: Window) => {
          win.store.dispatch("alertError", "Unique error alert example 1"); // eslint-disable-line @typescript-eslint/no-floating-promises
          win.store.dispatch("alertError", "Unique error alert example 2"); // eslint-disable-line @typescript-eslint/no-floating-promises
          win.store.dispatch("alertError", "Unique error alert example 3"); // eslint-disable-line @typescript-eslint/no-floating-promises
          win.store.dispatch("alertError", "Unique error alert example 4"); // eslint-disable-line @typescript-eslint/no-floating-promises
          win.store.dispatch("alertError", "Unique error alert example 5"); // eslint-disable-line @typescript-eslint/no-floating-promises
          cy.contains("Unique error alert example 1").should("not.exist");
          cy.contains("Unique error alert example 2").should("not.exist");
          cy.contains("Unique error alert example 3");
          cy.contains("Unique error alert example 4");
          cy.contains("Unique error alert example 5");
        });
    });

    it("closes alerts after expiration time", (): void => {
      cy.visit("/");
      cy.window().
        then((win: Window) => {
          win.consts.DISPLAY_ALERTS_MS = 1000;
          win.store.dispatch("alertError", "Unique error alert 1"); // eslint-disable-line @typescript-eslint/no-floating-promises
          cy.contains("Unique error alert 1");
          cy.wait(1200);
          cy.contains("Unique error alert 1").should("not.exist");
        });
    });


    it("alert is closable", (): void => {
      cy.visit("/");
      cy.window().
        then((win: Window) => {
          win.store.dispatch("alertError", "Unique error alert example"); // eslint-disable-line @typescript-eslint/no-floating-promises
          cy.contains("Unique error alert example");
          cy.get(".v-btn[aria-label=Close]").click();
          cy.contains("Unique error alert example").should("not.exist");
        });
    });
  });
});
