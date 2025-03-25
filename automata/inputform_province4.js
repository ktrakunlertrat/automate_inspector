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

        // 8️⃣ คลิกเมนู " 4.โครงการเพิ่มทักษะด้านอาชีพแก่นักเรียนที่ไม่ได้เรียนต่อหลัง"
        await page.waitForSelector('//button[contains(., " 4.โครงการเพิ่มทักษะด้านอาชีพแก่นักเรียนที่ไม่ได้เรียนต่อหลัง")]');
        await page.click('//button[contains(., " 4.โครงการเพิ่มทักษะด้านอาชีพแก่นักเรียนที่ไม่ได้เรียนต่อหลัง")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report04Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report04Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : จำนวนนักเรียนที่เข้าร่วมโครงการและการให้ความช่วยเหลือ (ประเภทเงินสงเคราะห์)
        //ชื่อ - นามสกุล
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][full_name]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][full_name]"]', 'เอ รักบี');

        //สุ่ม เพศ
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][gender]"][value="1"]');
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][gender]"][value="2"]');

        const gender = [
            'input[name="data_detail_student_participation_and_support[0][gender]"][value="1"]',
            'input[name="data_detail_student_participation_and_support[0][gender]"][value="2"]'
        ];

        const randomGender = gender[Math.floor(Math.random() * gender.length)];

        await page.check(randomGender);

        //อายุ
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][age]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][age]"]', '15');

        //สุ่ม ประเภทเงินสงเคราะห์/เงินกองทุน
        const options = ["1", "2", "3", "4", "5"]; // ค่า value ที่เลือกได้
        const randomOption = options[Math.floor(Math.random() * options.length)]; // สุ่มค่า

        await page.waitForSelector('select[name="data_detail_student_participation_and_support[0][type_money_id]"]');
        await page.selectOption('select[name="data_detail_student_participation_and_support[0][type_money_id]"]', randomOption);

        //จำนวนเงิน
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][amount]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][amount]"]', '20000');

        //function สุ่ม วันที่
        function getRandomDate1(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0]; // แปลงเป็น "YYYY-MM-DD"
        }
        
        const randomDate1 = getRandomDate1(new Date(2025, 0, 1), new Date(2025, 11, 31)); // สุ่มวันที่ระหว่าง 2020 - 2025
        
        // สุ่ม วันที่
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][date_hele]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][date_hele]"]', randomDate1);

        //สุ่ม อบรม
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][check_during_training]"]');
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][check_after_training]"]');

        const training = [
            'input[name="data_detail_student_participation_and_support[0][check_during_training]"]',
            'input[name="data_detail_student_participation_and_support[0][check_after_training]"]'
        ];

        const randomtraining = training[Math.floor(Math.random() * training.length)];

        await page.check(randomtraining);

        //สุ่ม ประเภทเงินสงเคราะห์/เงินกองทุน
        const options2 = ["1", "2", "3", "4", "5"]; // ค่า value ที่เลือกได้
        const randomOption2 = options[Math.floor(Math.random() * options.length)]; // สุ่มค่า
 
        await page.waitForSelector('select[name="data_detail_student_participation_and_support[0][type_money_family_id]"]');
        await page.selectOption('select[name="data_detail_student_participation_and_support[0][type_money_family_id]"]', randomOption2);

        //จำนวนเงิน
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][amount_family]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][amount_family]"]', '20000');

        //function สุ่ม วันที่
        function getRandomDate2(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0]; // แปลงเป็น "YYYY-MM-DD"
        }
        
        const randomDate2 = getRandomDate2(new Date(2025, 0, 1), new Date(2025, 11, 31)); // สุ่มวันที่ระหว่าง 2020 - 2025

        //สุ่ม วันที่
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][date_hele_family]"]');
        await page.fill('input[name="data_detail_student_participation_and_support[0][date_hele_family]"]', randomDate2);

        //สุ่ม อบรม
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][check_during_training_family]"]');
        await page.waitForSelector('input[name="data_detail_student_participation_and_support[0][check_after_training_family]"]');

        const training2 = [
            'input[name="data_detail_student_participation_and_support[0][check_during_training_family]"]',
            'input[name="data_detail_student_participation_and_support[0][check_after_training_family]"]'
        ];

        const randomtraining2 = training2[Math.floor(Math.random() * training2.length)];

        await page.check(randomtraining2);

        //ส่วนที่ 2 : สนง.พมจ. และสภาเด็กฯมีการสื่อสารและสร้างความเข้าใจในโครงการฯ ไปยังนักเรียนกลุ่มเป้าหมายและจัดทำคู่มือและเอกสารเผยแพร่เกี่ยวกับเงินสงเคราะห์ของ พม.
        //สนง.พมจ.
        function getRandomDate3(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.toISOString().split('T')[0]; // แปลงเป็น "YYYY-MM-DD"
        }
        
        for (let i = 1; i <= 2; i++) {  // ทำซ้ำ 2 ครั้ง
            const randomDate3 = getRandomDate3(new Date(2025, 0, 1), new Date(2025, 11, 31));
        
            // สุ่มวันที่
            await page.waitForSelector(`input[name="list[${i}][date]"]`);
            await page.fill(`input[name="list[${i}][date]"]`, randomDate3);
        
            // สถานที่
            await page.waitForSelector(`input[name="list[${i}][detail_location]"]`);
            await page.fill(`input[name="list[${i}][detail_location]"]`, `สถานที่ ${i}`);
        
            // ผู้เข้าร่วม (คน)
            await page.waitForSelector(`input[name="list[${i}][number_participants]"]`);
            await page.fill(`input[name="list[${i}][number_participants]"]`, '100');
        
            // ภาพกิจกรรม
            await page.waitForSelector(`input[name="file${i}_1"]`); 
            await page.setInputFiles(`input[name="file${i}_1"]`, 'D:\\งาน\\playwright\\test_file.jpg');
        
            // การจัดทำคู่มือ
            await page.waitForSelector(`input[name="file${i}_2"]`); 
            await page.setInputFiles(`input[name="file${i}_2"]`, 'D:\\งาน\\playwright\\test_file.jpg');
        
            // ไม่มีการดำเนินการ
            await page.waitForSelector(`input[name="list[${i}][check_no_action_taken]"]`);
            await page.check(`input[name="list[${i}][check_no_action_taken]"]`);
        
            // คำชี้แจง
            await page.waitForSelector(`textarea[name="list[${i}][detail]"]`);
            await page.fill(`textarea[name="list[${i}][detail]"]`, `คำชี้แจง ${i}`);
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน4'); // ตำแหน่ง

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