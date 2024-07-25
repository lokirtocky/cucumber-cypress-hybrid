import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Informed Consent APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Accept Informed Consent API GET Request", () => {
    cy.fixture<{ AcceptInformedGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const AcceptInformedGetEndPoint =
          apiEndpoints.AcceptInformedGetEndPoint;
        const url = `${apiUrl}${AcceptInformedGetEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("show informed consent API GET Request", () => {
    cy.fixture<{ showInformedEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const showInformedEndPoint = apiEndpoints.showInformedEndPoint;
        const url = `${apiUrl}${showInformedEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });
});
