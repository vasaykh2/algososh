import {
  CircleBorder,
  valueInput,
  indexInput,
  addHeadButton,
  addTailButton,
  addIndexButton,
  deleteHeadButton,
  deleteTailButton,
  deleteIndexButton,
  circleCore,
  circle,
  head,
  tail,
} from '../../src/constants/test-constants';

describe('List page', () => {
  beforeEach(() => cy.visit('list'));

  it('Should block the buttons while the inputs are empty', function () {
    cy.get(valueInput).should('have.value', '');
    cy.get(addHeadButton).should('be.disabled');
    cy.get(addTailButton).should('be.disabled');
    cy.get(addIndexButton).should('be.disabled');

    cy.get(indexInput).should('have.value', '');
    cy.get(deleteIndexButton).should('be.disabled');
  });

  it('Should render the default list correctly', function () {
    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 5);
    cy.get('@circle').each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).should('contain', `H`);
      }
      if (index === 1) {
        cy.wrap(circle).should('contain', `E`);
      }
      if (index === 2) {
        cy.wrap(circle).should('contain', `L`);
      }
      if (index === 3) {
        cy.wrap(circle).should('contain', `L`);
      }
      if (index === 4) {
        cy.wrap(circle).should('contain', `O`);
      }
    });

    cy.get(head).as('head');
    cy.get('@head').each((head, index) => {
      if (index === 0) {
        cy.wrap(head).should('contain', `head`);
      } else {
        cy.wrap(head).should('be.empty');
      }
    });

    cy.get(tail).as('tail');
    cy.get('@tail').each((tail, index) => {
      if (index === 4) {
        cy.wrap(tail).should('contain', `tail`);
      } else {
        cy.wrap(tail).should('be.empty');
      }
    });
  });

  it('Should visualize an element adding to a head correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addHeadButton).click();

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 6);
    cy.get(head)
      .eq(0)
      .within(() => {
        cy.get(circleCore)
          .should('contain', '1')
          .and('have.css', 'border', CircleBorder.Changing);
      });

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Modified);

    cy.get(head).eq(0).should('contain', 'head');

    cy.get(circleCore).eq(0).should('have.css', 'border', CircleBorder.Default);
  });

  it('Should visualize an element adding to a tail correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(addTailButton).click();

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 7);

    cy.get(tail).eq(3).should('be.empty');

    cy.get(head)
      .eq(5)
      .within(() => {
        cy.get(circleCore)
          .should('contain', '1')
          .and('have.css', 'border', CircleBorder.Changing);
      });

    cy.get('@circle').should('have.length', 6);

    cy.get(circleCore)
      .eq(5)
      .should('contain', '1')
      .and('have.css', 'border', CircleBorder.Modified);

    cy.get(tail).eq(5).should('contain', 'tail');
    cy.get(head).eq(5).should('be.empty');

    cy.get(circleCore).eq(5).should('have.css', 'border', CircleBorder.Default);
  });

  it('Should visualize an element adding by index correctly', function () {
    cy.get(valueInput).type('1');
    cy.get(indexInput).type('2');
    cy.get(addIndexButton).click();

    cy.get(head)
      .eq(0)
      .within(() => {
        cy.get(circleCore)
          .should('contain', '1')
          .and('have.css', 'border', CircleBorder.Changing);
      });

    cy.get(head).eq(0).should('contain', 'head');

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get(head)
      .eq(1)
      .within(() => {
        cy.get(circleCore)
          .should('contain', '1')
          .and('have.css', 'border', CircleBorder.Changing);
      });

    cy.get(head).eq(1).should('be.empty');

    cy.get(circleCore)
      .eq(1)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get(head)
      .eq(2)
      .within(() => {
        cy.get(circleCore)
          .should('contain', '1')
          .and('have.css', 'border', CircleBorder.Changing);
      });

    cy.get(circleCore)
      .eq(2)
      .should('contain', '1')
      .and('have.css', 'border', CircleBorder.Modified);

    cy.get(circleCore).eq(2).should('have.css', 'border', CircleBorder.Default);

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 6);
  });

  it('Should visualize an element deleting from head correctly', function () {
    cy.get(deleteHeadButton).click();

    cy.get(circle)
      .eq(0)
      .within(() => {
        cy.get('p').should('be.empty');
        cy.get(tail)
          .eq(0)
          .should('contain', 'H')
          .within(() => {
            cy.get(circleCore).and('have.css', 'border', CircleBorder.Changing);
          });
      });

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 4);

    cy.get(circle)
      .eq(0)
      .should('contain', 'E')
      .within(() => {
        cy.get(head).should('contain', 'head');
      });
  });

  it('Should visualize an element deleting from tail correctly', function () {
    cy.get(deleteTailButton).click();

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Changing);
    cy.get(circleCore)
      .eq(1)
      .should('have.css', 'border', CircleBorder.Changing);
    cy.get(circleCore)
      .eq(2)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get(circle)
      .eq(4)
      .within(() => {
        cy.get('p').should('be.empty');
        cy.get(tail)
          .eq(0)
          .should('contain', 'O')
          .within(() => {
            cy.get(circleCore).and('have.css', 'border', CircleBorder.Changing);
          });
      });

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 4);

    cy.get(circle)
      .eq(3)
      .within(() => {
        cy.get(tail).should('contain', 'tail');
      });
  });

  it('Should visualize an element deleting by index correctly', function () {
    cy.get(indexInput).type('2');
    cy.get(deleteIndexButton).click();

    cy.get(circleCore)
      .eq(0)
      .should('have.css', 'border', CircleBorder.Changing);
    cy.get(circleCore)
      .eq(1)
      .should('have.css', 'border', CircleBorder.Changing);

    cy.get(circle)
      .eq(2)
      .within(() => {
        cy.get('p').should('be.empty');
        cy.get(tail)
          .eq(0)
          .should('contain', 'L')
          .within(() => {
            cy.get(circleCore).and('have.css', 'border', CircleBorder.Changing);
          });
      });

    cy.get(circleCore).as('circle');

    cy.get('@circle').should('have.length', 4);

    cy.get(circle).eq(2).should('contain', 'L');
  });
});
