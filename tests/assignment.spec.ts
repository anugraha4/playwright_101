import { test, expect } from '@playwright/test';

test.describe('Playwright 101 Assignment Scenarios', () => {

  test('Test Scenario 1: Simple Form Demo', async ({ page }) => {
    // 1. Open Selenium Playground
    await page.goto('https://www.testmuai.com/selenium-playground/'); 

    // 2. Click "Simple Form Demo" using role locator
    await page.getByRole('link', { name: 'Simple Form Demo' }).click(); 

    // 3. Validate URL contains "simple-form-demo"
    await expect(page).toHaveURL(/.*simple-form-demo/); 

    // 4. Create variable for message string
    const welcomeMessage = 'Welcome to TestMu AI'; 

    // 5. Use variable to enter values in "Enter Message" (Locator: CSS / Placeholder)
    const messageInput = page.getByRole('textbox', { name: 'Please enter your Message' }); 
    await messageInput.fill(welcomeMessage); 

    // 6. Click "Get Checked Value" (Locator: ID)
    await page.locator('#showInput').click(); 

    // 7. Validate displayed message matches
    const displayedMessage = page.locator('#message'); 
    await expect(displayedMessage).toHaveText(welcomeMessage); 
  });

  test('Test Scenario 2: Drag & Drop Sliders', async ({ page }) => {
    // 1. Navigate and click "Drag & Drop Sliders"
    await page.goto('https://www.testmuai.com/selenium-playground/'); 
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click(); 

    // 2. Locate the slider with "Default value 15"
    // Using XPath locator
    const sliderContainer = page.locator('//h4[contains(text(), "Default value 15")]/parent::div'); 
    const slider = sliderContainer.locator('input[type="range"]'); 
    const outputBadge = sliderContainer.locator('output#rangeSuccess'); 

    // Drag slider to 95
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      await page.mouse.move(sliderBox.x + sliderBox.width * 0.15, sliderBox.y + sliderBox.height / 2);
      await page.mouse.down();
      // Move toward target range (95%)
      await page.mouse.move(sliderBox.x + sliderBox.width * 0.95, sliderBox.y + sliderBox.height / 2);
      await page.mouse.up();
    }

    while ((await outputBadge.textContent()) !== '95') {
      const currentVal = parseInt((await outputBadge.textContent()) || '0', 10);
      if (currentVal < 95) {
        await slider.press('ArrowRight');
      } else {
        await slider.press('ArrowLeft');
      }
    }

    await expect(outputBadge).toHaveText('95'); 
  });

  test('Test Scenario 3: Input Form Submit', async ({ page }) => {
    // 1. Navigate and click "Input Form Submit"
    await page.goto('https://www.testmuai.com/selenium-playground/'); 
    await page.getByRole('link', { name: 'Input Form Submit' }).click(); 

    // 2. Click "Submit" without filling info
    const form = page.locator('form').filter({ has: page.locator('#name') }); 
    const submitBtn = form.getByRole('button', { name: 'Submit' }); 
    await submitBtn.click(); 

    // 3. Assert HTML5 validation error message ("Please fill out this field." or "Please fill in the fields")
    const nameInput = form.locator('#name'); 
    const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy(); 

    // 4. Fill form fields
    await nameInput.fill('Jane Doe'); 
    await form.getByPlaceholder('Email').fill('jane.doe@example.com'); 
    await form.getByPlaceholder('Password').fill('SecurePassword123!'); 
    await form.getByPlaceholder('Company').fill('Test Organization'); 
    await form.getByPlaceholder('Website').fill('https://example.com'); 
    await form.getByPlaceholder('City').fill('San Francisco'); 
    await form.getByPlaceholder('Address 1').fill('123 Test Street'); 
    await form.getByPlaceholder('Address 2').fill('Suite 400'); 
    await form.getByPlaceholder('State').fill('CA'); 
    await form.getByPlaceholder('Zip code').fill('94105'); 

    // 5. Select "United States" from Country dropdown using text property
    await form.locator('select[name="country"]').selectOption({ label: 'United States' }); 

    // 6. Submit the form
    await submitBtn.click(); 

    // 7. Validate success message
    const successMsg = page.locator('.success-msg'); 
    await expect(successMsg).toBeVisible(); 
    await expect(successMsg).toHaveText('Thanks for contacting us, we will get back to you shortly.'); 
  });
});