import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Dosespot Patient info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  const dogBreeds: string[] = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Bulldog",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "German Shorthaired Pointer",
    "Yorkshire Terrier",
  ];
  function getRandomDogBreed(): string {
    const randomIndex: number = faker.datatype.number({
      min: 0,
      max: dogBreeds.length - 1,
    });
    return dogBreeds[randomIndex];
  }

  const dogColors: string[] = [
    "Black",
    "White",
    "Brown",
    "Golden",
    "Brindle",
    "Gray",
    "Tan",
  ];

  function getRandomDogColors(): string {
    const randomIndex: number = faker.datatype.number({
      min: 0,
      max: dogColors.length - 1,
    });
    return dogColors[randomIndex];
  }

  it("Dosespot Patient API GET 1 Request", () => {
    cy.fixture<{ DosespotPatientPrescriptionsEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DosespotPatientPrescriptionsEndpoint =
        apiEndpoints.DosespotPatientPrescriptionsEndpoint;
      const url = `${apiUrl}${DosespotPatientPrescriptionsEndpoint}`;
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

  it("Dosespot Patient API GET 2 Request", () => {
    cy.fixture<{ DosespotPatientGetEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DosespotPatientGetEndpoint =
        apiEndpoints.DosespotPatientGetEndpoint;
      const url = `${apiUrl}${DosespotPatientGetEndpoint}`;
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

  it("Dosespot Patient API POST Request", () => {
    const requestBody = {
      prefix: "mr",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: "K",
      dateOfBirth: "2000-10-28T09:18:52.748Z",
      gender: 2,
      email:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      address1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: "Texas",
      zip: faker.location.zipCode("12345"),
      primaryPhone: faker.phone.number("##########"),
      primaryPhoneType: 2,
      active: true,
    };
    cy.fixture<{ DosespotPatientPostEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DosespotPatientPostEndpoint =
        apiEndpoints.DosespotPatientPostEndpoint;
      const url = `${apiUrl}${DosespotPatientPostEndpoint}`;
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

  it("Dosespot Patient API PUT Request", () => {
    const requestBody = {
      prefix: "mr",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: "K",
      dateOfBirth: "2000-10-28T09:18:52.748Z",
      gender: 1,
      email:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      address1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: "Texas",
      zip: faker.location.zipCode("12345"),
      primaryPhone: faker.phone.number("##########"),
      primaryPhoneType: 2,
      active: true,
    };
    cy.fixture<{ DosespotPatientPutEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DosespotPatientPutEndpoint =
        apiEndpoints.DosespotPatientPutEndpoint;
      const url = `${apiUrl}${DosespotPatientPutEndpoint}`;
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

  it("Dosespot Patient API POST 2 Request", () => {
    cy.fixture<{ pharmaciesPostEndpoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const pharmaciesPostEndpoint = apiEndpoints.pharmaciesPostEndpoint;
        const url = `${apiUrl}${pharmaciesPostEndpoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });
});
