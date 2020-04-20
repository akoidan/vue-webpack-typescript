import * as chaiAsPromised from "chai-as-promised";
import chai from "chai";

chai.use(chaiAsPromised);

const url = `${String(Cypress.env("APP_API_URL"))}/v1/test`;

describe("Xhr", (): void => {
  it("throws an error when response is not json", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: "nonJson",
      url,
    });
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await chai.assert.isRejected(
          win.xhr.doRequest({
            method: "GET",
            url: "test",
          }),
          "Error #1",
        );
      });
  });

  it("throws an error when 500", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: "nonJson",
      status: 500,
      url,
    });
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await chai.assert.isRejected(
          win.xhr.doRequest({
            method: "GET",
            url: "/test",
          }),
          "Error #2",
        );
      });
  });

  it("throws an error if error details are missing ", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: {anotherStructure: 1},
      status: 500,
      url,
    });
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await chai.assert.isRejected(
          win.xhr.doRequest({
            method: "GET",
            url: "/test",
          }),
          "Error #3",
        );
      });
  });

  it("throws an error if backend is down", () => {
    cy.visit("/");
    cy.window().then(async(win: Window) => {
      win.consts.API_URL = "http://localhost:8555/api";
      await chai.assert.isRejected(
        win.xhr.doRequest({
          method: "GET",
          url: "/test",
        }),
        "Error #6",
      );
    });
  });

  it("sends auth header when it's specified", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: [],
      status: 200,
      url,
    }).as("test-get");
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await win.xhr.doRequest({
          authToken: "test",
          method: "GET",
          url: "/test",
        });
        cy.get("@test-get").should((req: JQuery) => {
          // @ts-ignore next-line
          expect(req.request.headers).to.include({authorization: "Bearer test"});
        });
      });
  });

  it("doesn't send auth header if it's not passed", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: [],
      status: 200,
      url,
    }).as("test-get");
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await win.xhr.doRequest({
          method: "GET",
          url: "/test",
        });
        cy.get("@test-get").should((req: JQuery) => {
          // @ts-ignore next-line
          expect(req.request.headers).to.not.have.key("Authorization");
        });
      });
  });

  it("proxies error details from server", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: {error: {detail: "Incorrect password"}},
      status: 405,
      url,
    });
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await chai.assert.isRejected(
          win.xhr.doRequest({
            method: "GET",
            url: "/test",
          }),
          "Incorrect password",
        );
      });
  });

  it("sends api version header", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: [],
        url,
    }).as("test-get");
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await win.xhr.doRequest({
          method: "GET",
          url: "/test",
        });
        cy.get("@test-get").should((req: JQuery) => {
          // @ts-ignore next-line
          expect(req.request.headers).to.include({"app-version": "app-v1"});
        });
      });
  });
});
