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
        //province user พังงา
        // await page.fill('#user_id', 'user383'); // กรอก User
        // await page.fill('#password', '412179'); // กรอก Password

        //province cop พังงา
        await page.fill('#user_id', 'cop-pna');
        await page.fill('#password', '123456');

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login สำเร็จ!');

        // 6️⃣ เลือกหน่วยงาน "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"
        await page.waitForSelector('#province-select');
        await page.selectOption('#province-select', { label: 'สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์' }); // เลือก "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"

        // 7️⃣ รอให้หน้าโหลดหลังการเลือกหน่วยงาน
        await page.waitForNavigation(); // รอการโหลดหน้าใหม่หลังจากที่ฟอร์มถูกส่ง

        // 8️⃣ คลิกเมนู "1.1 การเบิกจ่ายงบประมาณ..."
        // await page.waitForSelector('.menu button'); // รอให้เมนูโหลด
        // await page.click('.menu button'); // คลิกเมนู
        await page.waitForSelector('//button[contains(., "1.1 การเบิกจ่ายงบประมาณและค่าใช้จ่ายภาครัฐปีงบประมาณ พ.ศ. 2568")]');
        await page.click('//button[contains(., "1.1 การเบิกจ่ายงบประมาณและค่าใช้จ่ายภาครัฐปีงบประมาณ พ.ศ. 2568")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href*="time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href*="time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // ข้อมูลที่จะกรอก
        const data = [
            { index: 1, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 1' },
            { index: 2, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 2' },
            { index: 3, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 3' },
            { index: 4, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 4' },
            { index: 5, allocated: '50000', disbursement: '10000', detail: 'รายละเอียดการใช้งบประมาณ 5' },
        ];

        //ส่วนที่ 1: ประสิทธิภาพการเบิกจ่ายงบประมาณได้รับการจัดสรรภาพรวม
        // //1.1 หน้า 1.1
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];
            
            //งบประมาณที่ได้รับการจัดสรร (บาท)
        await page.waitForSelector(`input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_allocate]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_allocate]"]`, allocated); //งบดำเนินงาน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_allocate]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_allocate]"]`, allocated); //งบลงทุน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_allocate]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_allocate]"]`, allocated); //งบเงินอุดหนุน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_allocate]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_allocate]"]`, allocated); //งบบุคลากร

        await page.waitForSelector(`input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_allocate]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_allocate]"]`, allocated); //งบรายจ่ายอื่น

        //การเบิกจ่าย(บาท)
        await page.waitForSelector(`input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_disbursement]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][Operating_budget][${index}][number_of_disbursement]"]`, disbursement); //งบดำเนินงาน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_disbursement]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][investment_budget][${index}][number_of_disbursement]"]`, disbursement); //งบลงทุน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_disbursement]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][subsidy_budget][${index}][number_of_disbursement]"]`, disbursement); //งบเงินอุดหนุน

        await page.waitForSelector(`input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_disbursement]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][personnel_budget][${index}][number_of_disbursement]"]`, disbursement); //งบบุคลากร

        await page.waitForSelector(`input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_disbursement]"]`);
        await page.fill(`input[name="disbursement_mso[${index}][expenditure_budget][${index}][number_of_disbursement]"]`, disbursement); //งบรายจ่ายอื่น

        await page.waitForSelector(`textarea[name="disbursement_mso[${index}][results_of_disbursement_mso][${index}][detail]"]`);
        await page.fill(`textarea[name="disbursement_mso[${index}][results_of_disbursement_mso][${index}][detail]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} 1.1 สำเร็จ!`);
        }

        //1.2 หน้า 1.1
        // 1.2 - 1.5 กรอกข้อมูลใน loop
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];
            
            await page.waitForSelector(`input[name="data_fund_budget_only[${index}][number_of_allocated]"]`);
            await page.fill(`input[name="data_fund_budget_only[${index}][number_of_allocated]"]`, allocated); // กรอกจำนวนงบที่จัดสรร

            await page.waitForSelector(`input[name="data_fund_budget_only[${index}][number_of_disbursement]"]`);
            await page.fill(`input[name="data_fund_budget_only[${index}][number_of_disbursement]"]`, disbursement); // กรอกจำนวนงบที่เบิกจ่าย

            await page.waitForSelector(`textarea[name="data_fund_budget_only[${index}][detail]"]`);
            await page.fill(`textarea[name="data_fund_budget_only[${index}][detail]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลหน่วยงานที่ ${index} 1.2 สำเร็จ!`);
        }

        //1.3 หน้า 1.1
        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement, detail } = data[i];
            
            await page.waitForSelector(`input[name="data_provincial_group_budget[${index}][number_of_allocated]"]`);
            await page.fill(`input[name="data_provincial_group_budget[${index}][number_of_allocated]"]`, allocated); // กรอกจำนวนงบที่จัดสรร

            await page.waitForSelector(`input[name="data_provincial_group_budget[${index}][number_of_disbursement]"]`);
            await page.fill(`input[name="data_provincial_group_budget[${index}][number_of_disbursement]"]`, disbursement); // กรอกจำนวนงบที่เบิกจ่าย

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.1'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        await page.waitForSelector('input[name="examine"]'); 
        await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        await page.waitForSelector('textarea[name="opinion"]');
        await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();