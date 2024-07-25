import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Get Patient consultation APIs", () => {
  it("Positave - Get Patient Consultations Id API", () => {
    cy.fixture<{ GetPatientConsultationsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientConsultationsEndPoint =
        apiEndpoints.GetPatientConsultationsEndPoint;
      const url =
        `${apiUrl}${GetPatientConsultationsEndPoint}` + "PatientId=136&Count=6";
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

  it("Negative - Get Patient Consultations invalid Id API", () => {
    cy.fixture<{ GetPatientConsultationsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientConsultationsEndPoint =
        apiEndpoints.GetPatientConsultationsEndPoint;
      const url =
        `${apiUrl}${GetPatientConsultationsEndPoint}` +
        "PatientId=188889&Count=6";
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

  it("Negative - Get Patient Consultations invalid Id as String  API", () => {
    cy.fixture<{ GetPatientConsultationsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientConsultationsEndPoint =
        apiEndpoints.GetPatientConsultationsEndPoint;
      const url =
        `${apiUrl}${GetPatientConsultationsEndPoint}` +
        "PatientId=InvaidString&Count=6";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Get Patient Consultations invalid Id as Special char  API", () => {
    cy.fixture<{ GetPatientConsultationsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientConsultationsEndPoint =
        apiEndpoints.GetPatientConsultationsEndPoint;
      const url =
        `${apiUrl}${GetPatientConsultationsEndPoint}` +
        "PatientId=$%^!@#$*&Count=6";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it.skip("Positive - Get Patient Queues records API", () => {
    // issue in this api
    cy.fixture<{ GetPatientQueuesrecordsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientQueuesrecordsEndPoint =
        apiEndpoints.GetPatientQueuesrecordsEndPoint;
      const url = `${apiUrl}${GetPatientQueuesrecordsEndPoint}`;
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

  it("Positive - Update Patient consultations API POST", () => {
    const requestBody = {
      id: 16,
      priority: "1",
      consultType: "Video",
      consultDemographicState: "CA",
      updatedBy: "admin",
      updatedOn: "2024-04-19T05:25:30.715Z",
    };

    cy.fixture<{ UpdatePatientQueuesEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdatePatientQueuesEndPoint =
        apiEndpoints.UpdatePatientQueuesEndPoint;
      const url = `${apiUrl}${UpdatePatientQueuesEndPoint}`;
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

  it("Negative - Update Patient consultations API POST", () => {
    const requestBody = {
      id: 0,
      priority: "1",
      consultType: "Video",
      consultDemographicState: "CA",
      updatedBy: "admin",
      updatedOn: "2024-04-19T05:25:30.715Z",
    };

    cy.fixture<{ UpdatePatientQueuesEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdatePatientQueuesEndPoint =
        apiEndpoints.UpdatePatientQueuesEndPoint;
      const url = `${apiUrl}${UpdatePatientQueuesEndPoint}`;
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

  it("Negative - Update Patient consultations with String API POST", () => {
    const requestBody = {
      id: "qwerty",
      priority: "2",
      consultType: "Video",
      consultDemographicState: "CA",
      updatedBy: "admin",
      updatedOn: "2024-04-19T05:25:30.715Z",
    };

    cy.fixture<{ UpdatePatientQueuesEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdatePatientQueuesEndPoint =
        apiEndpoints.UpdatePatientQueuesEndPoint;
      const url = `${apiUrl}${UpdatePatientQueuesEndPoint}`;
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
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Update Patient consultations with special char API POST", () => {
    const requestBody = {
      id: "#$%^&*",
      priority: "2",
      consultType: "Video",
      consultDemographicState: "CA",
      updatedBy: "admin",
      updatedOn: "2024-04-19T05:25:30.715Z",
    };

    cy.fixture<{ UpdatePatientQueuesEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdatePatientQueuesEndPoint =
        apiEndpoints.UpdatePatientQueuesEndPoint;
      const url = `${apiUrl}${UpdatePatientQueuesEndPoint}`;
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
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Update Patient consultations with Invalid id API POST", () => {
    const requestBody = {
      id: 23456789045678,
      priority: "2",
      consultType: "Video",
      consultDemographicState: "CA",
      updatedBy: "admin",
      updatedOn: "2024-04-19T05:25:30.715Z",
    };

    cy.fixture<{ UpdatePatientQueuesEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdatePatientQueuesEndPoint =
        apiEndpoints.UpdatePatientQueuesEndPoint;
      const url = `${apiUrl}${UpdatePatientQueuesEndPoint}`;
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
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Get Consultations Id API", () => {
    cy.fixture<{ getAppointmentIdOrConsultationIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const getAppointmentIdOrConsultationIdEndPoint =
        apiEndpoints.getAppointmentIdOrConsultationIdEndPoint;
      const url = `${apiUrl}${getAppointmentIdOrConsultationIdEndPoint}` + 2047;
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
