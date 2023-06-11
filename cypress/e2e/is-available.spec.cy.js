import { testUrl } from '../../src/constants/constants';

describe('app is available', function () {
  it('app should be available on localhost:3000', function () {
    cy.visit(testUrl);
  });
});
