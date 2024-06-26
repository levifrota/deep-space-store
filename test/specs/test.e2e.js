/* eslint-disable no-undef */
const { expect, browser, $ } = require("@wdio/globals");
const setUrl = "http://localhost:3000/OFFER_CODE";
require("@testing-library/vue");

describe("E2E test", () => {
  before(() => {
    // Navigate to the base URL once before all tests
    browser.url(setUrl);
  });

  it("should display offer items", async () => {
    const offerTitle = $("p=Fone de Ouvido Bluetooth QCY");

    offerTitle.waitForExist;

    expect(offerTitle).toBeDisplayed();
  })

  it("should allow submitting the form with valid data", async () => {
    // Locate the text fields for the user's name and phone
    const nameInput = $("aria/Nome");
    const phoneInput = $("aria/Telefone");

    nameInput.waitForExist;
    phoneInput.waitForExist;

    // Enter valid data into the text fields
    await nameInput.setValue("Teste");
    await phoneInput.setValue("12345678901");

    nameInput.waitForValue("Teste");
    phoneInput.waitForValue("12345678901");

    // Click the submit button
    const submitButton = $("button=Ir para Endereço de Entrega");
    await submitButton.click();

    // Check if the form submission was successful
    const addressField = $("aria/Endereço");
    addressField.waitForExist;
    expect(addressField).toBeEnabled();
  });

  it("should auto-fill address fields when a valid zip code is entered", async () => {
    // Locate the zip code text field
    const zipCodeInput = $("aria/CEP");

    // Enter a valid zip code
    await zipCodeInput.setValue("62020390");

    // Check if the street, neighborhood, city, and state fields are filled
    const streetField = $("aria/Rua");
    const neighborhoodField = $("aria/Bairro");
    const cityField = $("aria/Cidade");
    const stateField = $("aria/Estado");

    expect(streetField).toHaveValue("Rua Antônio Félix Ibiapina");
    expect(neighborhoodField).toHaveValue("Alto do Cristo");
    expect(cityField).toHaveValue("Sobral");
    expect(stateField).toHaveValue("CE");
  });

  it("should submit deliver form and enable payment form", async () => {
    // Click the submit button
    const submitButton = $("button=Ir para Pagamento");
    await submitButton.click();

    // Check if the form submission was successful
    const addressField = $("aria/Endereço");
    addressField.waitForExist;
    expect(addressField).toBeEnabled();
  });

  it("should validate CPF and enable payment options", async () => {
    // Locate the CPF text field and enter a valid CPF
    const cpfInput = $("aria/CPF");

    await cpfInput.setValue("12345678901");
    const paymentOption = $("aria/Cartão de Crédito");
    await expect(paymentOption).toBeEnabled();
  });

  it("should display credit card data", async () => {
    // Select credit card option
    const paymentOption = $("aria/Cartão de Crédito");
    await paymentOption.click();
    // Checks if the payment title is displayed
    const creditCardTitle = $("aria/Insira os dados do cartão");
    await expect(creditCardTitle).toBeDisplayed();
  });

  it("should update url and display PIX code when its selected", async () => {
    // Select a different payment option
    const otherPaymentOption = $("aria/Pix");
    await otherPaymentOption.click();

    //When it clicks the button, it must be redirected to the success page
    const finishOrder = $("button=Finalizar Pedido");
    await finishOrder.click();

    await browser.pause(3000);
    const currentUrl = await browser.getUrl();

    // Check if the additional fields for the selected payment option are displayed
    const pixFields = $("aria/Código Copia e Cola");

    expect(currentUrl).toContain("/compra-confirmada");
    await expect(pixFields).toBeDisplayed();
  });

  it("should display confirmation order", async () => {
    // The success page must display the order details
    const orderDetails = $("aria/Detalhes do pedido:");
    orderDetails.waitForExist;

    const orderItems = $("aria/Itens:");
    orderItems.waitForExist;

    await expect(orderDetails).toBeDisplayed();
    await expect(orderItems).toBeDisplayed();
  });
});
