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

        // 8️⃣ คลิกเมนู "2.10 การพัฒนาด้านที่อยู่อาศัยสำหรับกลุ่มเป้าหมายกระทรวง พม."
        await page.waitForSelector('//button[contains(., "2.10 การพัฒนาด้านที่อยู่อาศัยสำหรับกลุ่มเป้าหมายกระทรวง พม.")]');
        await page.click('//button[contains(., "2.10 การพัฒนาด้านที่อยู่อาศัยสำหรับกลุ่มเป้าหมายกระทรวง พม.")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02010Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02010Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : แผนและผลการดำเนินงาน
        //1.มีการแต่งตั้งคณะทำงานที่อยู่อาศัยจังหวัด
        await page.waitForSelector('input[name="plans_and_performance_check_1"][value="true"]');
        await page.waitForSelector('input[name="plans_and_performance_check_1"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options1 = [
            'input[name="plans_and_performance_check_1"][value="true"]',
            'input[name="plans_and_performance_check_1"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption1 = options1[Math.floor(Math.random() * options1.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption1);

        //2.มีแผนการขับเคลื่อนคณะทำงานที่อยู่อาศัยจังหวัด
        await page.waitForSelector('input[name="plans_and_performance_check_2"][value="true"]');
        await page.waitForSelector('input[name="plans_and_performance_check_2"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options2 = [
            'input[name="plans_and_performance_check_2"][value="true"]',
            'input[name="plans_and_performance_check_2"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption2);

        await page.waitForSelector('input[name="number_results_of_mso[0][number_targets_housing]"]');
        await page.fill('input[name="number_results_of_mso[0][number_targets_housing]"]', '100000'); // จำนวน (ราย)

        await page.waitForSelector('textarea[name="number_results_of_mso[4][detail]"]');
        await page.fill('textarea[name="number_results_of_mso[4][detail]"]', 'บ้านพักเด็ก'); // บ้านอื่นๆ

        const data = [
            { index: 1, number: '20000', detail: 'คำชี้แจง 1' },
            { index: 2, number: '20000', detail: 'คำชี้แจง 2' },
            { index: 3, number: '20000', detail: 'คำชี้แจง 3' },
            { index: 4, number: '20000', detail: 'คำชี้แจง 4' },
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, number, detail } = data[i];
            
            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_housing_needs]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_housing_needs]"]`, number); // ความต้องการด้านที่อยู่อาศัย (ราย)

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_targets_housing]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_targets_housing]"]`, number); // จำนวน (ราย) เป้าหมายการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_targets_budget]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_targets_budget]"]`, number); // เงินที่ได้รับการจัดสรร

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_targets_in_mso_logbook]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_targets_in_mso_logbook]"]`, number); // บันทึกลงในระบบ MSO-Logbook (ราย)

            await page.waitForSelector(`textarea[name="number_results_of_mso[${index}][detail_targets]"]`);
            await page.fill(`textarea[name="number_results_of_mso[${index}][detail_targets]"]`, detail); // คำชี้แจง
        }

        for (let i = 0; i < data.length; i++) {
            const { index, number, detail } = data[i];
            
            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_housing]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_housing]"]`, number); // จำนวน (ราย) ผลการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_disbursement]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_disbursement]"]`, number); // ผลการเบิกจ่าย (บาท)

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_in_mso_logbook]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_in_mso_logbook]"]`, number); // กลุ่มเป้าหมายที่อยู่ระบบ MSO-Logbook (ราย)

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_budget]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_budget]"]`, number); // การเบิกจ่าย (บาท)

            await page.waitForSelector(`textarea[name="number_results_of_mso[${index}][detail_explanation]"]`);
            await page.fill(`textarea[name="number_results_of_mso[${index}][detail_explanation]"]`, detail); // คำชี้แจง
        }

        // //ปัญหา/อุปสรรค และข้อเสนอแนะ
        // await page.waitForSelector('textarea[name="data_Problems[1][problems_obstacles]"]');
        // await page.fill('textarea[name="data_Problems[1][problems_obstacles]"]', 'ปัญหาเเละอุปสรรค'); // ปัญหาเเละอุปสรรค

        // await page.waitForSelector('textarea[name="data_Problems[1][suggestions]"]');
        // await page.fill('textarea[name="data_Problems[1][suggestions]"]', 'ข้อเสนอแนะ'); // ข้อเสนอแนะ

        // console.log('กรอกข้อมูลปัญหา/อุปสรรคสำเร็จ!');

        // //ไฟล์ประกอบรายงาน
        // await page.waitForSelector('input[name="file"]'); 
        // await page.setInputFiles('input[name="file"]', 'D:\\งาน\\playwright\\test_file.jpg');  // ไฟล์

        // await page.waitForSelector('textarea[name="descriptionInput"]');
        // await page.fill('textarea[name="descriptionInput"]', 'คำอธิบาย'); // คำอธิบาย

        // console.log('อัปโหลดไฟล์ประกอบรายงานสำเร็จ!');

        // //ผู้รายงาน
        // await page.waitForSelector('input[name="first_name_reporter"]');
        // await page.fill('input[name="first_name_reporter"]', 'ผู้รายงาน1'); // ชื่อ

        // await page.waitForSelector('input[name="last_name_reporter"]');
        // await page.fill('input[name="last_name_reporter"]', 'ผู้รายงาน2'); // นามสกุล

        // await page.waitForSelector('input[name="position_name_reporter"]');
        // await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.2'); // ตำแหน่ง

        // console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        // //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        // await page.waitForSelector('input[name="examine"]'); 
        // await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        // await page.waitForSelector('textarea[name="opinion"]');
        // await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        // console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        // console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();