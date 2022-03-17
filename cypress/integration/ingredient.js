describe("Create ingredient", () => {
    const makeStringWithGivenLength = (length) => {
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
  
    const username = "testusername";
    const password = "testpassword";
  
  
    it("Tests ingredient creation", () => {
      cy.visit("http://localhost:8001/index.html");
  
      cy.contains("Log in").click();
  
      cy.get("[name=username]").type(username);
  
      cy.get("[name=password]").type(password);
  
      cy.get("[id=btn-login]").click().wait(1000);
  
      cy.visit("http://localhost:8001/ingredient.html");

      const ingredientName = makeStringWithGivenLength(5);
  
      cy.get("[name=name]").type(ingredientName);
      
      cy.get("[name=protein]").type("20");
      cy.get("[name=fat]").type("15");
      cy.get("[name=carbs]").type("0");
  
      cy.get("[id=btn-ok-ingredient]").click().wait(1000);
  
      cy.visit("http://localhost:8001/meals.html");
  
      cy.get("[id=btn-create-meal]").click().wait(1000);

      const mealName = makeStringWithGivenLength(5);
      const mealWeight = 100
        
      cy.get("[name=name]").type(mealName);
  
      cy.get("[name=date]").type("2022-03-15T10:00", { force: true });
  
      cy.get("[name=notes]").type("Important meal");
        
      cy.get("[id=btn-add-ingredient]").click().wait(1000);
      cy.get("[name=type]").select(ingredientName);
      cy.get("[name=weight]").type(mealWeight)
       
      cy.get("[id=btn-ok-meal]").click().wait(1000);
  
      cy.contains(mealName).click().wait(1000);
  
      cy.get("[name=name]").should("have.value", mealName);
      
    });
  });
  