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
        await page.waitForSelector('//button[contains(., "2.2.1 ศูนย์บริหารการดูแลกลุ่มเปราะบางจากภัยพิบัติ (ศบปภ.)")]');
        await page.click('//button[contains(., "2.2.1 ศูนย์บริหารการดูแลกลุ่มเปราะบางจากภัยพิบัติ (ศบปภ.)")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0206Controller?time_count=1&order=2.2.1&title=ศูนย์บริหารการดูแลกลุ่มเปราะบางจากภัยพิบัติ (ศบปภ.)"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0206Controller?time_count=1&order=2.2.1&title=ศูนย์บริหารการดูแลกลุ่มเปราะบางจากภัยพิบัติ (ศบปภ.)"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // ฟังก์ชันใช้กรอกข้อมูลใน input ที่มี AutoNumeric
        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        //ส่วนที่ 1 : งบประมาณ
        await page.waitForSelector('input[name="number_budget"]');
        await page.fill('input[name="number_budget"]', '20000');

        await page.waitForSelector('input[name="number_result_budget"]');
        await page.fill('input[name="number_result_budget"]', '10000');

        //ส่วนที่ 2 : เครือข่ายอาสาเพื่อเตือนภัยในชุมชน (ครู ก.)
        //1)
        await page.waitForSelector('input[name="data_community_alert_network[number_target]"]');
        await page.fill('input[name="data_community_alert_network[number_target]"]', '100');

        //2)
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`input[id="checkbox_2_${i}"]`);
            await page.check(`input[id="checkbox_2_${i}"]`);

            if (i === 1) {
                await page.waitForSelector('input[name="data_community_alert_network[number_training_completed]"]');
                await page.fill('input[name="data_community_alert_network[number_training_completed]"]', '1,000');
            } else if (i === 2) {
                await page.waitForSelector('input[name="data_community_alert_network[number_training_progress]"]');
                await page.fill('input[name="data_community_alert_network[number_training_progress]"]', '1,000');
            } else if (i === 3) {
                await page.waitForSelector('textarea[name="data_community_alert_network[detail_training_plan]"]');
                await page.fill('textarea[name="data_community_alert_network[detail_training_plan]"]', 'อธิบาย');
            }
        }

        //3)
        await page.waitForSelector('input[id="radio_yes"][value="true"]');
        await page.waitForSelector('input[id="radio_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options = [
            'input[id="radio_yes"][value="true"]',
            'input[id="radio_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption = options[Math.floor(Math.random() * options.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption);

        //ส่วนที่ 3 : การจัดทำแผนรับมือและปรับตัวจากการเปลี่ยนแปลงสภาพภูมิอากาศแบบมีส่วนร่วมในระดับพื้นที่
        //3.1
        await page.waitForSelector('input[id="radio_yes_3_1"][value="true"]');
        await page.waitForSelector('input[id="radio_no_3_1"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options2 = [
            'input[id="radio_yes_3_1"][value="true"]',
            'input[id="radio_no_3_1"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption2);

        if (randomOption2.includes('value="true"')) {
            await page.waitForSelector('input[id="fileInput_3_1"]'); 
            await page.setInputFiles('input[id="fileInput_3_1"]', 'D:\\งาน\\playwright\\test_file.jpg');

            await page.waitForSelector('input[name="data_local_climate_change_adaptation_planning[check_adaptation]"]');
            await page.check('input[name="data_local_climate_change_adaptation_planning[check_adaptation]"]');

            await page.waitForSelector('input[name="data_local_climate_change_adaptation_planning[check_impact_process]"]');
            await page.check('input[name="data_local_climate_change_adaptation_planning[check_impact_process]"]');

            await page.waitForSelector('textarea[name="data_local_climate_change_adaptation_planning[detail]"]');
            await page.fill('textarea[name="data_local_climate_change_adaptation_planning[detail]"]', 'หมายเหตุ');
        } else {
            await page.waitForSelector('textarea[name="data_local_climate_change_adaptation_planning[detail_false]"]');
            await page.fill('textarea[name="data_local_climate_change_adaptation_planning[detail_false]"]', 'ไม่ได้จัดทำแผน');
        }

        //ส่วนที่ 4 : การดำเนินงานของจังหวัดในการเตรียมความพร้อมปรับตัวจากการเปลี่ยนแปลงสภาพภูมิอากาศและสถานการณืฉุกเฉิน
        for (let i = 0; i <= 1; i++) {
            await page.waitForSelector(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][name]"]`);
            await page.fill(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][name]"]`, 'การดำเนินงาน');
        
            await page.waitForSelector(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][detail_in_process]"]`);
            await page.fill(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][detail_in_process]"]`, 'อธิบายกระบวนการดำเนินงาน');

            await page.waitForSelector(`input[name="data_provincial_climate_and_emergency_readiness[${i}][data_target_provincial_climate_and_emergency_readiness][0][check]"]`);
            await page.check(`input[name="data_provincial_climate_and_emergency_readiness[${i}][data_target_provincial_climate_and_emergency_readiness][0][check]"]`);
        
            await page.waitForSelector(`input[name="data_provincial_climate_and_emergency_readiness[${i}][processing_time]"]`);
            await page.fill(`input[name="data_provincial_climate_and_emergency_readiness[${i}][processing_time]"]`, 'ระยะเวลาดำเนินการ');
        
            await page.waitForSelector(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][source_of_budget]"]`);
            await page.fill(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][source_of_budget]"]`, 'ที่มาของงบประมาณ');

            await typeInput(page, `input[name="data_provincial_climate_and_emergency_readiness[${i}][number_budget]"]`, '20000');
        
            await page.waitForSelector(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][detail]"]`);
            await page.fill(`textarea[name="data_provincial_climate_and_emergency_readiness[${i}][detail]"]`, 'หมายเหตุ');
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.2.1'); // ตำแหน่ง

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