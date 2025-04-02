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

        // 8️⃣ คลิกเมนู "2.8 โครงการสนับสนุนการจัดสวัสดิการชุมชน"
        await page.waitForSelector('//button[contains(., "2.8 โครงการสนับสนุนการจัดสวัสดิการชุมชน")]');
        await page.click('//button[contains(., "2.8 โครงการสนับสนุนการจัดสวัสดิการชุมชน")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0208Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0208Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1: ข้อมูลกองทุนสวัสดิการชุมชนระดับจังหวัด
        await page.waitForSelector('input[name="number_of_sub_districts"]');
        await page.fill('input[name="number_of_sub_districts"]', '2000');

        await page.waitForSelector('input[name="number_fund_all"]');
        await page.fill('input[name="number_fund_all"]', '2000');

        await page.waitForSelector('input[name="number_of_member"]');
        await page.fill('input[name="number_of_member"]', '2000');

        await page.waitForSelector('input[name="number_fund"]');
        await page.fill('input[name="number_fund"]', '2000');

        await page.waitForSelector('input[name="number_budget"]');
        await page.fill('input[name="number_budget"]', '2000');

        //สุ่มจำนวนกองทุนที่ได้รับการสมทบ ในปี 2567 แบ่งตามรอบที่เคยได้รับการสบทบ (กองทุน)
        await page.waitForSelector('input[name="number_fund_not_qualified"]');
        await page.fill('input[name="number_fund_not_qualified"]', '2000');

        for (let i = 1; i <= 12; i++) {
            await page.waitForSelector(`input[name="data_fund_divided_by_round[${i}][number]"]`);
        }
        
        const randomIndex = Math.floor(Math.random() * 12) + 1;
        await page.check(`input[name="data_fund_divided_by_round[${randomIndex}][number]"]`);

        await page.waitForSelector('textarea[name="detail_fund_not_qualified"]');
        await page.fill('textarea[name="detail_fund_not_qualified"]', 'test');

        //ส่วนที่ 2 : กระบวนการที่ดำเนินงาน
        await page.waitForSelector('input[name="data_processes[0][data_detail_processes][0][number_target]"]');
        await page.fill('input[name="data_processes[0][data_detail_processes][0][number_target]"]', '2000');

        await page.waitForSelector('input[name="data_processes[0][data_detail_processes][1][number_target]"]');
        await page.fill('input[name="data_processes[0][data_detail_processes][1][number_target]"]', '2000');

        await page.waitForSelector('input[name="data_processes[0][data_detail_processes][0][number_results]"]');
        await page.fill('input[name="data_processes[0][data_detail_processes][0][number_results]"]', '2000');

        await page.waitForSelector('input[name="data_processes[0][data_detail_processes][1][number_results]"]');
        await page.fill('input[name="data_processes[0][data_detail_processes][1][number_results]"]', '2000');

        await page.waitForSelector('textarea[name="data_processes[0][detail]"]');
        await page.fill('textarea[name="data_processes[0][detail]"]', 'test 1');

        for (let i = 1; i <= 4; i++) {
            await page.waitForSelector(`input[name="data_processes[${i}][data_detail_processes][0][number_target]"]`);
            await page.fill(`input[name="data_processes[${i}][data_detail_processes][0][number_target]"]`, '2000');
    
            await page.waitForSelector(`input[name="data_processes[${i}][data_detail_processes][0][number_results]"]`);
            await page.fill(`input[name="data_processes[${i}][data_detail_processes][0][number_results]"]`, '2000');
    
            await page.waitForSelector(`textarea[name="data_processes[${i}][detail]"]`);
            await page.fill(`textarea[name="data_processes[${i}][detail]"]`, `test ${i+1}`);
        }

        await page.waitForSelector('input[name="data_processes[5][data_detail_processes][0][number_target]"]');
        await page.fill('input[name="data_processes[5][data_detail_processes][0][number_target]"]', '2000');

        await page.waitForSelector('input[name="data_processes[5][data_detail_processes][1][number_target]"]');
        await page.fill('input[name="data_processes[5][data_detail_processes][1][number_target]"]', '2000');

        await page.waitForSelector('input[name="data_processes[5][data_detail_processes][0][number_results]"]');
        await page.fill('input[name="data_processes[5][data_detail_processes][0][number_results]"]', '2000');

        await page.waitForSelector('input[name="data_processes[5][data_detail_processes][1][number_results]"]');
        await page.fill('input[name="data_processes[5][data_detail_processes][1][number_results]"]', '2000');

        await page.waitForSelector('textarea[name="data_processes[5][detail]"]');
        await page.fill('textarea[name="data_processes[5][detail]"]', 'test 6');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.8'); // ตำแหน่ง

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