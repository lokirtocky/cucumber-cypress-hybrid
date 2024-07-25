import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
describe("change password details APIs", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Patient login with ADB2C_OBJECT with current password API GET Request", () => {
    cy.fixture<{
      changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint: string;
    }>("apiEndpoints.json").then((apiEndpoints) => {
      const changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint =
        apiEndpoints.changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint;
      const url =
        `${apiUrl}${changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint}` +
        "3e3fcbd2-456d-40ca-9caa-3eeef8f7819c";
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

  it("Change Password API PUT Request login with current password", () => {
    const requestBody = {
      currentPassword: "Test@123",
      newPassword: "Test@1234",
    };

    cy.fixture<{ changePasswordEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const changePasswordEndPoint = apiEndpoints.changePasswordEndPoint;
        const url = `${apiUrl}${changePasswordEndPoint}`;
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

  it("Patient login with new password ADB2C_OBJECT API GET Request", () => {
    cy.fixture<{
      changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint: string;
    }>("apiEndpoints.json").then((apiEndpoints) => {
      const changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint =
        apiEndpoints.changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint;
      const url =
        `${apiUrl}${changePasswordPatientDetailsByADB2C_ObjectIdGetEndPoint}` +
        "3e3fcbd2-456d-40ca-9caa-3eeef8f7819c";
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

  it("Change Password API PUT Request login with new password", () => {
    const requestBody = {
      currentPassword: "Test@1234",
      newPassword: "Test@123",
    };

    cy.fixture<{ changePasswordEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const changePasswordEndPoint = apiEndpoints.changePasswordEndPoint;
        const url = `${apiUrl}${changePasswordEndPoint}`;
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
