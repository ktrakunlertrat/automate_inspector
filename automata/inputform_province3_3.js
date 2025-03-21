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
        await page.fill('#user_id', 'cop-pna');
        await page.fill('#password', '123456');

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

        // 8️⃣ คลิกเมนู "3.3 ระดับความสำเร็จในการขับเคลื่อนกลไกการส่งต่อระดับชาติระดับจังหวัด (National Referral Mechanism : NRM)"
        await page.waitForSelector('//button[contains(., "3.3 ระดับความสำเร็จในการขับเคลื่อนกลไกการส่งต่อระดับชาติระดับจังหวัด (National Referral Mechanism : NRM)")]');
        await page.click('//button[contains(., "3.3 ระดับความสำเร็จในการขับเคลื่อนกลไกการส่งต่อระดับชาติระดับจังหวัด (National Referral Mechanism : NRM)")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0303Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0303Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //จังหวัดของท่านอยู่ในกลุ่มเฝ้าระวังใด
        await page.waitForSelector('input[name="surveillance_group_id"][value="1 "]');
        await page.waitForSelector('input[name="surveillance_group_id"][value="2 "]');
        await page.waitForSelector('input[name="surveillance_group_id"][value="3 "]');

        // สร้าง Array ของตัวเลือก
        const options = [
            'input[name="surveillance_group_id"][value="1 "]',
            'input[name="surveillance_group_id"][value="2 "]',
            'input[name="surveillance_group_id"][value="3 "]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption = options[Math.floor(Math.random() * options.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption);

        // //ปัญหา/อุปสรรค และข้อเสนอแนะ
        // await page.waitForSelector('textarea[name="data_Problems[1][problems_obstacles]"]');
        // await page.fill('textarea[name="data_Problems[1][problems_obstacles]"]', 'ปัญหาเเละอุปสรรค'); // ปัญหาเเละอุปสรรค

        // await page.waitForSelector('textarea[name="data_Problems[1][suggestions]"]');
        // await page.fill('textarea[name="data_Problems[1][suggestions]"]', 'ข้อเสนอแนะ'); // ข้อเสนอแนะ

        // console.log('กรอกข้อมูลปัญหา/อุปสรรคสำเร็จ!');

        // //ไฟล์ประกอบรายงาน
        // await page.waitForSelector('input[name="file"]'); 
        // await page.setInputFiles('input[name="file"]', 'D:\\งาน\\playwright\\test_file.jpg');  // ไฟล์

        // await page.waitForSelector('textarea[name="descriptionInput"]');
        // await page.fill('textarea[name="descriptionInput"]', 'คำอธิบาย'); // คำอธิบาย

        // console.log('อัปโหลดไฟล์ประกอบรายงานสำเร็จ!');

        // //ผู้รายงาน
        // await page.waitForSelector('input[name="first_name_reporter"]');
        // await page.fill('input[name="first_name_reporter"]', 'ผู้รายงาน1'); // ชื่อ

        // await page.waitForSelector('input[name="last_name_reporter"]');
        // await page.fill('input[name="last_name_reporter"]', 'ผู้รายงาน2'); // นามสกุล

        // await page.waitForSelector('input[name="position_name_reporter"]');
        // await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.10'); // ตำแหน่ง

        // console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        // //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        // await page.waitForSelector('input[name="examine"]'); 
        // await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        // await page.waitForSelector('textarea[name="opinion"]');
        // await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        // console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        // console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();