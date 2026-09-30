Playwright 101 Certification Project

This repository contains the automated test suite for the Playwright 101 Certification assignment on the TestMu AI (formerly LambdaTest) platform.

🛠️ Prerequisites

Node.js: v18 or later

npm: v9 or later

A valid TestMu AI / LambdaTest account with automation access

🚀 Setup & Installation

Clone this repository and install all required dependencies:

# Clone the repository
git clone <YOUR_REPO_URL>

# Navigate into the project folder
cd playwright_101

# Initialize package.json (if setting up from scratch)
npm init -y

# Install Playwright, TypeScript, dotenv, and type definitions
npm install -D @playwright/test typescript @types/node dotenv

# Download Playwright browser binaries
npx playwright install


🔐 Environment Variables Configuration

Create a .env file in the root of the project to securely provide your platform credentials:

LT_USERNAME=your_testmu_username
LT_ACCESS_KEY=your_testmu_access_key


Security Warning: Never commit .env to your Git repository. Ensure .env is listed inside .gitignore.

Alternatively, if running in PowerShell without a .env file:

$env:LT_USERNAME="your_testmu_username"
$env:LT_ACCESS_KEY="your_testmu_access_key"


🧪 Test Scenarios

The suite covers three main scenarios located in tests/assignment.spec.ts:

Test Scenario 1 (Simple Form Demo):

Navigates to https://www.testmuai.com/selenium-playground/.

Clicks Simple Form Demo and verifies the URL.

Enters a dynamic message into the single input field and asserts the displayed message matches.

Test Scenario 2 (Drag & Drop Sliders):

Navigates to Drag & Drop Sliders.

Selects the slider with Default value 15 and adjusts the bar until the output badge displays 95.

Test Scenario 3 (Input Form Submit):

Navigates to Input Form Submit.

Triggers validation error assertions on empty submit.

Fills out all form fields, selects United States from the country dropdown using text matching, and submits.

Asserts the final success message: "Thanks for contacting us, we will get back to you shortly.".

🏃 Execution

Run the tests across parallel cloud targets:

# Run all tests on configured TestMu AI cloud environments
npx playwright test

# Run tests with visible report output
npx playwright show-report


