const setups = [
    ["ola.nordmann@norge.no", "Norge", "Karl Johan 1", "Oslo", "90123456"],
    ["ola.nordmann@norge.no", "Sverige", "Karl Johan 1", "Oslo", "90123456"],
    ["kari.nordmann@norge.no", "Norge", "Karl Johan 1", "Oslo", "90123456"],
    ["kari.nordmann@norge.no", "Sverige", "Karl Johan 1", "Oslo", "90123456"],
    ["ola.nordmann@norge.no", "Norge", "Karl Johan 2", "Oslo", "90123456"],
    ["kari.nordmann@norge.no", "Norge", "Karl Johan 2", "Oslo", "90123456"],
    ["ola.nordmann@norge.no", "Norge", "Karl Johan 2", "Trondheim", "90123456"],
    ["kari.nordmann@norge.no", "Norge", "Karl Johan 2", "Trondheim", "90123456"],
    ["ola.nordmann@norge.no", "Norge", "Karl Johan 2", "Trondheim", "40123456"],
    ["kari.nordmann@norge.no", "Norge", "Karl Johan 2", "Trondheim", "40123456"],
    ["ola.nordmann@norge.no", "Sverige", "Karl Johan 2", "Oslo", "40123456"],
    ["ola.nordmann@norge.no", "Sverige", "Karl Johan 1", "Trondheim", "40123456"]
]

const makeStringWithGivenLength = (length) => {
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

describe("2-way test register page", () => {
    it("Tests all combinations", () => {

      setups.forEach((testData) => {
        cy.visit("http://localhost:8001/register.html");

        const password = makeStringWithGivenLength(7)
  
        cy.get("[name=username]").type(makeStringWithGivenLength(5));
        cy.get("[name=email]").type(testData[0]);
        cy.get("[name=password]").type(password);
        cy.get("[name=password1]").type(password);
        cy.get("[name=country]").type(testData[1]);
        cy.get("[name=street_address]").type(testData[2]);
        cy.get("[name=city]").type(testData[3]);
        cy.get("[name=phone_number]").type(testData[4]);
        cy.get("[id=btn-create-account]").click().wait(1000);

        cy.contains("View Workouts");
      })
      
    });
  });
  