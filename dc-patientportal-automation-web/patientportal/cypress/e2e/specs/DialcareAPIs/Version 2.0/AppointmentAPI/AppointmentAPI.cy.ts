import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Appointment APIs", () => {
  it("Create Appointment API POST", () => {
    const requestBody = {
      id: 0,
      createdOn: "2024-04-22T12:03:32.980Z",
      updatedOn: "2024-04-22T12:03:32.980Z",
      instanceId: 0,
      programId: 1,
      patientId: 133,
      appointmentType: "2",
      consultType: "Audio",
      provideravailabilityScheduleId: 1,
      providerId: 130,
      startDateTime: "2024-04-26T12:03:32.980Z",
      endDateTime: "2024-04-29T12:03:32.980Z",
      consultTimezone: "UTC",
      appointmentRequestmode: "Web",
      requestor: "bru",
      requestorLocation: "Admin",
      requestorPhoneNumber: "9198885038",
      consultDemographicState: "CA",
      productTypeId: "Admin",
      consultFee: 160.0,
      providerAppointmentSlotId: 1,
      statusDescription: "Appointment fixed",
      cancellationReason: "Scheduled by Mistake",
      patientFirstName: faker.person.firstName(),
      patientLastName: "kumar",
      groupCode: "C50017",
      providerFirstName: "provider",
      providerLastName: "test",
      createdBy: "Sherrie",
      updatedBy: "Sherrie",
      reasonForVisit: "Pink Eye",
      productType: "UC",
      queueEntryTime: "2024-04-22T12:03:32.980Z",
      isLocked: false,
      lockedBy: "roro",
      priority: "Normal",
      dob: "2024-04-22T12:03:32.980Z",
      agesTreatedFrom: 0,
      agesTreatedTo: 0,
      pharmacyId: 0,
      merchantOrderNumber: "DC202416",
      age: 0,
      gender: "M",
      patientType: "PATIENT",
      petId: 0,
      petName: "tommy",
      petType: "huski",
    };

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
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Get Consultations Id API", () => {
    cy.fixture<{ getAppointmentIdOrConsultationIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const getAppointmentIdOrConsultationIdEndPoint =
        apiEndpoints.getAppointmentIdOrConsultationIdEndPoint;
      const url = `${apiUrl}${getAppointmentIdOrConsultationIdEndPoint}` + 2047;
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

  it.skip("Delete Consultations Id API", () => {
    // currently not working this api
    cy.fixture<{ getAppointmentIdOrConsultationIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const getAppointmentIdOrConsultationIdEndPoint =
        apiEndpoints.getAppointmentIdOrConsultationIdEndPoint;
      const url =
        `${apiUrl}${getAppointmentIdOrConsultationIdEndPoint}` +
        "AppointmentId=2047&Status=Active&CancellationReason=Scheduled by Mistake";
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
    });
  });
});