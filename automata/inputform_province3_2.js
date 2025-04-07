const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, args: ['--lang=th-TH'] }); // เปิด Browser แบบมี UI
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
        // await page.fill('#user_id', 'cop-yla');
        // await page.fill('#password', 'p@yala95Pmj');

        //admin
        await page.fill('#user_id', 'admin');
        await page.fill('#password', 'adminnarong');

        // 4️⃣ คลิกปุ่ม Login
        await page.click('button[type="submit"]');

        // 5️⃣ รอให้เปลี่ยนหน้าและตรวจสอบการ Login สำเร็จ
        await page.waitForSelector('p.text-sm.ml-1.text-blue-600'); // รอให้ข้อความ "บ้านพักเด็กและครอบครัว" ปรากฏ
        console.log('Login สำเร็จ!');

        // 6️⃣ เลือกหน่วยงาน "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"
        await page.waitForSelector('select[name="province"]');
        await page.selectOption('select[name="province"]', { label: 'ยะลา' });

        await page.waitForSelector('select[name="org_id"]');
        await page.selectOption('select[name="org_id"]', { label: 'สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์' }); // เลือก "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์"

        // 7️⃣ รอให้หน้าโหลดหลังการเลือกหน่วยงาน
        await page.waitForNavigation(); // รอการโหลดหน้าใหม่หลังจากที่ฟอร์มถูกส่ง

        // 8️⃣ คลิกเมนู " 3.2 ร้อยละความสำเร็จของการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมผ่านระบบ พม. Smart"
        await page.waitForSelector('//button[contains(., " 3.2 ร้อยละความสำเร็จของการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมผ่านระบบ พม. Smart")]');
        await page.click('//button[contains(., " 3.2 ร้อยละความสำเร็จของการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมผ่านระบบ พม. Smart")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0302Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0302Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : ผลการบันทึกข้อมูล
        function getRandomDate(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0]; // แปลงเป็น "YYYY-MM-DD"
        }
        
        const randomDate = getRandomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)); // สุ่มวันที่ระหว่าง 2020 - 2025
        
        // สุ่ม วันที่
        await page.waitForSelector('input[name="data_date"]');
        await page.fill('input[name="data_date"]', randomDate);

        //แถวที่ 1
        await page.waitForSelector('input[name="results_of_vsmart[1][agency_list][1][number_budget_allocation]"]');
        await page.fill('input[name="results_of_vsmart[1][agency_list][1][number_budget_allocation]"]', '1,000');

        await page.waitForSelector('input[name="results_of_vsmart[1][agency_list][1][number_budget_disbursement]"]');
        await page.fill('input[name="results_of_vsmart[1][agency_list][1][number_budget_disbursement]"]', '1,000');

        await page.waitForSelector('input[name="results_of_vsmart[1][agency_list][1][number_of_recorded_assistance]"]');
        await page.fill('input[name="results_of_vsmart[1][agency_list][1][number_of_recorded_assistance]"]', '1,000');

        await page.waitForSelector('input[name="results_of_vsmart[1][agency_list][1][number_budget_remaining]"]');
        await page.fill('input[name="results_of_vsmart[1][agency_list][1][number_budget_remaining]"]', '1,000');

        //แถว 2 - 6
        const agencyIndices = [1, 2];
        const fields = [
        'number_budget_allocation',
        'number_budget_disbursement',
        'number_of_recorded_assistance',
        'number_budget_remaining'
        ];

        for (let i = 2; i <= 6; i++) {
            for (const agency of agencyIndices) {
                for (const field of fields) {
                // ข้ามฟิลด์ที่ไม่มีใน agency 1
                if (agency === 1 && field === 'number_budget_remaining') continue;

                const selector = `input[name="results_of_vsmart[${i}][agency_list][${agency}][${field}]"]`;
                await page.waitForSelector(selector);
                await page.fill(selector, '1,000');
                }
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน3.2'); // ตำแหน่ง

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