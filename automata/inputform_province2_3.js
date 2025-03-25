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

        // 8️⃣ คลิกเมนู "2.3 โครงการส่งเสริมความเข้มแข็งสภาเด็กและเยาวชน"
        await page.waitForSelector('//button[contains(., "2.3 โครงการส่งเสริมความเข้มแข็งสภาเด็กและเยาวชน")]');
        await page.click('//button[contains(., "2.3 โครงการส่งเสริมความเข้มแข็งสภาเด็กและเยาวชน")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0203Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0203Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : สภาเด็กและเยาวชน
        const data = [
            { index: 0, number: '1000' },
            { index: 1, number: '1000' },
            { index: 2, number: '1000' }
        ];

        //1.1
        for (let i = 0; i < data.length; i++) {
            const { index, number } = data[i];

            await page.waitForSelector(`input[name="data_children_and_youth_council[${index}][number_established_children_councils]"]`);
            await page.fill(`input[name="data_children_and_youth_council[${index}][number_established_children_councils]"]`, number); // จำนวนสภาเด็กที่มีการจัดตั้งแล้ว (แห่ง)

            await page.waitForSelector(`input[name="data_children_and_youth_council[${index}][number_fresh_farmers_ready_for_subsidy]"]`);
            await page.fill(`input[name="data_children_and_youth_council[${index}][number_fresh_farmers_ready_for_subsidy]"]`, number); // จำนวน สดย. ที่มีความพร้อมรับเงินอุดหนุน (แห่ง)

            await page.waitForSelector(`input[name="data_children_and_youth_council[${index}][number_children_councils_with_completed]"]`);
            await page.fill(`input[name="data_children_and_youth_council[${index}][number_children_councils_with_completed]"]`, number); // จำนวนสภาเด็กที่คณะบริหาร สดย. ครบวาระ ๒ ปี (แห่ง)

            await page.waitForSelector(`input[name="data_children_and_youth_council[${index}][number_children_councils_with_new_committees]"]`);
            await page.fill(`input[name="data_children_and_youth_council[${index}][number_children_councils_with_new_committees]"]`, number); // จำนวนสภาเด็กที่จัดตั้งคณะบริหาร สดย. ใหม่ (แห่ง)
        }

        //1.2
        for (let i = 0; i < data.length; i++) {
            const { index, number } = data[i];

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_request_project]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_request_project]"]`, number); // จำนวนโครงการที่ขอ (โครงการ/กิจกรรม)

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_approve_project]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_approve_project]"]`, number); // จำนวนโครงการที่ได้รับการอนุมัติ (โครงการ/กิจกรรม)

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_budget]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_budget]"]`, number); // จำนวนงบประมาณที่ได้รับการสนับสนุน (บาท)

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_children_and_youth_in_project]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_children_and_youth_in_project]"]`, number); // จำนวนเด็กและเยาวชนที่เข้าร่วมกิจกรรม/โครงการ (คน)

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_completed_project]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][number_completed_project]"]`, number); // จำนวนโครงการที่ดำเนินการเรียบร้อยแล้ว (โครงการ/กิจกรรม)

            await page.waitForSelector(`input[name="data_request_budget_of_children_and_youth_council[${index}][detail_agency]"]`);
            await page.fill(`input[name="data_request_budget_of_children_and_youth_council[${index}][detail_agency]"]`, number); // หน่วยงานที่ร่วมบูรณาการ
        }

        //ประเภทที่ 1 กิจกรรมส่งเสริมการพัฒนาเด็กและเยาวชน ชุมชน และสังคม
        const label1 = await page.locator('p', { hasText: 'ประเภทที่ 1 กิจกรรมส่งเสริมการพัฒนาเด็กและเยาวชน ชุมชน และสังคม จำนวน' });
        const input1 = label1.locator('input[type="text"]');
        await input1.fill('1000');

        const types1 = [
            'ด้านการพัฒนาศักยภาพสภาเด็กและเยาวชนสู่ศตวรรษที่ 21',
            'ด้านการพัฒนาการศึกษา',
            'ด้านการส่งเสริมและการรักษาสุขภาพ',
            'ด้านการพัฒนาชุมชนและสังคม'
        ];
        
        for (const type of types1) {
            const label = await page.locator('td', { hasText: type });
            const input = label.locator('xpath=following-sibling::td//input[@type="text"]');
            await input.fill('1000');
        }

        //ประเภทที่ 2 กิจกรรมการป้องกันและการแก้ไขปัญหาเด็กและเยาวชน ชุมชน และสังคม
        const label2 = await page.locator('p', { hasText: 'ประเภทที่ 2 กิจกรรมการป้องกันและการแก้ไขปัญหาเด็กและเยาวชน ชุมชน และสังคม จำนวน' });
        const input2 = label2.locator('input[type="text"]');
        await input2.fill('1000');

        const types2 = [
            'ด้านการป้องกันการทุจริตคอร์รัปชัน',
            'ด้านการป้องกันและแก้ไขปัญหายาเสพติด',
            'ด้านการป้องกันและแก้ไขปัญหาการตั้งครรภ์ในวัยรุ่น',
            'ด้านการรณรงค์ป้องกันแก้ไขปัญหาเด็ก เยาวชน และสังคม'
        ];
        
        for (const type of types2) {
            const label = await page.locator('td', { hasText: type });
            const input = label.locator('xpath=following-sibling::td//input[@type="text"]');
            await input.fill('1000');
        }

        //ประเภทที่ 3 กิจกรรมด้านสังคมและวัฒนธรรม จำนวน
        const label3 = await page.locator('p', { hasText: 'ประเภทที่ 3 กิจกรรมด้านสังคมและวัฒนธรรม จำนวน' });
        const input3 = label3.locator('input[type="text"]');
        await input3.fill('1000');

        const types3 = [
            'ด้านการอนุรักษ์ธรรมชาติและสิ่งแวดล้อม',
            'ด้านประเพณี ศิลปะ และวัฒนธรรม',
            'ด้านการบำเพ็ญประโยชน์หรือจิตอาสา',
            'ด้านอาชีพและภูมิปัญญาท้องถิ่น'
        ];
        
        for (const type of types3) {
            const label = await page.locator('td', { hasText: type });
            const input = label.locator('xpath=following-sibling::td//input[@type="text"]');
            await input.fill('1000');
        }

        //ประเภทที่ 4 ด้านการเสริมพลังเครือข่ายเด็กและเยาวชน จำนวน
        const label4 = await page.locator('p', { hasText: 'ประเภทที่ 4 ด้านการเสริมพลังเครือข่ายเด็กและเยาวชน จำนวน' });
        const input4 = label4.locator('input[type="text"]');
        await input4.fill('1000');

        const types4 = [
            'โครงการเยาวชนค้นหาตัวตน ; ต้นกล้า',
            'โครงการเยาวชนรักษ์โลก',
            'โครงการเสริมพลังเด็กและเยาวชนเพื่อความปลอดภัยทางถนน'
        ];
        
        for (const type of types4) {
            const label = await page.locator('td', { hasText: type });
            const input = label.locator('xpath=following-sibling::td//input[@type="text"]');
            await input.fill('1000');
        }

        //ประเภทที่ 5 งานประจำปีตามที่กฎหมายกำหนด
        for (let i = 0; i <= 2; i++) {
            await page.waitForSelector(`input[name="data_sub_youth_council_supported_projects[${i}][check]"]`);
            await page.check(`input[name="data_sub_youth_council_supported_projects[${i}][check]"]`);
        }

        //ส่วนที่ 2 : บทบาท สนง.พมจ. ในการขับเคลื่อนงานสภาเด็กและเยาวชน
        for (let i = 0; i <= 5; i++) {
            await page.waitForSelector(`textarea[name="data_provincial_social_development_role_in_the_council[${i}][data_name_prodject_of_provincial_social_development][0][detail]"]`);
            await page.fill(`textarea[name="data_provincial_social_development_role_in_the_council[${i}][data_name_prodject_of_provincial_social_development][0][detail]"]`, `ชื่อกิจกรรมในการขับเคลื่อน ${i}`);

            await page.waitForSelector(`textarea[name="data_provincial_social_development_role_in_the_council[${i}][data_name_prodject_of_provincial_social_development][1][detail]"]`);
            await page.fill(`textarea[name="data_provincial_social_development_role_in_the_council[${i}][data_name_prodject_of_provincial_social_development][1][detail]"]`, `ชื่อกิจกรรมในการขับเคลื่อน ${i}`);
        }

        //ส่วนที่ 3 : กิจกรรมเพื่อพัฒนาศักยภาพสภาเด็กและเยาวชน “มหกรรมการพัฒนาเด็กและเยาวชน”
        for (let i = 0; i <= 1; i++) {
            await page.waitForSelector(`textarea[name="plan_status[${i}][detail]"]`);
            await page.fill(`textarea[name="plan_status[${i}][detail]"]`, `กิจกรรมเพื่อพัฒนาศักยภาพสภาเด็กและเยาวชน`);
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน2.3'); // ตำแหน่ง

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