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

        //ส่วนที่ 1 : การดำเนินงานด้านการป้องกันและแก้ไขปัญหาการค้ามนุษย์ของจังหวัด
        await page.waitForSelector('input[name="status_plan"][value="false"]');
        await page.waitForSelector('input[name="status_plan"][value="true"]');

        // สร้าง Array ของตัวเลือก
        const options2 = [
            'input[name="status_plan"][value="false"]',
            'input[name="status_plan"][value="true"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption2);

        if (randomOption2.includes('value="false"')) {
            await page.waitForSelector('textarea[name="detail_false"]');
            await page.fill('textarea[name="detail_false"]', 'ระบุคำชี้แจง ไม่เกิน 5 บรรทัด'); // กรอกในช่อง "ไม่มีแผน"
        } else {
            await page.waitForSelector('input[name="number"]');// กรอกในช่อง "มีแผน"
            await page.fill('input[name="number"]', '1'); // จำนวนโครงการ

            await page.waitForSelector('input[name="data_strategic[1][name]"]');// กรอกในช่อง "มีแผน"
            await page.fill('input[name="data_strategic[1][name]"]', 'ชื่อโครงการ 1'); // ชื่อโครงการ

            await page.waitForSelector('input[name="data_strategic[1][number]"]');// กรอกในช่อง "มีแผน"
            await page.fill('input[name="data_strategic[1][number]"]', 'ผลการดำเนินงาน 1'); // ผลการดำเนินงาน
        }

        //ส่วนที่ 2 : การขับเคลื่อนกลไกการส่งต่อระดับชาติ (NRM) ในระดับจังหวัด
        await Promise.all([
            page.waitForSelector('input[name="provincial_situation_new[1][number_of_times]"]'), //1) รับแจ้งเหตุ
            page.waitForSelector('input[name="provincial_situation_new[2][number_of_times]"]'), //2) คัดกรอง
            page.waitForSelector('input[name="provincial_situation_new[3][number_of_times]"]'), //3) คัดแยก (มีข้อบ่งชี้)
        ]);
        
        await page.fill('input[name="provincial_situation_new[1][number_of_times]"]', '100');
        await page.fill('input[name="provincial_situation_new[2][number_of_times]"]', '100');
        await page.fill('input[name="provincial_situation_new[3][number_of_times]"]', '100');

        const data = [
            { index: 1, number: '2000' },
            { index: 2, number: '2000' },
            { index: 3, number: '2000' },
            { index: 4, number: '2000' },
            { index: 5, number: '2000' },
            { index: 6, number: '2000' }
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, number } = data[i];
            
            await page.waitForSelector(`input[name="provincial_situation_new[${index}][number_of_people]"]`);
            await page.fill(`input[name="provincial_situation_new[${index}][number_of_people]"]`, number); // จำนวนคน

            await page.waitForSelector(`input[name="provincial_situation_new[${index}][number_tracking_of_mission_assistance]"]`);
            await page.fill(`input[name="provincial_situation_new[${index}][number_tracking_of_mission_assistance]"]`, number); // การติดตามช่วยเหลือตามภารกิจของกระทรวง พม.
        }

        //กิจกรรมการดำเนินงาน
        await Promise.all([
            page.waitForSelector('input[name="invetion_NRM[1][check]"]'),
            page.waitForSelector('input[name="invetion_NRM[2][check]"]'),
            page.waitForSelector('input[name="invetion_NRM[3][check]"]'),
            page.waitForSelector('input[name="invetion_NRM[4][check]"]'),
            page.waitForSelector('input[name="invetion_NRM[5][check]"]'),
        ]);
        
        await page.check('input[name="invetion_NRM[1][check]"]');
        await page.check('input[name="invetion_NRM[2][check]"]');
        await page.check('input[name="invetion_NRM[3][check]"]');
        await page.check('input[name="invetion_NRM[4][check]"]');
        await page.check('input[name="invetion_NRM[5][check]"]');

        //การดำเนินงาน
        for (let i = 1; i <= 5; i++) {
            const trueSelector = `input[name="invetion_NRM[${i}][check_operation]"][value="true"]`;
            const falseSelector = `input[name="invetion_NRM[${i}][check_operation]"][value="false"]`;
            const numberInput = `input[name="invetion_NRM[${i}][number_operation]"]`;
        
            await page.waitForSelector(trueSelector);
            await page.waitForSelector(falseSelector);
        
            const randomOption = Math.random() < 0.5 ? trueSelector : falseSelector;
            await page.check(randomOption);
        
            if (randomOption === trueSelector) {
                await page.waitForSelector(numberInput);
                await page.fill(numberInput, '100');
            }
        }

        //ส่วนที่ 3 : งบประมาณที่ได้รับจัดสรรเพื่อขับเคลื่อนการดำเนินงานตามกลไกการส่งต่อระดับชาติ (National Referral Mechanism : NRM) ในพื้นที่จังหวัด
        await page.waitForSelector('input[name="budget"]');
        await page.fill('input[name="budget"]', '20000');

        await page.waitForSelector('input[name="budget_result"]');
        await page.fill('input[name="budget_result"]', '20000');

        //ส่วนที่ 4 : การสนับสนุนเงินกองทุนเพื่อการป้องกันและปราบปรามการค้ามนุษย์
        await page.waitForSelector('input[name="number_request_fund_agency"]');
        await page.fill('input[name="number_request_fund_agency"]', '200');

        await page.waitForSelector('input[name="number_request_fund_project"]');
        await page.fill('input[name="number_request_fund_project"]', '2000');

        await page.waitForSelector('input[name="number_result_approve_project"]');
        await page.fill('input[name="number_result_approve_project"]', '2000');

        await page.waitForSelector('input[name="number_process_event_project"]');
        await page.fill('input[name="number_process_event_project"]', '2000');

        await page.waitForSelector('input[name="number_completed_project"]');
        await page.fill('input[name="number_completed_project"]', '2000');

        await page.waitForSelector('input[name="number_project"]');
        await page.fill('input[name="number_project"]', '2000');

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน3.3'); // ตำแหน่ง

        console.log('กรอกข้อมูลผู้รายงานสำเร็จ!');

        //การตรวจสอบข้อมูลเบื้องต้นโดย พมจ.
        await page.waitForSelector('input[name="examine"]'); 
        await page.check('input[name="examine"]'); // ติ๊ก Checkbox

        await page.waitForSelector('textarea[name="opinion"]');
        await page.fill('textarea[name="opinion"]', 'ไม่มีความเห็นว่า'); // ข้อคิดเห็น/ข้อเสนอแนะ

        console.log('พมจ. ได้ตรวจสอบข้อมูลแล้ว');

        console.log('กรอกข้อมูลทั้งหมดสำเร็จ!');

        // 11️⃣ ค้างหน้าไว้ 10 วินาที
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    } finally {
        await browser.close();
    }
})();