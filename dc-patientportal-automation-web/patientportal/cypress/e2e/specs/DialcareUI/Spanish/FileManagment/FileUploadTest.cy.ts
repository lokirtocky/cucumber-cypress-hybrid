import commonPage from "../../../../pages/Common/CommonPage";
import FileUploadPage from "../../../../pages/FileManagement/FileUploadPage";
import testData from "../../../../../fixtures/testData.json";
import BaseClass from "../../../../pages/BaseClass/BasePage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const loginPage = new BaseClass();
const commonPageObj = new commonPage();
const fileUploadPage = new FileUploadPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("PP: FILE MANAGEMENT TEST CASES", () => {
  beforeEach(() => {
    loginPage.loginPatient(
      testData.automation_TestUser, 
      testData.password
    );

    commonPageObj.changeLanguageDropdown("Español");
  });

  specify("SPANISH - FILE UPLOADS - Verify file upload label visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickSubirArchivoTab();
    fileUploadPage.verifySubirArchivoLabel("Subir archivo");
  });

  specify(
    "SPANISH - FILE UPLOADS - Verify File upload option are visible",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      fileUploadPage.clickSubirArchivoTab();
      // commonPageObj.clickHamburgerMenuBackBtn();
      fileUploadPage.verifyFileUploadOptionsAreVisible();
    }
  );

  specify("SPANISH - FILE UPLOADS - Verify Archivos button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickSubirArchivoTab();
    // commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.verifyUploadOptions("Archivos");
  });

  specify("SPANISH - FILE UPLOADS - Verify Fotos button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickSubirArchivoTab();
    // commonPageObj.clickHamburgerMenuBackBtn(); 
    fileUploadPage.verifyUploadOptions("Fotos");
  });

  //Skipping because functionality is no longer exist
  specify.skip(
    "SPANISH - FILE UPLOADS - Verify Usar cámara button visible",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      fileUploadPage.clickSubirArchivoTab();
      // commonPageObj.clickHamburgerMenuBackBtn(); 
      fileUploadPage.verifyUploadOptions("Usar cámara");
    }
  );

  specify("SPANISH - FILE UPLOADS - Verify choose FILE button is clickable",() => {
      const FilePath = "Files/suites.csv";
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      fileUploadPage.clickSubirArchivoTab();
      // commonPageObj.clickHamburgerMenuBackBtn(); 
      fileUploadPage.getChooseFileBtn().should("be.visible");
      fileUploadPage.getChooseFileBtn().should("contain", "Archivos");
      // fileUploadPage.getChooseFileBtn().attachFile(FilePath);
      // fileUploadPage.verifyFileUploadedMsgIsDisplayed().should("be.visible");
    }
  );

  specify("SPANISH - FILE UPLOADS - Verify user able to upload Photo", () => {
    const ImagePath = "Files/users.png";
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickSubirArchivoTab();
    // commonPageObj.clickHamburgerMenuBackBtn(); 
    fileUploadPage.getChooseFileBtn().should("be.visible");
    fileUploadPage.getFotosBtn().should("contain", "Fotos");
    // fileUploadPage.getFotosBtn().attachFile(ImagePath);
    // fileUploadPage.verifyFileUploadedMsgIsDisplayed().should("be.visible");
  });
});
