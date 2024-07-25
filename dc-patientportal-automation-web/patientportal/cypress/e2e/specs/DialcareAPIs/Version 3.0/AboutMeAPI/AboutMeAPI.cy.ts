import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("About me APIs", () => {
  it("Positive - Verify user check About me details in API", () => {
    cy.fixture<{ aboutMeEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://provider-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const aboutMeEndPoint = apiEndpoints.aboutMeEndPoint;
        const url = `${apiUrl}${aboutMeEndPoint}` + 32;
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
