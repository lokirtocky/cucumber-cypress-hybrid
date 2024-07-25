import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Program Type Rule Check APIs", () => {
  const combinations = [
    ["UC"],
    ["VV"],
    ["TH"],
    ["TD"],
    ["student(Therapy)"],
    ["UC", "VV"],
    ["UC", "TH"],
    ["UC", "TD"],
    ["UC", "student(Therapy)"],
    ["VV", "TH"],
    ["VV", "TD"],
    ["VV", "student(Therapy)"],
    ["TH", "TD"],
    ["TH", "student(Therapy)"],
    ["TD", "student(Therapy)"],
    ["UC", "VV", "TH"],
    ["UC", "VV", "TD"],
    ["UC", "VV", "student(Therapy)"],
    ["UC", "TH", "TD"],
    ["UC", "TH", "student(Therapy)"],
    ["UC", "TD", "student(Therapy)"],
    ["VV", "TH", "TD"],
    ["VV", "TH", "student(Therapy)"],
    ["VV", "TD", "student(Therapy)"],
    ["TH", "TD", "student(Therapy)"],
    ["UC", "VV", "TH", "TD"],
    ["UC", "VV", "TH", "student(Therapy)"],
    ["UC", "VV", "TD", "student(Therapy)"],
    ["UC", "TH", "TD", "student(Therapy)"],
    ["VV", "TH", "TD", "student(Therapy)"],
    ["UC", "VV", "TH", "TD", "student(Therapy)"],
  ];

  const expectedResults = [
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: false,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: false,
        allergies: false,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: false,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: false,
        allergies: false,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: false,
        allergies: false,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: false,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
    {
      result: {
        preferredPharmacy: true,
        primaryCareProviders: true,
        medicalConditions: true,
        familyMedicalHistory: true,
        surgeries: true,
        allergies: true,
        medications: true,
      },
      errors: null,
    },
  ];

  combinations.forEach((combination, index) => {
    it(`Program Type Rule API POST with combination ${
      index + 1
    }: ${combination.join(", ")}`, () => {
      const requestBody = combination;
      cy.fixture<{ ProgramTypeRulesEndPoint: string }>(
        "apiEndpoints.json"
      ).then((apiEndpoints) => {
        const apiUrl =
          "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
        const ProgramTypeRulesEndPoint = apiEndpoints.ProgramTypeRulesEndPoint;
        const url = `${apiUrl}${ProgramTypeRulesEndPoint}`;
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
            expect(response.body.result).to.deep.equal(
              expectedResults[index].result
            );
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      });
    });
  });
});
