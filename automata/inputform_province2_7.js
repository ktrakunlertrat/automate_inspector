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

        // 8️⃣ คลิกเมนู "2.7 การขับเคลื่อนและการดำเนินงานของศูนย์เร่งรัดจัดการสวัสดิภาพประชาชน (ศรส.)"
        await page.waitForSelector('//button[contains(., "2.7 การขับเคลื่อนและการดำเนินงานของศูนย์เร่งรัดจัดการสวัสดิภาพประชาชน (ศรส.)")]');
        await page.click('//button[contains(., "2.7 การขับเคลื่อนและการดำเนินงานของศูนย์เร่งรัดจัดการสวัสดิภาพประชาชน (ศรส.)")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0207Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0207Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : สถิติการใช้บริการ
        //ผู้ใช้บริการ (กรณี)
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="detail_service[${i}][number_service_users]"]`);
            await page.fill(`input[name="detail_service[${i}][number_service_users]"]`, '1000');
        }
        //กลุ่มเป้าหมาย (กรณี)
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="usage_statistics_target[${i}][1][number]"]`);
            await page.fill(`input[name="usage_statistics_target[${i}][1][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_target[${i}][2][number]"]`);
            await page.fill(`input[name="usage_statistics_target[${i}][2][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_target[${i}][3][number]"]`);
            await page.fill(`input[name="usage_statistics_target[${i}][3][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_target[${i}][4][number]"]`);
            await page.fill(`input[name="usage_statistics_target[${i}][4][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_target[${i}][5][number]"]`);
            await page.fill(`input[name="usage_statistics_target[${i}][5][number]"]`, '1000');
        }
        //ประเด็นปัญหา (กรณี)
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="usage_statistics_Issues[${i}][1][number]"]`);
            await page.fill(`input[name="usage_statistics_Issues[${i}][1][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_Issues[${i}][2][number]"]`);
            await page.fill(`input[name="usage_statistics_Issues[${i}][2][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_Issues[${i}][3][number]"]`);
            await page.fill(`input[name="usage_statistics_Issues[${i}][3][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_Issues[${i}][4][number]"]`);
            await page.fill(`input[name="usage_statistics_Issues[${i}][4][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_Issues[${i}][5][number]"]`);
            await page.fill(`input[name="usage_statistics_Issues[${i}][5][number]"]`, '1000');
        }
        //ระดับความรุนแรง (กรณี) ทันเวลา , ไม่ทันเวลา
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][1][in_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][1][in_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][1][over_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][1][over_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][2][in_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][2][in_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][2][over_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][2][over_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][3][in_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][3][in_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][3][over_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][3][over_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][4][in_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][4][in_time]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_severity_level[${i}][4][over_time]"]`);
            await page.fill(`input[name="usage_statistics_severity_level[${i}][4][over_time]"]`, '1000');
        }
        //การดำเนินการช่วยเหลือ (กรณี)
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="usage_statistics_operations[${i}][1][number]"]`);
            await page.fill(`input[name="usage_statistics_operations[${i}][1][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_operations[${i}][2][number]"]`);
            await page.fill(`input[name="usage_statistics_operations[${i}][2][number]"]`, '1000');

            await page.waitForSelector(`input[name="usage_statistics_operations[${i}][3][number]"]`);
            await page.fill(`input[name="usage_statistics_operations[${i}][3][number]"]`, '1000');
        }
        //การรายงานผลในระบบ (กรณี)
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="detail_service[${i}][number_reporting_in_system]"]`);
            await page.fill(`input[name="detail_service[${i}][number_reporting_in_system]"]`, '1000');
        }
        //ชี้แจงกรณีไม่เป็นไปตามเป้าหมาย
        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`textarea[name="detail_service[${i}][detail]"]`);
            await page.fill(`textarea[name="detail_service[${i}][detail]"]`, `ชี้แจงกรณีไม่เป็นไปตามเป้าหมาย ${i}`);
        }

        //ส่วนที่ 2 : การสื่อสาร/เผยแพร่ประชาสัมพันธ์
        //ช่องทางการประชาสัมพันธ์ออนไลน์ (online)
        for (let i = 0; i <= 2; i++) {
            await page.waitForSelector(`input[name="public_relation[${i}][check]"]`);
            await page.check(`input[name="public_relation[${i}][check]"]`);
    
            await page.waitForSelector(`textarea[name="public_relation[${i}][detail]"]`);
            await page.fill(`textarea[name="public_relation[${i}][detail]"]`, 'รายละเอียด/กระบวนการ');
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][0][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][0][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][1][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][1][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][2][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][2][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][3][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][3][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][4][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][4][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][number_persons]"]`);
            await page.fill(`input[name="public_relation[${i}][number_persons]"]`, '1000');
        }

        //ช่องทางการประชาสัมพันธ์ออฟไลน์ (offline)
        for (let i = 3; i <= 5; i++) {
            await page.waitForSelector(`input[name="public_relation[${i}][check]"]`);
            await page.check(`input[name="public_relation[${i}][check]"]`);
    
            await page.waitForSelector(`textarea[name="public_relation[${i}][detail]"]`);
            await page.fill(`textarea[name="public_relation[${i}][detail]"]`, 'รายละเอียด/กระบวนการ');
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][0][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][0][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][1][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][1][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][2][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][2][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][3][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][3][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][check_Communication][4][check]"]`);
            await page.check(`input[name="public_relation[${i}][check_Communication][4][check]"]`);
    
            await page.waitForSelector(`input[name="public_relation[${i}][number_pieces_and_time]"]`);
            await page.fill(`input[name="public_relation[${i}][number_pieces_and_time]"]`, '1000');
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.7'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        await page.waitForSelector('input[name="examine"]'); 
        await page.check('input[name="examine"]'); // ติ๊ก Checkbox

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