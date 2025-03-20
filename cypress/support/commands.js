Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, target) => {
  cy.wrap(subject).trigger('dragstart');
  cy.wait(500);
  cy.get(target).trigger('drop');
  cy.wait(500);
});
