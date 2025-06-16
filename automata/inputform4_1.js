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
        await page.fill('#user_id', 'cop-pre');
        await page.fill('#password', '1234567');

        // await page.fill('#user_id', 'admin');
        // await page.fill('#password', 'adminnarong');

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login สำเร็จ!');

        // 6️⃣ เลือกหน่วยงาน "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"
        // await page.selectOption('[name="province"]', { label: 'แพร่' });

        await page.selectOption('[name="org_id"]', { label: 'สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์' });

        // 8️⃣ คลิกเมนู
        await page.waitForSelector('//button[contains(., "4.1 การเบิกจ่ายงบประมาณและการใช้จ่ายภาครัฐ ปีงบประมาณ พ.ศ. 2568")]');
        await page.click('//button[contains(., "4.1 การเบิกจ่ายงบประมาณและการใช้จ่ายภาครัฐ ปีงบประมาณ พ.ศ. 2568")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0101Controller?time_count=1&order=4.1&title=การเบิกจ่ายงบประมาณและการใช้จ่ายภาครัฐ ปีงบประมาณ พ.ศ. 2568"]', { state: 'visible' });
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0101Controller?time_count=1&order=4.1&title=การเบิกจ่ายงบประมาณและการใช้จ่ายภาครัฐ ปีงบประมาณ พ.ศ. 2568"]');



        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // ฟังก์ชันใช้กรอกข้อมูลใน input ที่มี AutoNumeric
        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        const data = [
            { index: 1, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 1' },
            { index: 2, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 2' },
            { index: 3, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 3' },
            { index: 4, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 4' },
            { index: 5, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 5' },
            { index: 6, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 6' },
        ];

        const data2 = [
            { index: 1, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 1' },
            { index: 2, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 2' },
            { index: 3, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 3' },
            { index: 4, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 4' },
            { index: 5, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 5' },
        ];

        // ส่วนที่ 1: ประสิทธิภาพการเบิกจ่ายงบประมาณได้รับการจัดสรรภาพรวม
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];

            // งบประมาณที่ได้รับการจัดสรร (บาท)
            await typeInput(page, `input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_allocate]"]`, allocated);
            await typeInput(page, `input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_allocate]"]`, allocated);
            await typeInput(page, `input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_allocate]"]`, allocated);
            await typeInput(page, `input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_allocate]"]`, allocated);
            await typeInput(page, `input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_allocate]"]`, allocated);

            // การเบิกจ่าย(บาท)
            await typeInput(page, `input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_disbursement]"]`, disbursement);
            await typeInput(page, `input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_disbursement]"]`, disbursement);
            await typeInput(page, `input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_disbursement]"]`, disbursement);
            await typeInput(page, `input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_disbursement]"]`, disbursement);
            await typeInput(page, `input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_disbursement]"]`, disbursement);

            // กรอกรายละเอียด (ไม่ต้องใช้ AutoNumeric ใช้ fill ได้ตามปกติ)
            await page.waitForSelector(`textarea[name="disbursement_mso[${index}][results_of_disbursement_mso][${index}][detail]"]`);
            await page.fill(`textarea[name="disbursement_mso[${index}][results_of_disbursement_mso][${index}][detail]"]`, detail);

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} 1.1 สำเร็จ!`);
        }

        //1.2
        for (let i = 0; i < data2.length; i++) {
            const { index, allocated, disbursement, detail } = data2[i];

            await typeInput(page, `input[name="data_fund_budget_only[${index}][number_of_allocated]"]`, allocated); //งบประมาณที่ได้รับการจัดสรร (บาท)

            await typeInput(page, `input[name="data_fund_budget_only[${index}][number_of_disbursement]"]`, disbursement); //ผลการเบิกจ่าย(บาท)

            await page.waitForSelector(`textarea[name="data_fund_budget_only[${index}][detail]"]`);
            await page.fill(`textarea[name="data_fund_budget_only[${index}][detail]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} 1.2 สำเร็จ!`);
        }

        //1.3
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];

            await typeInput(page, `input[name="data_provincial_group_budget[${index}][number_of_allocated]"]`, allocated); //งบประมาณที่ได้รับการจัดสรร (บาท)

            await typeInput(page, `input[name="data_provincial_group_budget[${index}][number_of_disbursement]"]`, disbursement); //ผลการเบิกจ่าย(บาท)

            await page.waitForSelector(`textarea[name="data_provincial_group_budget[${index}][detail]"]`);
            await page.fill(`textarea[name="data_provincial_group_budget[${index}][detail]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} 1.3 สำเร็จ!`);
        }

        //ปัญหา/อุปสรรค และข้อเสนอแนะ
        await page.waitForSelector('textarea[name="data_Problems[1][problems_obstacles]"]');
        await page.fill('textarea[name="data_Problems[1][problems_obstacles]"]', 'ปัญหาเเละอุปสรรค'); // ปัญหาเเละอุปสรรค

        await page.waitForSelector('textarea[name="data_Problems[1][suggestions]"]');
        await page.fill('textarea[name="data_Problems[1][suggestions]"]', 'ข้อเสนอแนะ'); // ข้อเสนอแนะ

        console.log('กรอกข้อมูลปัญหา/อุปสรรคสำเร็จ!');

        //ไฟล์ประกอบรายงาน
        await page.waitForSelector('input[name="file"]'); 
        await page.setInputFiles('input[name="file"]', 'D:\\งาน\\playwright\\test_file.jpg');  // ไฟล์

        await page.waitForSelector('textarea[name="descriptionInput"]');
        await page.fill('textarea[name="descriptionInput"]', 'คำอธิบาย'); // คำอธิบาย

        console.log('อัปโหลดไฟล์ประกอบรายงานสำเร็จ!');

        //ผู้รายงาน
        await page.waitForSelector('input[name="first_name_reporter"]');
        await page.fill('input[name="first_name_reporter"]', 'ผู้รายงาน1'); // ชื่อ

        await page.waitForSelector('input[name="last_name_reporter"]');
        await page.fill('input[name="last_name_reporter"]', 'ผู้รายงาน2'); // นามสกุล

        await page.waitForSelector('input[name="position_name_reporter"]');
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน4.1'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        // await page.waitForSelector('input[name="examine"]'); 
        // await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        // await page.waitForSelector('textarea[name="opinion"]');
        // await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        // console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        // await page.waitForTimeout(10000);

        await page.waitForEvent('close');

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();