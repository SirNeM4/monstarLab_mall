import Home_Page from "../page_object/home_page.js";

describe('MonstarLab >> mall.cz test', () => {
  const home_page = new Home_Page();
  it('Mall.cz test, it fails when a carousel doesnt have 20 elements', () => {

    // ignore all not captured exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    
    //go to the baseURL and validate the link
    home_page.goToUrl()

    //accept all cookies
    home_page.acceptAllCookies(1)

    //Perform a Scroll and validate carousel elements
    home_page.scrollAndValidateCarouselItems(20)
  })

})