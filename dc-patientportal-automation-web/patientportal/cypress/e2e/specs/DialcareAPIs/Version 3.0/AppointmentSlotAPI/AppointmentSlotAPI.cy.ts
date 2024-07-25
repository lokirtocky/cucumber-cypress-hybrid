import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Appointment APIs", () => {
  it("Create Appointment API POST", () => {
    const requestBody = {
      id: 0,
      createdBy: "Sherrie",
      createdOn: "2024-04-26T10:41:31.741Z",
      updatedBy: "Sherrie",
      updatedOn: "2024-04-26T10:41:31.741Z",
      providerId: 131,
      scheduleId: 1,
      appointmentDate: "2024-04-26T10:41:31.742Z",
      slotStartTime: "2024-04-26T10:41:31.742Z",
      slotEndTime: "2024-04-26T10:41:31.742Z",
      slotStatus: "A",
    };

    cy.fixture<{ AppointmentSlotsSaveEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const AppointmentSlotsSaveEndPoint =
        apiEndpoints.AppointmentSlotsSaveEndPoint;
      const url = `${apiUrl}${AppointmentSlotsSaveEndPoint}`;
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

  it("Create Appointment API PUT", () => {
    const requestBody = {
      id: 0,
      providerId: 131,
      slotStatus: "A",
      updatedBy: "Sherrie",
      updatedOn: "2024-04-26T10:42:15.173Z",
    };

    cy.fixture<{ AppointmentSlotsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://provider-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const AppointmentSlotsEndPoint = apiEndpoints.AppointmentSlotsEndPoint;
        const url = `${apiUrl}${AppointmentSlotsEndPoint}`;
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

  it.skip("Appointment Slots GET API", () => {
    //issue in this API
    cy.fixture<{ AppointmentSlotsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://provider-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const AppointmentSlotsEndPoint = apiEndpoints.AppointmentSlotsEndPoint;
        const url =
          `${apiUrl}${AppointmentSlotsEndPoint}` +
          "?ProivederId=131&StartDate=2023-06-26 10:00:00.000&EndDate=2023-06-26 10:15:00.000";
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

  it("Create Appointment API POST", () => {
    cy.fixture<{ AppointmentSlotsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://provider-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const AppointmentSlotsEndPoint = apiEndpoints.AppointmentSlotsEndPoint;
        const url = `${apiUrl}${AppointmentSlotsEndPoint}` + "?ProivederId=131";
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
