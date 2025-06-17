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
        await page.waitForSelector('//button[contains(., "3.4.1 โครงการเสริมพลังศาสนสถานในการจัดสวัสดิการชุมชนเพื่อกลุ่มเปราะบางตามภารกิจที่เหมาะสม")]');
        await page.click('//button[contains(., "3.4.1 โครงการเสริมพลังศาสนสถานในการจัดสวัสดิการชุมชนเพื่อกลุ่มเปราะบางตามภารกิจที่เหมาะสม")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report07Controller?time_count=1&order=3.4.1&title=โครงการเสริมพลังศาสนสถานในการจัดสวัสดิการชุมชนเพื่อกลุ่มเปราะบางตามภารกิจที่เหมาะสม "]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report07Controller?time_count=1&order=3.4.1&title=โครงการเสริมพลังศาสนสถานในการจัดสวัสดิการชุมชนเพื่อกลุ่มเปราะบางตามภารกิจที่เหมาะสม "]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 แผนและผลการดำเนินการ
        await page.waitForSelector('input[name="data_temple_support_plan_and_results[number_temple]"]');
        await page.fill('input[name="data_temple_support_plan_and_results[number_temple]"]', '20');

        await page.waitForSelector('input[name="data_temple_support_plan_and_results[number_vulnerable]"]');
        await page.fill('input[name="data_temple_support_plan_and_results[number_vulnerable]"]', '100');

        //ส่วนที่ 2 กิจกรรมที่ดำเนินงาน
        //A1 มีพื้นที่ปลอดภัยให้พักพิง
        await page.waitForSelector('input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][check_1]"][value="true"]');
        await page.waitForSelector('input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][check_1]"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const optionsA1 = [
            'input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][check_1]"][value="true"]',
            'input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][check_1]"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOptionA1 = optionsA1[Math.floor(Math.random() * optionsA1.length)];

        await page.check(randomOptionA1);

        if (randomOptionA1.includes('value="true"')) {
            for (let i = 1; i <= 6; i++) {
                await page.waitForSelector(`input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
                await page.fill(`input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
            }

            await page.waitForSelector('textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][7][detail]"]');
            await page.fill('textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][7][detail]"]', 'บริการที่จัดให้');
        }

        //A2 แก้ปัญหาเฉพาะหน้า
        await page.waitForSelector('input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][detail]"]');
        await page.fill('input[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][detail]"]', '1000');

        await page.waitForSelector('textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][1][detail]"]');
        await page.fill('textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][1][detail]"]', 'อื่นๆ');

        //A3 ปรับความคิด พัฒนาทักษะ
        for (let i = 0; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[0][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'test');
        }

        //B1 สร้างอาชีพ/รายได้/การออม
        for (let i = 0; i <= 5; i++) {
            await page.waitForSelector(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
        }

        await page.waitForSelector('textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][6][detail]"]');
        await page.fill('textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][6][detail]"]', 'อาชีพที่ส่งเสริม');

        await page.waitForSelector('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][7][detail]"]');
        await page.fill('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][7][detail]"]', '20000');

        await page.waitForSelector('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][8][detail]"]');
        await page.fill('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][8][detail]"]', '20');

        //B2 มีที่อยู่อาศัยมั่นคง
        await page.waitForSelector('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][detail]"]');
        await page.fill('input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][0][detail]"]', '10');

        await page.waitForSelector('textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][1][detail]"]');
        await page.fill('textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][1][detail]"]', 'ระบุพื้นที่ดำเนินการ');

        //B3 ทักษะ/ความคิดในการดำเนินชีวิตที่ปลอดภัย
        // 1)
        for (let i = 0; i <= 1; i++) {
            await page.waitForSelector(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
        }

        for (let i = 2; i <= 4; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'กิจกรรม');
        }

        // 2)
        for (let i = 0; i <= 6; i++) {
            await page.waitForSelector(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][1][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`input[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][1][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
        }

        for (let i = 7; i <= 9; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][1][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[1][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][1][data_temple_support_activities_performed_more][${i}][detail]"]`, 'กิจกรรม');
        }

        //C1 มีความคิดเสียสละ/แบ่งปัน เพื่อส่วนรวม
        for (let i = 0; i <= 6; i++) {
            await page.waitForSelector(`input[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`input[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
        }

        for (let i = 7; i <= 9; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'กิจกรรม');
        }

        //C2 จัดสรรทรัพยากรของตนเองเพื่อการแบ่งปันให้ส่วนรวม
        for (let i = 0; i <= 6; i++) {
            await page.waitForSelector(`input[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`input[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
        }

        for (let i = 7; i <= 9; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[2][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'กิจกรรม');
        }

        //D1 มีชุดข้อมูล/ความรู้ที่มีคุณภาพเหมาะสมกับสถานการณ์สังคมปัจจุบัน
        for (let i = 0; i <= 3; i++) {
            if (i === 0 || i === 2) {
                await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
                await page.fill(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'text');
            } else if (i === 1 || i === 3) {
                await page.waitForSelector(`input[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
                await page.fill(`input[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][0][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, '20');
            }
        }

        //D2 มีช่องทาง กลไก และกระบวนการสื่อสารที่มีประสิทธิภาพ
        for (let i = 0; i <= 1; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][1][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'test');
        }

        //D3 มีการสรุปบทเรียนความสำเร็จและสื่อสารให้สังคมเห็นด้วยและขยายความร่วมมือ
        for (let i = 0; i <= 3; i++) {
            await page.waitForSelector(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`);
            await page.fill(`textarea[name="data_temple_support_activities_performed[3][data_temple_support_activities_performed_title][2][data_temple_support_activities_performed_detail][0][data_temple_support_activities_performed_more][${i}][detail]"]`, 'กิจกรรม');
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน3.4.1'); // ตำแหน่ง

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