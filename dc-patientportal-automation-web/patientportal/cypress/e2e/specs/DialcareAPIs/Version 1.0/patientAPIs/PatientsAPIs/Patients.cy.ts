import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Patient APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  it("Patient API GET Request", () => {
    cy.fixture<{ patientGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const patientGetEndPoint = apiEndpoints.patientGetEndPoint;
        const url = `${apiUrl}${patientGetEndPoint}`;
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

  it("Patient API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: null,
      cellPhoneNumber: faker.phone.number("##########"),
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      patientId: 0,
      mailingAddress1:
        faker.internet.userName() +
        faker.phone.number("######") +
        "@mailinator.com",
      mailingAddress2: "",
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode("12345"),
      policyNumber: "",
      groupCode: "",
    };
    cy.fixture<{ PatientsSearchPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientsSearchPostEndPoint =
        apiEndpoints.PatientsSearchPostEndPoint;
      const url = `${apiUrl}${PatientsSearchPostEndPoint}`;
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

  it("Patient API DELETE Request", () => {
    cy.fixture<{ PatientDeleleEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const PatientDeleleEndPoint = apiEndpoints.PatientDeleleEndPoint;
        const url = `${apiUrl}${PatientDeleleEndPoint}`;
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

  it.skip("Patient API PUT Request", () => {
    cy.fixture<{ ReactivePutEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ReactivePutEndPoint = apiEndpoints.ReactivePutEndPoint;
        const url = `${apiUrl}${ReactivePutEndPoint}`;
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

  it("Patient List API POST Request", () => {
    const requestBody = ["133", "134"];
    cy.fixture<{ PatienttListPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const PatienttListPostEndPoint = apiEndpoints.PatienttListPostEndPoint;
        const url = `${apiUrl}${PatienttListPostEndPoint}`;
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

  it.skip("Patient Search API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: "<dateTime>",
      cellPhoneNumber: faker.phone.number("##########"),
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#######") +
        "@mailinator.com",
      patientId: "<integer>",
      policyNumber: "<string>",
      groupCode: "<string>",
      networkCode: "<string>",
      mailingAddress1:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      mailingAddress2: "<string>",
      city: faker.location.city(),
      state: "<string>",
      zip: faker.location.zipCode("12345"),
      pageNo: "<integer>",
      pageSize: "<integer>",
      productType: "<string>",
    };
    cy.fixture<{ PatientSearchPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const PatientSearchPostEndPoint =
          apiEndpoints.PatientSearchPostEndPoint;
        const url = `${apiUrl}${PatientSearchPostEndPoint}`;
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

  it("Admin Patient API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: null,
      cellPhoneNumber: "",
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      patientId: 0,
      mailingAddress1: faker.location.streetAddress(),
      mailingAddress2: "",
      city: faker.location.city(),
      state: "",
      zip: faker.location.zipCode("12345"),
      policyNumber: "",
      groupCode: "",
      pageNo: 1,
      pageSize: 10,
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

  it("Admin Member Patient API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: null,
      cellPhoneNumber: "",
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      patientId: 0,
      mailingAddress1: faker.location.streetAddress(),
      mailingAddress2: "",
      city: faker.location.city(),
      state: "",
      zip: faker.location.zipCode("12345"),
      policyNumber: "",
      groupCode: "",
      pageNo: 1,
      pageSize: 10,
      productType: "",
    };
    cy.fixture<{ AdminMemberPatientSearchPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const AdminMemberPatientSearchPostEndPoint =
        apiEndpoints.AdminMemberPatientSearchPostEndPoint;
      const url = `${apiUrl}${AdminMemberPatientSearchPostEndPoint}`;
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

  it("Patient with dependant API GET Request", () => {
    cy.fixture<{ PatientWithDependentsAndPetsGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientWithDependentsAndPetsGetEndPoint =
        apiEndpoints.PatientWithDependentsAndPetsGetEndPoint;
      const url = `${apiUrl}${PatientWithDependentsAndPetsGetEndPoint}`;
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

  it("Patient id by email id API GET Request", () => {
    cy.fixture<{ PatientIdByEmailIdGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientIdByEmailIdGetEndPoint =
        apiEndpoints.PatientIdByEmailIdGetEndPoint;
      const url = `${apiUrl}${PatientIdByEmailIdGetEndPoint}`;
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

  it("Patient id by ADB2C_OBJECT API GET Request", () => {
    cy.fixture<{ PatientDetailsByADB2C_ObjectIdGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PatientDetailsByADB2C_ObjectIdGetEndPoint =
        apiEndpoints.PatientDetailsByADB2C_ObjectIdGetEndPoint;
      const url = `${apiUrl}${PatientDetailsByADB2C_ObjectIdGetEndPoint}`;
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

  it("dependant by patient API POST Request", () => {
    const requestBody = {
      lName: faker.person.firstName(),
      fName: faker.person.lastName(),
      mName: "E",
      suffix: "Jr.",
      addressLine1: faker.location.streetAddress(),
      addressLine2: "Lakeside",
      city: faker.location.city(),
      state: "TX",
      zipCode: faker.location.zipCode("12345"),
      dob: "2010-02-02T00:00:00",
      preferredLanguage: "EN",
      email:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      phone: faker.phone.number("##########"),
      relationshiptoAccountholder: "",
    };
    cy.fixture<{ dependentsPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const dependentsPostEndPoint = apiEndpoints.dependentsPostEndPoint;
        const url = `${apiUrl}${dependentsPostEndPoint}`;
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

  it("preffered-provider API POST Request", () => {
    cy.fixture<{ preferredProviderGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const preferredProviderGetEndPoint =
        apiEndpoints.preferredProviderGetEndPoint;
      const url = `${apiUrl}${preferredProviderGetEndPoint}`;
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

  it("Patient create API POST Request", () => {
    const requestBody = {
      patientId: 0,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleInitial: "F",
      personalSuffix: "Sr.",
      gender: "M",
      dob: "1989-04-24T11:26:37.238Z",
      statusCode: "A",
      ssn: "987654323",
      externalId: 0,
      ssoUserId: "Nicholas",
      primaryId: 0,
      relationshipCode: "",
      maritalStatus: "S",
      preferredLanguage: "EN",
      isRegistrationComplete: true,
      registrationCompletionDate: "2023-03-03T11:26:37.238Z",
      registrationType: "W",
      coverageTypeCode: "TD",
      groupCode: "DCPA",
      policyNumber: "987452187",
      locationId: 1,
      gradeLevel: "Gd1",
      isAuthorisedToView: true,
      isAddressValidated: true,
      isDependentAddressAsPrimary: true,
      isOverageDependent: true,
      uAtoOA: true,
      isGuardian: true,
      canceledOn: "2023-03-03T11:26:37.238Z",
      createdOn: "2023-03-03T11:26:37.238Z",
      createdBy: "Admin",
      bloodTypes: "B+",
      raceEthnicity: "Asian",
      height: "6.8",
      weight: "480",
      updatedOn: "2023-03-03T11:26:37.238Z",
      updatedBy: "Admin",
      contacts: [
        {
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
          patientId: 0,
          entityType: "EMail",
          countryCode: "+91",
          contact: "nora@mailinator.com",
          isPrimary: true,
          receiveNotification: true,
        },
        {
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
          patientId: 0,
          entityType: "Phone",
          countryCode: "+91",
          contact: "9987145024",
          isPrimary: true,
          receiveNotification: true,
        },
        {
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
          patientId: 0,
          entityType: "Alter",
          countryCode: "+91",
          contact: "8874510390",
          isPrimary: true,
          receiveNotification: true,
        },
      ],
      preferedProviders: [
        {
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
          patientId: 0,
          networkId: 0,
          providerFirstName: "Ashwin",
          providerLastName: "Kumar",
          countryCode: "+91",
          phoneNumber: "9974125863",
          pharmacyName: "Triveda",
          pharmacyAddress1: "7400 Gaylord Parkway",
          pharmacyAddress2: "Lakeside At Frisco Bridges",
          city: "Frisco",
          state: "TX",
          statusCode: "A",
          zipCode: "75034",
          pharmacyPhoneNumber: "7741258963",
        },
      ],
      patientAddress: [
        {
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
          patientId: 0,
          addressType: "M",
          address1: "7400 Gaylord Parkway",
          address2: "Lakeside At Frisco Bridges",
          city: "Frisco",
          stateCode: "TX",
          zip: "75034",
          timeZone: "CST",
          statusCode: "A",
        },
      ],
    };
    cy.fixture<{ createPatientPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const createPatientPostEndPoint =
          apiEndpoints.createPatientPostEndPoint;
        const url = `${apiUrl}${createPatientPostEndPoint}`;
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

  it("Patient update API PUT Request", () => {
    const requestBody = {
      patientId: 689,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleInitial: "F",
      personalSuffix: "Sr.",
      gender: "M",
      dob: "1989-04-24T11:26:37.238Z",
      statusCode: "A",
      ssn: "987654323",
      externalId: 0,
      ssoUserId: "Nicholas",
      primaryId: 0,
      relationshipCode: "",
      maritalStatus: "S",
      preferredLanguage: "EN",
      isRegistrationComplete: true,
      registrationCompletionDate: "2023-03-03T11:26:37.238Z",
      registrationType: "W",
      coverageTypeCode: "TD",
      groupCode: "DCPA",
      policyNumber: "987452187",
      locationId: 1,
      gradeLevel: "Gd1",
      isAuthorisedToView: true,
      isAddressValidated: true,
      isDependentAddressAsPrimary: true,
      isOverageDependent: true,
      uAtoOA: true,
      isGuardian: true,
      canceledOn: "2023-03-03T11:26:37.238Z",
      createdOn: "2023-03-03T11:26:37.238Z",
      createdBy: "Admin",
      bloodTypes: "B+",
      raceEthnicity: "Asian",
      height: "6.8",
      weight: "480",
      isNeutered: null,
      updatedOn: "2023-03-03T11:26:37.238Z",
      updatedBy: "Admin",
      contacts: [
        {
          patientId: 689,
          entityType: "EMail",
          countryCode: "+91",
          contact: "nora@mailinator.com",
          isPrimary: true,
          receiveNotification: true,
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
        },
        {
          patientId: 689,
          entityType: "Phone",
          countryCode: "+91",
          contact: "9987145024",
          isPrimary: true,
          receiveNotification: true,
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
        },
        {
          patientId: 689,
          entityType: "Alter",
          countryCode: "+91",
          contact: "8874510390",
          isPrimary: true,
          receiveNotification: true,
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
        },
      ],
      preferedProviders: [
        {
          patientId: 689,
          networkId: 0,
          providerFirstName: "Ashwin",
          providerLastName: "Kumar",
          countryCode: "+91",
          phoneNumber: "9974125863",
          pharmacyName: "Triveda",
          pharmacyAddress1: "7400 Gaylord Parkway",
          pharmacyAddress2: "Lakeside At Frisco Bridges",
          city: "Frisco",
          state: "TX",
          statusCode: "A",
          zipCode: "75034",
          pharmacyPhoneNumber: "7741258963",
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
        },
      ],
      patientAddress: [
        {
          patientId: 689,
          addressType: "M",
          address1: "7400 Gaylord Parkway",
          address2: "Lakeside At Frisco Bridges",
          city: "Frisco",
          stateCode: "TX",
          zip: "75034",
          timeZone: "CST",
          statusCode: "A",
          id: 0,
          createdOn: "2023-03-03T11:26:37.238Z",
          createdBy: "Admin",
          updatedOn: "2023-03-03T11:26:37.238Z",
          updatedBy: "Admin",
        },
      ],
      id: 689,
      profileImagePath: null,
      isAcceptedTermsAndConditions: null,
    };
    cy.fixture<{ updatePatientPutEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const updatePatientPutEndPoint = apiEndpoints.updatePatientPutEndPoint;
        const url = `${apiUrl}${updatePatientPutEndPoint}`;
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
});
