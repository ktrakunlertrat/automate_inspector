const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php', { timeout: 60000 }); // รอโหลด 60 วินาที
        console.log('Page Title:', await page.title());
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();