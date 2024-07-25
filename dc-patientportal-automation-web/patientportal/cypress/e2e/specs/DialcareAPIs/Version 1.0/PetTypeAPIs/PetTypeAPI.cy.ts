import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Patient Provider info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("pet Type GET Request", () => {
    cy.fixture<{ petTypeEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const petTypeEndPoint = apiEndpoints.petTypeEndPoint;
        const url = `${apiUrl}${petTypeEndPoint}`;
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
