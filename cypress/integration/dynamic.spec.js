/// <reference types="cypress" />

describe('Dynamic Perspective', () => {
  beforeEach(() => {
    //escape page error "Uncaught ReferenceError: slidesPerPage is not define"
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.visit('https://template1.booost.bg/feello/index');
  });

  it('active readers should be visible', () => {
    cy.get('[data-cy=reader-count]').should('be.visible');
  });

  it('should hide active readers bar on iphone 6 layout', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy=reader-count]').should('be.hidden');
  });

  it('should change logo link width on different viewport orientation', () => {
    cy.viewport('iphone-6');
    cy.get('a > img').invoke('outerWidth').should('not.be.above', 100);
    cy.viewport('iphone-6', 'landscape');
    cy.get('a > img').invoke('outerWidth').should('not.be.above', 120);
  });

  it('should show hamburger menu on lower resolution', () => {
    cy.get('.manu-btn').should('be.hidden');
    cy.viewport(990, 768);
    cy.get('.manu-btn').should('be.visible');
  });

  it('should open sidebar menu on hamburger click', () => {
    cy.viewport(990, 768);
    cy.get('.manu-btn').click().wait(1000);
    cy.get('.manu-list').should('be.visible');
  });

  it('should close sidebar menu on X button click', () => {
    cy.viewport(990, 768);
    cy.get('.manu-btn').click();
    cy.get('.manu-list').should('be.visible');
    cy.get('.close-btn').click().wait(1000).should('be.hidden');
  });
});
