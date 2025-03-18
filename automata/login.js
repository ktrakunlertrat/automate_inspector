// const { chromium } = require('playwright');

// (async () => {
//     const browser = await chromium.launch({ headless: false }); // เปิด Browser แบบมี UI
//     const page = await browser.newPage();

//     try {
//         await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php', { timeout: 60000 });

//         // 1️⃣ เปิดหน้า Login
//         await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Loginpage', { timeout: 60000 });

//         // 2️⃣ รอให้ช่องกรอกข้อมูลปรากฏ
//         await page.waitForSelector('#user_id');
//         await page.waitForSelector('#password');

//         // 3️⃣ กรอก Username และ Password
//         await page.fill('#user_id', 'user253'); // กรอก User
//         await page.fill('#password', 't039510732'); // กรอก Password

//         // 4️⃣ คลิกปุ่ม Login
//         await page.click('button[type="submit"]');

//         // 5️⃣ รอให้เปลี่ยนหน้า (หากมีการ Redirect)
//         // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

//         // 6️⃣ แสดงผลหลัง Login สำเร็จ
//         console.log('Login สำเร็จ! Page Title:', await page.title());

//     } catch (error) {
//         console.error('เกิดข้อผิดพลาด:', error);
//     } finally {
//         await browser.close();
//     }
// })();

const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false }); // เปิด Browser แบบมี UI
    const page = await browser.newPage();

    try {
        await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php', { timeout: 60000 });

        // 1️⃣ เปิดหน้า Login
        await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Loginpage', { timeout: 60000 });

        // 2️⃣ รอให้ช่องกรอกข้อมูลปรากฏ
        await page.waitForSelector('#user_id');
        await page.waitForSelector('#password');

        // 3️⃣ กรอก Username และ Password
        await page.fill('#user_id', 'user253'); // กรอก User
        await page.fill('#password', 't039510732'); // กรอก Password

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login ONE_HOME สำเร็จ!');

        // 6️⃣ คลิกปุ่ม "ออกจากระบบ"
        await page.click('button:text("ออกจากระบบ")');

        // 7️⃣ รอให้เปลี่ยนหน้า (เช่น กลับไปหน้า Login)
        // await page.waitForSelector('#user_id', { timeout: 10000 });

        await page.goto('https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Loginpage', { timeout: 60000 });

        await page.waitForSelector('#user_id');
        await page.waitForSelector('#password');

        await page.fill('#user_id', 'user252'); // กรอก User
        await page.fill('#password', '039511588'); // กรอก Password

        await page.click('button[type="submit"]');

        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login Province - User สำเร็จ!');

        await page.click('button:text("ออกจากระบบ")');

        console.log('ออกจากระบบสำเร็จ!');

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();