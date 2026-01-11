import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Fixed test user credentials
    // This allows persistent testing without polluting the DB with random users
    const email = process.env.TEST_USER_EMAIL || 'test@tsuzuri.com';
    const password = process.env.TEST_USER_PASSWORD || 'password123';

    await page.goto('/login');

    // 1. Try Login first
    await page.fill('#email', email);
    await page.fill('#password', password);
    // Ensure we are in "Login" mode (default)
    await page.getByRole('button', { name: 'ログイン', exact: true }).first().click(); // Click the tab if needed, but 'submit' button changes text
    // Actually the form has tabs. 'isLogin' state defaults to true.
    // The submit button text is 'ログイン' or '新規登録'.

    // Just clicking submit might work if default is login.
    await page.click('button[type="submit"]');

    // Check if login succeeded or failed
    try {
        // If successful, we should be redirected to dashboard
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 3000 });
    } catch (e) {
        // Login failed (likely user doesn't exist). Try Sign Up.
        console.log('Login failed or timed out. Attempting Sign Up...');

        // Ensure we are back at login or state is clean? 
        // If login failed, we might show an error message.
        // We should switch to Sign Up tab.
        await page.getByRole('button', { name: '新規登録' }).click();

        // Fields might be cleared or retained. Let's refill to be safe.
        await page.fill('#email', email);
        await page.fill('#password', password);

        await page.click('button[type="submit"]'); // Now text is '新規登録'

        // Wait for dashboard (assuming email confirmation is DISABLED)
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    }

    await page.context().storageState({ path: authFile });
});
