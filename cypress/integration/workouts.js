describe("Create workout", () => {
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

  const exerciseName = makeStringWithGivenLength(5);
  const exerciseDescription = "To the ground";
  const exerciseUnit = "Reps";
  const exerciseInfo = "Weight";
  const exerciseDuration = 1;
  const exerciseCalories = 1;

  const workoutName = makeStringWithGivenLength(5);
  const workoutDate = "2022-03-15T10:00";
  const workoutNotes = "note";
  const workoutSets = 4;
  const workoutNumber = 6;
  const workoutInfo = 50;

  before(() => {
    cy.visit("http://localhost:8001/index.html");

    cy.contains("Log in").click();

    cy.get("[name=username]").type(username+15);

    cy.get("[name=password]").type(password);

    cy.get("[id=btn-login]").click().wait(1000);
  });

  it("Tests weight input", () => {
    cy.visit("http://localhost:8001/exercise.html");

    cy.get("[name=name]").type(exerciseName);

    cy.get("[name=description]").type(exerciseDescription);

    cy.get("[name=unit]").type(exerciseUnit);

    cy.get("[name=info]").type(exerciseInfo);

    cy.get("[name=duration]").type(exerciseDuration);

    cy.get("[name=calories]").type(exerciseCalories);

    cy.get("[id=btn-ok-exercise]").click().wait(1000);

    cy.visit("http://localhost:8001/workouts.html");

    cy.get("[id=btn-create-workout]").click().wait(1000);

    cy.get("[name=name]").type(workoutName);

    cy.get("[name=date]").type(workoutDate, { force: true });

    cy.get("[name=notes]").type(workoutNotes);

    cy.get("[name=type]").select(exerciseName);

    cy.get("[name=sets]").type(workoutSets);

    cy.get("[name=number]").type(workoutNumber);

    cy.get("[name=info]").type(workoutInfo);

    cy.get("[id=btn-ok-workout]").click().wait(1000);

    cy.contains(workoutName).click().wait(1000);

    cy.get("[name=info]").should("have.value", workoutInfo);
  });
});
