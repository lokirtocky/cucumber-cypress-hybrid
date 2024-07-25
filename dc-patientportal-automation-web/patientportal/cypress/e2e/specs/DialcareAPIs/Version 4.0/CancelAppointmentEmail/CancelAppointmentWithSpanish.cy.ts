import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import SessionData from "cypress/support/utils/SessionUtils";
import sessionVaraiblesData from "../../../../../fixtures/sessionVariables.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../../fixtures/secretName.json";

describe("Getting the Email Details for cancel appointment for spanish from Gmail...", () => {
  const apiUrl: string =
    "https://consultation-api." + Cypress.env("env") + ".dctelemedplatform.com";
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;
  let consultationId: any;

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
            cy.task("runQuery", {
              secretName: SecretName.ConsultationDatabase,
              query:
                DatabaseQuery.UpdateConsultationStatusWithId +
                formattedConsultationId,
            }).then((result: any) => {
              cy.task("log", "Consultations Record Updated...");
              cy.task("log", result);
            });
          }
        );
      });
    });
  });

  it("Cancel Appointment API POST Request with Spanish", () => {
    cy.task("runQuery", {
      secretName: SecretName.ConsultationDatabase,
      query: DatabaseQuery.UpdateConsultationStatus + consultationId,
    }).then((result: any) => {
      cy.task("log", result);
      cy.task("log", "Record Updated...");
    });
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query: DatabaseQuery.SelectPatientsById + 133,
    }).then((result: any) => {
      cy.task("log", "Latest Record...");
      cy.task("log", result);
    });
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query: DatabaseQuery.UpdatePatientsPreferredESLanguage + 133,
    }).then((result: any) => {
      cy.task("log", result);
      cy.task("log", "Record Updated...");
    });
    cy.task("runQuery", {
      secretName: SecretName.ConsultationDatabase,
      query: DatabaseQuery.SelectConsultationsById + consultationId,
    }).then((result: any) => {
      cy.task("log", result);
    });

    const requestBody = {
      appointmentIds: [consultationId],
      status: "Cancelled",
      cancellationReason: "Canceled",
    };

    cy.fixture<{ CancelAppointmentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const CancelAppointmentEndPoint =
          apiEndpoints.CancelAppointmentEndPoint;
        const url = `${apiUrl}${CancelAppointmentEndPoint}`;
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
          "|               Email Retrieved for English             |"
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
      } else {
        cy.task("log", "No email was found.");
        expect(email).to.be.null;
      }
    });
  });
});
