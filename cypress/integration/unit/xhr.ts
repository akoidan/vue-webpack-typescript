import * as chaiAsPromised from "chai-as-promised";
import chai from "chai";

chai.use(chaiAsPromised);

const url = `${String(Cypress.env("APP_API_URL"))}/test`;

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
            url: "/test",
          }),
          "Malformed json",
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
          "Http not 200",
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
          "Server error",
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
        "Communication error",
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

  it("adds post body", () => {
    cy.server();
    cy.route({
      method: "POST",
      response: [],
      url,
    }).as("test-get");
    cy.visit("/")
    cy.window().then(async(win: Window) => {
      await win.xhr.doRequest({
        body: {
          aa: 1,
        },
        method: "POST",
        url: "/test",
      });
      cy.get("@test-get").should((req: JQuery) => {
        // @ts-ignore next-line
        expect(req.request.body).to.be.deep.eq({aa: 1});
      });
    });
  });
  it("ignores response if it's stated so", () => {
    cy.server();
    cy.route({
      method: "POST",
      response: [],
      url,
    }).as("test-get");
    cy.visit("/");
    cy.window().then(async(win: Window) => {
      const response = await win.xhr.doRequest({
        body: "error json",
        method: "POST",
        parseResponseAsJson: false,
        url: "/test",
      });
      expect(response).to.be.eq(null)
    });
  });
});
