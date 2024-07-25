import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../../fixtures/apiMethods.json";

describe("TEST METHOD API", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it.skip("TEST METHOD API POST Request", () => {
    // curently giving 500 skipping this
    const requestBody = {
      type: "Admin",
      title: "Admin",
      status: 0,
      detail: "Admin",
      instance: "Admin",
      additionalProp1: "Admin",
      additionalProp2: "Admin",
      additionalProp3: "Admin",
    };

    cy.fixture<{ TestMethodEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const testMethodEndPoint = apiEndpoints.TestMethodEndPoint;
        const url = `${apiUrl}${testMethodEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });
});
