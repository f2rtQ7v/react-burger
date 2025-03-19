import { baseApiUrl } from '../../src/utils/api.ts';;

describe('burger constructor', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.intercept('GET', `${baseApiUrl}/ingredients`, {
      fixture: 'ingredients.json',
    });

    cy.get('[data-test-id^="ingredient"]').as('ingredients');
    cy.get('[data-test-id="constructor"]').as('constructor');

    cy.get('@ingredients').eq(0).as('bun');
    cy.get('@ingredients').eq(2).as('filling');
  });

  it('should add and remove ingredients', () => {
    cy.get('[data-test-id^="ingredient-placeholder"]').should('have.length', 3);

    cy.get('@bun').trigger('dragstart');
    cy.wait(500);
    cy.get('@constructor').trigger('drop');
    cy.wait(500);
    cy.get('@bun').find('.counter__num').should('have.text', 2);

    cy.get('@filling').trigger('dragstart');
    cy.wait(500);
    cy.get('@constructor').trigger('drop');
    cy.wait(500);
    cy.get('@filling').find('.counter__num').should('have.text', 1);

    cy.get('[data-test-id^="ingredient-placeholder"]').should('have.length', 0);
    cy.get('[data-test-id^="order-ingredient"]').should('have.length', 3).eq(1).find('.constructor-element__action').click();

    cy.get('[data-test-id^="ingredient-placeholder"]').should('have.length', 1);
    cy.get('[data-test-id^="order-ingredient"]').should('have.length', 2);
    cy.get('@filling').find('.counter__num').should('have.length', 0);
  });

  it('should create order', () => {
    cy.visit('http://localhost:5173/login');
    cy.intercept('POST', `${baseApiUrl}/auth/login`, {
      fixture: 'login.json',
    });
    cy.get('[data-test-id="email"]').type('aaa@bbb');
    cy.get('[data-test-id="password"]').type('ccc');
    cy.get('[data-test-id="submit"]').click();

    cy.get('@bun').trigger('dragstart');
    cy.wait(500);
    cy.get('@constructor').trigger('drop');
    cy.wait(500);

    cy.intercept('POST', `${baseApiUrl}/orders`, {
      fixture: 'order.json',
    });
    cy.get('[data-test-id="create-order"]').click();
    cy.get('[data-test-id="modal"]').should('have.length', 1);

    cy.get('[data-test-id="modal-close"]').click();
    cy.get('[data-test-id="modal"]').should('have.length', 0);
  });

});
