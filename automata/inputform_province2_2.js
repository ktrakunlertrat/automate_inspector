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
        // await page.fill('#user_id', 'cop-pna');
        // await page.fill('#password', '123456');

        //province cop ยะลา
        await page.fill('#user_id', 'cop-yla');
        await page.fill('#password', 'p@yala95Pmj');

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

        // 8️⃣ คลิกเมนู "2.2 โครงการพัฒนาระบบและขับเคลื่อนกลไกการปกป้องคุ้มครองเด็กและเยาวชน"
        await page.waitForSelector('//button[contains(., "2.2 โครงการพัฒนาระบบและขับเคลื่อนกลไกการปกป้องคุ้มครองเด็กและเยาวชน")]');
        await page.click('//button[contains(., "2.2 โครงการพัฒนาระบบและขับเคลื่อนกลไกการปกป้องคุ้มครองเด็กและเยาวชน")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0202Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0202Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : สถานการณ์เด็กและเยาวชนในจังหวัด
        //1.1 ผลการเบิกจ่ายงบประมาณที่ได้รับจัดสรรของกระทรวง พม.
        for (let i = 0; i <= 2; i++) {
            await page.waitForSelector(`input[name="protection_reports[${i}][check]"]`);
            await page.check(`input[name="protection_reports[${i}][check]"]`);
        }

        //1.2 จังหวัดของท่านมีการกำหนดนโยบาย ยุทธศาสตร์และแผนปฏิบัติการคุ้มครองเด็กและเยาวชนที่สอดคล้องกับสถานการณ์เด็กและเยาวชนของจังหวัด
        await page.waitForSelector('input[name="data_child_and_youth_protection_plans[0][check]"]');
        await page.check('input[name="data_child_and_youth_protection_plans[0][check]"]');

        for (let i = 0; i <= 2; i++) {
            await page.waitForSelector(`textarea[name="data_detailrank_child_and_youth_protection_plans[${i}][detail]"]`);
            await page.fill(`textarea[name="data_detailrank_child_and_youth_protection_plans[${i}][detail]"]`, `test ${i}`);
        }

        for (let i = 0; i < 3; i++) {
            await page.waitForSelector(`input[name="data_urgent_situation_child_and_youth_protection_plans[${i}][data_plans_of_urgent_situation][0][name]"]`);
            await page.fill(`input[name="data_urgent_situation_child_and_youth_protection_plans[${i}][data_plans_of_urgent_situation][0][name]"]`, `test ${i}`);
        
            for (let j = 1; j <= 3; j++) {
                await page.waitForSelector(`input[id="${i + 1}.${j}"]`);
                await page.check(`input[id="${i + 1}.${j}"]`);
            }
        
            await page.waitForSelector(`textarea[name="data_urgent_situation_child_and_youth_protection_plans[${i}][data_plans_of_urgent_situation][0][detail]"]`);
            await page.fill(`textarea[name="data_urgent_situation_child_and_youth_protection_plans[${i}][data_plans_of_urgent_situation][0][detail]"]`, `หมายเหตุ ${i}`);
        }

        //ส่วนที่ 2 : งบประมาณ
        await page.waitForSelector('input[name="number_budget"]');
        await page.fill('input[name="number_budget"]', '2000');

        await page.waitForSelector('input[name="number_result_budget"]');
        await page.fill('input[name="number_result_budget"]', '1000');

        //ส่วนที่ 3 : กระบวนงาน
        //3.1
        await page.waitForSelector('input[id="3_1_yes"][value="true"]');
        await page.waitForSelector('input[id="3_1_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options1 = [
            'input[id="3_1_yes"][value="true"]',
            'input[id="3_1_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption1 = options1[Math.floor(Math.random() * options1.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption1);

        if (randomOption1.includes('value="true"')) {
            await page.waitForSelector('input[name="data_process_of_child_and_youth_protection_reports[0][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]');
            await page.fill('input[name="data_process_of_child_and_youth_protection_reports[0][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]', '1000');
        } else {
            await page.waitForSelector('textarea[name="data_process_of_child_and_youth_protection_reports[0][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]');
            await page.fill('textarea[name="data_process_of_child_and_youth_protection_reports[0][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]', 'ไม่มี');
        }

        //3.2
        await page.waitForSelector('input[id="3_2_yes"][value="true"]');
        await page.waitForSelector('input[id="3_2_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options2 = [
            'input[id="3_2_yes"][value="true"]',
            'input[id="3_2_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption2);

        if (randomOption2.includes('value="true"')) {
            await page.waitForSelector('input[name="data_process_of_child_and_youth_protection_reports[1][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]');
            await page.fill('input[name="data_process_of_child_and_youth_protection_reports[1][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]', '1000');
        } else {
            await page.waitForSelector('textarea[name="data_process_of_child_and_youth_protection_reports[1][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]');
            await page.fill('textarea[name="data_process_of_child_and_youth_protection_reports[1][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]', 'ไม่มี');
        }

        //3.3
        await page.waitForSelector('input[id="3_3_yes"][value="true"]');
        await page.waitForSelector('input[id="3_3_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options3 = [
            'input[id="3_3_yes"][value="true"]',
            'input[id="3_3_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption3 = options3[Math.floor(Math.random() * options3.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption3);

        if (randomOption3.includes('value="true"')) {
            await page.waitForSelector('input[name="data_process_of_child_and_youth_protection_reports[2][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]');
            await page.fill('input[name="data_process_of_child_and_youth_protection_reports[2][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]', '1000');
        } else {
            await page.waitForSelector('textarea[name="data_process_of_child_and_youth_protection_reports[2][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]');
            await page.fill('textarea[name="data_process_of_child_and_youth_protection_reports[2][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]', 'ไม่มี');
        }

        //3.4
        await page.waitForSelector('input[id="3_4_yes"][value="true"]');
        await page.waitForSelector('input[id="3_4_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options4 = [
            'input[id="3_4_yes"][value="true"]',
            'input[id="3_4_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption4 = options4[Math.floor(Math.random() * options4.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption4);

        if (randomOption4.includes('value="true"')) {
            await page.waitForSelector('input[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]');
            await page.fill('input[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]', '1000');

            for (let i = 1; i <=5; i++) {
                await page.waitForSelector(`input[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][${i}][check]"]`);
                await page.check(`input[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][${i}][check]"]`);

                await page.waitForSelector(`textarea[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][${i}][detail]"]`);
                await page.fill(`textarea[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][${i}][detail]"]`, `test ${i}`);
            }
        } else {
            await page.waitForSelector('textarea[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]');
            await page.fill('textarea[name="data_process_of_child_and_youth_protection_reports[3][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]', 'ไม่มี');
        }

        //3.5
        await page.waitForSelector('input[id="3_5_yes"][value="true"]');
        await page.waitForSelector('input[id="3_5_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options5 = [
            'input[id="3_5_yes"][value="true"]',
            'input[id="3_5_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption5 = options5[Math.floor(Math.random() * options5.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption5);

        if (randomOption5.includes('value="true"')) {
            await page.waitForSelector('input[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]');
            await page.fill('input[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][0][detail]"]', '1000');

            for (let i = 1; i <=10; i++) {
                await page.waitForSelector(`input[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][${i}][check]"]`);
                await page.check(`input[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][${i}][check]"]`);
            }
        } else {
            await page.waitForSelector('textarea[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]');
            await page.fill('textarea[name="data_process_of_child_and_youth_protection_reports[4][data_detail_process_of_child_and_youth_protection_reports][0][detail_false]"]', 'ไม่มี');
        }

        //3.6
        await page.waitForSelector('input[id="3_6_yes"][value="true"]');
        await page.waitForSelector('input[id="3_6_no"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options6 = [
            'input[id="3_6_yes"][value="true"]',
            'input[id="3_6_no"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption6 = options6[Math.floor(Math.random() * options6.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption6);

        if (randomOption6.includes('value="true"')) {
            await page.waitForSelector('textarea[id="3_6_detail"]');
            await page.fill('textarea[id="3_6_detail"]', 'ระบุปัญหา');

            await page.waitForSelector('input[id="fileInput_3"]'); 
            await page.setInputFiles('input[id="fileInput_3"]', 'D:\\งาน\\playwright\\test_file.jpg');
        }

        //ปัญหา/อุปสรรค และข้อเสนอแนะ
        await page.waitForSelector('textarea[name="data_Problems[1][problems_obstacles]"]');
        await page.fill('textarea[name="data_Problems[1][problems_obstacles]"]', 'ปัญหาเเละอุปสรรค'); // ปัญหาเเละอุปสรรค

        await page.waitForSelector('textarea[name="data_Problems[1][suggestions]"]');
        await page.fill('textarea[name="data_Problems[1][suggestions]"]', 'ข้อเสนอแนะ'); // ข้อเสนอแนะ

        console.log('กรอกข้อมูลปัญหา/อุปสรรคสำเร็จ!');

        //ไฟล์ประกอบรายงาน
        await page.waitForSelector('input[id="fileInput"]'); 
        await page.setInputFiles('input[id="fileInput"]', 'D:\\งาน\\playwright\\test_file.jpg');  // ไฟล์

        await page.waitForSelector('textarea[name="descriptionInput"]');
        await page.fill('textarea[name="descriptionInput"]', 'คำอธิบาย'); // คำอธิบาย

        console.log('อัปโหลดไฟล์ประกอบรายงานสำเร็จ!');

        //ผู้รายงาน
        await page.waitForSelector('input[name="first_name_reporter"]');
        await page.fill('input[name="first_name_reporter"]', 'ผู้รายงาน1'); // ชื่อ

        await page.waitForSelector('input[name="last_name_reporter"]');
        await page.fill('input[name="last_name_reporter"]', 'ผู้รายงาน2'); // นามสกุล

        await page.waitForSelector('input[name="position_name_reporter"]');
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.2'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        await page.waitForSelector('input[name="checkbox"]'); 
        await page.check('input[name="checkbox"]'); // ติ๊ก Checkbox

        await page.waitForSelector('textarea[name="opinion"]');
        await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

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