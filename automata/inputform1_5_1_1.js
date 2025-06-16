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

        // 7️⃣ รอให้หน้าโหลดหลังการเลือกหน่วยงาน
        await page.waitForNavigation(); // รอการโหลดหน้าใหม่หลังจากที่ฟอร์มถูกส่ง

        // 8️⃣ คลิกเมนู
        await page.waitForSelector('//button[contains(., "1.5.1.1 แผนการขับเคลื่อนและคณะทำงานที่อยู่อาศัย*")]');
        await page.click('//button[contains(., "1.5.1.1 แผนการขับเคลื่อนและคณะทำงานที่อยู่อาศัย*")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02010Controller?time_count=1&order=1.5.1.1&title=แผนการขับเคลื่อนและคณะทำงานที่อยู่อาศัย*"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02010Controller?time_count=1&order=1.5.1.1&title=แผนการขับเคลื่อนและคณะทำงานที่อยู่อาศัย*"]'); // คลิกลิงก์

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

        await page.waitForSelector('textarea[name="number_results_of_mso[5][detail]"]');
        await page.fill('textarea[name="number_results_of_mso[5][detail]"]', 'บ้านพักเด็ก'); // บ้านอื่นๆ

        const data = [
            { index: 1, number: '20', budget: '200000', detail: 'คำชี้แจง 1' },
            { index: 2, number: '20', budget: '200000', detail: 'คำชี้แจง 2' },
            { index: 3, number: '20', budget: '200000', detail: 'คำชี้แจง 3' },
            { index: 4, number: '20', budget: '200000', detail: 'คำชี้แจง 4' },
            { index: 5, number: '20', budget: '200000', detail: 'คำชี้แจง 5' },
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, number, budget, detail } = data[i];
            
            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_housing_needs]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_housing_needs]"]`, number); // ความต้องการด้านที่อยู่อาศัย (ราย)

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_targets_housing]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_targets_housing]"]`, number); // จำนวน (ราย) เป้าหมายการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_targets_budget]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_targets_budget]"]`, budget); // เงินที่ได้รับการจัดสรร เป้าหมายการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_housing]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_housing]"]`, number); // จำนวน (หลัง) ผลการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_disbursement]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_disbursement]"]`, budget); // จำนวน (หลัง) ผลการดำเนินงาน ปี 2568

            await page.waitForSelector(`input[name="number_results_of_mso[${index}][number_results_budget]"]`);
            await page.fill(`input[name="number_results_of_mso[${index}][number_results_budget]"]`, number); // บันทึกลงในระบบ MSO-Logbook (ราย)

            await page.waitForSelector(`textarea[name="number_results_of_mso[${index}][detail_explanation]"]`);
            await page.fill(`textarea[name="number_results_of_mso[${index}][detail_explanation]"]`, detail); // คำชี้แจง
        }
        
        console.log('กรอกข้อมูลส่วนที่ 1 สำเร็จ!');

        //ส่วนที่ 2 : การบูรณาการการปรับสภาพที่อยู่อาศัย
        //2.1 การบูรณาการด้านงบประมาณ
        await page.waitForSelector('input[name="number_houses_in_mso"]'); // การบูรณาการงบประมาณภายในกระทรวง พม. (หลัง)
        await page.fill('input[name="number_houses_in_mso"]','2000'); // จำนวน

        await page.waitForSelector('input[name="number_buddet_in_mso"]'); // การบูรณาการงบประมาณภายในกระทรวง พม. (หลัง)
        await page.fill('input[name="number_buddet_in_mso"]','50000'); // รวมเป็นเงิน

        await page.waitForSelector('input[name="number_houses_out_mso"]'); // การบูรณาการงบประมาณกับหน่วยงานภายนอกกระทรวง พม. (หลัง)
        await page.fill('input[name="number_houses_out_mso"]','2000'); // จำนวน

        await page.waitForSelector('input[name="number_buddet_out_mso"]'); // การบูรณาการงบประมาณกับหน่วยงานภายนอกกระทรวง พม. (หลัง)
        await page.fill('input[name="number_buddet_out_mso"]','50000'); // รวมเป็นเงิน

        console.log('กรอกข้อมูลส่วนที่ 2 2.1 สำเร็จ!');

        //2.2 การบูรณาการด้านอื่น ๆ (เช่น แรงงาน วัสดุอุปกรณ์ เครื่องอุปโภคบริโภค การเกษตร/ปศุสัตว์)
        await page.waitForSelector('input[name="housing_other[check_have]"][value="true"]');
        await page.waitForSelector('input[name="housing_other[check_have]"][value="false"]');

        const options3 = [
            'input[name="housing_other[check_have]"][value="true"]',
            'input[name="housing_other[check_have]"][value="false"]'
        ];

        const randomOption3 = options3[Math.floor(Math.random() * options3.length)];

        await page.check(randomOption3);

        // ตรวจสอบว่าเลือก value="true" แล้วค่อยทำรายการที่เกี่ยวข้อง
        if (randomOption3 === 'input[name="housing_other[check_have]"][value="true"]') {
            await page.waitForSelector('input[name="government[check]"]');
            await page.check('input[name="government[check]"]'); // หน่วยงานรัฐ

            await page.waitForSelector('textarea[name="government[detail]"]');
            await page.fill('textarea[name="government[detail]"]', 'อธิบาย'); // หน่วยงานรัฐ อธิบาย

            await page.waitForSelector('input[name="private[check]"]');
            await page.check('input[name="private[check]"]'); // หน่วยงานเอกชน

            await page.waitForSelector('textarea[name="private[detail]"]');
            await page.fill('textarea[name="private[detail]"]', 'อธิบาย'); // หน่วยงานเอกชน อธิบาย

            await page.waitForSelector('input[name="other[check]"]');
            await page.check('input[name="other[check]"]'); // อื่นๆ

            await page.waitForSelector('textarea[name="other[detail]"]');
            await page.fill('textarea[name="other[detail]"]', 'อธิบาย'); // อื่นๆ อธิบาย
        }

        console.log('กรอกข้อมูลส่วนที่ 2 2.2 สำเร็จ!');

        //2.3 มีการใช้วัสดุที่เป็นมิตรกับสิ่งแวดล้อม (ถ้ามีให้ระบุ)
        await page.waitForSelector('input[name="radio"][value="false"]');
        await page.waitForSelector('input[name="radio"][value="true"]');

        const options4 = [
            'input[name="radio"][value="false"]',
            'input[name="radio"][value="true"]',
        ];

        const randomOption4 = options4[Math.floor(Math.random() * options4.length)];

        await page.check(randomOption4);

        // เงื่อนไขสำหรับการกรอกข้อมูลใน textarea
        if (randomOption4 === 'input[name="radio"][value="true"]') {
            await page.waitForSelector('textarea[id="textarea_yes_2_3"]');
            await page.fill('textarea[id="textarea_yes_2_3"]', 'อธิบาย'); // กรอกในช่อง "มี"
        }

        console.log('กรอกข้อมูลส่วนที่ 2 2.3 สำเร็จ!');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.5.1.1'); // ตำแหน่ง

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