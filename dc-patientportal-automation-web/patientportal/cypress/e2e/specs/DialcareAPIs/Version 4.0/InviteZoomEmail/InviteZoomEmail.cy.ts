import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import SessionData from "cypress/support/utils/SessionUtils";
import sessionVaraiblesData from "../../../../../fixtures/sessionVariables.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";

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
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            consultationId = response.body.result.id;
            SessionData.setSessionVariable(
              sessionVaraiblesData.CONSULTATION_ID
            ).to(consultationId);
            const formattedConsultationId =
              SessionData.formatTxtWithSessionVariable("{CONSULTATION-ID}");
            cy.task("log", `Consultation id is: ${formattedConsultationId}`);
            cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
          }
        );
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
      email: "dialcare01@gmail.com",
      phone: "",
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
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Fetch the Invite zoom emails from a Specified User from gmail", () => {
    const userName = env.gmailUserName;
    const password = env.gmailPassword;
    const fromEmail = env.fromEmail;
    const recipientEmail = env.recipientEmail;
    cy.wait(15000);
    cy.task("getEmails", {
      userName,
      password,
      fromEmail,
      recipientEmail,
    }).then((email: any) => {
      if (email) {
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          "|                    Email Retrieved                    |"
        );
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          `| Subject: ${email.subject}                              `
        );
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          "| Message Body:                                          "
        );
        cy.task("log", `${email.text.split("\n").join("\n| ")}`);
        cy.task(
          "log",
          "========================================================="
        );
        expect(email).to.not.be.null;
        const joinNowRegex = /JOIN NOW \( (https?:\/\/[^\s]+) \)/;
        const matches = email.text.match(joinNowRegex);
        if (matches && matches[1]) {
          const joinNowLink = matches[1];
          cy.task("log", "JOIN NOW Link is : ");
          cy.task("log", joinNowLink);
          expect(joinNowLink).to.not.be.null;
          // cy.visit(joinNowLink); // If you want to open the link
        } else {
          cy.task("log", "No email was found.");
          expect(email).to.be.null;
        }
      }
    });
  });
});
