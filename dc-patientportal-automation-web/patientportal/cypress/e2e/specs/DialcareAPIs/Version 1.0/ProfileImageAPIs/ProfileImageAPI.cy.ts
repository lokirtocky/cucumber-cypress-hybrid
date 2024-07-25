import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Patient Provider info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Profile Image POST Request", () => {
    cy.fixture("apiEndpoints.json").then((apiEndpoints) => {
      const profileImagePostEndpoint = apiEndpoints.profileImagePostEndpoint;
      const url = `${apiUrl}${profileImagePostEndpoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.fixture("patientImageLatest.png", "base64").then((base64Image) => {
          const byteString = atob(base64Image);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: "image/png" });
          const formData = new FormData();
          formData.append("FileData", blob, "patientImageLatest.png");
          formData.append("Type", "Patient");
          formData.append("TypeId", "133");
          formData.append("UploadedBy", blob, "patientImageLatest.png");
          cy.sendRequestWithBody(url, formData, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      });
    });
  });

  it.skip("Profile Image GET Request", () => {
    // currently have issue in stage environment
    cy.fixture<{ profileImagePostEndpoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const profileImagePostEndpoint = apiEndpoints.profileImagePostEndpoint;
        const url = `${apiUrl}${profileImagePostEndpoint}`;
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

  it("Profile Image DELETE Request", () => {
    cy.fixture<{ deleteProfileImageEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const deleteProfileImageEndpoint =
        apiEndpoints.deleteProfileImageEndpoint;
      const url = `${apiUrl}${deleteProfileImageEndpoint}`;
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
    });
  });
});
