import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../fixtures/apiMethods.json";
import SecretName from "../../fixtures/secretName.json";
import DatabaseQuery from "../../fixtures/DatabaseQuerys.json";
import { faker } from "@faker-js/faker";
import { String } from "node_modules/cypress/types/lodash";
import env from "../../support/env/Stage.json";
import SessionData from "cypress/support/utils/SessionUtils";
import sessionVaraiblesData from "../../fixtures/sessionVariables.json";

let MerchantOrder: any;
let groupCode: any;
let consultationId: any;
let providerId: any;

function generateSameDayRandomDateTimes() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDateTime = new Date(today);
  startDateTime.setDate(startDateTime.getDate() + 1);
  const startHour = Math.floor(Math.random() * 24);
  const startMinute = Math.floor(Math.random() * 60);
  startDateTime.setHours(startHour, startMinute);
  const endDateTime = new Date(startDateTime);
  endDateTime.setMonth(endDateTime.getMonth() + 8);
  const formatDateTime = (date: any) => {
    return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
  };

  return {
    startDateTime: formatDateTime(startDateTime),
    endDateTime: formatDateTime(endDateTime),
  };
}

When("User should Create appointment for patient portal through API", () => {
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
          expect(result.merchantOrderNumber).to.be.a("string").and.not.be.empty;
          cy.log(`API Response: ${JSON.stringify(response.body)}`);
        }
      );
    });
  });
});

When("User should pay the consultaion Payment through API", () => {
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
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
            // expect(response.status).to.eq(200);
            // expect(response.body).to.have.property("result");
            // expect(response.body.result).to.have.property("result", true);
            // expect(response.body.result)
            //     .to.have.property("merchantOrderNumber")
            //     .and.to.be.a("string");
            // expect(response.body.result).to.have.property("responseCode", 1);
            // expect(response.body.result).to.have.property(
            //     "responseDescription",
            //     "Approved"
            // );
            // expect(response.body.result).to.have.property("reasonCode", "1");
            // expect(response.body.result).to.have.property(
            //     "reasonDescription",
            //     "This transaction has been approved."
            // );
            // expect(response.body.result).to.have.property(
            //     "avsResponseCode",
            //     "Y"
            // );
            // expect(response.body.result).to.have.property(
            //     "avsResponseDescription",
            //     "Address (Street) and 5 digit ZIP match"
            // );
            // expect(response.body.result).to.have.property(
            //     "csvResponseCode",
            //     "P"
            // );
            // const csvResponseDescription =
            //     response.body.result.csvResponseDescription;
            // const formattedCsvResponseDescription = csvResponseDescription
            //     .replace(/\u00A0/g, " ")
            //     .trim();
            // expect(formattedCsvResponseDescription).to.equal("Not Processed");
            // expect(response.body.result)
            //     .to.have.property("transactionId")
            //     .and.to.be.a("string");
            // expect(response.body.result)
            //     .to.have.property("paidAuthCode")
            //     .and.to.be.a("string");
            // expect(response.body.result)
            //     .to.have.property("amount")
            //     .and.to.be.a("number");
            // expect(Number(response.body.result.amount)).to.eq(
            //     Number(requestBody.amount)
            // );
            // expect(response.body.result).to.have.property(
            //     "processor",
            //     "AuthNet"
            // );
            // expect(response.body.errors).to.be.null;
            // cy.log(`API Response: ${JSON.stringify(response.body)}`);
            // cy.task("runQuery", {
            //     secretName: SecretName.ConsultationDatabase,
            //     query:
            //         DatabaseQuery.SelectLatestRecordOfConsultationPayments +
            //         consultationId,
            // }).then((result: any) => {
            //     cy.task("log", result);
            //     const record = result.recordset[0];
            //     expect(record.PaymentAmount).to.deep.equal(
            //         Number(requestBody.amount)
            //     );
            //     expect(record.TransactionId).to.deep.equal(
            //         response.body.result.transactionId
            //     );
            //     expect(record.MerchantOrderNumber).to.deep.equal(
            //         response.body.result.merchantOrderNumber
            //     );
            // });
          }
        );
      });
    }
  );
});

