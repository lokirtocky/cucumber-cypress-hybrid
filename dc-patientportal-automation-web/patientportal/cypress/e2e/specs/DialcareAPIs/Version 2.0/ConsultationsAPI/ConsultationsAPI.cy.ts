import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Zoom video Signature R API APIs", () => {
  it.skip("Create Appointment API POST", () => {
    const requestBody = {};

    cy.fixture<{ AppointmentsCreatePostEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const AppointmentsCreatePostEndpoint =
        apiEndpoints.AppointmentsCreatePostEndpoint;
      const url = `${apiUrl}${AppointmentsCreatePostEndpoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys("result", "errors");
            expect(response.body.result).to.be.true;
            expect(response.body.errors).to.deep.equal({});
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it.skip("Get Twillo Chat API GET", () => {
    cy.fixture<{ twilloChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const twilloChatGetEndPoint = apiEndpoints.twilloChatGetEndPoint;
        const url = `${apiUrl}${twilloChatGetEndPoint}`;
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
