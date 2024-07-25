import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../fixtures/apiMethods.json";
import SessionData from "cypress/support/utils/SessionUtils";
import sessionVaraiblesData from "../../../../fixtures/sessionVariables.json";
import SecretName from "../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../fixtures/DatabaseQuerys.json";

describe("Getting the Email Details for register a patient for Gmail...", () => {
  let consultationId: any;

  describe("Invite Third person Email Details from Gmail...", () => {
    it("Create Appointment", () => {
      const futureDate = faker.date.future(0.083, new Date());
      const requestBody = {
        patientId: 49,
        patientFirstName: faker.person.firstName(),
        patientLastName: faker.person.lastName(),
        groupCode: "GRPDCUCPA50",
        appointmentType: "OnDemand",
        consultType: "Audio",
        startDateTime: futureDate.toISOString(),
        appointmentRequestmode: "Web",
        requestor: "Sherrie",
        consultDemographicState: "CA",
        consultFee: 0,
        createdOn: "2023-10-20T10:21:06.513",
        createdBy: "string",
        reasonForVisit: "Diarrhea/Constipation",
        productType: "UC",
        dob: "2000-12-12T00:00:00",
        petGender: "O",
        patientType: "patient",
        petId: 0,
      };

      cy.fixture<{ createPatientPortalAppointment: string }>(
        "apiEndpoints.json"
      ).then((apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const createPatientPortalAppointment =
          apiEndpoints.createPatientPortalAppointment;
        const url = `${apiUrl}${createPatientPortalAppointment}`;
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
            consultationId = response.body.result.id;
            SessionData.setSessionVariable(
              sessionVaraiblesData.CONSULTATION_ID
            ).to(consultationId);
            const formattedConsultationId =
              SessionData.formatTxtWithSessionVariable("{CONSULTATION-ID}");
            cy.task("log", `Consultation id is: ${formattedConsultationId}`);
            cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
          });
        });
      });
    });

    it("Update Consultation Status With Id", () => {
      cy.task("runQuery", {
        secretName: SecretName.ConsultationDatabase,
        query: DatabaseQuery.UpdateConsultationStatusWithId + consultationId,
      }).then((result: any) => {
        cy.task("log", result);
      });
    });

    it("Invite Zoom Link API", () => {
      const requestBody = {
        consultationId: consultationId,
        patientId: 133,
        providerId: 131,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: "",
        phone: "9176191803",
      };

      cy.fixture<{ invitePArticipantInZoomEndPoint: string }>(
        "apiEndpoints.json"
      ).then((apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const invitePArticipantInZoomEndPoint =
          apiEndpoints.invitePArticipantInZoomEndPoint;
        const url = `${apiUrl}${invitePArticipantInZoomEndPoint}`;
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
            cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
          });
        });
      });
    });

    it.skip("Fetch the Invite zoom SMS from a Specified phone number", () => {
      const smsUrl =
        "https://quackr.io/temporary-numbers/united-states/" + 19176191803;
      cy.visit(smsUrl);
      let latestSMS = "tbody > tr:nth-of-type(1)";
      // cy.get(latestSMS).contains('Invitation to Join Virtual Visit');
    });
  });
});
