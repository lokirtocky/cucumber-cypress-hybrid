import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import { faker } from "@faker-js/faker";

describe("Request For Virtual Visit through THERAPY End to End flow", () => {
  function generateFutureRandomDatesFor2024() {
    const now = new Date();
    let month = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    if (currentYear < 2024) {
      month = 1;
    } else if (currentYear === 2024) {
      month += 1;
    }

    if (month > 12) {
      month = 1;
    }
    const futureMonth = new Date(
      2024,
      month % 12,
      Math.floor(Math.random() * 28) + 1
    );
    futureMonth.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    );
    const startDate = new Date(futureMonth);
    const endDate = new Date(startDate.getTime());
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);
    endDate.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    );
    if (endDate <= startDate) {
      endDate.setHours(startDate.getHours() + 8);
    }

    const scheduleStartDate = startDate.toISOString();
    const scheduleEndDate = endDate.toISOString();

    return { scheduleStartDate, scheduleEndDate };
  }

  function generateSameDayRandomDateTimes() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startHour = Math.floor(Math.random() * 23);
    const startMinute = Math.floor(Math.random() * 60);
    const startDateTime = new Date(today);
    startDateTime.setHours(startHour, startMinute);
    const durationMinutes = 30 + Math.floor(Math.random() * 91);
    const endDateTime = new Date(
      startDateTime.getTime() + durationMinutes * 60000
    );
    const formatDateTime = (date: any) => {
      return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
    };

    return {
      startDateTime: formatDateTime(startDateTime),
      endDateTime: formatDateTime(endDateTime),
    };
  }
  //----------------------Admin Login and APIs----------------------------------------------//
  it("Admin details by AdminDetails By ADB2C_ObjectId API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ AdminDetailsByADB2C_ObjectIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const AdminDetailsByADB2C_ObjectIdEndPoint =
        apiEndpoints.AdminDetailsByADB2C_ObjectIdEndPoint;
      const url =
        `${apiUrl}${AdminDetailsByADB2C_ObjectIdEndPoint}` +
        "39099ec8-878a-475a-8416-a4633c9ce636";
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

  it("Admin login and provider search API POST Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ ProviderSearchEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ProviderSearchEndPoint = apiEndpoints.ProviderSearchEndPoint;
        const url = `${apiUrl}${ProviderSearchEndPoint}`;
        const requestBody = {
          firstName: "marry",
          lastName: "",
          emailAddress: "",
          license: "",
          providerLicenseState: "",
          specialty: "",
          network: "",
          language: "",
          taxId: "",
          providerStatus: "",
          providerNPI: "",
          cellPhoneNumber: "",
          pageNo: 1,
          pageSize: 10,
        };
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
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

  it("Admin plans details API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ plansDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const plansDetailsEndPoint = apiEndpoints.plansDetailsEndPoint;
        const url = `${apiUrl}${plansDetailsEndPoint}` + "DCVV";
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

  it("Admin provider details API GET Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ providerDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const providerDetailsEndPoint = apiEndpoints.providerDetailsEndPoint;
        const url = `${apiUrl}${providerDetailsEndPoint}` + "565";
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

  it("Admin Networks details API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ NetworksEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const NetworksEndPoint = apiEndpoints.NetworksEndPoint;
        const url = `${apiUrl}${NetworksEndPoint}`;
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

  it("Admin Recurrence Types API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ RecurrenceTypesEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const RecurrenceTypesEndPoint = apiEndpoints.RecurrenceTypesEndPoint;
        const url = `${apiUrl}${RecurrenceTypesEndPoint}`;
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

  it("Admin Cancellation Reasons API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ CancellationReasonsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const CancellationReasonsEndPoint =
        apiEndpoints.CancellationReasonsEndPoint;
      const url = `${apiUrl}${CancellationReasonsEndPoint}`;
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

  it("admin Schedule Recurrence API POST Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ ScheduleRecurrenceEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ScheduleRecurrenceEndPoint =
        apiEndpoints.ScheduleRecurrenceEndPoint;
      const url = `${apiUrl}${ScheduleRecurrenceEndPoint}`;
      const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
      const requestBody = {
        ProviderId: 565,
        ScheduleStartDate: startDateTime,
        ScheduleEndDate: endDateTime,
      };
      cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Admin provider Scheduled API POST Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ ScheduleProviderEndPointPost: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ScheduleProviderEndPointPost =
        apiEndpoints.ScheduleProviderEndPointPost;
      const url = `${apiUrl}${ScheduleProviderEndPointPost}`;
      const currentDateTime = new Date().toISOString();
      const { scheduleStartDate, scheduleEndDate } =
        generateFutureRandomDatesFor2024();
      const requestBody = {
        id: 0,
        scheduleRecurrencesId: 0,
        providerId: 565,
        recurrenceType: "EveryDay",
        recurrenceTypevalue: "Mo,Tu,We,Th,Fr,Sa,Su",
        scheduleStartDate: scheduleStartDate,
        scheduleEndDate: scheduleEndDate,
        createdBy: "Test",
        updatedBy: "Test",
        createdOn: currentDateTime,
        updatedOn: currentDateTime,
        type: "O",
        IsAvailable: true,
        statusCode: "A",
      };
      cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  //----------------------patient Login and APIs----------------------------------------------//

  it("States details GET Request", () => {
    cy.fixture<{ stateEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl =
          "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
        const stateEndPoint = apiEndpoints.stateEndPoint;
        const url = `${apiUrl}${stateEndPoint}`;
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

  it("plans Details details API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ plansDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const plansDetailsEndPoint = apiEndpoints.plansDetailsEndPoint;
        const url = `${apiUrl}${plansDetailsEndPoint}` + "C50017";
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

  it("Product Consult Type is THERAPY API Get Request", () => {
    const apiUrl =
      "https://consultation-api." +
      Cypress.env("env") +
      ".dctelemedplatform.com";
    cy.fixture<{ ProductConsultTypeByStateIdGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ProductConsultTypeByStateIdGetEndPoint =
        apiEndpoints.ProductConsultTypeByStateIdGetEndPoint;
      const url = `${apiUrl}${ProductConsultTypeByStateIdGetEndPoint}`;
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

  it("Fetch Consent THERAPY API Get Request", () => {
    const apiUrl =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ fetchConsentGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const fetchConsentGetEndPoint = apiEndpoints.fetchConsentGetEndPoint;
        const url = `${apiUrl}${fetchConsentGetEndPoint}`;
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

  it("plans Details details API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ plansDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const plansDetailsEndPoint = apiEndpoints.plansDetailsEndPoint;
        const url = `${apiUrl}${plansDetailsEndPoint}` + "C50017";
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

  it("Reason For Visits API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ ReasonForVisitsGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ReasonForVisitsGetEndPoint =
        apiEndpoints.ReasonForVisitsGetEndPoint;
      const url = `${apiUrl}${ReasonForVisitsGetEndPoint}` + "TH";
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

  it("Medical Conditions By PatientId API GET Request", () => {
    const apiUrl =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ MedicalConditionsByPatientIdGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicalConditionsByPatientIdGetEndPoint =
        apiEndpoints.MedicalConditionsByPatientIdGetEndPoint;
      const url = `${apiUrl}${MedicalConditionsByPatientIdGetEndPoint}`;
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

  it("Patient Details by id API GET Request", () => {
    const apiUrl =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ getPatientIdEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const getPatientIdEndPoint = apiEndpoints.getPatientIdEndPoint;
        const url = `${apiUrl}${getPatientIdEndPoint}`;
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

  it("Questionarie Intake API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ QuestionarieIntakeGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const QuestionarieIntakeGetEndPoint =
        apiEndpoints.QuestionarieIntakeGetEndPoint;
      const url =
        `${apiUrl}${QuestionarieIntakeGetEndPoint}` + "TH&Age=40&Gender=M";
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

  it("Last visited Provider API POST Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ lastVisitedProviderEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const lastVisitedProviderEndPoint =
        apiEndpoints.lastVisitedProviderEndPoint;
      const url = `${apiUrl}${lastVisitedProviderEndPoint}`;
      const requestBody = {
        gender: "",
        language: [],
        speciality: [],
        subSpeciality: [],
        programType: "TH",
        state: "CA",
      };
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

  it("New Provider API POST Request", () => {
    const apiUrl =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ newProviderPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const newProviderPostEndPoint = apiEndpoints.newProviderPostEndPoint;
        const url = `${apiUrl}${newProviderPostEndPoint}`;

        const requestBody = {
          gender: "",
          language: [],
          speciality: [],
          subSpeciality: [],
          programType: "TH",
          state: "CA",
        };
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
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

  interface Pharmacy {
    pharmacyId: number;
    storeName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    primaryPhone: string;
    primaryPhoneType: number;
    primaryFax: string;
  }

  interface Result {
    items: Pharmacy[];
    result: {
      resultCode: string;
      resultDescription: string;
    };
  }

  interface ApiResponse {
    result: Result;
    errors: any;
  }

  it("DoseSpot Pharmacy Search ZipCode And PharmacyName API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{
      DoseSpotPharmacySearchZipCodeAndPhramacyNameEndPoint: string;
    }>("apiEndpoints.json").then((apiEndpoints) => {
      const DoseSpotPharmacySearchZipCodeAndPhramacyNameEndPoint =
        apiEndpoints.DoseSpotPharmacySearchZipCodeAndPhramacyNameEndPoint;
      const url = `${apiUrl}${DoseSpotPharmacySearchZipCodeAndPhramacyNameEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }
        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            const responseBody: ApiResponse = response.body;
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(responseBody)}`);
            expect(responseBody).to.have.property("result");
            expect(responseBody.result).to.have.property("items");
            expect(responseBody.result.items).to.be.an("array");
            expect(responseBody.result.result.resultCode).to.eq("OK");
            responseBody.result.items.forEach((pharmacy: Pharmacy) => {
              expect(pharmacy).to.have.property("pharmacyId");
              expect(pharmacy).to.have.property("storeName");
              expect(pharmacy).to.have.property("address1");
              expect(pharmacy).to.have.property("address2");
              expect(pharmacy).to.have.property("city");
              expect(pharmacy).to.have.property("state");
              expect(pharmacy).to.have.property("zipCode");
              expect(pharmacy).to.have.property("primaryPhone");
              expect(pharmacy).to.have.property("primaryPhoneType");
              expect(pharmacy).to.have.property("primaryFax");
            });
            responseBody.result.items.forEach((pharmacy: Pharmacy) => {
              expect(pharmacy.zipCode).to.eq("12345");
            });
          }
        );
      });
    });
  });

  it("Product Type API GET Request", () => {
    const apiUrl =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    cy.fixture<{ ProductTypeEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ProductTypeEndPoint = apiEndpoints.ProductTypeEndPoint;
        const url = `${apiUrl}${ProductTypeEndPoint}`;
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

  let MerchantOrder: any;
  let groupCode: any;
  let consultationId: any;

  it("Positive - Create appointment for patient portal API POST", () => {
    const futureDate = faker.date.future(0.083, new Date());
    const requestBody = {
      patientId: 49,
      patientFirstName: faker.person.firstName(),
      patientLastName: faker.person.lastName(),
      groupCode: "GRPDCUCPA50",
      appointmentType: "OnDemand",
      consultType: "Audio",
      startDateTime: futureDate.toISOString(),
      appointmentRequestmode: "Web",
      requestor: "Sherrie",
      consultDemographicState: "CA",
      consultFee: 0,
      createdOn: "2023-10-20T10:21:06.513",
      createdBy: "string",
      reasonForVisit: "Diarrhea/Constipation",
      productType: "UC",
      dob: "2000-12-12T00:00:00",
      petGender: "O",
      patientType: "patient",
      petId: 0,
    };

    cy.fixture<{ createPatientPortalAppointment: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const createPatientPortalAppointment =
        apiEndpoints.createPatientPortalAppointment;
      const url = `${apiUrl}${createPatientPortalAppointment}`;
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
            MerchantOrder = response.body.result.merchantOrderNumber;
            groupCode = response.body.result.groupCode;
            consultationId = response.body.result.id;
            cy.log(`Merchant Order Number: ${MerchantOrder}`);
            cy.log(`Group Code is: ${groupCode}`);
            cy.log(`Consultation id is: ${consultationId}`);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
            expect(response.body).to.have.property("result");
            const { result } = response.body;
            expect(result.patientId).to.be.a("number");
            expect(result.patientFirstName).to.be.a("string").and.not.be.empty;
            expect(result.patientLastName).to.be.a("string").and.not.be.empty;
            expect(result.groupCode).to.match(/^GRP[A-Z]+[0-9]+$/);
            expect(result.appointmentType).to.eq("1");
            expect(result.consultType).to.eq("Audio");
            expect(result.consultFee).to.be.a("number").and.be.at.least(0);
            expect(result.reasonForVisit).to.be.a("string").and.not.be.empty;
            expect(result.consultDemographicState).to.match(/^[A-Z]{2}$/);
            expect(result.merchantOrderNumber).to.be.a("string").and.not.be
              .empty;
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Patient Portal consultaion Payment API POST", () => {
    const requestBody = {
      program: "DC50",
      cardNumber: "5424000000000015",
      cardExpiry: "12/28",
      csv: "901",
      amount: faker.phone.number("###"),
      email: "ssherrie@hh.com",
      sourceURL: "localhost",
      patientId: "49",
      merchantOrderNumber: MerchantOrder,
      primaryContactNumber: "2312322334",
      shippingaddress: {
        firstName: "Bru",
        lastName: "Bru",
        addrLine1: "567 1/2 Brooks Ave",
        addrLine2: "Lakeside At Frisco Bridges",
        city: "Venice",
        state: "CA",
        zip: "46225",
      },
      billingaddress: {
        firstName: "Bru",
        lastName: "Bru",
        addrLine1: "567 1/2 Brooks Ave",
        addrLine2: "Lakeside At Frisco Bridges",
        city: "Venice",
        state: "CA",
        zip: "46225",
      },
    };

    cy.fixture<{ makePaymentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const makePaymentEndPoint = apiEndpoints.makePaymentEndPoint;
        const url =
          `${apiUrl}${makePaymentEndPoint}` + consultationId + "/payment";
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
            expect(response.body).to.have.property("result");
            expect(response.body.result).to.have.property("result", true);
            expect(response.body.result)
              .to.have.property("merchantOrderNumber")
              .and.to.be.a("string");
            expect(response.body.result).to.have.property("responseCode", 1);
            expect(response.body.result).to.have.property(
              "responseDescription",
              "Approved"
            );
            expect(response.body.result).to.have.property("reasonCode", "1");
            expect(response.body.result).to.have.property(
              "reasonDescription",
              "This transaction has been approved."
            );
            expect(response.body.result).to.have.property(
              "avsResponseCode",
              "Y"
            );
            expect(response.body.result).to.have.property(
              "avsResponseDescription",
              "Address (Street) and 5 digit ZIP match"
            );
            expect(response.body.result).to.have.property(
              "csvResponseCode",
              "P"
            );
            const csvResponseDescription =
              response.body.result.csvResponseDescription;
            const formattedCsvResponseDescription = csvResponseDescription
              .replace(/\u00A0/g, " ")
              .trim();
            expect(formattedCsvResponseDescription).to.equal("Not Processed");
            expect(response.body.result)
              .to.have.property("transactionId")
              .and.to.be.a("string");
            expect(response.body.result)
              .to.have.property("paidAuthCode")
              .and.to.be.a("string");
            expect(response.body.result)
              .to.have.property("amount")
              .and.to.be.a("number");
            expect(Number(response.body.result.amount)).to.eq(
              Number(requestBody.amount)
            );
            expect(response.body.result).to.have.property(
              "processor",
              "AuthNet"
            );
            expect(response.body.errors).to.be.null;
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
            cy.task("runQuery", {
              secretName: SecretName.ConsultationDatabase,
              query:
                DatabaseQuery.SelectLatestRecordOfConsultationPayments +
                consultationId,
            }).then((result: any) => {
              cy.task("log", result);
              const record = result.recordset[0];
              expect(record.PaymentAmount).to.deep.equal(
                Number(requestBody.amount)
              );
              expect(record.TransactionId).to.deep.equal(
                response.body.result.transactionId
              );
              expect(record.MerchantOrderNumber).to.deep.equal(
                response.body.result.merchantOrderNumber
              );
            });
          });
        });
      }
    );
  });
});
