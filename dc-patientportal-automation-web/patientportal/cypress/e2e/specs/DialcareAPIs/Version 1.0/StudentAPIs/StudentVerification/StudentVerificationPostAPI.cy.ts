import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Student Verification And Registration Complete flow", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  const apiConfigUrl: string =
    "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
  it("Student Verification API POST Request", () => {
    const requestBody = {
      firstName: "txschoolic",
      lastName: "test",
      Dob: "2003-01-01",
      studentId: "37387500",
      state: "",
      studentGrade: "",
      schoolDistrict: "",
      schoolName: "",
    };

    cy.fixture<{ StudentVerificationEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const studentVerificationEndpoint =
        apiEndpoints.StudentVerificationEndpoint;
      const url = `${apiUrl}${studentVerificationEndpoint}`;
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

  it("verfiy State API GET Request", () => {
    cy.fixture<{ StateEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const StateEndPoint = apiEndpoints.StateEndPoint;
        const url = `${apiConfigUrl}${StateEndPoint}`;
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

  it("verfiy Surfix API GET Request", () => {
    cy.fixture<{ SuffixesEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const SuffixesEndPoint = apiEndpoints.SuffixesEndPoint;
        const url = `${apiConfigUrl}${SuffixesEndPoint}`;
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

  it("verfiy Language API GET Request", () => {
    cy.fixture<{ LanguageGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const LanguageGetEndPoint = apiEndpoints.LanguageGetEndPoint;
        const url = `${apiConfigUrl}${LanguageGetEndPoint}`;
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

  it("Address Auto complete API GET Request", () => {
    cy.fixture<{ AddressAutocompleteEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const addressUrl =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const AddressAutocompleteEndPoint =
        apiEndpoints.AddressAutocompleteEndPoint;
      const url = `${addressUrl}${AddressAutocompleteEndPoint}`;
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

  it("Validate UserName API GET Request", () => {
    cy.fixture<{ ValidateUserNameEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const validateUserNameEndPoint = apiEndpoints.ValidateUserNameEndPoint;
        const url =
          `${apiUrl}${validateUserNameEndPoint}` +
          faker.internet.userName() +
          faker.phone.number("#####");
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

  it("Accept Term And Condition API GET Request", () => {
    cy.fixture<{ AcceptTermAndConditionsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const acceptTermAndConditionsEndPoint =
        apiEndpoints.AcceptTermAndConditionsEndPoint;
      const url = `${apiConfigUrl}${acceptTermAndConditionsEndPoint}`;
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

  it("Student Registration API POST Request", () => {
    const requestBody = {
      studentId: 37387500,
      patientId: 0,
      firstName: "TXSCHOOLIC",
      lastName: "TEST",
      middleInitial: "",
      personalSuffix: "",
      dob: "2003-01-01",
      preferredLanguage: "EN",
      address1: "7400 Gaylord Pkwy",
      address2: "",
      city: "Frisco",
      stateCode: "TX",
      zip: "75034",
      emailAddress: "TXSCHOOLIC.TEST@MAILINATOR.COM",
      primaryContactNumber: "9878978979",
      userName: `${faker.internet.userName()}` + faker.phone.number("#####"),
      password: "Test@12345",
      adB2C_ObjectID: "",
      isAcceptedTermsAndConditions: true,
      parentsInfoRequest: {
        patientId: 0,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        emailAddress:
          faker.internet.userName() +
          faker.phone.number("#####") +
          "@mailinator.com",
        phoneNumber: faker.phone.number("##########"),
        dob: faker.date.past(50, new Date("1970-01-01")).toISOString(),
      },
    };

    cy.fixture<{ StudentRegistrationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const studentRegistrationEndPoint =
        apiEndpoints.StudentRegistrationEndPoint;
      const url = `${apiUrl}${studentRegistrationEndPoint}`;
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
