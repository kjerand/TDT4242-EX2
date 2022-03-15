const { beforeEach } = require("mocha");

describe("Register boundry test", () => {

  const email = "testemail@test.com";
  const password = "testpassword";
  const password1 = "testpassword1";
  const phone_number = "90909090";
  const country = "Norway";
  const city = "Kopervik";
  const address = "Stokkastrand";

  const createUsername = () => {
    return new Date().getTime().toString();
  };

  const makeStringWithGivenLength = (length) => {
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  beforeEach(() => {
    cy.visit("http://localhost:8001/register.html").wait(1000);
  });

  it("Creates a user", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=email]").type(email);

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(phone_number);

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });

  it("Tests blank username", () => {
    cy.get("[name=username]").type(" ");

    cy.get("[name=email]").type(email);

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(phone_number);

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests username over 150 in length", () => {
    cy.get("[name=username]").type(makeStringWithGivenLength(151));

    cy.get("[name=email]").type(email);

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(phone_number);

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests username under 150 in length", () => {
    cy.get("[name=username]").type(makeStringWithGivenLength(149));

    cy.get("[name=email]").type(email);

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(phone_number);

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });

  it("Tests wrong format email", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=email]").type("wrongemailformat.com");

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(phone_number);

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests phone number over 51 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=email]").type(email);

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(makeStringWithGivenLength(51));

    cy.get("[name=country]").type(country);

    cy.get("[name=city]").type(city);

    cy.get("[name=street_address]").type(address);

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests phone number under 50 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=phone_number]").type(makeStringWithGivenLength(49));

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });

  it("Tests country over 51 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=country]").type(makeStringWithGivenLength(51));

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests country under 50 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=country]").type(makeStringWithGivenLength(49));

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });

  it("Tests city over 51 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=city]").type(makeStringWithGivenLength(51));

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests city under 50 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=city]").type(makeStringWithGivenLength(49));

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });

  it("Tests street address over 51 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=street_address]").type(makeStringWithGivenLength(51));

    cy.get("[id=btn-create-account]").click();

    cy.get(".alert").should("be.visible");
  });

  it("Tests street address under 50 in length", () => {
    cy.get("[name=username]").type(createUsername());

    cy.get("[name=password]").type(password);

    cy.get("[name=password1]").type(password1);

    cy.get("[name=street_address]").type(makeStringWithGivenLength(49));

    cy.get("[id=btn-create-account]").click().wait(1000);

    // successful if it contains that text
    cy.contains("View Workouts");
  });
});
