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
//         await page.fill('#user_id', 'user384'); // กรอก User
//         await page.fill('#password', '111111'); // กรอก Password

//         // 4️⃣ คลิกปุ่ม Login
//         await page.click('button[type="submit"]');

//         // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
//         await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
//         console.log('Login สำเร็จ!');

//         // 6️⃣ คลิกเมนู "1.1 การเบิกจ่ายงบประมาณ..."
//         await page.waitForSelector('.menu button'); // รอให้เมนูโหลด
//         await page.click('.menu button'); // คลิกเมนู

//         // 7️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
//         await page.waitForSelector('a[href*="time_count=1"]'); // รอให้ลิงก์โหลด
//         await page.click('a[href*="time_count=1"]'); // คลิกลิงก์

//         console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

//         // 8️⃣ ค้างหน้านั้นไว้ 60 วินาที
//         // console.log('รอ 10 วินาที...');
//         // await page.waitForTimeout(10000); // ค้างไว้ 10 วินาที

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
        await page.fill('#user_id', 'user384'); // กรอก User
        await page.fill('#password', '111111'); // กรอก Password

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login สำเร็จ!');

        // 6️⃣ คลิกเมนู "1.1 การเบิกจ่ายงบประมาณ..."
        await page.waitForSelector('.menu button'); // รอให้เมนูโหลด
        await page.click('.menu button'); // คลิกเมนู

        // 7️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href*="time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href*="time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // 8️⃣ รอให้ช่อง input ปรากฏ แล้วกรอกข้อมูล
        await page.waitForSelector('input[name="data_fund_budget_only[3][number_of_allocated]"]');
        await page.fill('input[name="data_fund_budget_only[3][number_of_allocated]"]', '50000'); // กรอกจำนวนงบที่จัดสรร

        await page.waitForSelector('input[name="data_fund_budget_only[3][number_of_disbursement]"]');
        await page.fill('input[name="data_fund_budget_only[3][number_of_disbursement]"]', '10000'); // กรอกจำนวนงบที่เบิกจ่าย

        await page.waitForSelector('textarea[name="data_fund_budget_only[3][detail]"]');
        await page.fill('textarea[name="data_fund_budget_only[3][detail]"]', 'รายละเอียดการใช้งบประมาณ'); // กรอกรายละเอียด

        console.log('กรอกข้อมูลสำเร็จ!');

        // 9️⃣ ค้างหน้าไว้ 10 วินาที
        // console.log('รอ 10 วินาที...');
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();