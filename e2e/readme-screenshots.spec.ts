import { test, expect } from '@playwright/test';

test.describe('README Screenshots', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('capture login page', async ({ page }) => {
        // Go to login page (no auth needed)
        // We use a new context or logout? 
        // Actually this test uses global setup auth, so it will be logged in by default if we visit protected pages.
        // For login page, we should use a fresh context (no storage state)

        // However, playwright.config.ts applies storageState to 'chromium' project.
        // We can override it in test.use
    });
});

test.describe('Guest Screenshots', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('login page', async ({ page }) => {
        await page.goto('/login');
        await page.screenshot({ path: 'public/docs/login.png' });
    });
});

test.describe('Authenticated Screenshots', () => {
    test('dashboard', async ({ page }) => {
        await page.goto('/dashboard');
        // Hide dynamic parts or wait for network idle
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000); // Give a bit of time for rendering
        await page.screenshot({ path: 'public/docs/dashboard.png' });
    });

    test('trip detail', async ({ page }) => {
        // ... (existing code)
        await page.goto('/dashboard');
        await page.getByPlaceholder('例: 京都2泊3日の旅').fill('Screenshot Trip');
        // ... select dates ...
        const today = new Date();
        await page.getByPlaceholder('日程を選択').click();
        await page.getByText(today.getDate().toString(), { exact: true }).first().click();
        await page.getByText(today.getDate().toString(), { exact: true }).first().click();
        await page.getByRole('button', { name: '旅行を作成する' }).click();

        await expect(page).toHaveURL(/\/trips\/.*/);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000); // Give a bit of time for rendering
        await page.screenshot({ path: 'public/docs/trip-detail.png' });

        // Clean up? (optional for screenshot test)
    });
});
