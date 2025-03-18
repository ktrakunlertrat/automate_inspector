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
        await page.fill('#user_id', 'user383'); // กรอก User
        await page.fill('#password', '412179'); // กรอก Password

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login สำเร็จ!');

        // 6️⃣ เลือกหน่วยงาน "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"
        await page.waitForSelector('#province-select');
        await page.selectOption('#province-select', { value: '284' }); // เลือก "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"

        // 7️⃣ รอให้หน้าโหลดหลังการเลือกหน่วยงาน
        await page.waitForNavigation(); // รอการโหลดหน้าใหม่หลังจากที่ฟอร์มถูกส่ง

        // 8️⃣ คลิกเมนู "1.1 การเบิกจ่ายงบประมาณ..."
        await page.waitForSelector('.menu button'); // รอให้เมนูโหลด
        await page.click('.menu button'); // คลิกเมนู

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href*="time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href*="time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // ข้อมูลที่จะกรอก
        const data = [
            { index: 1, allocated: '50000', disbursement: '30000', detail: 'รายละเอียดการใช้งบประมาณ 1' },
            { index: 2, allocated: '50000', disbursement: '30000', detail: 'รายละเอียดการใช้งบประมาณ 2' },
            { index: 3, allocated: '50000', disbursement: '30000', detail: 'รายละเอียดการใช้งบประมาณ 3' },
            { index: 4, allocated: '50000', disbursement: '30000', detail: 'รายละเอียดการใช้งบประมาณ 4' },
            { index: 5, allocated: '50000', disbursement: '30000', detail: 'รายละเอียดการใช้งบประมาณ 5' },
        ];

        // 1.2 - 1.5 กรอกข้อมูลใน loop
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];
            
            await page.waitForSelector(`input[name="data_fund_budget_only[${index}][number_of_allocated]"]`);
            await page.fill(`input[name="data_fund_budget_only[${index}][number_of_allocated]"]`, allocated); // กรอกจำนวนงบที่จัดสรร

            await page.waitForSelector(`input[name="data_fund_budget_only[${index}][number_of_disbursement]"]`);
            await page.fill(`input[name="data_fund_budget_only[${index}][number_of_disbursement]"]`, disbursement); // กรอกจำนวนงบที่เบิกจ่าย

            await page.waitForSelector(`textarea[name="data_fund_budget_only[${index}][detail]"]`);
            await page.fill(`textarea[name="data_fund_budget_only[${index}][detail]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} สำเร็จ!`);
        }

        console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();