When("User should be able to search {string} patient", (patient: string) => {
  it("Patient Search API POST Request", () => {
    const apiUrl: string =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const requestBody = {
      firstName: patient,
      lastName: "",
      dateOfBirth: null,
      cellPhoneNumber: "",
      emailAddress: "",
      patientId: 0,
      mailingAddress1: "",
      mailingAddress2: "",
      city: "",
      state: "",
      zip: "",
      policyNumber: "",
      groupCode: "",
      pageNo: 1,
      pageSize: 100,
      productType: "",
    };
    cy.fixture<{ AdminPatientSearchPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const AdminPatientSearchPostEndPoint =
        apiEndpoints.AdminPatientSearchPostEndPoint;
      const url = `${apiUrl}${AdminPatientSearchPostEndPoint}`;
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

When("User should be able to search {string} provider", (provider: String) => {
  const apiUrl =
    "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
  cy.fixture<{ ProviderSearchEndPoint: string }>("apiEndpoints.json").then(
    (apiEndpoints) => {
      const ProviderSearchEndPoint = apiEndpoints.ProviderSearchEndPoint;
      const url = `${apiUrl}${ProviderSearchEndPoint}`;
      const requestBody = {
        firstName: provider,
        lastName: "",
        emailAddress: "",
        license: "",
        providerLicenseState: "",
        specialty: "",
        network: "",
        language: "",
        taxId: "",
        providerStatus: "",
        providerNPI: "",
        cellPhoneNumber: "",
        pageNo: 1,
        pageSize: 10,
      };
      cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    }
  );
});

When(
  "User should be able to search {string} Phramcay by zip code",
  (zipCode: string) => {
    interface Pharmacy {
      pharmacyId: number;
      storeName: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      zipCode: string;
      primaryPhone: string;
      primaryPhoneType: number;
      primaryFax: string;
    }

    interface Result {
      items: Pharmacy[];
      result: {
        resultCode: string;
        resultDescription: string;
      };
    }

    interface ApiResponse {
      result: Result;
      errors: any;
    }

    const apiUrl =
      "https://consultation-api." +
      Cypress.env("env") +
      ".dctelemedplatform.com";
    cy.fixture<{
      PharmacySearchEndPoint: string;
    }>("apiEndpoints.json").then((apiEndpoints) => {
      const PharmacySearchEndPoint = apiEndpoints.PharmacySearchEndPoint;
      const url = `${apiUrl}${PharmacySearchEndPoint}` + zipCode;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }
        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            const responseBody: ApiResponse = response.body;
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(responseBody)}`);
            expect(responseBody).to.have.property("result");
          }
        );
      });
    });
  }
);

When("User should be able to get the all states", () => {
  cy.fixture<{ stateEndPoint: string }>("apiEndpoints.json").then(
    (apiEndpoints) => {
      const apiUrl =
        "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const stateEndPoint = apiEndpoints.stateEndPoint;
      const url = `${apiUrl}${stateEndPoint}`;
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

When("Dialcare user Creates the Appointment", () => {
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

When("User Update Consultation Status With Id", () => {
  cy.task("runQuery", {
    secretName: SecretName.ConsultationDatabase,
    query: DatabaseQuery.UpdateConsultationStatusWithId + consultationId,
  }).then((result: any) => {
    cy.task("log", result);
  });
});

When(
  "Dial care user Invite Zoom Link with {string} email API",
  (email: string) => {
    const requestBody = {
      consultationId: consultationId,
      patientId: 133,
      providerId: 131,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
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
  }
);

Then("Fetch the Invite zoom emails from a Specified User from gmail", () => {
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
      } else {
        cy.task("log", "No email was found.");
        expect(email).to.be.null;
      }
    }
  });
});

When("Get auto complete address API GET", () => {
  cy.fixture<{ autoSuggestionAddressGetEndpoint: string }>(
    "apiEndpoints.json"
  ).then((apiEndpoints) => {
    const apiUrl =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const autoSuggestionAddressGetEndpoint =
      apiEndpoints.autoSuggestionAddressGetEndpoint;
    const url = `${apiUrl}${autoSuggestionAddressGetEndpoint}`;
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
          expect(response.body).to.not.be.null;
          expect(response.body).to.have.property("result");
          expect(response.body.result).to.be.an("array").that.is.not.empty;
          response.body.result.forEach((address: any) => {
            expect(address).to.have.all.keys(
              "id",
              "cityName",
              "defaultCityName",
              "deliveryPoint",
              "deliveryPointCheckDigit",
              "plus4Code",
              "primaryNumber",
              "state",
              "streetName",
              "streetSuffix",
              "zipCode",
              "country"
            );
            expect(address.id).to.be.a("number");
            expect(address.cityName).to.be.a("string");
            expect(address.state).to.be.a("string");
            expect(address.zipCode).to.be.a("string");
            expect(address.country).to.eq("United States");
          });

          cy.log(`API Response: ${JSON.stringify(response.body)}`);
        }
      );
    });
  });
});

When(
  "Smarty suggested-address {string} city {string} state {string} zipCode {string} API POST",
  (mailingAddress1: string, city: string, state: string, zipCode: string) => {
    const requestBody = {
      address1: mailingAddress1,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    cy.fixture<{ suggestedAddressEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const suggestedAddressEndPoint = apiEndpoints.suggestedAddressEndPoint;
        const url = `${apiUrl}${suggestedAddressEndPoint}`;
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
  }
);

When(
  "Verify Address  Smarty suggested-address {string} city {string} state {string} zipCode {string} API POST",
  (mailingAddress1: string, city: string, state: string, zipCode: string) => {
    const requestBody = {
      address1: mailingAddress1,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    cy.fixture<{ VerifyAddressEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const VerifyAddressEndPoint = apiEndpoints.VerifyAddressEndPoint;
        const url = `${apiUrl}${VerifyAddressEndPoint}`;
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
  }
);

When("Provider API Add Therapy Provider post Request", () => {
  const generateSameDayRandomDateTimes = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startHour = Math.floor(Math.random() * 24);
    const startMinute = Math.floor(Math.random() * 60);
    const startDateTime = new Date(today);
    startDateTime.setHours(startHour, startMinute);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMonth(endDateTime.getMonth() + 8);
    const formatDateTime = (date: any) => {
      return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
    };

    return {
      startDateTime: formatDateTime(startDateTime),
      endDateTime: formatDateTime(endDateTime),
    };
  };

  const randomDateTimes = generateSameDayRandomDateTimes();

  const requestBody = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleInitial: "s",
    gender: "M",
    dob:
      faker.date.past(50, new Date()).toISOString().split("T")[0] +
      "T00:00:00.000Z",
    tin: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
    npi: faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
    practicingSince: faker.date.past(20, new Date()).getFullYear(),
    agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
    agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
    speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
    subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
    statusCode: "A",
    createdBy: "system",
    updatedBy: "system",
    specialityOther: null,
    profiles: [
      {
        providerId: 0,
        personalSuffix: "I",
        professionalSuffix: "D.O.",
        aliasName: "eee",
        preferredTimeZone: randomDateTimes.startDateTime,
        clientCode: "code",
        networkCode: "DCTH",
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
    ],
    contacts: [
      {
        providerId: 0,
        entityType: "email",
        contact:
          faker.person.firstName() +
          faker.person.lastName() +
          "01" +
          "TH@mailinator.com",
        isPrimary: true,
        receiveNotification: true,
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
      {
        providerId: 0,
        entityType: "Phone",
        contact: faker.phone.number("##########"),
        isPrimary: true,
        receiveNotification: false,
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
    ],
    addresses: [
      {
        providerId: 0,
        addressType: "B",
        address1: "7400 Gaylord Parkway",
        address2: "Lakeside At Frisco",
        city: "Frisco",
        stateCode: "AL",
        zip: "75034",
        timeZone: "CST",
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
      {
        providerId: 0,
        addressType: "M",
        address1: "7400 Gaylord Parkway",
        address2: "Lakeside At Frisco",
        city: "Frisco",
        zip: "75034",
        timeZone: "CST",
        stateCode: "AL",
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
    ],
    academics: [
      {
        providerId: 0,
        schoolName: "Christ the king convent school",
        degree: "high school",
        graduationDate: "2024-02-13T09:39:56.743Z",
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
    ],
    languages: [
      {
        providerId: 0,
        language: "EN",
        id: 0,
        createdBy: "system",
        updatedBy: "system",
        createdOn: "2024-02-13T09:39:56.743Z",
        updatedOn: "2024-02-13T09:39:56.743Z",
      },
    ],
    id: 0,
    createdOn: "2024-02-13T09:39:56.743Z",
    updatedOn: "2024-02-13T09:39:56.743Z",
    licenses: [
      {
        providerId: 0,
        stateCode: "CA",
        licenseNumber: faker.datatype
          .number({ min: 1000000000, max: 9999999999 })
          .toString(),
        licenseStatus: "Active",
        expirationDate: randomDateTimes.endDateTime,
        modeOfVerification:
          "https://www.bhec.texas.gov/verify-a-license/index.html",
        statusCode: "A",
        id: 0,
        createdBy: "admin",
        createdOn: "2023-07-06T15:38:31.763",
        updatedBy: "admin",
        updatedOn: "2024-02-16T10:29:13.633",
      },
    ],
  };

  cy.fixture<{ AddProviderEndPoint: string }>("apiEndpoints.json").then(
    (apiEndpoints) => {
      const apiUrl: string =
        "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const AddProviderEndPoint = apiEndpoints.AddProviderEndPoint;
      const url = `${apiUrl}${AddProviderEndPoint}`;
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
            expect(response.status).to.eq(201);
            providerId = response.body.id;
            const contactValue = requestBody.contacts[0].contact;
            cy.wrap(contactValue).as("contactValue");
            cy.wrap(providerId).as("providerId");
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    }
  );
});

When("Provider Api add the Schedules of Therapy Provider Details", () => {
  const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
  const requestBody = {
    id: 0,
    scheduleRecurrencesId: 0,
    providerId: providerId,
    recurrenceType: "EveryDay",
    recurrenceTypevalue: "Mo,Tu,We,Th,Fr,Sa,Su",
    scheduleStartDate: startDateTime,
    scheduleEndDate: endDateTime,
    createdBy: "Test",
    updatedBy: "Test",
    createdOn: "2024-06-13T08:50:57.008Z",
    updatedOn: "2024-06-13T08:50:57.008Z",
    type: "O",
    isAvailable: true,
    statusCode: "A",
    timezoneSelection: "CST",
  };
  cy.fixture<{ PostAppointmentSlotsEndPoint: string }>(
    "apiEndpoints.json"
  ).then((apiEndpoints) => {
    const apiUrl: string =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const PostAppointmentSlotsEndPoint =
      apiEndpoints.PostAppointmentSlotsEndPoint;
    const url = `${apiUrl}${PostAppointmentSlotsEndPoint}`;
    cy.task("getAccessToken").then((token) => {
      if (!token) {
        throw new Error("Failed to retrieve access token");
      }

      const headers = AuthUtil.getHeaders(token);
      cy.log(`API URL: ${url}`);
      cy.log(`API Headers: ${JSON.stringify(headers)}`);
      cy.log(`API Payload : ${JSON.stringify(requestBody)}`);
      cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
        (response) => {
          expect(response.status).to.eq(200);
          cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
        }
      );
    });
  });
});

When("Provider Api Create Therapy Provider Slots Details", () => {
  const apiUrl =
    "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
  cy.fixture<{ ScheduleRecurrenceEndPoint: string }>("apiEndpoints.json").then(
    (apiEndpoints) => {
      const ScheduleRecurrenceEndPoint =
        apiEndpoints.ScheduleRecurrenceEndPoint;
      const url = `${apiUrl}${ScheduleRecurrenceEndPoint}`;
      const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
      const requestBody = {
        ProviderId: providerId,
        ScheduleStartDate: startDateTime,
        ScheduleEndDate: endDateTime,
      };
      cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    }
  );
});

When(
  "Enter the Email from Request payload from create provider api",
  function () {
    cy.get("@contactValue").then((contactValue) => {
      cy.log(`Using provider email value: ${contactValue}`);
      const clickOnEmail =
        'table[class="table-striped jambo_table"] tbody tr:nth-child(1) td:nth-child(2)';

      cy.visit(
        "https://www.mailinator.com/v4/public/inboxes.jsp?to=" +
          `${contactValue}`
      );
      cy.get(clickOnEmail).first().click();

      cy.get("iframe#html_msg_body", { timeout: 60000 })
        .should("be.visible")
        .then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find("a.button-a.button-a-primary")
            .should("have.attr", "href")
            .then(($href) => {
              const href = $href as unknown as string;
              cy.task("log", href);
              cy.visit(href);
              let passwordTxtBx =
                "div:nth-of-type(2) > .align-items-center.col-lg-11.d-flex.flex-row.form-floating.required > .form-control.input.ng-invalid.ng-pristine.ng-untouched";
              let confirmPasswordTxtBx =
                "div:nth-of-type(3) > .align-items-center.col-lg-11.d-flex.flex-row.form-floating.required > .form-control.input.ng-invalid.ng-pristine.ng-untouched";
              let registerAccountBtn =
                "div:nth-of-type(4) > .align-items-center.col-lg-11.d-flex.flex-row.form-floating.required";
              cy.get(passwordTxtBx).type("Test@123");
              cy.get(confirmPasswordTxtBx).type("Test@123");
              cy.get(registerAccountBtn).click();
            });
        });
    });
  }
);

When(
  "user should be able to see the register provider success {string} message",
  (msg: string) => {
    cy.contains(msg);
  }
);
