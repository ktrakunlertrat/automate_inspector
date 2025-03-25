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
        // await page.waitForSelector('.menu button'); // รอให้เมนูโหลด
        // await page.click('.menu button'); // คลิกเมนู
        await page.waitForSelector('//button[contains(., "1.1 การเบิกจ่ายงบประมาณและค่าใช้จ่ายภาครัฐปีงบประมาณ พ.ศ. 2568")]');
        await page.click('//button[contains(., "1.1 การเบิกจ่ายงบประมาณและค่าใช้จ่ายภาครัฐปีงบประมาณ พ.ศ. 2568")]');

        // 7️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0101Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0101Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // 8️⃣ รอให้ช่อง input ปรากฏ แล้วกรอกข้อมูล
        //1.1 บ้านพักเด็กและครอบครัว
        //งบประมาณที่ได้รับการจัดสรร (บาท)
        await page.waitForSelector('input[name="disbursement_mso[3][Operating_budget][3][number_of_allocate]"]');
        await page.fill('input[name="disbursement_mso[3][Operating_budget][3][number_of_allocate]"]', '50000'); //งบดำเนินงาน

        await page.waitForSelector('input[name="disbursement_mso[3][investment_budget][3][number_of_allocate]"]');
        await page.fill('input[name="disbursement_mso[3][investment_budget][3][number_of_allocate]"]', '50000'); //งบลงทุน

        await page.waitForSelector('input[name="disbursement_mso[3][subsidy_budget][3][number_of_allocate]"]');
        await page.fill('input[name="disbursement_mso[3][subsidy_budget][3][number_of_allocate]"]', '50000'); //งบเงินอุดหนุน

        await page.waitForSelector('input[name="disbursement_mso[3][personnel_budget][3][number_of_allocate]"]');
        await page.fill('input[name="disbursement_mso[3][personnel_budget][3][number_of_allocate]"]', '50000'); //งบบุคลากร

        await page.waitForSelector('input[name="disbursement_mso[3][expenditure_budget][3][number_of_allocate]"]');
        await page.fill('input[name="disbursement_mso[3][expenditure_budget][3][number_of_allocate]"]', '50000'); //งบรายจ่ายอื่น

        //การเบิกจ่าย(บาท)
        await page.waitForSelector('input[name="disbursement_mso[3][Operating_budget][3][number_of_disbursement]"]');
        await page.fill('input[name="disbursement_mso[3][Operating_budget][3][number_of_disbursement]"]', '20000'); //งบดำเนินงาน

        await page.waitForSelector('input[name="disbursement_mso[3][investment_budget][3][number_of_disbursement]"]');
        await page.fill('input[name="disbursement_mso[3][investment_budget][3][number_of_disbursement]"]', '20000'); //งบลงทุน

        await page.waitForSelector('input[name="disbursement_mso[3][subsidy_budget][3][number_of_disbursement]"]');
        await page.fill('input[name="disbursement_mso[3][subsidy_budget][3][number_of_disbursement]"]', '20000'); //งบเงินอุดหนุน

        await page.waitForSelector('input[name="disbursement_mso[3][personnel_budget][3][number_of_disbursement]"]');
        await page.fill('input[name="disbursement_mso[3][personnel_budget][3][number_of_disbursement]"]', '20000'); //งบบุคลากร

        await page.waitForSelector('input[name="disbursement_mso[3][expenditure_budget][3][number_of_disbursement]"]');
        await page.fill('input[name="disbursement_mso[3][expenditure_budget][3][number_of_disbursement]"]', '20000'); //งบรายจ่ายอื่น

        await page.waitForSelector('textarea[name="disbursement_mso[3][results_of_disbursement_mso][3][detail]"]');
        await page.fill('textarea[name="disbursement_mso[3][results_of_disbursement_mso][3][detail]"]', 'รายละเอียดการใช้งบประมาณ'); // กรอกรายละเอียด
        
        //1.2 บ้านพักเด็กและครอบครัว
        await page.waitForSelector('input[name="data_fund_budget_only[3][number_of_allocated]"]');
        await page.fill('input[name="data_fund_budget_only[3][number_of_allocated]"]', '50000'); // กรอกจำนวนงบที่จัดสรร

        await page.waitForSelector('input[name="data_fund_budget_only[3][number_of_disbursement]"]');
        await page.fill('input[name="data_fund_budget_only[3][number_of_disbursement]"]', '10000'); // กรอกจำนวนงบที่เบิกจ่าย

        await page.waitForSelector('textarea[name="data_fund_budget_only[3][detail]"]');
        await page.fill('textarea[name="data_fund_budget_only[3][detail]"]', 'รายละเอียดการใช้งบประมาณ'); // กรอกรายละเอียด

        //1.3 บ้านพักเด็กและครอบครัว
        await page.waitForSelector('input[name="data_provincial_group_budget[3][number_of_allocated]"]');
        await page.fill('input[name="data_provincial_group_budget[3][number_of_allocated]"]', '50000'); // กรอกจำนวนงบที่จัดสรร

        await page.waitForSelector('input[name="data_provincial_group_budget[3][number_of_disbursement]"]');
        await page.fill('input[name="data_provincial_group_budget[3][number_of_disbursement]"]', '10000'); // กรอกจำนวนงบที่เบิกจ่าย

        await page.waitForSelector('textarea[name="data_provincial_group_budget[3][detail]"]');
        await page.fill('textarea[name="data_provincial_group_budget[3][detail]"]', 'รายละเอียดการใช้งบประมาณ'); // กรอกรายละเอียด

        console.log('กรอกข้อมูลสำเร็จ!');

        // 9️⃣ ค้างหน้าไว้ 10 วินาที
        // await page.waitForTimeout(10000);

        await page.waitForEvent('close');

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();