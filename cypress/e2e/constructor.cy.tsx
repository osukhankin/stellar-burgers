/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Перехватываем все запросы к бэкенду
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' });

    cy.visit('/');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]').first().find('button').click();
      cy.get('[data-testid="burger-constructor"]').contains('Краторная булка N-200i');
    });

    it('должен добавить начинку в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]').eq(1).find('button').click();
      cy.get('[data-testid="burger-constructor"]').contains('Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открыть модальное окно при клике на ингредиент', () => {
      cy.get('[data-testid="ingredient-item"]').first().find('a').click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal"]').contains('Краторная булка N-200i');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.get('[data-testid="ingredient-item"]').first().find('a').click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal-close-button"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.get('[data-testid="ingredient-item"]').first().find('a').click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal-overlay"]').click({ force: true });
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/orders', { fixture: 'order.json' });

      // Подставляем фейковые токены авторизации
      cy.setCookie('accessToken', 'fake-access-token');
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', 'fake-refresh-token');
        }
      });
    });

    afterEach(() => {
      // Очищаем токены после теста
      cy.clearCookie('accessToken');
      cy.clearLocalStorage('refreshToken');
    });

    it('должен оформить заказ, показать номер и очистить конструктор', () => {
      // Собираем бургер
      cy.get('[data-testid="ingredient-item"]').first().find('button').click();
      cy.get('[data-testid="ingredient-item"]').eq(1).find('button').click();

      // Оформляем заказ
      cy.contains('button', 'Оформить заказ').click();

      // Проверяем номер заказа в модалке
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('have.text', '12345');

      // Закрываем модалку
      cy.get('[data-testid="modal-close-button"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');

      // Конструктор должен быть пуст
      cy.get('[data-testid="burger-constructor"]').contains('Выберите булки');
      cy.get('[data-testid="burger-constructor"]').contains('Выберите начинку');
    });
  });
});
