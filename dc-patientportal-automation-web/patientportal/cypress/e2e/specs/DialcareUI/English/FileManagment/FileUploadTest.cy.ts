import FileUploadPage from "../../../../pages/FileManagement/FileUploadPage";
import testData from "../../../../../fixtures/testData.json";
import BaseClass from "../../../../pages/BaseClass/BasePage";
import commonPage from "../../../../pages/Common/CommonPage";
import requestVirtualVisitPage from "../../../../pages/RequestVirtualVisit/RequestVirtualVisitPage";

const loginPage = new BaseClass();
const fileUploadPage = new FileUploadPage();
const commonPageObj = new commonPage();
const requestVirtualVisitPageObj = new requestVirtualVisitPage();

context("PP: FILE MANAGEMENT TEST CASES", () => {
  beforeEach(() => {
    loginPage.loginPatient(
      testData.automation_TestUser,
      testData.password
    );
  });

  specify("FILE UPLOAD - Verify file upload label visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    fileUploadPage.getFileUploadLblTxt().should("contain", "File Upload");
  });

  specify("FILE UPLOAD - Verify user navigates to file upload page", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getFileUploadLblTxt().should("be.visible");
    fileUploadPage.getFileUploadLblTxt().should("contain", "File Upload");
  });

  specify(
    "FILE UPLOAD - Verify Previously Uploaded Documents label visible",
    () => {
      requestVirtualVisitPageObj.getHamburgerMenuLogo();
      fileUploadPage.clickFileUploadBtn();
      fileUploadPage
        .getPreviouslyUploadedDocumentsLblTxt()
        .should("be.visible");
      fileUploadPage
        .getPreviouslyUploadedDocumentsLblTxt()
        .should("contain", "Previously Uploaded Documents");
    }
  );

  // skipped tests because functionality is no longer on UI
  specify.skip("FILE UPLOAD - Verify No document yet label is visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getNoDocumentYetLblTxt().should("be.visible");
    fileUploadPage
      .getNoDocumentYetLblTxt()
      .should("contain", "No document yet");
  });

  specify("FILE UPLOAD - Verify FILEs button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getChooseFileBtn().should("be.visible");
    fileUploadPage.getChooseFileBtn().should("contain", "Files");
  });

  specify("FILE UPLOAD - Verify FILEs button is clickable", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getChooseFileBtn().should("be.visible");
    fileUploadPage.getChooseFileBtn().should("contain", "Files");
  });

  specify.skip("FILE UPLOAD - Verify UPLOAD A FILE button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getChooseFileBtn().should("be.visible");
    fileUploadPage.getChooseFileBtn().should("contain", "Upload a file");
  });

  specify("FILE UPLOAD - Verify UPLOAD PHOTO button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getPhtotosBtn().should("be.visible");
    fileUploadPage.getPhtotosBtn().should("contain", "Photos");
  });

  // Skipping the test because functionality doesn't exist on Desktop
  specify.skip("FILE UPLOAD - Verify CHOOSE A CAMERA button visible", () => {
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getCameraBtn().should("be.visible");
    fileUploadPage.getCameraBtn().should("contain", "Use Camera");
  });

  // File upload doesn't have input attribute so causing failure in script to upload a file.
  specify('FILE UPLOAD - Verify file should be uploaded',()=>{
    const filePath = "cypress/fixtures/Files/TestingFileUploads.pdf";
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getChooseFileBtn().should("be.visible");
    fileUploadPage.getChooseFileBtn().should("contain", "Files");
    cy.readFile(filePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        fileUploadPage.getChooseFileBtn().attachFile({
          fileContent,
          filePath,
          encoding: 'binary',
          lastModified: new Date().getTime(),
        },
        { 
          subjectType: 'drag-n-drop', 
          force: true
        })
        .trigger('change')
      })
  });

  specify("FILE UPLOAD - Verify user able to upload Photos", () => {
    const ImagePath = "Files/users.png";
    requestVirtualVisitPageObj.getHamburgerMenuLogo();
    fileUploadPage.clickFileUploadBtn();
    commonPageObj.clickHamburgerMenuBackBtn();
    fileUploadPage.getPhtotosBtn().should("be.visible");
    fileUploadPage.getPhtotosBtn().should("contain", "Photos");
    fileUploadPage.clickPhtotosBtn().attachFile(ImagePath);
    // fileUploadPage.verifyFileUploadedMsgIsDisplayed('File uploaded successfully').should('be.visible');
  });
});
