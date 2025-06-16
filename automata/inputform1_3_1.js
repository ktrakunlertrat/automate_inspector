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
        await page.waitForSelector('//button[contains(., "1.3.1 การพัฒนาคุณภาพชีวิตคนพิการ")]');
        await page.click('//button[contains(., "1.3.1 การพัฒนาคุณภาพชีวิตคนพิการ")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02011Controller?time_count=1&order=1.3.1&title=การพัฒนาคุณภาพชีวิตคนพิการ"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report02011Controller?time_count=1&order=1.3.1&title=การพัฒนาคุณภาพชีวิตคนพิการ"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        // ฟังก์ชันใช้กรอกข้อมูลใน input ที่มี AutoNumeric
        async function typeInput(page, selector, value) {
            await page.waitForSelector(selector);
            await page.click(selector, { clickCount: 3 });     // Select all
            await page.press(selector, 'Backspace');           // Clear current value
            await page.type(selector, value, { delay: 20 });   // Type slowly
        }

        //ส่วนที่ 1 : งบประมาณ
        //1.1 งบประมาณกองทุนที่ได้รับการจัดสรร
        await typeInput(page, 'input[name="number_budget"]', '200000');

        //1.2 คนพิการหรือผู้ดูแลคนพิการยืนคำขอกู้ยืมเงินกองทุน
        await typeInput(page, 'input[name="number_request_for_fund"]', '200'); // จำนวน

        await typeInput(page, 'input[name="number_request_for_fund_budget"]', '100000'); //งบ

        //ได้รับอนุมัติเงินกู้ยืมจากกองทุนฯ
        await typeInput(page, 'input[name="number_approve_for_fund"]', '100'); // จำนวน (ราย)

        await typeInput(page, 'input[name="number_approve_for_fund_budget"]', '50000'); // ผลการเบิกจ่าย (บาท)

        await typeInput(page, 'input[name="number_not_approve_for_fund"]', '10'); // จำนวน (ราย)

        await typeInput(page, 'input[name="number_not_approve_for_fund_budget"]', '20000'); // ผลการเบิกจ่าย (บาท)

        const months = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        
        const randomMonth1 = months[Math.floor(Math.random() * months.length)];
        const randomMonth2 = months[Math.floor(Math.random() * months.length)];
        
        //สุ่มเดือน
        await page.waitForSelector('select[name="month_approve_start"]'); // รอให้ select โหลด
        await page.selectOption('select[name="month_approve_start"]', { label: randomMonth1 });
        //ถึง
        await page.waitForSelector('select[name="month_approve_end"]'); // รอให้ select โหลด
        await page.selectOption('select[name="month_approve_end"]', { label: randomMonth2 });

        //ไม่ได้รับอนุมัติเงินกู้ยืมจากกองทุนฯ
        await page.waitForSelector('input[name="number_not_approve_for_fund"]');
        await page.fill('input[name="number_not_approve_for_fund"]', '10000'); // จำนวน (ราย)

        await page.waitForSelector('input[name="number_not_approve_for_fund_budget"]');
        await page.fill('input[name="number_not_approve_for_fund_budget"]', '50000'); // ผลการเบิกจ่าย (บาท)

        //สุ่มเดือน
        await page.waitForSelector('select[name="month_not_approve_start"]'); // รอให้ select โหลด
        await page.selectOption('select[name="month_not_approve_start"]', { label: randomMonth1 });
        //ถึง
        await page.waitForSelector('select[name="month_not_approve_end"]'); // รอให้ select โหลด
        await page.selectOption('select[name="month_not_approve_end"]', { label: randomMonth2 });

        //ส่วนที่ 2 : ข้อมูลลูกหนี้กองทุนส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ
        for (let i = 1; i <= 8; i++) {
            await typeInput(page, `input[name="debto[${i}][number_debto]"]`, '100'); // จำนวน (ราย)

            await typeInput(page, `input[name="debto[${i}][number_principal_amount]"]`, '10000'); // จำนวนเงินต้น (บาท)

            await typeInput(page, `input[name="debto[${i}][number_total_paid]"]`, '5000'); // ยอดชำระแล้ว (บาท)
        }

        //ส่วนที่ 3 : กระบวนการติดตามลูกหนี้
        for (let i = 1; i <= 6; i++) {
            await page.waitForSelector(`input[name="trackingProcess[${i}][check]"]`);
            await page.check(`input[name="trackingProcess[${i}][check]"]`);
        }

        //ส่วนที่ 4 : ติดตามคุณภาพชีวิตคนพิการที่กู้ยืมเงินทุนประกอบอาชีพ ในปีงบประมาณ 2567
        //4.1
        await page.waitForSelector('input[name="disabled_borrowers[number_disabled_borrowers]"]');
        await page.fill('input[name="disabled_borrowers[number_disabled_borrowers]"]', '20000'); // จำนวนคนพิการ/ผู้ดูแลที่กู้ยืมเงินทุนประกอบอาชีพ ปี 67

        await page.waitForSelector('input[name="disabled_borrowers[number_of_followers]"]');
        await page.fill('input[name="disabled_borrowers[number_of_followers]"]', '10000'); // จำนวนติดตามแล้ว (คน)

        await page.waitForSelector('input[name="disabled_borrowers[number_debtor_found]"]');
        await page.fill('input[name="disabled_borrowers[number_debtor_found]"]', '5000'); // จำนวนลูกหนี้ที่พบ (คน)

        await page.waitForSelector('input[name="disabled_borrowers[number_debtor_not_found]"]');
        await page.fill('input[name="disabled_borrowers[number_debtor_not_found]"]', '5000'); // จำนวนลูกหนี้ที่ไม่พบ (คน)

        //4.2
        await page.waitForSelector('input[name="debtor_found[number_use_funds_as_intended]"]');
        await page.fill('input[name="debtor_found[number_use_funds_as_intended]"]', '2500'); // นำเงินไปใช้ตรงตามวัตถุประสงค์

        await page.waitForSelector('input[name="debtor_found[number_use_funds_not_as_intended]"]');
        await page.fill('input[name="debtor_found[number_use_funds_not_as_intended]"]', '2500'); // นำเงินไปใช้ไม่ตรงตามวัตถุประสงค์

        await page.waitForSelector('input[name="debtor_found[number_income_increased]"]');
        await page.fill('input[name="debtor_found[number_income_increased]"]', '5000'); // รายได้เพิ่มขึ้น

        await page.waitForSelector('input[name="debtor_found[number_income_not_increased]"]');
        await page.fill('input[name="debtor_found[number_income_not_increased]"]', '5000'); // รายได้ไม่เพิ่มขึ้น

        await page.waitForSelector('input[name="debtor_found[number_quality_of_life_improves]"]');
        await page.fill('input[name="debtor_found[number_quality_of_life_improves]"]', '5000'); // คุณภาพชีวิตดีขึ้น

        await page.waitForSelector('input[name="debtor_found[number_quality_of_life_not_improves]"]');
        await page.fill('input[name="debtor_found[number_quality_of_life_not_improves]"]', '5000'); // คุณภาพชีวิตไม่ดีขึ้น

        await page.waitForSelector('textarea[name="debtor_found[detail_quality_of_life]"]');
        await page.fill('textarea[name="debtor_found[detail_quality_of_life]"]', 'ร้อยละของคนพิการ/ผู้ดูแล ที่กู้ยืมเงินและมีรายได้เพิ่มขึ้น มีคุณภาพชีวิตดีขึ้น (เทียบกับจำนวนผู้กู้ ปี 67)'); // detail

        //4.3
        //เสียชีวิต
        await page.waitForSelector('input[name="debtor_not_found[number_died]"]');
        await page.fill('input[name="debtor_not_found[number_died]"]', '200'); // จำนวน (คน)

        await page.waitForSelector('textarea[name="debtor_not_found[detail_died]"]');
        await page.fill('textarea[name="debtor_not_found[detail_died]"]', 'อธิบายการดำเนินการ 1'); // อธิบายการดำเนินการ

        //ย้ายที่อยู่
        await page.waitForSelector('input[name="debtor_not_found[number_move_address]"]');
        await page.fill('input[name="debtor_not_found[number_move_address]"]', '700'); // ทราบที่อยู่ปัจจุบัน จำนวน (คน)

        await page.waitForSelector('input[name="debtor_not_found[number_address]"]');
        await page.fill('input[name="debtor_not_found[number_address]"]', '700'); // ไม่ทราบที่อยู่ปัจจุบัน จำนวน (คน)

        await page.waitForSelector('textarea[name="debtor_not_found[detail_address]"]');
        await page.fill('textarea[name="debtor_not_found[detail_address]"]', 'อธิบายการดำเนินการ 2'); // อธิบายการดำเนินการ

        //อื่นๆ (เช่น ไม่สามารถติดต่อได้)
        await page.waitForSelector('input[name="debtor_not_found[number_other]"]');
        await page.fill('input[name="debtor_not_found[number_other]"]', '900'); // จำนวน (คน)

        await page.waitForSelector('textarea[name="debtor_not_found[detail_other]"]');
        await page.fill('textarea[name="debtor_not_found[detail_other]"]', 'อธิบายการดำเนินการ 3'); // อธิบายการดำเนินการ

        //ส่วนที่ 5 : แผนและผลการดำเนินงาน
        await page.waitForSelector('input[name="promote_disabled_people[number_of_agencies]"]');
        await page.fill('input[name="promote_disabled_people[number_of_agencies]"]', '10'); // จำนวนหน่วยงานที่ต้องจ้างงานคนพิการ ภาครัฐ

        await page.waitForSelector('input[name="promote_disabled_people[number_of_disabled_people]"]');
        await page.fill('input[name="promote_disabled_people[number_of_disabled_people]"]', '200'); // จำนวนคนพิการที่ต้องจ้างงาน ภาครัฐ

        for (let i = 0; i <= 2; i++) {
            //จำนวนหน่วยงานที่จ้างงานคนพิการ (หน่วย/แห่ง) ภาครัฐ
            await page.waitForSelector(`input[name="number_of_plans_static[number_employed_disabled][${i}][number_of_agencies]"]`);
            await page.fill(`input[name="number_of_plans_static[number_employed_disabled][${i}][number_of_agencies]"]`, '2');

            //จำนวนคนพิการที่จ้างงาน (คน/สัญญา) ภาครัฐ
            await page.waitForSelector(`input[name="number_of_plans_static[number_employed_disabled][${i}][number_of_disabled_people]"]`);
            await page.fill(`input[name="number_of_plans_static[number_employed_disabled][${i}][number_of_disabled_people]"]`, '10');
        }

        for (let i = 0; i <= 6; i++) {
            //คนพิการที่ได้รับการจ้างงานจำแนกตามความพิการ (คน) ภาครัฐ
            await page.waitForSelector(`input[name="number_of_plans_static[number_employed_disabled][0][employed_disabled][${i}][number]"]`);
            await page.fill(`input[name="number_of_plans_static[number_employed_disabled][0][employed_disabled][${i}][number]"]`, '1');
        }

        await page.waitForSelector('input[name="promote_disabled_people_two[number_of_agencies]"]');
        await page.fill('input[name="promote_disabled_people_two[number_of_agencies]"]', '10'); // จำนวนหน่วยงานที่ต้องจ้างงานคนพิการ ภาคเอกชน

        await page.waitForSelector('input[name="promote_disabled_people_two[number_of_disabled_people]"]');
        await page.fill('input[name="promote_disabled_people_two[number_of_disabled_people]"]', '200'); // จำนวนคนพิการที่ต้องจ้างงาน ภาคเอกชน

        await page.waitForSelector('input[name="number_of_private_plans[number_employed_disabled][6][number_of_agencies]"]');
        await page.fill('input[name="number_of_private_plans[number_employed_disabled][6][number_of_agencies]"]', '20'); // รวมภาคเอกชน
        
        for (let i = 0; i <= 5; i++) {
            //จำนวนหน่วยงานที่จ้างงานคนพิการ (หน่วย/แห่ง) ภาคเอกชน
            await page.waitForSelector(`input[name="number_of_private_plans[number_employed_disabled][${i}][number_of_agencies]"]`);
            await page.fill(`input[name="number_of_private_plans[number_employed_disabled][${i}][number_of_agencies]"]`, '2');
        }

        for (let i = 0; i <= 2; i++) {
            //จำนวนคนพิการที่จ้างงาน (คน/สัญญา) ภาคเอกชน
            await page.waitForSelector(`input[name="number_of_private_plans[number_employed_disabled][${i}][number_of_disabled_people]"]`);
            await page.fill(`input[name="number_of_private_plans[number_employed_disabled][${i}][number_of_disabled_people]"]`, '10');
        }

        for (let i = 0; i <= 6; i++) {
            //คนพิการที่ได้รับการจ้างงานจำแนกตามความพิการ (คน) ภาคเอกชน
            await page.waitForSelector(`input[name="number_of_private_plans[number_employed_disabled][0][employed_disabled][${i}][number]"]`);
            await page.fill(`input[name="number_of_private_plans[number_employed_disabled][0][employed_disabled][${i}][number]"]`, '1');
        }

        //ส่วนที่ 6 : ตำแหน่งงานที่จ้างงานคนพิการในภาคเอกชน
        await page.waitForSelector('textarea[name="disabilitie[1][data_positions_that_employ_disabilities][positions_available]"]');
        await page.fill('textarea[name="disabilitie[1][data_positions_that_employ_disabilities][positions_available]"]', 'ค้าขาย');

        await page.waitForSelector('input[name="disabilitie[1][data_positions_that_employ_disabilities][number_private]"]');
        await page.fill('input[name="disabilitie[1][data_positions_that_employ_disabilities][number_private]"]', '30');

        await page.waitForSelector('input[name="disabilitie[1][data_positions_that_employ_disabilities][number_government]"]');
        await page.fill('input[name="disabilitie[1][data_positions_that_employ_disabilities][number_government]"]', '20');

        for (let i = 0; i <= 6; i++) {
            await page.waitForSelector(`input[name="disabilitie[1][data_number_positions_that_employ_disabilities][${i}][number]"]`);
            await page.fill(`input[name="disabilitie[1][data_number_positions_that_employ_disabilities][${i}][number]"]`, '5');
        }

        //3.1 มาตรการที่ดำเนินงานในพื้นที่
        for (let i = 1; i <= 5; i++) {

            if (i === 5) {
                await page.waitForSelector('input[name="operational_process[5][check]"]');
                await page.check('input[name="operational_process[5][check]"]');

                await page.waitForSelector('textarea[name="operational_process[5][detail]"]');
                await page.fill('textarea[name="operational_process[5][detail]"]', 'test');
            } else {
                await page.waitForSelector(`input[name="operational_process[${i}][check]"]`);
                await page.check(`input[name="operational_process[${i}][check]"]`);
            }
        }

        //3.2 การมีส่วนร่วมของสถาบันการศึกษา ในพื้นที่ในการสนับสนุนการจ้างงาน/ฝึกอาชีพให้แก่คนพิการ
        await page.waitForSelector('input[name="employment_training[0][name_institution]"]');
        await page.fill('input[name="employment_training[0][name_institution]"]', 'ชื่อสถาบัน');

        await page.waitForSelector('textarea[name="employment_training[0][detail_implement]"]');
        await page.fill('textarea[name="employment_training[0][detail_implement]"]', 'การดำเนินงาน');

        await page.waitForSelector('textarea[name="employment_training[0][detail_implement]"]');
        await page.fill('textarea[name="employment_training[0][detail_implement]"]', 'การดำเนินงาน');

        //สุ่ม กลุ่มเป้าหมาย
        const options = ["ทางการได้ยินฯ", "ทางการเคลื่อนไหว", "ทางจิตใจฯ", "ทางสติปัญญา", "ทางการเรียนรู้", "ออทิสติก"]; // ค่า value ที่เลือกได้
        const randomOption = options[Math.floor(Math.random() * options.length)]; // สุ่มค่า

        await page.waitForSelector('select[name="employment_training[0][target_group_of_disabled_id]"]');
        await page.selectOption('select[name="employment_training[0][target_group_of_disabled_id]"]', randomOption);

        await page.waitForSelector('input[name="employment_training[0][number_target_group]"]');
        await page.fill('input[name="employment_training[0][number_target_group]"]', '30');

        function getRandomThaiDateInYear(buddhistYear) {
            const startDate = new Date(buddhistYear - 543, 0, 1); // 1 ม.ค. ปีนั้น
            const endDate = new Date(buddhistYear - 543, 11, 31); // 31 ธ.ค. ปีนั้น

            const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
            const randomDate = new Date(randomTime);

            const day = String(randomDate.getDate()).padStart(2, '0');
            const month = String(randomDate.getMonth() + 1).padStart(2, '0');
            const year = randomDate.getFullYear() + 543;

            return `${day}/${month}/${year}`;
        }

        const dateStart = getRandomThaiDateInYear(2568);
        let dateEnd = getRandomThaiDateInYear(2568);

        // แปลงกลับมาเทียบว่า end ต้องมากกว่า start
        const toDate = str => {
            const [d, m, y] = str.split('/');
            return new Date(parseInt(y) - 543, parseInt(m) - 1, parseInt(d));
        };

        if (toDate(dateEnd) < toDate(dateStart)) {
            // สลับวันที่ถ้า dateEnd น้อยกว่า
            [dateStart, dateEnd] = [dateEnd, dateStart];
        }

        // ส่งค่าเข้า input (ตัวอย่างกับ Playwright)
        await page.fill('input[name="employment_training[0][date_start]"]', dateStart);
        await page.fill('input[name="employment_training[0][date_end]"]', dateEnd);

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.3.1'); // ตำแหน่ง

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