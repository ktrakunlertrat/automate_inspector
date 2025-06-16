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
        await page.waitForSelector('//button[contains(., "5.2 การจัดทำและขับเคลื่อนแผนปฏิบัติการด้านการพัฒนาสังคมจังหวัด ประจำปีงบประมาณ พ.ศ. 2568")]');
        await page.click('//button[contains(., "5.2 การจัดทำและขับเคลื่อนแผนปฏิบัติการด้านการพัฒนาสังคมจังหวัด ประจำปีงบประมาณ พ.ศ. 2568")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0304Controller?time_count=1&order=5.2&title=การจัดทำและขับเคลื่อนแผนปฏิบัติการด้านการพัฒนาสังคมจังหวัด ประจำปีงบประมาณ พ.ศ. 2568"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0304Controller?time_count=1&order=5.2&title=การจัดทำและขับเคลื่อนแผนปฏิบัติการด้านการพัฒนาสังคมจังหวัด ประจำปีงบประมาณ พ.ศ. 2568"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 ลักษณะโครงการภายใต้แผน
        const data = [
            { index: 1, number: '200' },
            { index: 2, number: '200' },
            { index: 3, number: '200' },
            { index: 4, number: '200' },
            { index: 5, number: '200' },
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, number } = data[i];

            await page.waitForSelector(`input[name="list[${index}][sub_list][1][children_and_youth]"]`);
            await page.fill(`input[name="list[${index}][sub_list][1][children_and_youth]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][2][women_and_family]"]`);
            await page.fill(`input[name="list[${index}][sub_list][2][women_and_family]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][3][persons_with_disabilities]"]`);
            await page.fill(`input[name="list[${index}][sub_list][3][persons_with_disabilities]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][4][elderly]"]`);
            await page.fill(`input[name="list[${index}][sub_list][4][elderly]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][5][homeless_and_beggars]"]`);
            await page.fill(`input[name="list[${index}][sub_list][5][homeless_and_beggars]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][6][working_age]"]`);
            await page.fill(`input[name="list[${index}][sub_list][6][working_age]"]`, number);

            await page.waitForSelector(`input[name="list[${index}][sub_list][7][others]"]`);
            await page.fill(`input[name="list[${index}][sub_list][7][others]"]`, number);

        }

        //ส่วนที่ 2 การขับเคลื่อนและติดตาม
        await page.waitForSelector('textarea[name="data_project_monitoring_and_evaluation_success_level[detail]"]');
        await page.fill('textarea[name="data_project_monitoring_and_evaluation_success_level[detail]"]', 'วิธีการติดตามและประเมินผล');

        await page.waitForSelector('textarea[name="data_action_plan_success_in_addressing_social_issues[detail]"]');
        await page.fill('textarea[name="data_action_plan_success_in_addressing_social_issues[detail]"]', 'ผลการติดตามและประเมินผล');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน5.2'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        // await page.waitForSelector('input[name="examine"]'); 
        // await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        // await page.waitForSelector('textarea[name="opinion"]');
        // await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        // console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        // console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        // await page.waitForTimeout(10000);

        await page.waitForEvent('close');

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();