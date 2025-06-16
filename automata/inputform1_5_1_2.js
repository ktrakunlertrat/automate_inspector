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
        await page.waitForSelector('//button[contains(., "1.5.1.2 โครงการยกระดับชุมชนต้นแบบสู่การพัฒนาที่ยั่งยืน (Smart Sustainable Community : SSC)")]');
        await page.click('//button[contains(., "1.5.1.2 โครงการยกระดับชุมชนต้นแบบสู่การพัฒนาที่ยั่งยืน (Smart Sustainable Community : SSC)")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0209Controller?time_count=1&order=1.5.1.2&title=โครงการยกระดับชุมชนต้นแบบสู่การพัฒนาที่ยั่งยืน (Smart Sustainable Community : SSC)"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report0209Controller?time_count=1&order=1.5.1.2&title=โครงการยกระดับชุมชนต้นแบบสู่การพัฒนาที่ยั่งยืน (Smart Sustainable Community : SSC)"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1 : ขั้นตอนการดำเนินงาน
        for (let i = 1; i <= 5; i++) {
            await page.waitForSelector(`input[name="data_operational[${i}][check_operation]"]`);
            await page.check(`input[name="data_operational[${i}][check_operation]"]`);
    
            await page.waitForSelector(`input[name="file_${i}"]`); 
            await page.setInputFiles(`input[name="file_${i}"]`, 'D:\\งาน\\playwright\\test_file.jpg');
    
            await page.waitForSelector(`textarea[name="data_operational[${i}][detail]"]`);
            await page.fill(`textarea[name="data_operational[${i}][detail]"]`, `หมายเหตุ ${i}`);
        }

        //ส่วนที่ 2 : ผลการประเมินตามหลักเกณฑ์ความเข้มแข็งของชุมชนตามเกณฑ์ SSC
        //2.1
        await page.waitForSelector('input[id="yes2_1"][value="true"]');
        await page.waitForSelector('input[id="no2_1"][value="flase"]');

        // สร้าง Array ของตัวเลือก
        const options1 = [
            'input[id="yes2_1"][value="true"]',
            'input[id="no2_1"][value="flase"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption1 = options1[Math.floor(Math.random() * options1.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption1);

        if (randomOption1.includes('value="true"')) {
            await page.waitForSelector('textarea[name="preserving[1][name_community]"]');
            await page.fill('textarea[name="preserving[1][name_community]"]', 'ชุมชน');

            await page.waitForSelector('input[id="2_1_pass"][value="true"]');
            await page.waitForSelector('input[id="2_2_no_pass"][value="false"]');

            // สร้าง Array ของตัวเลือก
            const options1 = [
                'input[id="2_1_pass"][value="true"]',
                'input[id="2_2_no_pass"][value="false"]'
            ];

            // สุ่มเลือก 1 ตัว
            const randomOption1 = options1[Math.floor(Math.random() * options1.length)];

            // คลิก Radio ที่สุ่มได้
            await page.check(randomOption1);

            await page.waitForSelector('input[name="file_1"]'); 
            await page.setInputFiles('input[name="file_1"]', 'D:\\งาน\\playwright\\test_file.jpg');

            await page.waitForSelector('textarea[name="preserving[1][suggestions]"]');
            await page.fill('textarea[name="preserving[1][suggestions]"]', 'ข้อเสนอแนะจากการประเมินผล');

            await page.waitForSelector('textarea[name="preserving[1][detail]"]');
            await page.fill('textarea[name="preserving[1][detail]"]', 'หมายเหตุ');
        }

        //2.2
        await page.waitForSelector('input[id="yes2_2"][value="true"]');
        await page.waitForSelector('input[id="no2_2"][value="false"]');

        // สร้าง Array ของตัวเลือก
        const options2 = [
            'input[id="yes2_2"][value="true"]',
            'input[id="no2_2"][value="false"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

        // คลิก Radio ที่สุ่มได้
        await page.check(randomOption2);

        if (randomOption2.includes('value="true"')) {
            await page.waitForSelector('textarea[name="new_community_case[1][name_community]"]');
            await page.fill('textarea[name="new_community_case[1][name_community]"]', 'ชุมชน');

            await page.waitForSelector('#statusSelect_1');

            // ดึงค่า options ทั้งหมดที่ไม่ใช่ option ที่ซ่อนอยู่
            const options = await page.evaluate(() => {
                const select = document.querySelector('#statusSelect_1');
                return Array.from(select.options)
                    .filter(option => option.value) // กรองค่าที่ไม่ว่างเปล่า
                    .map(option => option.value); // ดึงเฉพาะค่าของ options
            });

            // เลือก option แบบสุ่ม
            const randomOption = options[Math.floor(Math.random() * options.length)];

            // กำหนดค่าให้ select
            await page.selectOption('#statusSelect_1', randomOption);

            if (randomOption === "waiting") {
                await page.waitForSelector('textarea[name="new_community_case[1][detail_evaluation_results]"]');
                await page.fill('textarea[name="new_community_case[1][detail_evaluation_results]"]', 'รายละเอียดการประเมิน');
            } else {
                await page.waitForSelector('input[name="new_community_case[1][rank_evaluation_results]"][value="a"]');
                await page.waitForSelector('input[name="new_community_case[1][rank_evaluation_results]"][value="b"]');
                await page.waitForSelector('input[name="new_community_case[1][rank_evaluation_results]"][value="c"]');

                // สร้าง Array ของตัวเลือก
                const options2 = [
                    'input[name="new_community_case[1][rank_evaluation_results]"][value="a"]',
                    'input[name="new_community_case[1][rank_evaluation_results]"][value="b"]',
                    'input[name="new_community_case[1][rank_evaluation_results]"][value="c"]'
                ];

                // สุ่มเลือก 1 ตัว
                const randomOption2 = options2[Math.floor(Math.random() * options2.length)];

                // คลิก Radio ที่สุ่มได้
                await page.check(randomOption2);
            }

            await page.waitForSelector('textarea[name="new_community_case[1][activities_in_progress]"]');
            await page.fill('textarea[name="new_community_case[1][activities_in_progress]"]', 'กิจกรรมที่อยู่ระหว่างการดำเนินการ');

            await page.waitForSelector('textarea[name="new_community_case[1][suggestions_evaluation]"]');
            await page.fill('textarea[name="new_community_case[1][suggestions_evaluation]"]', 'ข้อเสนอแนะจากการประเมินผล');

            await page.waitForSelector('textarea[name="new_community_case[1][set_the_evaluation_period]"]');
            await page.fill('textarea[name="new_community_case[1][set_the_evaluation_period]"]', 'กำหนดช่วงการประเมินผล');
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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.5.1.2'); // ตำแหน่ง

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