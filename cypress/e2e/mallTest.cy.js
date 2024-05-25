describe('MonstarLab >> mall.cz test', () => {
  const acceptCookies = '[class="legal-consent__button-container"]'
  const carousel_list = '[class="hooper-track"]'
  const carousel_element = '[data-testid="cms-carousel-slide"]'

  it('Mall.cz test, it fails when a carousel doesnt have 20 elements', () => {

    // ignore all not captured exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    
    //go to the url and validate the url
    cy.visit('https://www.mall.cz/', {timeout:25000})
    cy.url().should('include', 'www.mall.cz')
    
    //accept all cookies by clicking in the second button
    cy.get(acceptCookies).eq(1).click()

    /*
    gets the total height of the document to do small scrolls till the end
    */
    cy.document().then((doc) => {
      const scrollHeight = doc.documentElement.scrollHeight;
      const scrollSize = 1000; 
      let scrollPosition = 1000;

      const scroll = () => {
        if (scrollPosition < scrollHeight) {
          cy.scrollTo(0, scrollPosition);
          scrollPosition += scrollSize;
            /*
            gets the total of the carousels on the page and validate if each carousel contains 20 items.
            */
            cy.get(carousel_list,{timeout:15000}).each(($ele) => {
              cy.wrap($ele).find(carousel_element).should('have.length', 20);
            });
    
          cy.wait(500).then(scroll); 
        } else {
          cy.scrollTo('bottom'); 
        }
      };
      scroll();
    })
  })

})




