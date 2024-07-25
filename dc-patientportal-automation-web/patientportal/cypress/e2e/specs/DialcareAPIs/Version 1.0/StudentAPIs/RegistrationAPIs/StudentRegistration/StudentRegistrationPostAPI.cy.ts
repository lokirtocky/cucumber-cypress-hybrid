import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../../fixtures/apiMethods.json";

describe("Student Registration", () => {
  const apiUrl: string = Cypress.env("apiUrl");

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
        firstName: "Bob",
        lastName: "Peterson",
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
