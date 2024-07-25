import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import { faker } from "@faker-js/faker";

describe("Request For Virtual Visit History", () => {
  let MerchantOrder: any;
  let groupCode: any;
  let consultationId: any;

  it("Positive - Create appointment for patient portal API POST", () => {
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
            MerchantOrder = response.body.result.merchantOrderNumber;
            groupCode = response.body.result.groupCode;
            consultationId = response.body.result.id;
            cy.log(`Merchant Order Number: ${MerchantOrder}`);
            cy.log(`Group Code is: ${groupCode}`);
            cy.log(`Consultation id is: ${consultationId}`);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
            expect(response.body).to.have.property("result");
            const { result } = response.body;
            expect(result.patientId).to.be.a("number");
            expect(result.patientFirstName).to.be.a("string").and.not.be.empty;
            expect(result.patientLastName).to.be.a("string").and.not.be.empty;
            expect(result.groupCode).to.match(/^GRP[A-Z]+[0-9]+$/);
            expect(result.appointmentType).to.eq("1");
            expect(result.consultType).to.eq("Audio");
            expect(result.consultFee).to.be.a("number").and.be.at.least(0);
            expect(result.reasonForVisit).to.be.a("string").and.not.be.empty;
            expect(result.consultDemographicState).to.match(/^[A-Z]{2}$/);
            expect(result.merchantOrderNumber).to.be.a("string").and.not.be
              .empty;
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Patient Portal consultaion Payment API POST", () => {
    const requestBody = {
      program: "DC50",
      cardNumber: "5424000000000015",
      cardExpiry: "12/28",
      csv: "901",
      amount: faker.phone.number("###"),
      email: "ssherrie@hh.com",
      sourceURL: "localhost",
      patientId: "49",
      merchantOrderNumber: MerchantOrder,
      primaryContactNumber: "2312322334",
      shippingaddress: {
        firstName: "Bru",
        lastName: "Bru",
        addrLine1: "567 1/2 Brooks Ave",
        addrLine2: "Lakeside At Frisco Bridges",
        city: "Venice",
        state: "CA",
        zip: "46225",
      },
      billingaddress: {
        firstName: "Bru",
        lastName: "Bru",
        addrLine1: "567 1/2 Brooks Ave",
        addrLine2: "Lakeside At Frisco Bridges",
        city: "Venice",
        state: "CA",
        zip: "46225",
      },
    };

    cy.fixture<{ makePaymentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const makePaymentEndPoint = apiEndpoints.makePaymentEndPoint;
        const url =
          `${apiUrl}${makePaymentEndPoint}` + consultationId + "/payment";
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
            expect(response.body).to.have.property("result");
            expect(response.body.result).to.have.property("result", true);
            expect(response.body.result)
              .to.have.property("merchantOrderNumber")
              .and.to.be.a("string");
            expect(response.body.result).to.have.property("responseCode", 1);
            expect(response.body.result).to.have.property(
              "responseDescription",
              "Approved"
            );
            expect(response.body.result).to.have.property("reasonCode", "1");
            expect(response.body.result).to.have.property(
              "reasonDescription",
              "This transaction has been approved."
            );
            expect(response.body.result).to.have.property(
              "avsResponseCode",
              "Y"
            );
            expect(response.body.result).to.have.property(
              "avsResponseDescription",
              "Address (Street) and 5 digit ZIP match"
            );
            expect(response.body.result).to.have.property(
              "csvResponseCode",
              "P"
            );
            const csvResponseDescription =
              response.body.result.csvResponseDescription;
            const formattedCsvResponseDescription = csvResponseDescription
              .replace(/\u00A0/g, " ")
              .trim();
            expect(formattedCsvResponseDescription).to.equal("Not Processed");
            expect(response.body.result)
              .to.have.property("transactionId")
              .and.to.be.a("string");
            expect(response.body.result)
              .to.have.property("paidAuthCode")
              .and.to.be.a("string");
            expect(response.body.result)
              .to.have.property("amount")
              .and.to.be.a("number");
            expect(Number(response.body.result.amount)).to.eq(
              Number(requestBody.amount)
            );
            expect(response.body.result).to.have.property(
              "processor",
              "AuthNet"
            );
            expect(response.body.errors).to.be.null;
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
            cy.task("runQuery", {
              secretName: SecretName.ConsultationDatabase,
              query:
                DatabaseQuery.SelectLatestRecordOfConsultationPayments +
                consultationId,
            }).then((result: any) => {
              cy.task("log", result);
              const record = result.recordset[0];
              expect(record.PaymentAmount).to.deep.equal(
                Number(requestBody.amount)
              );
              expect(record.TransactionId).to.deep.equal(
                response.body.result.transactionId
              );
              expect(record.MerchantOrderNumber).to.deep.equal(
                response.body.result.merchantOrderNumber
              );
            });
          });
        });
      }
    );
  });

  it("Get The list the Request for Virtual Visit history", () => {
    const currentDate = new Date();

    const toDate = new Date(currentDate);
    toDate.setDate(currentDate.getDate() - 2);

    const fromDate = new Date(currentDate);
    fromDate.setMonth(currentDate.getMonth() - 3);
    // const query = `UPDATE Consultations // Will uncomment once the issus is fix
    //            SET ProviderID = 130,
    //                ConsultationStartTime = '${fromDate.toISOString()}',
    //                ConsultationEndTime = '${toDate.toISOString()}',
    //                ConsultationStatus = 'Completed',
    //                ConsultationRemarks = 'This Is completed',
    //                Consent = 1
    //            WHERE Id = ${consultationId}`;
    // cy.task("runQuery", { secretName: SecretName.Providerdatabase, query }).then((result: any) => {
    //     console.log("Query result provider database :", result);
    // });

    const requestBody = {
      patientId: 352,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      pageNumber: 1,
      pageSize: 100,
      isAccountSwitched: false,
      patientType: "patient",
    };

    cy.fixture<{ GetRequestForVituralVisitHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetRequestForVituralVisitHistoryEndPoint =
        apiEndpoints.GetRequestForVituralVisitHistoryEndPoint;
      const url = `${apiUrl}${GetRequestForVituralVisitHistoryEndPoint}`;
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
});
