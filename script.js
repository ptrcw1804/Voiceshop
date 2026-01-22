let currentLang = "th";

const data = {
    th: {
        subtitle: "กดเลือกคำถาม ระบบจะตอบด้วยเสียงอัตโนมัติ",
        questions: {
            price: "ราคาสินค้า",
            time: "เวลาเปิดร้าน",
            order: "วิธีสั่งซื้อ",
            contact: "ช่องทางติดต่อ"
        },
        answers: {
            price: "ราคาสินค้าเริ่มต้นที่ 30 บาท",
            time: "ร้านเปิดทุกวัน เวลา 08.00 ถึง 18.00 น.",
            order: "สามารถสั่งซื้อได้ที่หน้าร้าน",
            contact: "ติดต่อได้ที่ร้านโกโก้ลุงลี"
        }
    },
    en: {
        subtitle: "Tap a question. The system will answer with voice.",
        questions: {
            price: "Price",
            time: "Opening Hours",
            order: "How to Order",
            contact: "Contact"
        },
        answers: {
            price: "Prices start at 30 baht.",
            time: "The shop is open daily from 8 AM to 6 PM.",
            order: "You can order at the shop.",
            contact: "Contact Uncle Lee Cocoa shop."
        }
    }
};

function setLang(lang) {
    currentLang = lang;

    // เปลี่ยนสีปุ่มภาษา
    document.getElementById("btn-th").classList.remove("active");
    document.getElementById("btn-en").classList.remove("active");
    document.getElementById("btn-" + lang).classList.add("active");

    document.getElementById("subtitle").innerText = data[lang].subtitle;

    // เปลี่ยนข้อความปุ่มคำถาม
    document.getElementById("q-price").innerText = data[lang].questions.price;
    document.getElementById("q-time").innerText = data[lang].questions.time;
    document.getElementById("q-order").innerText = data[lang].questions.order;
    document.getElementById("q-contact").innerText = data[lang].questions.contact;

    // รีเซ็ตกล่องคำตอบ
    document.getElementById("answerText").innerText =
        lang === "th" ? "กรุณาเลือกคำถาม" : "Please select a question";
}

function answer(key) {
    const text = data[currentLang].answers[key];
    document.getElementById("answerText").innerText = text;

    const warning = document.getElementById("voiceWarning");
    warning.style.display = "none";

    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = currentLang === "th" ? "th-TH" : "en-US";

        // ตรวจสอบเสียงภาษาไทยบน Android
        const voices = window.speechSynthesis.getVoices();
        const hasThaiVoice = voices.some(v => v.lang === "th-TH");

        if (currentLang === "th" && !hasThaiVoice) {
            warning.style.display = "block";
            return; // ไม่พยายามพูด
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }
}

// ตั้งค่าเริ่มต้น
setLang("th");
