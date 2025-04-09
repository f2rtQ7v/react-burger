import { baseApiUrl } from '../../src/utils/api.ts';;

const selectors = {
  burgerConstructor: '[data-test-id="constructor"]',
  ingredientsList: '[data-test-id^="ingredient-item"]',
  ingredientDetails: '[data-test-id="ingredient-details"]',
  ingredientName: '[data-test-id^="ingredient-name"]',
  ingredientPlaceholder: '[data-test-id^="ingredient-placeholder"]',
  orderIngredient: '[data-test-id^="order-ingredient"]',
  removeIngredient: '.constructor-element__action',
  counter: '.counter__num',
  inputEmail: '[data-test-id="email"]',
  inputPassword: '[data-test-id="password"]',
  buttonSubmit: '[data-test-id="submit"]',
  buttonCreateOrder: '[data-test-id="create-order"]',
  modal: '[data-test-id="modal"]',
  modalTitle: '[data-test-id="modal-title"]',
  modalClose: '[data-test-id="modal-close"]',
};

describe('burger constructor', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', `${baseApiUrl}/ingredients`, {
      fixture: 'ingredients.json',
    });

    cy.get(selectors.ingredientsList).as('ingredients');
    cy.get(selectors.burgerConstructor).as('constructor');

    cy.get('@ingredients').eq(0).as('bun');
    cy.get('@ingredients').eq(2).as('filling');
  });

  it('should show ingredient details', () => {
    let ingredientName = null;

    cy.get('@bun').find(selectors.ingredientName).then($el => {
      ingredientName = $el.text();
    });

    cy.get('@bun').click();
    cy.get(selectors.modal).should('exist');

    cy.get(selectors.modalTitle).should('have.text', 'Детали ингредиента');
    cy.get(selectors.ingredientDetails).find('h2').should($el => {
      expect($el.text()).to.equal(ingredientName);
    });

    cy.get('body').type('{esc}');
    cy.get(selectors.modal).should('not.exist');
  });

  it('should add and remove ingredients', () => {
    cy.get(selectors.ingredientPlaceholder).should('have.length', 3);

    cy.get('@bun').dragTo('@constructor');
    cy.get('@bun').find(selectors.counter).should('have.text', 2);

    cy.get('@filling').dragTo('@constructor');
    cy.get('@filling').find(selectors.counter).should('have.text', 1);

    cy.get(selectors.ingredientPlaceholder).should('have.length', 0);
    cy.get(selectors.orderIngredient).should('have.length', 3).eq(1).find(selectors.removeIngredient).click();

    cy.get(selectors.ingredientPlaceholder).should('have.length', 1);
    cy.get(selectors.orderIngredient).should('have.length', 2);
    cy.get('@filling').find(selectors.counter).should('have.length', 0);
  });

  it('should create order', () => {
    cy.visit('/login');
    cy.intercept('POST', `${baseApiUrl}/auth/login`, {
      fixture: 'login.json',
    });
    cy.get(selectors.inputEmail).type('aaa@bbb');
    cy.get(selectors.inputPassword).type('ccc');
    cy.get(selectors.buttonSubmit).click();

    cy.get('@bun').dragTo('@constructor');

    cy.intercept('POST', `${baseApiUrl}/orders`, {
      fixture: 'order.json',
    });
    cy.get(selectors.buttonCreateOrder).click();
    cy.get(selectors.modal).should('exist');

    cy.get(selectors.modalClose).click();
    cy.get(selectors.modal).should('not.exist');
  });

});
