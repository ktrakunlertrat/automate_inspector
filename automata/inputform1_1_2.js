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
        await page.waitForSelector('//button[contains(., "1.1.2 โครงการพัฒนาและเสริมสร้างความเข้มแข็งของสถาบันครอบครัวและชุมชน")]');
        await page.click('//button[contains(., "1.1.2 โครงการพัฒนาและเสริมสร้างความเข้มแข็งของสถาบันครอบครัวและชุมชน")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0205Controller?time_count=1&order=1.1.2&title=โครงการพัฒนาและเสริมสร้างความเข้มแข็งของสถาบันครอบครัวและชุมชน"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0205Controller?time_count=1&order=1.1.2&title=โครงการพัฒนาและเสริมสร้างความเข้มแข็งของสถาบันครอบครัวและชุมชน"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        //ส่วนที่ 1 : งบประมาณ
        const data = [
            { index: 0, allocated: '50000', disbursement: '10000' },
            { index: 1, allocated: '50000', disbursement: '10000' },
            { index: 2, allocated: '50000', disbursement: '10000' },
            { index: 3, allocated: '50000', disbursement: '10000' }
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, allocated, disbursement } = data[i];

            await typeInput(page, `input[name="data_budget_of_family_and_community_project[${index}][number_budget]"]`, allocated);

            await typeInput(page, `input[name="data_budget_of_family_and_community_project[${index}][number_results_budget]"]`, disbursement);
        }

        //ส่วนที่ 2 : ผลการดำเนินงาน
        //2.1
        const data1 = [
            { index: 0, budget1: '20000', fund1: '5', fund2: '4',  budget2: '10000', fund3: '1', detail: 'test'},
            { index: 1, budget1: '20000', fund1: '5', fund2: '4',  budget2: '10000', fund3: '1', detail: 'test'}
        ];

        for (let i = 0; i < data1.length; i++) {
            const { index, budget1, fund1, fund2, budget2, fund3, detail } = data1[i];

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][numberTotal]"]`, budget1); //วงเงินที่จังหวัดได้รับจัดสรร
            
            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_request_budget]"]`, fund1); //จำนวนโครงการที่ขอรับสนับสนุนงบประมาณ

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_results_budget]"]`, fund2); //จำนวนโครงการที่ได้รับสนับสนุน

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_results_budget]"]`, budget2); //งบประมาณที่สนับสนุนให้ศพค./เครือข่ายด้านครอบครัว

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_completed]"]`, fund3); //จำนวนโครงการที่ดำเนินการเสร็จแล้ว

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_in_progress]"]`, fund3); //จำนวนโครงการที่อยู่ระหว่างดำเนินการ

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_not_progress]"]`, fund3); //จำนวนโครงการที่ยังไม่ดำเนินการ

            await typeInput(page, `textarea[name="data_family_development_subsidies[${index}][detail_not_progress]"]`, detail); //ระบุเหตุผลกรณียังไม่ดำเนินการ

            await typeInput(page, `input[name="data_family_development_subsidies[${index}][number_project_not_supported]"]`, fund3); //จำนวนโครงการที่ไม่ได้รับสนับสนุน

            await typeInput(page, `textarea[name="data_family_development_subsidies[${index}][detail_not_supported]"]`, detail); //ระบุเหตุผลกรณีโครงการที่ไม่ได้รับสนับสนุน
        }

        //จำนวนเครือข่ายด้านครอบครัวที่ได้รับการสนับสนุนเงินอุดหนุน
        for (let i = 0; i <= 2; i++) {
            await page.waitForSelector(`input[name="data_subsidized_organization_types[${i}][number]"]`);
            await page.fill(`input[name="data_subsidized_organization_types[${i}][number]"]`, '2');
        }

        //โครงการที่ได้รับสนับสนุนงบประมาณ
        // for (let i = 0; i <= 9; i++) {
        //     await page.waitForSelector(`input[name="data_projects_budget_supported_detail[${i}][number]"]`);
        //     await page.fill(`input[name="data_projects_budget_supported_detail[${i}][number]"]`, '1');
        // }

        //2.2 สร้างพื้นที่สร้างสรรค์สำหรับครอบครัวทุกช่วงวัยในชุมชน
        //2.2.1
        for (let i = 0; i <= 4; i++) {
            await page.waitForSelector(`input[name="data_creative_spaces_for_community_families[${i}][check_implemented]"]`);
            await page.waitForSelector(`input[name="data_creative_spaces_for_community_families[${i}][check_in_progress]"]`);
            await page.waitForSelector(`input[name="data_creative_spaces_for_community_families[${i}][check_not_implemented]"]`);
        
            // สร้าง Array ของตัวเลือก
            const options = [
                `input[name="data_creative_spaces_for_community_families[${i}][check_implemented]"]`,
                `input[name="data_creative_spaces_for_community_families[${i}][check_in_progress]"]`,
                `input[name="data_creative_spaces_for_community_families[${i}][check_not_implemented]"]`
            ];
        
            // สุ่มเลือก 1 ตัว
            const randomOption = options[Math.floor(Math.random() * options.length)];
        
            // คลิก Radio ที่สุ่มได้
            await page.check(randomOption);

            await page.waitForSelector(`textarea[name="data_creative_spaces_for_community_families[${i}][detail]"]`)
            await page.fill(`textarea[name="data_creative_spaces_for_community_families[${i}][detail]"]`, `test ${i}`)
        }

        for (let i = 0; i <= 2; i++) {
            
            await page.waitForSelector(`input[name="data_detail_area_activity[${i}][check]"]`);
            await page.check(`input[name="data_detail_area_activity[${i}][check]"]`);
        }

        await page.waitForSelector('textarea[name="data_detail_family_activity[0][detail]"]');
        await page.fill('textarea[name="data_detail_family_activity[0][detail]"]', 'ครั้งที่');

        await page.waitForSelector('textarea[name="data_detail_family_activity[0][processing_time]"]');
        await page.fill('textarea[name="data_detail_family_activity[0][processing_time]"]', 'ระยะเวลาดำเนินการ');

        await page.waitForSelector('input[name="data_detail_family_activity[0][number_budget]"]');
        await page.fill('input[name="data_detail_family_activity[0][number_budget]"]', '20000');

        await page.waitForSelector('input[name="data_detail_family_activity[0][number_target_family]"]');
        await page.fill('input[name="data_detail_family_activity[0][number_target_family]"]', '1000');

        await page.waitForSelector('input[name="data_detail_family_activity[0][number_target_people]"]');
        await page.fill('input[name="data_detail_family_activity[0][number_target_people]"]', '5000');

        //2.2.2
        for (let i = 0; i <= 4; i++) {
            await page.waitForSelector(`input[name="data_weekly_family_bonding_activities[${i}][check_implemented]"]`);
            await page.waitForSelector(`input[name="data_weekly_family_bonding_activities[${i}][check_in_progress]"]`);
            await page.waitForSelector(`input[name="data_weekly_family_bonding_activities[${i}][check_not_implemented]"]`);
        
            // สร้าง Array ของตัวเลือก
            const options = [
                `input[name="data_weekly_family_bonding_activities[${i}][check_implemented]"]`,
                `input[name="data_weekly_family_bonding_activities[${i}][check_in_progress]"]`,
                `input[name="data_weekly_family_bonding_activities[${i}][check_not_implemented]"]`
            ];
        
            // สุ่มเลือก 1 ตัว
            const randomOption = options[Math.floor(Math.random() * options.length)];
        
            // คลิก Radio ที่สุ่มได้
            await page.check(randomOption);

            await page.waitForSelector(`textarea[name="data_weekly_family_bonding_activities[${i}][detail]"]`)
            await page.fill(`textarea[name="data_weekly_family_bonding_activities[${i}][detail]"]`, `test ${i}`)
        }

        //ส่วนที่ 3 : การสำรวจข้อมูลความเข้มแข็งของครอบครัวตามมาตรฐานครอบครัวเข้มแข็ง ประจำปีงบประมาณ พ.ศ. 2568
        await page.waitForSelector('input[name="data_family_strength_survey[number_explored_family]"]');
        await page.fill('input[name="data_family_strength_survey[number_explored_family]"]', '500');

        await page.waitForSelector('input[name="data_family_strength_survey[number_data_family]"]');
        await page.fill('input[name="data_family_strength_survey[number_data_family]"]', '500');

        await page.waitForSelector('textarea[name="data_family_strength_survey[detail]"]');
        await page.fill('textarea[name="data_family_strength_survey[detail]"]', 'ชี้แจงกรณีไม่เป็นตามเป้าหมาย');

        //ส่วนที่ 4 : สถานการณ์ความเข้มแข็งของครอบครัวจากการสำรวจตามมาตรฐานครอบครัวเข้มแข็งประจำปีงบประมาณ พ.ศ. 2567
        for (let i = 1; i <= 7; i++) {
            await page.waitForSelector(`input[name="data_ranking_family_strength[${i}][rank]"]`);
            await page.fill(`input[name="data_ranking_family_strength[${i}][rank]"]`, '500');
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.1.2'); // ตำแหน่ง

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