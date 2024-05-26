const PO_acceptCookies = '[class="legal-consent__button-container"]'
const PO_carousel_list = '[class="hooper-track"]'
const PO_carousel_element = '[data-testid="cms-carousel-slide"]'

export default class home_page {
    /* 
    Go to the url and validate the url 
    */
    goToUrl(){    
        //The url is configured in the cypress.config.js file
        cy.visit('/', {timeout:25000})
        cy.url().should('include', 'www.mall.cz')
    }

    /* 
    Accept all cookies by clicking in the second button 
    */
    acceptAllCookies(number){
        cy.get(PO_acceptCookies).eq(number).click()
    }

    /*
    Gets all the carousels on the page and validate if each carousel contains x number of items
    */
    countCarouselElements(elements){
        cy.get(PO_carousel_list,{timeout:15000}).each(($ele) => {
            cy.wrap($ele).find(PO_carousel_element).should('have.length', elements);
        });          
    }

    /*
    Makes small scrolls to the end of the document
    and also calls the count carousel elements funcion
    */
    scrollAndValidateCarouselItems(elements){
        cy.document().then((doc) => {
            const scrollHeight = doc.documentElement.scrollHeight;
            const scrollSize = 1000; 
            let scrollPosition = 1000;

            const scroll = () => {
            if (scrollPosition < scrollHeight) {
                cy.scrollTo(0, scrollPosition);
                scrollPosition += scrollSize;
                // Ones the scroll is performed, the function to validate the elements is called
                this.countCarouselElements(elements)    
                cy.wait(500).then(scroll); 
            } else {
                cy.scrollTo('bottom'); 
            }
            };
            scroll();
        })
    }       
}
