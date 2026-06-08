import { test, expect } from '@playwright/test';

test('health app home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/健康管理/);
});

test('navigation tabs are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('饮食')).toBeVisible();
  await expect(page.getByText('运动')).toBeVisible();
  await expect(page.getByText('体重')).toBeVisible();
});

test('can navigate to exercise tab', async ({ page }) => {
  await page.goto('/');
  await page.getByText('运动').click();
  await expect(page.getByText('添加运动')).toBeVisible();
});
