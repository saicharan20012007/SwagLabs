import { test } from '@playwright/test';
import  SwagLabsPage from '../Pages/components/swagpage';

test.describe('Swag Labs Tests', () => {
  let swagLabsPage: SwagLabsPage;

  test.beforeEach(async ({ page }) => {
    swagLabsPage = new SwagLabsPage(page);
  });

  test('Add product to cart and complete order', async () => {
    await swagLabsPage.visitHomePage();
    await swagLabsPage.login('standard_user', 'secret_sauce');
    await swagLabsPage.addProductToCart('Sauce Labs Backpack');
    await swagLabsPage.goToCart();
    await swagLabsPage.checkout();
    await swagLabsPage.providePaymentInfo('Sai', 'Muvva', '523169');
    await swagLabsPage.finishOrder();
  });
});
