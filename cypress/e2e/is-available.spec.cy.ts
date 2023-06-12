describe('App is available', function () {
  it('App should be available on localhost:3000', function () {
    cy.visit('/');
  });
});
