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
        await page.waitForSelector('//button[contains(., "4.3.1 ระบบสมุดพกครอบครัวอิเล็กทรอนิกส์ (MSO-Logbook)")]');
        await page.click('//button[contains(., "4.3.1 ระบบสมุดพกครอบครัวอิเล็กทรอนิกส์ (MSO-Logbook)")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0301Controller?time_count=1&order=4.3.1&title=ระบบสมุดพกครอบครัวอิเล็กทรอนิกส์ (MSO-Logbook)"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0301Controller?time_count=1&order=4.3.1&title=ระบบสมุดพกครอบครัวอิเล็กทรอนิกส์ (MSO-Logbook)"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        //ส่วนที่ 1 : แผนและผลการดำเนินงาน        
        const data = [
            { index: 1, number1: '100', number2: '50', detail: 'คำชี้แจง' },
            { index: 2, number1: '100', number2: '50', detail: 'คำชี้แจง' },
            { index: 3, number1: '100', number2: '50', detail: 'คำชี้แจง' },
            { index: 4, number1: '100', number2: '50', detail: 'คำชี้แจง' },
            { index: 5, number1: '100', number2: '50', detail: 'คำชี้แจง' },
            { index: 6, number1: '100', number2: '50', detail: 'คำชี้แจง' },
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, number1, number2, detail } = data[i];
            
            await page.waitForSelector(`input[name="vulnerable_households[${index}][number_operational_target]"]`);
            await page.fill(`input[name="vulnerable_households[${index}][number_operational_target]"]`, number1);

            await page.waitForSelector(`input[name="vulnerable_households[${index}][number_duplicate_family_target]"]`);
            await page.fill(`input[name="vulnerable_households[${index}][number_duplicate_family_target]"]`, number2);

            await page.waitForSelector(`input[name="vulnerable_households[${index}][number_new_family_target]"]`);
            await page.fill(`input[name="vulnerable_households[${index}][number_new_family_target]"]`, number2);

            await page.waitForSelector(`input[name="vulnerable_households[${index}][number_duplicate_family_results]"]`);
            await page.fill(`input[name="vulnerable_households[${index}][number_duplicate_family_results]"]`, number2);

            await page.waitForSelector(`input[name="vulnerable_households[${index}][number_new_family_results]"]`);
            await page.fill(`input[name="vulnerable_households[${index}][number_new_family_results]"]`, number2);

            await page.waitForSelector(`textarea[name="vulnerable_households[${index}][detail]"]`);
            await page.fill(`textarea[name="vulnerable_households[${index}][detail]"]`, detail);
        }

        //ส่วนที่ 2 : การให้ความช่วยเหลือ/พัฒนาคุณภาพชีวิตครัวเรือนเปราะบางเชิงคุณภาพ
        await typeInput(page, 'input[name="number_target_family"]', '20');

        await typeInput(page, 'input[name="number_recommend"]', '40');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน4.3.1'); // ตำแหน่ง

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