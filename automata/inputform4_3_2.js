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
        await page.waitForSelector('//button[contains(., "4.3.2 ระบบการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมในระบบ พม.Smart")]');
        await page.click('//button[contains(., "4.3.2 ระบบการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมในระบบ พม.Smart")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0302Controller?time_count=1&order=4.3.2&title=ระบบการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมในระบบ พม.Smart"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0302Controller?time_count=1&order=4.3.2&title=ระบบการบันทึกข้อมูลการให้ความช่วยเหลือผู้ประสบปัญหาทางสังคมในระบบ พม.Smart"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        //ส่วนที่ 1 : ผลการบันทึกข้อมูล
        function getRandomDate(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0]; // แปลงเป็น "YYYY-MM-DD"
        }
        
        const randomDate = getRandomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)); // สุ่มวันที่ระหว่าง 2020 - 2025
        
        // สุ่ม วันที่
        await page.waitForSelector('input[name="data_date"]');
        await page.fill('input[name="data_date"]', randomDate);

        //1 เงินช่วยเหลือผู้ประสบปัญหาทางสังคมกรณีฉุกเฉิน
        await typeInput(page, 'input[name="results_of_vsmart[1][agency_list][1][number_budget_allocation]"]', '200000');
        await typeInput(page, 'input[name="results_of_vsmart[1][agency_list][1][number_budget_disbursement]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[1][agency_list][1][number_budget_remaining]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[1][agency_list][1][number_of_recorded_assistance]"]', '20000');

        //2 เงินสงเคราะห์เด็กในครอบครัวยากจน
        for (let i = 1; i <= 2; i++) {
            await typeInput(page, `input[name="results_of_vsmart[2][agency_list][${i}][number_budget_allocation]"]`, '200000');
            await typeInput(page, `input[name="results_of_vsmart[2][agency_list][${i}][number_budget_disbursement]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[2][agency_list][${i}][number_budget_remaining]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[2][agency_list][${i}][number_of_recorded_assistance]"]`, '20000');            
        }

        //3 เงินสงเคราะห์และฟื้นฟูสมรรถภาพคนพิการ
        for (let i = 1; i <= 2; i++) {
            await typeInput(page, `input[name="results_of_vsmart[3][agency_list][${i}][number_budget_allocation]"]`, '200000');
            await typeInput(page, `input[name="results_of_vsmart[3][agency_list][${i}][number_budget_disbursement]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[3][agency_list][${i}][number_budget_remaining]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[3][agency_list][${i}][number_of_recorded_assistance]"]`, '20000');            
        }

        //4 เงินสงเคราะห์ผู้สูงอายุในภาวะยากลำบาก
        await typeInput(page, 'input[name="results_of_vsmart[4][agency_list][1][number_budget_allocation]"]', '200000');
        await typeInput(page, 'input[name="results_of_vsmart[4][agency_list][1][number_budget_disbursement]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[4][agency_list][1][number_budget_remaining]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[4][agency_list][1][number_of_recorded_assistance]"]', '20000');

        //5 เงินสงเคราะห์ผู้มีรายได้น้อยและไร้ที่พึ่ง
        for (let i = 1; i <= 2; i++) {
            await typeInput(page, `input[name="results_of_vsmart[5][agency_list][${i}][number_budget_allocation]"]`, '200000');
            await typeInput(page, `input[name="results_of_vsmart[5][agency_list][${i}][number_budget_disbursement]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[5][agency_list][${i}][number_budget_remaining]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[5][agency_list][${i}][number_of_recorded_assistance]"]`, '20000');            
        }

        //6 เงินสงเคราะห์สตรีหรือครอบครัวที่ประสบปัญหาทางสังคม
        await typeInput(page, 'input[name="results_of_vsmart[6][agency_list][1][number_budget_allocation]"]', '200000');
        await typeInput(page, 'input[name="results_of_vsmart[6][agency_list][1][number_budget_disbursement]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[6][agency_list][1][number_budget_remaining]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[6][agency_list][1][number_of_recorded_assistance]"]', '20000');

        //7 เงินสงเคราะห์คนไทยตกทุกข์ได้ยากกลับภูมิลำเนาเดิม
        for (let i = 1; i <= 3; i++) {
            await typeInput(page, `input[name="results_of_vsmart[7][agency_list][${i}][number_budget_allocation]"]`, '200000');
            await typeInput(page, `input[name="results_of_vsmart[7][agency_list][${i}][number_budget_disbursement]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[7][agency_list][${i}][number_budget_remaining]"]`, '20000');
            await typeInput(page, `input[name="results_of_vsmart[7][agency_list][${i}][number_of_recorded_assistance]"]`, '20000');            
        }

        //8 เงินค่าจัดการศพผู้สูงอายุตามประเพณี
        await typeInput(page, 'input[name="results_of_vsmart[8][agency_list][1][number_budget_allocation]"]', '200000');
        await typeInput(page, 'input[name="results_of_vsmart[8][agency_list][1][number_budget_disbursement]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[8][agency_list][1][number_budget_remaining]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[8][agency_list][1][number_of_recorded_assistance]"]', '20000');

        //9 เงินสงเคราะห์เด็กครอบครัวอุปถัมป์
        await typeInput(page, 'input[name="results_of_vsmart[9][agency_list][1][number_budget_allocation]"]', '200000');
        await typeInput(page, 'input[name="results_of_vsmart[9][agency_list][1][number_budget_disbursement]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[9][agency_list][1][number_budget_remaining]"]', '20000');
        await typeInput(page, 'input[name="results_of_vsmart[9][agency_list][1][number_of_recorded_assistance]"]', '20000');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน4.3.2'); // ตำแหน่ง

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