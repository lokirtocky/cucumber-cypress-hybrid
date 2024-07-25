import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
describe("Dependents And Pets Of Both details APIs", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Postive - validate Patient With Dependents And Pets Of Both GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsOfBothEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsOfBothEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsOfBothEndPoint;
      const url =
        `${apiUrl}${PatientWithDependentsAndPetsOfBothEndPoint}` + 1061;
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

  it("Negtive - validate patient With Dependents And Pets Of Both with negtive patient id GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsOfBothEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsOfBothEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsOfBothEndPoint;
      const url =
        `${apiUrl}${PatientWithDependentsAndPetsOfBothEndPoint}` + "-1061";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - validate patient paWith Dependents And Pets Of Both with string value GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsOfBothEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsOfBothEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsOfBothEndPoint;
      const url =
        `${apiUrl}${PatientWithDependentsAndPetsOfBothEndPoint}` + "QWERTY";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negtive - validate Patient With Dependents And Pets Of Both with null value GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsOfBothEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsOfBothEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsOfBothEndPoint;
      const url = `${apiUrl}${PatientWithDependentsAndPetsOfBothEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negtive - validate Patient With Dependents And Pets Of Both with special chracter value GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsOfBothEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsOfBothEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsOfBothEndPoint;
      const url =
        `${apiUrl}${PatientWithDependentsAndPetsOfBothEndPoint}` + "@#$%^&";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });
});
