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

describe('service is available', function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should contains 'Соберите бургер' topic", () => {
        cy.get('[data-qa-id="topic-build-burger"]').contains("Соберите бургер")
    });

    it("open ingredient card", () => {
        cy.get("[class^=product_link__]").first().as("card");
        cy.get("@card").click();
        cy.get("[class^=modal_container__]").as("modal");
        cy.get("@modal").find("h2").contains("Детали ингредиента");

        cy.get("@modal").find("[class^='ingredient-details_item__']").first().contains("Калории,ккал");
        cy.get("@modal").find("[class^='ingredient-details_item__']").next().contains("Белки, г");
        cy.get("@modal").find("[class^='ingredient-details_item__']").next().contains("Жиры, г");
        cy.get("@modal").find("[class^='ingredient-details_item__']").next().contains("Углеводы, г");
    });

    it("check order creation without access token", () => {
        cy.get("[data-qa-id='bun-0']").as("bunCard");
        cy.get("[data-qa-id='sauce-0']").as("sauceCard0");
        cy.get("[data-qa-id='sauce-1']").as("sauceCard1");
        cy.get("[data-qa-id='main-0']").as("mainCard0");
        cy.get("[data-qa-id='main-1']").as("mainCard1");
        cy.get("[data-qa-id='bun-constructor']").as("container");

        cy.get("@bunCard").drag("@container");
        cy.get("@sauceCard1").drag("@container");
        cy.get("@mainCard0").drag("@container");

        cy.get('[data-qa-id="make-order"]').contains("Оформить заказ").click();

        cy.get('input[type="email"]')
            .type("a.p.kozachuk@yandex.ru")
            .should("have.value", "a.p.kozachuk@yandex.ru");

        cy.get('input[type="password"]').type("testtest").should("have.value", "testtest");

        cy.get("form").find("button").contains("Войти").as("loginButton");
        cy.get("@loginButton").click();

        cy.get("[class^=modal_container__]").as("modal");
        cy.get("@modal").find("p").contains("Ваш заказ начали готовить");
    });


    it("drag and drop items in constructor", () => {
        cy.get("[data-qa-id='open-private-space']").as("private-page");
        cy.get("[data-qa-id='bun-0']").as("bunCard");
        cy.get("[data-qa-id='sauce-0']").as("sauceCard0");
        cy.get("[data-qa-id='sauce-1']").as("sauceCard1");
        cy.get("[data-qa-id='main-0']").as("mainCard0");
        cy.get("[data-qa-id='main-1']").as("mainCard1");
        cy.get("[data-qa-id='bun-constructor']").as("container");

        cy.get("@bunCard", {timeout: 30_000}).drag("@container");
        cy.get("@sauceCard1", {timeout: 30_000}).drag("@container");
        cy.get("@mainCard0", {timeout: 30_000}).drag("@container");

        cy.get("*[class^='constructor_ingredient__']").find('div').should('have.length', 2)
    });


    it("check removing item from constructor", () => {
        cy.get("[data-qa-id='open-private-space']").as("private-page");
        cy.get("[data-qa-id='bun-0']").as("bunCard");
        cy.get("[data-qa-id='sauce-0']").as("sauceCard0");
        cy.get("[data-qa-id='sauce-1']").as("sauceCard1");
        cy.get("[data-qa-id='main-0']").as("mainCard0");
        cy.get("[data-qa-id='main-1']").as("mainCard1");
        cy.get("[data-qa-id='bun-constructor']").as("container");

        cy.get("@bunCard", {timeout: 30_000}).drag("@container");
        cy.get("@sauceCard1", {timeout: 30_000}).drag("@container");
        cy.get("@mainCard0", {timeout: 30_000}).drag("@container");

        cy.get("*[class^='constructor_ingredient__']").find('div').should('have.length', 2)

        cy.get("@container").find("[class^='constructor-element__action']").first().click();

        cy.get("*[class^='constructor_ingredient__']").find('div').should('have.length', 1)
    });

    it("close modal ingredient card", () => {
        cy.get("[class^=product_link__]").first().as("card");
        cy.get("@card").click();
        cy.get("[class^=modal_container__]").as("modal");
        cy.get("@modal").find("h2").contains("Детали ингредиента");
        cy.get("@modal").find("svg").last().click();
    });
});