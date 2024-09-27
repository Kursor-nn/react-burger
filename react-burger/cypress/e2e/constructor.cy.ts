import "@4tw/cypress-drag-drop";

/**
 * Написаны Cypress-тесты для страницы «Конструктор»:
 * [v] перетаскивание ингредиента в конструктор,
 * [v] открытие модального окна с описанием ингредиента,
 * [v] отображение в модальном окне данных ингредиента,
 * [v] открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»,
 * [v] закрытие модальных окон при клике на кнопку закрытия.
 * [v] Все тесты проходят и не падают.
 */

const TIMEOUT: number = 30_000;
const TEST_LOGIN = "a.p.kozachuk@yandex.ru";
const TEST_PASSWORD = "testtest";

const PRODUCT_LINK_SELECTOR = "[class^=product_link__]";

const BUN_0_SELECTOR = "[data-qa-id='bun-0']";
const SAUCE_0_SELECTOR = "[data-qa-id='sauce-0']";
const SAUCE_1_SELECTOR = "[data-qa-id='sauce-1']";
const MAIN_0_SELECTOR = "[data-qa-id='main-0']";
const MAIN_1_SELECTOR = "[data-qa-id='main-1']";
const BUN_CONSTRUCTOR_SELECTOR = "[data-qa-id='bun-constructor']";
const MODAL_CONTAINER_SELECTOR = "[class^=modal_container__]";
const CONSTRUCTOR_INGREDIENT_SELECTOR = "*[class^='constructor_ingredient__']";
const OPEN_PRIVATE_PAGE_SELECTOR = "[data-qa-id='open-private-space']";
const INGREDIENT_DETAILS_ITEM_SELECTOR = "[class^='ingredient-details_item__']";

describe('service is available', function () {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should contains 'Соберите бургер' topic", () => {
        cy.get('[data-qa-id="topic-build-burger"]').contains("Соберите бургер")
    });

    it("open ingredient card", () => {
        cy.get(PRODUCT_LINK_SELECTOR, {timeout: TIMEOUT}).first().as("card");
        cy.get("@card").click();
        cy.get(MODAL_CONTAINER_SELECTOR).as("modal");
        cy.get("@modal").find("h2").contains("Детали ингредиента");

        cy.get("@modal").find(INGREDIENT_DETAILS_ITEM_SELECTOR).first().contains("Калории,ккал");
        cy.get("@modal").find(INGREDIENT_DETAILS_ITEM_SELECTOR).next().contains("Белки, г");
        cy.get("@modal").find(INGREDIENT_DETAILS_ITEM_SELECTOR).next().contains("Жиры, г");
        cy.get("@modal").find(INGREDIENT_DETAILS_ITEM_SELECTOR).next().contains("Углеводы, г");
    });

    it("check order creation without access token", () => {
        cy.get(BUN_0_SELECTOR).as("bunCard");
        cy.get(SAUCE_0_SELECTOR).as("sauceCard0");
        cy.get(SAUCE_1_SELECTOR).as("sauceCard1");
        cy.get(MAIN_0_SELECTOR).as("mainCard0");
        cy.get(MAIN_1_SELECTOR).as("mainCard1");
        cy.get(BUN_CONSTRUCTOR_SELECTOR).as("container");

        cy.get("@bunCard").drag("@container");
        cy.get("@sauceCard1").drag("@container");
        cy.get("@mainCard0").drag("@container");

        cy.get('[data-qa-id="make-order"]').contains("Оформить заказ").click();

        cy.get('input[type="email"]')
            .type(TEST_LOGIN)
            .should("have.value", TEST_LOGIN);

        cy.get('input[type="password"]').type(TEST_PASSWORD).should("have.value", TEST_PASSWORD);

        cy.get("form").find("button").contains("Войти").as("loginButton");
        cy.get("@loginButton").click();

        cy.get(MODAL_CONTAINER_SELECTOR).as("modal");
        cy.get("@modal").find("p").contains("Ваш заказ начали готовить");
    });


    it("drag and drop items in constructor", () => {
        cy.get(OPEN_PRIVATE_PAGE_SELECTOR).as("private-page");
        cy.get(BUN_0_SELECTOR).as("bunCard");
        cy.get(SAUCE_0_SELECTOR).as("sauceCard0");
        cy.get(SAUCE_1_SELECTOR).as("sauceCard1");
        cy.get(MAIN_0_SELECTOR).as("mainCard0");
        cy.get(MAIN_1_SELECTOR).as("mainCard1");
        cy.get(BUN_CONSTRUCTOR_SELECTOR).as("container");

        cy.get("@bunCard", {timeout: TIMEOUT}).drag("@container");
        cy.get("@sauceCard1", {timeout: TIMEOUT}).drag("@container");
        cy.get("@mainCard0", {timeout: TIMEOUT}).drag("@container");

        cy.get(CONSTRUCTOR_INGREDIENT_SELECTOR).find('div').should('have.length', 2)
    });


    it("check removing item from constructor", () => {
        cy.get(OPEN_PRIVATE_PAGE_SELECTOR).as("private-page");
        cy.get(BUN_0_SELECTOR).as("bunCard");
        cy.get(SAUCE_0_SELECTOR).as("sauceCard0");
        cy.get(SAUCE_1_SELECTOR).as("sauceCard1");
        cy.get(MAIN_0_SELECTOR).as("mainCard0");
        cy.get(MAIN_1_SELECTOR).as("mainCard1");
        cy.get(BUN_CONSTRUCTOR_SELECTOR).as("container");

        cy.get("@bunCard", {timeout: TIMEOUT}).drag("@container");
        cy.get("@sauceCard1", {timeout: TIMEOUT}).drag("@container");
        cy.get("@mainCard0", {timeout: TIMEOUT}).drag("@container");

        cy.get(CONSTRUCTOR_INGREDIENT_SELECTOR).find('div').should('have.length', 2)

        cy.get("@container").find("[class^='constructor-element__action']").first().click();

        cy.get(CONSTRUCTOR_INGREDIENT_SELECTOR).find('div').should('have.length', 1)
    });

    it("close modal ingredient card", () => {
        cy.get(PRODUCT_LINK_SELECTOR).first().as("card");
        cy.get("@card").click();
        cy.get(MODAL_CONTAINER_SELECTOR).as("modal");
        cy.get("@modal").find("h2").contains("Детали ингредиента");
        cy.get("@modal").find("svg").last().click();
    });
});