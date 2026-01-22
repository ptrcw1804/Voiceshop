let currentLang = "th";

const data = {
    th: {
        price: "ราคาสินค้าชิ้นละ 199 บาทค่ะ",
        time: "ร้านเปิดทุกวันตั้งแต่ 9 โมงเช้าถึง 6 โมงเย็นค่ะ",
        order: "สามารถสั่งซื้อได้ที่หน้าร้านหรือทางออนไลน์ค่ะ",
        contact: "ติดต่อได้ทางไลน์หรือเบอร์โทรศัพท์ของร้านค่ะ"
    },
    en: {
        price: "The price is 199 baht per item.",
        time: "The shop is open from 9 a.m. to 6 p.m.",
        order: "You can order at the shop or online.",
        contact: "You can contact us via Line or phone."
    }
};

// เปลี่ยนภาษา
function setLang(lang) {
    currentLang = lang;
}

// ตอบคำถาม + พูดออกเสียง
function answer(key) {
    const text = data[currentLang][key];
    document.getElementById("answerBox").innerText = text;

    // สร้างเสียงพูด
    const speech = new SpeechSynthesisUtterance(text);

    // ⭐ จุดสำคัญที่สุด: กำหนดภาษาให้ชัด
    if (currentLang === "th") {
        speech.lang = "th-TH";
    } else {
        speech.lang = "en-US";
    }

    speech.rate = 1;   // ความเร็วปกติ
    speech.pitch = 1;  // น้ำเสียงปกติ

    // หยุดเสียงเก่าก่อน (กันเสียงซ้อน)
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}