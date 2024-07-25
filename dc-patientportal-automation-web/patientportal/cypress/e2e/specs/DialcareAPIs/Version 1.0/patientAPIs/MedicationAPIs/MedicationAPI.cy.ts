import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Medication APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  it("Medication API GET Request", () => {
    cy.fixture<{ MedicationGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const MedicationGetEndPoint = apiEndpoints.MedicationGetEndPoint;
        const url = `${apiUrl}${MedicationGetEndPoint}`;
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

  it("Medication API DELETE Request", () => {
    cy.fixture<{ MedicationDeleteEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const MedicationDeleteEndPoint = apiEndpoints.MedicationDeleteEndPoint;
        const apiTestUrl =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const url = `${apiTestUrl}${MedicationDeleteEndPoint}` + "248";
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

  it("Medication Search API POST Request", () => {
    const requestBody = {
      patientId: 135,
      networkId: 0,
      medicineName: "Tripride",
      medicineType: "Diabetes",
      dose: "1",
      morning: null,
      noon: true,
      night: null,
      days: "2",
      specialInstruction: "111",
      status: "A",
      id: 287,
      createdOn: "2024-01-11T09:16:24.573",
      createdBy: "system",
      updatedOn: "2024-01-11T09:16:24.573",
      updatedBy: "system",
    };
    cy.fixture<{ MedicationSearchPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicationSearchPostEndPoint =
        apiEndpoints.MedicationSearchPostEndPoint;
      const url = `${apiUrl}${MedicationSearchPostEndPoint}`;
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

  it("Medication create API POST Request", () => {
    const requestBody = {
      patientId: 135,
      networkId: 0,
      medicineName: "Tripride",
      medicineType: "Diabetes",
      dose: "1",
      morning: null,
      noon: true,
      night: null,
      days: "2",
      specialInstruction: "111",
      status: "A",
      id: 0,
      createdOn: "2024-01-11T09:16:24.573",
      createdBy: "system",
      updatedOn: "2024-01-11T09:16:24.573",
      updatedBy: "system",
    };

    cy.fixture<{ MedicationCreatePostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicationCreatePostEndPoint =
        apiEndpoints.MedicationCreatePostEndPoint;
      const url = `${apiUrl}${MedicationCreatePostEndPoint}`;
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

  it("Medication Update API PUT Request", () => {
    const requestBody = {
      patientId: 135,
      networkId: 0,
      medicineName: "Tripride",
      medicineType: "Diabetes",
      dose: "1",
      morning: null,
      noon: true,
      night: null,
      days: "2",
      specialInstruction: "111",
      status: "A",
      id: 286,
      createdOn: "2024-01-11T09:16:24.573",
      createdBy: "system",
      updatedOn: "2024-01-11T09:16:24.573",
      updatedBy: "system",
    };

    cy.fixture<{ MedicationUpdatePutEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicationUpdatePutEndPoint =
        apiEndpoints.MedicationUpdatePutEndPoint;
      const url = `${apiUrl}${MedicationUpdatePutEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.PUT).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it.skip("Medication name Update API PUT Request", () => {
    cy.fixture<{ medicationNamePutEndpoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicationNamePutEndpoint =
          apiEndpoints.medicationNamePutEndpoint;
        const url = `${apiUrl}${medicationNamePutEndpoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.PUT).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Medication API GET Request", () => {
    cy.fixture<{ medicationNameGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicationNameGetEndPoint =
          apiEndpoints.medicationNameGetEndPoint;
        const url = `${apiUrl}${medicationNameGetEndPoint}`;
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

  it("Medication Update API PUT Request", () => {
    cy.fixture<{ medicationNamePutEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicationNamePutEndPoint =
          apiEndpoints.medicationNamePutEndPoint;
        const url =
          `${apiUrl}${medicationNamePutEndPoint}` +
          "?petId=0&medicationName=" +
          faker.internet.userName() +
          "&CreatedBy=Doctor";
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
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
