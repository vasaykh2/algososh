import {  
  addButton,
  CircleBorder,
  circleCore,
  clearButton,
  deleteButton,
  head,
  index,
  valueInput,
} from '../../src/constants/test-constants';

describe('Stack page', () => {
  beforeEach(() => cy.visit('stack'));

  it('Should block the add button while the input is empty', function () {
    cy.get(valueInput).should('have.value', '');
    cy.get(addButton).should('be.disabled');
  });

  it('Should visualize an element adding in a stack correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 1);
    cy.get(circleCore)
      .eq(0)
      .should('contain', '1')
      .and('have.css', 'border', CircleBorder.Changing);
    cy.get(head).eq(0).should('contain', 'top');
    cy.get(index).eq(0).should('contain', '0');
    cy.get(circleCore).eq(0).should('have.css', 'border', CircleBorder.Default);

    cy.get(valueInput).type('2');
    cy.get(addButton).click();

    cy.get('@circle').should('have.length', 2);
    cy.get(head).eq(0).should('not.contain', 'top');
    cy.get(head).eq(1).should('contain', 'top');
    cy.get(index).eq(1).should('contain', '1');
  });

  it('Should visualize an element deleting from a stack correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');
    cy.get('@circle').should('have.length', 1);

    cy.get(deleteButton).click();

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get('@circle').should('have.length', 0);
  });

  it('Should clear a stack', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(valueInput).type('2');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');
    cy.get('@circle').should('have.length', 2);

    cy.get(clearButton).click();

    cy.get('@circle').should('have.length', 0);
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });
});
