import {  
  addButton,
  CircleBorder,
  circleCore,
  clearButton,
  deleteButton,
  head,
  tail,
  valueInput,
} from '../../src/constants/test-constants';

describe('Queue page', () => {
  beforeEach(() => cy.visit('queue'));

  it('Should block add button while input is empty', function () {
    cy.get(valueInput).should('have.value', '');
    cy.get(addButton).should('be.disabled');
  });

  it('Should visualize an element adding in a queue correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');

    cy.get(circleCore)
      .eq(0)
      .should('contain', '1')
      .and('have.css', 'border', CircleBorder.Changing);
    cy.get(head).eq(0).should('contain', 'head');
    cy.get(tail).eq(0).should('contain', 'tail');
    cy.get(circleCore).eq(0).should('have.css', 'border', CircleBorder.Default);

    cy.get(valueInput).type('2');
    cy.get(addButton).click();

    cy.get(head).eq(0).should('contain', 'head');
    cy.get(tail).eq(0).should('contain', '');

    cy.get(circleCore)
      .eq(1)
      .should('contain', '2')
      .and('have.css', 'border', CircleBorder.Changing);
    cy.get(head).eq(1).should('contain', '');
    cy.get(tail).eq(1).should('contain', 'tail');
    cy.get(circleCore).eq(1).should('have.css', 'border', CircleBorder.Default);
  });

  it('Should visualize an element deleting from a queue correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(valueInput).type('2');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');

    cy.get(deleteButton).click();

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get(circleCore)
      .eq(0)
      .should('not.contain', '1')
      .and('have.css', 'border', CircleBorder.Default);

    cy.get(head).eq(0).should('not.contain', 'head');

    cy.get(head).eq(1).should('contain', 'head');
  });

  it('Should clear a queue', function () {
    cy.get(valueInput).type('1');
    cy.get(addButton).click();

    cy.get(valueInput).type('2');
    cy.get(addButton).click();

    cy.get(circleCore).as('circle');
    cy.get('@circle').each((circle, index) => {
      if (index === 0 || index === 1) {
        cy.wrap(circle).should('contain', `${index + 1}`);
      } else {
        cy.wrap(circle).within(() => {
          cy.get('p').should('be.empty');
        });
      }
    });

    cy.get(clearButton).click();

    cy.get('@circle').each((circle, index) => {
      cy.wrap(circle).within(() => {
        cy.get('p').should('be.empty');
      });
    });

    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });
});
