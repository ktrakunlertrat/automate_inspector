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
        await page.waitForSelector('//button[contains(., "1.4.2 การส่งเสริมอาชีพและรายได้ตามบริบทของพื้นที่จังหวัด")]');
        await page.click('//button[contains(., "1.4.2 การส่งเสริมอาชีพและรายได้ตามบริบทของพื้นที่จังหวัด")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report05Controller?time_count=1&order=1.4.2&title=การส่งเสริมอาชีพและรายได้ตามบริบทของพื้นที่จังหวัด"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report05Controller?time_count=1&order=1.4.2&title=การส่งเสริมอาชีพและรายได้ตามบริบทของพื้นที่จังหวัด"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : งบประมาณ
        //1.ยกระดับการพัฒนาศักยภาพเด็กปฐมวัย
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_driving[1][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[1][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[1][${i}][detil_other]"]`, 'test');
        }

        //2.ปรับปรุงโครงสร้างพื้นฐานในการดูแลผู้สูงอายุ
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`textarea[name="data_driving[2][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[2][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[2][${i}][detil_other]"]`, 'test');
        }

        //3.สร้างงาน สร้างรายได้ พัฒนาคุณภาพชีวิตกลุ่มคนเปราะบาง
        for (let i = 1; i <= 2; i++) {
            await page.waitForSelector(`textarea[name="data_driving[3][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[3][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[3][${i}][detil_other]"]`, 'test');
        }

        //4.พัฒนาคุณภาพชีวิตคนพิการ
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_driving[4][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[4][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[4][${i}][detil_other]"]`, 'test');
        }

        //5.สร้างหุ้นส่วนทางสังคม สู่สวัสดิการที่ยั่งยืน
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_driving[5][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[5][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[5][${i}][detil_other]"]`, 'test');
        }

        //6.พันธกรณีระหว่างต่างประเทศที่สำคัญ
        for (let i = 1; i <= 2; i++) {
            await page.waitForSelector(`textarea[name="data_driving[6][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[6][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[6][${i}][detil_other]"]`, 'test');
        }

        //7.สื่อสาร ประชาสัมพันธ์ทางสังคมเชิงรุก
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_driving[7][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[7][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[7][${i}][detil_other]"]`, 'test');
        }

        //8.พัฒนาศักยภาพบุคลากร พม.
        for (let i = 1; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_driving[8][${i}][project_driving_awareness]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][project_driving_awareness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][participation_of_local_agencies]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][participation_of_local_agencies]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][Local_project_progress]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][Local_project_progress]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][support_needs]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][support_needs]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][local_alignment_responsiveness]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][local_alignment_responsiveness]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][problems_obstacles_operational]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][problems_obstacles_operational]"]`, 'test');

            await page.waitForSelector(`textarea[name="data_driving[8][${i}][detil_other]"]`);
            await page.fill(`textarea[name="data_driving[8][${i}][detil_other]"]`, 'test');
        }

        //9.พัฒนาระบบ พม.ดิจิทัล และฐานข้อมูล
            await page.waitForSelector('textarea[name="data_driving[9][1][project_driving_awareness]"]');
            await page.fill('textarea[name="data_driving[9][1][project_driving_awareness]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][participation_of_local_agencies]"]');
            await page.fill('textarea[name="data_driving[9][1][participation_of_local_agencies]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][Local_project_progress]"]');
            await page.fill('textarea[name="data_driving[9][1][Local_project_progress]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][support_needs]"]');
            await page.fill('textarea[name="data_driving[9][1][support_needs]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][local_alignment_responsiveness]"]');
            await page.fill('textarea[name="data_driving[9][1][local_alignment_responsiveness]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][problems_obstacles_operational]"]');
            await page.fill('textarea[name="data_driving[9][1][problems_obstacles_operational]"]', 'test');

            await page.waitForSelector('textarea[name="data_driving[9][1][detil_other]"]');
            await page.fill('textarea[name="data_driving[9][1][detil_other]"]', 'test');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.4.2'); // ตำแหน่ง

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