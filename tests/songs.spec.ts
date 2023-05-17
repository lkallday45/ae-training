import { test, expect } from "@playwright/test";

test("should display add song form", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("heading", { name: "Add Song" })).toBeVisible();

  //add song
  await page.goto("http://localhost:3000/");
  await page.getByLabel("Title").fill("tomorrow");
  await page.getByLabel("Artist").fill("Garth Brooks");
  await page.getByLabel("Length").fill("3:45");
  await page.getByRole("button", { name: "Add Song" }).click();
});
