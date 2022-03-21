describe('Set up test users', () => {

    const username = 'testusername'
    const password = 'testpassword'
    const username2 = 'testusername2'
    const password2 = 'testpaassword2'

    beforeEach(() => {
        cy.visit("http://localhost:8001/register.html").wait(1000);
      });
    
      it("Create first user", () => {
        cy.get("[name=username]").type(username);
    
        cy.get("[name=password]").type(password);
    
        cy.get("[name=password1]").type(password);
    
        cy.get("[id=btn-create-account]").click().wait(1000);
      });

      it("Create second user", () => {
        cy.get("[name=username]").type(username2);
    
        cy.get("[name=password]").type(password2);
    
        cy.get("[name=password1]").type(password2);
    
        cy.get("[id=btn-create-account]").click().wait(1000);
      });
})