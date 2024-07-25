class fileUploadPage {
  private fileUploadBtn = "ion-content ion-list ion-item:nth-child(7)";
  private fileUploadLbl =
    "app-menu-items ion-menu ion-item:nth-child(7) ion-label";
  private previouslyUploadedDocumentsLbl =
    "app-file-listing ion-card-title ion-label";
  private noDocumentYetLbl =
    ".font-16.hydrated.md.sc-ion-label-md-h.sc-ion-label-md-s.text-secondary";
  private chooseFileBtn =
    "ion-card-content ion-item:nth-child(2) ion-label";
  private fileAndPhotoLbl =
    "app-choose-file .card-content-md .item-lines-default.hydrated:nth-of-type(1)";
  private filesBtn =
    '//ion-content[@id="layout"]/app-choose-file/ion-content/ion-card/ion-card-content/ion-item[2]';
  private phtotosBtn =
    "app-file-upload-options ion-item:nth-child(3) ion-label";
  private cameraBtn = "//ion-label[contains(text(),'Use Camera')]/.";
  private subirArchivoTab =
    "app-menu-items ion-menu ion-item:nth-child(7) ion-label";
  private subirArchivoLabel =
    "app-menu-items ion-menu ion-item:nth-child(7) ion-label";
  private fileUploadOptions = "app-file-upload-options ion-item";
  private fotosBtn = "ion-card-content ion-item:nth-child(3) ion-label"

  clickFileUploadBtn() {
    cy.get(this.fileUploadBtn).click();
  }

  getFileUploadLblTxt() {
    return cy.get(this.fileUploadLbl);
  }

  getPreviouslyUploadedDocumentsLblTxt() {
    return cy.get(this.previouslyUploadedDocumentsLbl);
  }

  getNoDocumentYetLblTxt() {
    return cy.get(this.noDocumentYetLbl);
  }

  clickChooseFileBtn() {
    cy.get(this.chooseFileBtn).click({ force: true });
  }

  getChooseFileBtn() {
    return cy.get(this.chooseFileBtn);
  }

  getFotosBtn(){
    return cy.get(this.fotosBtn);
  }

   uploadFile(filePath: string): void {
    cy.get(this.chooseFileBtn).eq(0).selectFile(filePath, { action: 'drag-drop' });
  }

  getFileAndPhotoLblTxt() {
    return cy.get(this.fileAndPhotoLbl);
  }

  clickFilesBtn() {
    cy.xpath(this.filesBtn).click();
  }

  getFilesBtn() {
    return cy.xpath(this.filesBtn);
  }

  clickPhtotosBtn() {
    return cy.get(this.phtotosBtn);
  }

  getPhtotosBtn() {
    return cy.get(this.phtotosBtn);
  }

  clickCameraBtn() {
    cy.get(this.cameraBtn).click();
  }

  getCameraBtn() {
    return cy.xpath(this.cameraBtn);
  }

  clickSubirArchivoTab() {
    cy.get(this.subirArchivoTab).click();
  }

  verifySubirArchivoLabel(labelText: string) {
    cy.get(this.subirArchivoLabel).should("contain", labelText);
  }

  verifyUploadOptions(option: string) {
    cy.contains(option).should("be.visible");
  }

  verifyFileUploadedMsgIsDisplayed(fileUploMsg: string) {
    return cy.contains(fileUploMsg);
  }

  public verifyFileUploadOptionsAreVisible(): void {
    const fileUploadOptions = [" Archivos y fotos ", "Archivos", "Fotos"];

    fileUploadOptions.forEach((option) => {
      cy.contains(this.fileUploadOptions, option).should("be.visible");
    });
  }
}

export default fileUploadPage;
