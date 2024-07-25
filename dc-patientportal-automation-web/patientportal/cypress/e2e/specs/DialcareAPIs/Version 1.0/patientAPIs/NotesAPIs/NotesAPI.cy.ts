import AuthUtil from "../../../../../../support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Notes APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  it("Notes API GET Request", () => {
    cy.fixture<{ NotesGet: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const NotesGet = apiEndpoints.NotesGet;
        const url = `${apiUrl}${NotesGet}`;
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

  it("Notes API POST Request", () => {
    const requestBody = {
      id: 0,
      patientId: 133,
      petId: null,
      description: faker.lorem.words(5),
      contactType: "admin",
      patientType: "PATIENT",
      createdOn: "2023-10-10T07:19:00.947",
      createdBy: "Admin",
      timeZone: "CST",
    };
    cy.fixture<{ NotesPost: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const NotesPost = apiEndpoints.NotesPost;
        const url = `${apiUrl}${NotesPost}`;
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
});
