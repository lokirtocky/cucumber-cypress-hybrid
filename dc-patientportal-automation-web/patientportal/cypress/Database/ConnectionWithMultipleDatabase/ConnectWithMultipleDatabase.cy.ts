import SecretName from "../../fixtures/secretName.json";
import DatabaseQuerys from "../../fixtures/DatabaseQuerys.json";

describe("Database Query Test", () => {
  it("Should execute a database query Consultation Database", () => {
    const query =
      DatabaseQuerys.SelectTop10RecordsOfConsultationPaymentsOrderByDesc;
    cy.task("runQuery", {
      secretName: SecretName.ConsultationDatabase,
      query,
    }).then((result: any) => {
      console.log("Query result Consultation Database :", result);
    });
  });

  it("Should execute a database query for Configuration Database", () => {
    const query: string = DatabaseQuerys.SelectConfigrationGroups;
    cy.task("runQuery", {
      secretName: SecretName.ConfigurationDatabase,
      query,
    }).then((result: any) => {
      console.log("Query result Configuration Database :", result);
    });
  });

  it("Should execute a database query provider database", () => {
    const query: string = DatabaseQuerys.SelectProvidersData;
    cy.task("runQuery", {
      secretName: SecretName.Providerdatabase,
      query,
    }).then((result: any) => {
      console.log("Query result provider database :", result);
    });
  });

  it("Should execute a database query Member Database", () => {
    const query: string =
      DatabaseQuerys.SelectTop10RecordsOfPatientsOrderByDesc;
    cy.task("runQuery", { secretName: SecretName.MemberDatabase, query }).then(
      (result: any) => {
        console.log("Query result Member database :", result);
      }
    );
  });
});
