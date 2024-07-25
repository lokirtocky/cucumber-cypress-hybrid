import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Patient Parents Info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it.skip("Patient Parents Info API POST Request", () => {
    const requestBody = {
      dob: "1996-07-11T18:30:00.000Z",
      emailAddress:
        faker.internet.userName() +
        faker.phone.number("#####") +
        "@mailinator.com",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      patientId: 698,
      phoneNumber: faker.phone.number("##########"),
    };

    cy.fixture<{ PatientParentsInfoPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientParentsInfoPostEndPoint =
        apiEndpoints.PatientParentsInfoPostEndPoint;
      const url = `${apiUrl}${patientParentsInfoPostEndPoint}`;
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

  it("Patient Parents Info API GET Request", () => {
    cy.fixture<{ PatientParentsInfoGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientParentsInfoGetEndPoint =
        apiEndpoints.PatientParentsInfoGetEndPoint;
      const url = `${apiUrl}${patientParentsInfoGetEndPoint}` + 672;
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
});
