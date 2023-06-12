import {
  testUrl,
  button,
  CircleBorder,
  circleCore,
  valueInput,
} from '../../src/constants/test-constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('String page', () => {
  beforeEach(() => cy.visit(`${testUrl}/recursion`));

  it('Should block the button while the input is empty', function () {
    cy.get(valueInput).should('have.value', '');
    cy.get(button).should('be.disabled');
  });

  it('Should visualize the reverse algorithm correctly', function () {
    cy.get(valueInput).type('12345');
    cy.get(button).click();

    cy.get(circleCore).as('circle');

    cy.get('@circle')
      .should('have.length', 5)
      .each((circle, index) => {
        cy.wrap(circle)
          .should('contain', `${index + 1}`)
          .and('have.css', 'border', CircleBorder.Default);
      });

    cy.get('@circle').each((circle, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Changing);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((circle, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Modified);
      }
    });

    cy.get('@circle').each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).should('contain', '5');
      }
      if (index === 4) {
        cy.wrap(circle).should('contain', '1');
      }
    });

    cy.get('@circle').each((circle, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Changing);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((circle, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Modified);
      }
    });

    cy.get('@circle').each((circle, index) => {
      if (index === 1) {
        cy.wrap(circle).should('contain', '4');
      }
      if (index === 3) {
        cy.wrap(circle).should('contain', '2');
      }
    });

    cy.get('@circle').each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Changing);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should('have.css', 'border', CircleBorder.Modified);
      }
    });

    cy.get('@circle').each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should('contain', '3');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(valueInput).should('have.value', '12345');
    cy.get(button).should('not.be.disabled');
  });
});
