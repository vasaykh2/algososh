import { testUrl, valueInput, button, circleCore } from '../../src/constants/test-constants';

describe('Fibonacci page', () => {
  beforeEach(() => cy.visit(`${testUrl}/fibonacci`));

  it('Should block the button while the input is empty', function () {
    cy.get(valueInput).should('have.value', '');
    cy.get(button).should('be.disabled');
  });

  it('Should visualize the algorithm correctly', function () {
    cy.get(valueInput).type('7');
    cy.get(button).click();

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 1);
    cy.get(circleCore).eq(0).should('contain', '0');

    cy.get('@circle').should('have.length', 2);
    cy.get(circleCore).eq(1).should('contain', '1');

    cy.get('@circle').should('have.length', 3);
    cy.get(circleCore).eq(2).should('contain', '1');

    cy.get('@circle').should('have.length', 4);
    cy.get(circleCore).eq(3).should('contain', '2');

    cy.get('@circle').should('have.length', 5);
    cy.get(circleCore).eq(4).should('contain', '3');

    cy.get('@circle').should('have.length', 6);
    cy.get(circleCore).eq(5).should('contain', '5');

    cy.get('@circle').should('have.length', 7);
    cy.get(circleCore).eq(6).should('contain', '8');

    cy.get('@circle').should('have.length', 8);
    cy.get(circleCore).eq(7).should('contain', '13');

    cy.get(valueInput).should('have.value', '7');
    cy.get(button).should('not.be.disabled');
  });
});
