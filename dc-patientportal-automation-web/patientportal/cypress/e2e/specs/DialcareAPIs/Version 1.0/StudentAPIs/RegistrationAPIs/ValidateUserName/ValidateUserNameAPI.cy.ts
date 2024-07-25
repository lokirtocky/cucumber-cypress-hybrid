import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Validate UserName API", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Validate UserName API GET Request", () => {
    cy.fixture<{ ValidateUserNameEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const validateUserNameEndPoint = apiEndpoints.ValidateUserNameEndPoint;
        const url =
          `${apiUrl}${validateUserNameEndPoint}` +
          faker.internet.userName() +
          faker.phone.number("#####");
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