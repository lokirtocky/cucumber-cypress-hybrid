import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";
describe("Patient Registration Complete Flow API", () => {
  const apiConfigUrl: string =
    "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
  const apiUrl: string = Cypress.env("apiUrl");

  it("verfiy Eligibility MemberId API GET Request", () => {
    cy.fixture<{ verfiyEligibilityEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const verfiyEligibilityEndPoint =
          apiEndpoints.verfiyEligibilityEndPoint;
        const url = `${apiUrl}${verfiyEligibilityEndPoint}`;
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

  it("Patient Registration API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleInitial: "",
      personalSuffix: "DMD",
      dob: `${faker.date.past(18).getFullYear()}-${String(
        faker.date.past().getMonth() + 1
      ).padStart(2, "0")}-${String(faker.date.past().getDate()).padStart(
        2,
        "0"
      )}`,
      preferredLanguage: "CD",
      address1: faker.location.streetAddress(),
      address2: null,
      city: faker.location.city(),
      stateCode: "AZ",
      zip: faker.location.zipCode("12345"),
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      primaryContactNumber: faker.phone.number("##########"),
      userName: faker.internet.userName(),
      password: "Test@12345",
      isAcceptedTermsAndConditions: true,
      PatientId: "32566007",
    };

    cy.fixture<{ PatientRegistrationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientRegistrationEndPoint =
        apiEndpoints.PatientRegistrationEndPoint;
      const url = `${apiUrl}${patientRegistrationEndPoint}`;
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
