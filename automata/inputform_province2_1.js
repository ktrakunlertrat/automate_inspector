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

        // 8️⃣ คลิกเมนู "2.1 โครงการเงินอุดหนุนเพื่อการการเลี้ยงดูเด็กแรกเกิด"
        await page.waitForSelector('//button[contains(., "2.1 โครงการเงินอุดหนุนเพื่อการการเลี้ยงดูเด็กแรกเกิด")]');
        await page.click('//button[contains(., "2.1 โครงการเงินอุดหนุนเพื่อการการเลี้ยงดูเด็กแรกเกิด")]');

        // 9️⃣ รอให้เมนูย่อยแสดง แล้วคลิก "บันทึกข้อมูลครั้งที่ 1"
        await page.waitForSelector('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report020101Controller?time_count=1"]'); // รอให้ลิงก์โหลด
        await page.click('a[href="https://volunteer-smart-beta.nu.ac.th/beta-inspectorNew/index.php/Y2568Report020101Controller?time_count=1"]'); // คลิกลิงก์

        console.log('คลิกบันทึกข้อมูลครั้งที่ 1 สำเร็จ!');

        //ส่วนที่ 1: แผนและผลการดำเนินงาน
        await page.waitForSelector('select[name="start_mount"]'); // รอให้ select โหลด
        await page.selectOption('select[name="start_mount"]', { label: 'เมษายน' });

        await page.waitForSelector('select[name="end_mount"]'); // รอให้ select โหลด
        await page.selectOption('select[name="end_mount"]', { label: 'มิถุนายน' });

        await page.waitForSelector('input[name="number_of_children_receiving_subsidy"]');
        await page.fill('input[name="number_of_children_receiving_subsidy"]', '50000'); // จำนวนการติดตามทั้งหมด(เด็กอายุตั้งแต่ 6 ปีขึ้นไปที่เคยได้รับเงินอุดหนุนฯ)

        await page.waitForSelector('input[name="number_of_following"]');
        await page.fill('input[name="number_of_following"]', '30000'); // ค่าเป้าหมายการติดตามปี 2568ร้อยละ30.09(ราย)

        await page.waitForSelector('input[name="in_area"]');
        await page.fill('input[name="in_area"]', '20000'); // ค่าเป้าหมายการติดตามปี 2568ร้อยละ30.09(ราย)

        await page.waitForSelector('input[name="case_of_receiving"]');
        await page.fill('input[name="case_of_receiving"]', '10000'); // กรณีได้รับการประสานส่งต่อจากนอกพื้นที่

        await page.waitForSelector('input[name="save_in_MSOlogbook"]');
        await page.fill('input[name="save_in_MSOlogbook"]', '20000'); // บันทึกใน MSO Logbook

        await page.waitForSelector('input[name="child_followed_not_found"]');
        await page.fill('input[name="child_followed_not_found"]', '5000'); // เด็กที่ติดตามแล้วแต่ไม่พบข้อมูลเด็กในพื้นที่และไม่สามารถติดตามที่อยู่ได้(ราย)

        await page.waitForSelector('input[name="child_followed_outside"]');
        await page.fill('input[name="child_followed_outside"]', '4000'); // เด็กที่ติดตามแล้วแต่อยู่นอกพื้นที่จังหวัดและประสานส่งต่อแล้ว (ราย)

        await page.waitForSelector('input[name="in_this_section"]');
        await page.fill('input[name="in_this_section"]', '3000'); // อยู่ระหว่างการติดตาม (ราย)

        //ผลการดำเนินงานจำแนกรายมิติ
        const data = [
            { index: 1, problem: '50000', rescued: '10000', detail: 'แผนการดำเนินงาน/แนวทางแก้ไขปัญหาในแต่ละมิติ(อธิบายแนวทาง/วิธีการ พอสังเขป) 1' },
            { index: 2, problem: '50000', rescued: '10000', detail: 'แผนการดำเนินงาน/แนวทางแก้ไขปัญหาในแต่ละมิติ(อธิบายแนวทาง/วิธีการ พอสังเขป) 2' },
            { index: 3, problem: '50000', rescued: '10000', detail: 'แผนการดำเนินงาน/แนวทางแก้ไขปัญหาในแต่ละมิติ(อธิบายแนวทาง/วิธีการ พอสังเขป) 3' },
            { index: 4, problem: '50000', rescued: '10000', detail: 'แผนการดำเนินงาน/แนวทางแก้ไขปัญหาในแต่ละมิติ(อธิบายแนวทาง/วิธีการ พอสังเขป) 4' },
            { index: 5, problem: '50000', rescued: '10000', detail: 'แผนการดำเนินงาน/แนวทางแก้ไขปัญหาในแต่ละมิติ(อธิบายแนวทาง/วิธีการ พอสังเขป) 5' },
        ];

        for (let i = 0; i < data.length; i++) {
            const { index, problem, rescued, detail } = data[i];
            
            await page.waitForSelector(`input[name="dimension[${index}][number_children_problem]"]`);
            await page.fill(`input[name="dimension[${index}][number_children_problem]"]`, problem); // กรอกจำนวนงบที่จัดสรร

            await page.waitForSelector(`input[name="dimension[${index}][Rescued]"]`);
            await page.fill(`input[name="dimension[${index}][Rescued]"]`, rescued); // กรอกจำนวนงบที่เบิกจ่าย

            await page.waitForSelector(`textarea[name="dimension[${index}][troubleshooting]"]`);
            await page.fill(`textarea[name="dimension[${index}][troubleshooting]"]`, detail); // กรอกรายละเอียด

            console.log(`กรอกข้อมูลผลการดำเนินงานจำแนกรายมิติ ${index} 2.1 สำเร็จ!`);
        }

        //ส่วนที่ 2 : กระบวนการดำเนินงาน (ตามตัวชี้วัดโครงการฯ)
        //จัดทำแผน
        // รอให้ Checkbox โหลด
        await page.waitForSelector('input[name="statistics[1][implemented]"]');
        await page.waitForSelector('input[name="statistics[1][in_progress]"]');
        await page.waitForSelector('input[name="statistics[1][not_yet_implemented]"]');

        // สร้าง Array ของ Checkbox ที่เป็นไปได้
        const checkboxes1 = [
            'input[name="statistics[1][implemented]"]', 
            'input[name="statistics[1][in_progress]"]', 
            'input[name="statistics[1][not_yet_implemented]"]'
        ];

        // สุ่มเลือก 1 ตัว
        const randomCheckbox1 = checkboxes1[Math.floor(Math.random() * checkboxes1.length)];

        // ติ๊ก Checkbox ที่สุ่มได้
        await page.check(randomCheckbox1);

        await page.waitForSelector('textarea[name="statistics[1][detail]"]');
        await page.fill('textarea[name="statistics[1][detail]"]', 'ชี้แจงกรณีไม่เป็นไปตามเเผน'); // ชี้แจงกรณีไม่เป็นไปตามเเผน

        //จัดทำแผน
        await page.waitForSelector('input[name="statistics[2][implemented]"]');
        await page.waitForSelector('input[name="statistics[2][in_progress]"]');
        await page.waitForSelector('input[name="statistics[2][not_yet_implemented]"]');

        const checkboxes2 = [
            'input[name="statistics[2][implemented]"]', 
            'input[name="statistics[2][in_progress]"]', 
            'input[name="statistics[2][not_yet_implemented]"]'
        ];

        const randomCheckbox2 = checkboxes2[Math.floor(Math.random() * checkboxes2.length)];

        await page.check(randomCheckbox2);

        await page.waitForSelector('textarea[name="statistics[2][detail]"]');
        await page.fill('textarea[name="statistics[2][detail]"]', 'ชี้แจงกรณีไม่เป็นไปตามเเผน'); // ชี้แจงกรณีไม่เป็นไปตามเเผน

        //ประสานพื้นที่
        await page.waitForSelector('input[name="statistics[3][implemented]"]');
        await page.waitForSelector('input[name="statistics[3][in_progress]"]');
        await page.waitForSelector('input[name="statistics[3][not_yet_implemented]"]');

        const checkboxes3 = [
            'input[name="statistics[3][implemented]"]', 
            'input[name="statistics[3][in_progress]"]', 
            'input[name="statistics[3][not_yet_implemented]"]'
        ];

        const randomCheckbox3 = checkboxes3[Math.floor(Math.random() * checkboxes3.length)];

        await page.check(randomCheckbox3);

        await page.waitForSelector('textarea[name="statistics[3][detail]"]');
        await page.fill('textarea[name="statistics[3][detail]"]', 'ชี้แจงกรณีไม่เป็นไปตามเเผน'); // ชี้แจงกรณีไม่เป็นไปตามเเผน

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
        await page.fill('input[name="position_name_reporter"]', 'ผู้รายงาน1.2'); // ตำแหน่ง

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