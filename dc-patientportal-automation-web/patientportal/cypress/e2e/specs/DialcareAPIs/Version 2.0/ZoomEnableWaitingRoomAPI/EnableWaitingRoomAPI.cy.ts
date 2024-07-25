import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Enable Waiting Room API Request", () => {
  it("Enable Waiting Room API GET", () => {
    cy.fixture<{ EnableWaitingRoomEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const EnableWaitingRoomEndPoint =
          apiEndpoints.EnableWaitingRoomEndPoint;
        const url = `${apiUrl}${EnableWaitingRoomEndPoint}`;
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

  it("Enable Waiting Room with paitnet id API GET", () => {
    cy.fixture<{ EnableWaitingRoomWithPaitentIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomWithPaitentIdEndPoint =
        apiEndpoints.EnableWaitingRoomWithPaitentIdEndPoint;
      const url = `${apiUrl}${EnableWaitingRoomWithPaitentIdEndPoint}` + 49;
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
    });
  });
});
