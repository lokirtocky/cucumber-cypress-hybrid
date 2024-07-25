import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Dependent APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Dependent Id API GET Request", () => {
    cy.fixture<{ DependentGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const DependentGetEndPoint = apiEndpoints.DependentGetEndPoint;
        const url = `${apiUrl}${DependentGetEndPoint}`;
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

  it("Delete Dependent Id Id API GET Request", () => {
    cy.fixture<{ deleteDependentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const deleteDependentEndPoint = apiEndpoints.deleteDependentEndPoint;
        const url = `${apiUrl}${deleteDependentEndPoint}`;
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

  it("Dependent Reactive API PUT Request", () => {
    cy.fixture<{ ReactiveDependentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ReactiveDependentEndPoint =
          apiEndpoints.ReactiveDependentEndPoint;
        const url = `${apiUrl}${ReactiveDependentEndPoint}`;
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

  it("Dependent List Id API GET Request", () => {
    cy.fixture<{ DependentListEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const DependentListEndPoint = apiEndpoints.DependentListEndPoint;
        const url = `${apiUrl}${DependentListEndPoint}`;
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

  it("Dependent Search API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: "1996-07-10",
      cellPhoneNumber: faker.phone.number("##########"),
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      patientId: "672",
      policyNumber: "",
      groupCode: "GRPDCUCTH50",
      mailingAddress1: faker.location.streetAddress(),
      mailingAddress2: "Blvd",
      city: "little elm",
      state: "TX",
      zip: faker.location.zipCode("12345"),
    };
    cy.fixture<{ searchDependentEndpoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const searchDependentEndpoint = apiEndpoints.searchDependentEndpoint;
        const url = `${apiUrl}${searchDependentEndpoint}`;
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
  });

  it("Create Dependent API POST Request", () => {
    const requestBody = {
      patientId: 0,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleInitial: "",
      personalSuffix: "Admin",
      gender: "M",
      dob: "1996-07-10T18:30:00.000Z",
      statusCode: "A",
      ssn: "11",
      externalId: 0,
      ssoUserId: "Admin",
      primaryId: 135,
      relationshipCode: "D",
      maritalStatus: "st",
      preferredLanguage: "st",
      isRegistrationComplete: true,
      registrationCompletionDate: "2024-01-17T09:33:12.757Z",
      registrationType: "st",
      coverageTypeCode: "MW",
      groupCode: "GRPDCUCTH50",
      policyNumber: "Admin",
      locationId: null,
      gradeLevel: "dd",
      raceEthnicity: "Asian",
      weight: "78",
      height: "6.0",
      isAuthorisedToView: true,
      isAddressValidated: true,
      isDependentAddressAsPrimary: true,
      isOverageDependent: true,
      uAtoOA: true,
      isGuardian: true,
      canceledOn: "2024-01-17T09:33:12.757Z",
      createdOn: "2024-01-17T09:33:12.757Z",
      createdBy: "Admin",
      updatedOn: "2024-01-17T09:33:12.757Z",
      updatedBy: "system",
      contacts: [
        {
          id: 0,
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          countryCode: "1",
          updatedOn: "2024-01-17T09:33:12.757Z",
          updatedBy: "system",
          patientId: 0,
          entityType: "EMail",
          contact:
            faker.internet.userName() +
            faker.phone.number("#####") +
            "@mailinator.com",
          isPrimary: true,
          receiveNotification: true,
        },
        {
          id: 0,
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          countryCode: "1",
          updatedOn: "2024-01-17T09:33:12.757Z",
          updatedBy: "system",
          patientId: 0,
          entityType: "Phone",
          contact: faker.phone.number("##########"),
          isPrimary: true,
          receiveNotification: true,
        },
      ],
      patientAddress: [
        {
          id: 0,
          patientId: 0,
          address1: faker.location.streetAddress(),
          address2: "Blvd",
          addressType: "M",
          city: faker.location.city(),
          stateCode: "TX",
          zip: faker.location.zipCode("12345"),
          timeZone: "CST",
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          updatedBy: "system",
          updatedOn: "2024-01-17T09:33:12.757Z",
          statusCode: "A",
        },
      ],
    };
    cy.fixture<{ createAndUpdateDependentEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const createAndUpdateDependentEndPoint =
        apiEndpoints.createAndUpdateDependentEndPoint;
      const url = `${apiUrl}${createAndUpdateDependentEndPoint}`;
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

  it("Update Dependent API PUT Request", () => {
    const requestBody = {
      patientId: 672,
      firstName: faker.person.firstName("female"),
      lastName: faker.person.lastName(),
      middleInitial: "",
      personalSuffix: "Admin",
      gender: "M",
      dob: "1996-07-10T18:30:00.000Z",
      statusCode: "A",
      ssn: "11",
      externalId: 0,
      ssoUserId: "Admin",
      primaryId: 135,
      relationshipCode: "D",
      maritalStatus: "st",
      preferredLanguage: "st",
      isRegistrationComplete: true,
      registrationCompletionDate: "2024-01-17T09:33:12.757Z",
      registrationType: "st",
      coverageTypeCode: "MW",
      groupCode: "GRPDCUCTH50",
      policyNumber: "Admin",
      locationId: null,
      gradeLevel: "dd",
      raceEthnicity: "Asian",
      weight: "78",
      height: "6.0",
      isAuthorisedToView: true,
      isAddressValidated: true,
      isDependentAddressAsPrimary: true,
      isOverageDependent: true,
      uAtoOA: true,
      isGuardian: true,
      canceledOn: "2024-01-17T09:33:12.757Z",
      createdOn: "2024-01-17T09:33:12.757Z",
      createdBy: "Admin",
      updatedOn: "2024-01-17T09:33:12.757Z",
      updatedBy: "system",
      contacts: [
        {
          id: 0,
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          countryCode: "1",
          updatedOn: "2024-01-17T09:33:12.757Z",
          updatedBy: "system",
          patientId: 0,
          entityType: "EMail",
          contact:
            faker.internet.userName() +
            faker.phone.number("#######") +
            "@mailinator.com",
          isPrimary: true,
          receiveNotification: true,
        },
        {
          id: 0,
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          countryCode: "1",
          updatedOn: "2024-01-17T09:33:12.757Z",
          updatedBy: "system",
          patientId: 0,
          entityType: "Phone",
          contact: faker.phone.number("##########"),
          isPrimary: true,
          receiveNotification: true,
        },
      ],
      patientAddress: [
        {
          id: 0,
          patientId: 0,
          address1: faker.location.streetAddress(),
          address2: "Blvd",
          addressType: "M",
          city: faker.location.city(),
          stateCode: "TX",
          zip: faker.location.zipCode("12345"),
          timeZone: "CST",
          createdOn: "2024-01-17T09:33:12.757Z",
          createdBy: "system",
          updatedBy: "system",
          updatedOn: "2024-01-17T09:33:12.757Z",
          statusCode: "A",
        },
      ],
    };
    cy.fixture<{ createAndUpdateDependentEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const createAndUpdateDependentEndPoint =
        apiEndpoints.createAndUpdateDependentEndPoint;
      const url = `${apiUrl}${createAndUpdateDependentEndPoint}`;
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
});
