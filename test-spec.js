// Require modules used in the logic below
const {Builder, By, Key, until} = require('selenium-webdriver');

// You can use a remote Selenium Hub, but we are not doing that here
require('chromedriver');
const driver = new Builder()
    .forBrowser('chrome')
    .build();

// Get environment variables for Skuid site credentials
const baseUrl = 'http://localhost:3000'

// Note: This function does not check if already logged in.
var button = async function() {
    // Define login elements
    let clickButton = By.id ('myClick');
    let displayedText = By.id ('newText');

    // Load the login page
    await driver.get(baseUrl);

    // Wait until the page is loaded
    await driver.wait(until.elementLocated(clickButton), 10 * 5000);
    console.log('Screen is loaded.')

}
// Configure Jasmine's timeout value to account for longer tests.
// Adjust this value if you find our tests failing due to timeouts.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

// Define a category of tests using test framework, in this case Jasmine
describe("Basic element tests", function() {
    // Before every test, open a browser and login
    // using the logic written above.
    beforeEach(async function() {
        await button();
        console.log('Test beginning.')
    });
    // After each test, close the browser.
    afterAll(async function() {
        await driver.quit();
    });
    // Specify a test
    it("Click the button, Verify Correct UI Block Message", async function() {
        // Provide basic data used to evaluate the test.
        // This test should pass.
        var testData = {
            pageName: 'SeleniumTest',
            button: By.id('myClick'),
            blockMessage: By.id('newText')
        }
        console.log('Running test...')

        // Preview the test page
        await driver.get(baseUrl);

        // Wait for button
        await driver.wait(until.elementLocated(testData.button), 10 * 1000);

        // Verify button is present
        expect(await driver.findElement(testData.button).isDisplayed()).toBe(true);

        // Click button
        await driver.findElement(testData.button).click();

        // Wait for the blocked UI message to appear
        await driver.wait(until.elementLocated(testData.blockMessage), 10 * 1000);

        // Verify the text of the message, which should match the example page XML
        expect(await driver.findElement(testData.blockMessage).getText()).toBe('CircleCI');
    });
});
