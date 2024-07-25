import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Allergies details APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  function getRandomAllergyWithNumber(): string {
    const allergiesList: string[] = [
      "Pollen",
      "Dust mites",
      "Mold",
      "Pet dander",
      "shellfish",
      "peanuts",
      "eggs",
      "milk",
      "InsectStings",
      "penicillin",
      "aspirin",
      "Latex",
    ];

    const randomIndex: number = Math.floor(
      Math.random() * allergiesList.length
    );
    const randomNumber: number = Math.floor(Math.random() * 10000) + 1;
    return `${allergiesList[randomIndex]}${randomNumber}`;
  }

  it("Allergies details API POST Request", () => {
    const requestBody = [
      {
        id: 0,
        allergiesName: getRandomAllergyWithNumber(),
        createdBy: "Admin",
        createdOn: "2024-01-16T09:49:03.881Z",
        updatedBy: "Admin",
        updatedOn: "2024-01-16T09:49:03.881Z",
      },
    ];

    cy.fixture<{ AllergiesDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const AllergiesDetailsEndPoint = apiEndpoints.AllergiesDetailsEndPoint;
        const url = `${Cypress.env("apiUrl")}${AllergiesDetailsEndPoint}`;

        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(url, requestBody, headers, "POST").then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Allergies details GET Request", () => {
    cy.fixture<{ AllergiesDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const AllergiesDetailsEndPoint = apiEndpoints.AllergiesDetailsEndPoint;
        const url = `${apiUrl}${AllergiesDetailsEndPoint}`;

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

  it("Allergies details API PUT Request", () => {
    const requestBody = {
      id: 12,
      allergiesName: getRandomAllergyWithNumber(),
      createdBy: "Admin",
      createdOn: "2024-01-16T10:20:17.860Z",
      updatedBy: "Admin",
      updatedOn: "2024-01-16T10:20:17.860Z",
    };

    cy.fixture<{ AllergiesDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const AllergiesDetailsEndPoint = apiEndpoints.AllergiesDetailsEndPoint;
        const url = `${apiUrl}${AllergiesDetailsEndPoint}`;
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

  it("Allergy details API POST Request", () => {
    const requestBody = {
      id: 0,
      createdBy: "Admin",
      createdOn: "2024-04-02T08:38:16.207Z",
      updatedBy: "Admin",
      updatedOn: "2024-04-02T08:38:16.207Z",
      patientId: 0,
      allergiesName: getRandomAllergyWithNumber(),
      petId: 0,
      statusCode: "Admin",
      patientType: "Admin",
    };

    cy.fixture<{ AllergyDetailsPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const AllergyDetailsPostEndPoint =
        apiEndpoints.AllergyDetailsPostEndPoint;
      const url = `${apiUrl}${AllergyDetailsPostEndPoint}`;
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
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it(" Delete Allergyls GET Request", () => {
    cy.fixture<{ AllergyDeleteEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const AllergyDeleteEndPoint = apiEndpoints.AllergyDeleteEndPoint;
        const url = `${apiUrl}${AllergyDeleteEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }
          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.DELETE).then(
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
