import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Pet Consult APIs", () => {
  it("Positive - Validate Pet Consult History API POST", () => {
    const requestBody = {
      petId: 782,
      fromDate: "2024-03-31T06:18:28.278Z",
      toDate: "2024-05-31T06:18:28.278Z",
      pageNumber: 1,
      pageSize: 10,
    };

    cy.fixture<{ GetPetConsultHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPetConsultHistoryEndPoint =
        apiEndpoints.GetPetConsultHistoryEndPoint;
      const url = `${apiUrl}${GetPetConsultHistoryEndPoint}`;
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

  it("Negative - Validate Invalid Date Range API POST", () => {
    const requestBody = {
      petId: 42,
      fromDate: "2024-06-03",
      toDate: "2024-05-02",
      pageNumber: 1,
      pageSize: 1,
    };

    cy.fixture<{ GetPetConsultHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPetConsultHistoryEndPoint =
        apiEndpoints.GetPetConsultHistoryEndPoint;
      const url = `${apiUrl}${GetPetConsultHistoryEndPoint}`;
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
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Validate Invalid Pet Id API POST", () => {
    const requestBody = {
      petId: -42,
      fromDate: "2024-06-03",
      toDate: "2024-05-02",
      pageNumber: 1,
      pageSize: 1,
    };

    cy.fixture<{ GetPetConsultHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPetConsultHistoryEndPoint =
        apiEndpoints.GetPetConsultHistoryEndPoint;
      const url = `${apiUrl}${GetPetConsultHistoryEndPoint}`;
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
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Validate Invalid page number with zero API POST", () => {
    const requestBody = {
      petId: 42,
      fromDate: "2024-04-03",
      toDate: "2024-05-02",
      pageNumber: 0,
      pageSize: 1,
    };

    cy.fixture<{ GetPetConsultHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPetConsultHistoryEndPoint =
        apiEndpoints.GetPetConsultHistoryEndPoint;
      const url = `${apiUrl}${GetPetConsultHistoryEndPoint}`;
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
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Validate Invalid page size with zero API POST", () => {
    const requestBody = {
      petId: 42,
      fromDate: "2024-04-03",
      toDate: "2024-05-02",
      pageNumber: 0,
      pageSize: 1,
    };

    cy.fixture<{ GetPetConsultHistoryEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPetConsultHistoryEndPoint =
        apiEndpoints.GetPetConsultHistoryEndPoint;
      const url = `${apiUrl}${GetPetConsultHistoryEndPoint}`;
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
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive - Validate Pet Upcoming Virtual Visit Information API POST", () => {
    const requestBody = {
      petId: 12,
      fromDate: "2024-03-31T06:18:28.278Z",
      toDate: "2024-05-31T06:18:28.278Z",
      pageNumber: 1,
      pageSize: 10,
    };

    cy.fixture<{ PostPetUpcomingVirtualVisitInformationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const PostPetUpcomingVirtualVisitInformationEndPoint =
        apiEndpoints.PostPetUpcomingVirtualVisitInformationEndPoint;
      const url = `${apiUrl}${PostPetUpcomingVirtualVisitInformationEndPoint}`;
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

  it("Negative - Validate Pet Upcoming Virtual Visit Information date range API POST", () => {
    const requestBody = {
      petId: 334,
      fromDate: "2024-06-01",
      toDate: "2024-05-01",
      pageNumber: 1,
      pageSize: 10,
    };

    cy.fixture<{ PostPetUpcomingVirtualVisitInformationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const PostPetUpcomingVirtualVisitInformationEndPoint =
        apiEndpoints.PostPetUpcomingVirtualVisitInformationEndPoint;
      const url = `${apiUrl}${PostPetUpcomingVirtualVisitInformationEndPoint}`;
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

  it("Negative - Validate Pet Upcoming Virtual Visit Information invalid pet Id API POST", () => {
    const requestBody = {
      petId: -334,
      fromDate: "2024-06-01",
      toDate: "2024-05-01",
      pageNumber: 1,
      pageSize: 10,
    };

    cy.fixture<{ PostPetUpcomingVirtualVisitInformationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const PostPetUpcomingVirtualVisitInformationEndPoint =
        apiEndpoints.PostPetUpcomingVirtualVisitInformationEndPoint;
      const url = `${apiUrl}${PostPetUpcomingVirtualVisitInformationEndPoint}`;
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

  it("Negative - Validate Pet Upcoming Virtual Visit Information invalid zero page number API POST", () => {
    const requestBody = {
      petId: 334,
      fromDate: "2024-06-01",
      toDate: "2024-05-01",
      pageNumber: 0,
      pageSize: 10,
    };

    cy.fixture<{ PostPetUpcomingVirtualVisitInformationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const PostPetUpcomingVirtualVisitInformationEndPoint =
        apiEndpoints.PostPetUpcomingVirtualVisitInformationEndPoint;
      const url = `${apiUrl}${PostPetUpcomingVirtualVisitInformationEndPoint}`;
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

  it("Negative - Validate Pet Upcoming Virtual Visit Information invalid zero page size API POST", () => {
    const requestBody = {
      petId: 334,
      fromDate: "2024-06-01",
      toDate: "2024-05-01",
      pageNumber: 1,
      pageSize: 0,
    };

    cy.fixture<{ PostPetUpcomingVirtualVisitInformationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const PostPetUpcomingVirtualVisitInformationEndPoint =
        apiEndpoints.PostPetUpcomingVirtualVisitInformationEndPoint;
      const url = `${apiUrl}${PostPetUpcomingVirtualVisitInformationEndPoint}`;
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
