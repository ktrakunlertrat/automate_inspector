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
        await page.waitForSelector('//button[contains(., " 3.2.1 โครงการส่งเสริมบทบาทอาสาสมัครพัฒนาสังคมและความมั่นคงของมนุษย์ (อพม.) ระดับจังหวัด")]');
        await page.click('//button[contains(., " 3.2.1 โครงการส่งเสริมบทบาทอาสาสมัครพัฒนาสังคมและความมั่นคงของมนุษย์ (อพม.) ระดับจังหวัด")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0204Controller?time_count=1&order=3.2.1&title=โครงการส่งเสริมบทบาทอาสาสมัครพัฒนาสังคมและความมั่นคงของมนุษย์ (อพม.) ระดับจังหวัด"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0204Controller?time_count=1&order=3.2.1&title=โครงการส่งเสริมบทบาทอาสาสมัครพัฒนาสังคมและความมั่นคงของมนุษย์ (อพม.) ระดับจังหวัด"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : เครือข่ายหุ้นส่วนทางสังคมในจังหวัด
        await page.waitForSelector('input[name="number_now_statistics"]');
        await page.fill('input[name="number_now_statistics"]', '2000'); // อพม.ทั้งหมด (คน)

        await page.waitForSelector('input[name="number_new_now_elevation"]');
        await page.fill('input[name="number_new_now_elevation"]', '1000'); // อพม.เดิม (คน)

        await page.waitForSelector('input[name="number_old_now_elevation"]');
        await page.fill('input[name="number_old_now_elevation"]', '1000'); // อพม.ใหม่ (คน)

        await page.waitForSelector('input[name="number_active"]');
        await page.fill('input[name="number_active"]', '1000'); // จำนวน (คน)

        await page.waitForSelector('input[name="number_all_target_elevation"]');
        await page.fill('input[name="number_all_target_elevation"]', '1000'); // จำนวน อพม. ที่ได้รับการเสริมสร้างและพัฒนาศักยภาพ (คน)

        await page.waitForSelector('input[name="number_new_target_elevation"]');
        await page.fill('input[name="number_new_target_elevation"]', '1000'); // อพม.เดิม (คน)

        await page.waitForSelector('input[name="number_old_target_elevation"]');
        await page.fill('input[name="number_old_target_elevation"]', '1000'); // อพม.ใหม่ (คน)

        //1.2
        await page.waitForSelector('input[name="data_generation_sdhsv_capacity_building_activities[0][number_generation]"]');
        await page.fill('input[name="data_generation_sdhsv_capacity_building_activities[0][number_generation]"]', '1000');

        await page.waitForSelector('textarea[name="data_generation_sdhsv_capacity_building_activities[0][detail]"]');
        await page.fill('textarea[name="data_generation_sdhsv_capacity_building_activities[0][detail]"]', 'อธิบายรายละเอียด');

        //ส่วนที่ 2 : ผลการดำเนินงานโครงการ
        // ฟังก์ชันใช้กรอกข้อมูลใน input ที่มี AutoNumeric
        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        for (let i = 0; i <= 3; i++) {
            if (i === 3) {
                await typeInput(page, 'input[name="data_budget_of_project_sdhsv_new[3][number_sdhsv]"]', '100');

                await typeInput(page, 'input[name="data_budget_of_project_sdhsv_new[3][number_budget_results]"]', '25000');
            } else {
                await typeInput(page, `input[name="data_budget_of_project_sdhsv_new[${i}][number_budget_results]"]`, '25000');
            }
        }

        //ส่วนที่ 3 : ผลการเบิกจ่ายงบประมาณโครงการฯ
        const activities = [
            { index: 0, count: 2, description: 'คำอธิบาย 1' },
            { index: 1, count: 3, description: 'คำอธิบาย 2' },
            { index: 2, count: 2, description: 'คำอธิบาย 3' },
            { index: 3, count: 1, description: 'คำอธิบาย 4' }
        ];
        
        for (const { index, count, description } of activities) {
            for (let i = 0; i <= count; i++) {
                const base = `data_results_of_project_sdhsv[${index}][data_detila_results_of_project_sdhsv][${i}]`;
                await page.waitForSelector(`input[name="${base}[check]"]`);
                await page.check(`input[name="${base}[check]"]`);
                await page.waitForSelector(`textarea[name="${base}[detail]"]`);
                await page.fill(`textarea[name="${base}[detail]"]`, description);
            }
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน3.2.1'); // ตำแหน่ง

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