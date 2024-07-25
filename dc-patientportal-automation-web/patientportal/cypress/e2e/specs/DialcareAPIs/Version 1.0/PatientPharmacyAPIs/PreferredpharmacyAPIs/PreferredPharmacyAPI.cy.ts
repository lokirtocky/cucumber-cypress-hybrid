import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Preferred pharmacy API", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Preferred pharmacy API POST Request", () => {
    const requestBody = {
      doseSpotPharmacyID: "31591",
      storeName: "storeName 123" + faker.person.firstName(),
      address1: faker.location.streetAddress(),
      address2: "",
      city: faker.location.city(),
      stateCode: "CA",
      zipCode: faker.location.zipCode(),
      primaryPhone: faker.phone.number("##########"),
      primaryPhoneType: "5",
      primaryFax: "8001134321",
      isPrimary: true,
    };

    cy.fixture<{ preferredPharmacyEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const preferredPharmacyEndPoint =
          apiEndpoints.preferredPharmacyEndPoint;
        const url =
          `${apiUrl}${preferredPharmacyEndPoint}` + "2355/preferred-pharmacy";
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

  it("Preferred pharmacy API PUT Request", () => {
    const requestBody = {
      doseSpotPharmacyID: "31591",
      isPrimary: true,
    };

    cy.fixture<{ preferredPharmacyEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const preferredPharmacyEndPoint =
          apiEndpoints.preferredPharmacyEndPoint;
        const url =
          `${apiUrl}${preferredPharmacyEndPoint}` + "2355/preferred-pharmacy";
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
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });
});
