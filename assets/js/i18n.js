(() => {
    "use strict";

    /* ======================================================
         DICTIONARY
         - data-i18n            -> textContent
         - data-i18n-html       -> innerHTML (used when the text needs <br>/<span>)
         - data-i18n-placeholder-> input/textarea placeholder
      ====================================================== */
    const translations = {
        vi: {
            "hero.subtext": "sang năm thứ mười một",

            "invite.saveourdate": "save our date",
            "invite.dayOfWeek": "Chủ Nhật",
            "invite.locationName": "Thiskyhall Sala <br> Trung tâm Hội nghị",
            "invite.address":
                '<span class="bold">Tầng 20 – Sảnh Space Above</span> <br>Số 10, đường Mai Chí Thọ, phường An Khánh, TP. Hồ Chí Minh',
            "invite.mapBtn": "BẢN ĐỒ",

            "timeline.title": "Timeline",
            "timeline.item1": "Đón <br> khách",
            "timeline.item2": "Lễ <br> Vows",
            "timeline.item3": "Tiệc <br> cocktail",
            "timeline.item4": "Tiệc tối",
            "timeline.item5": "Party",

            "dresscode.title": "Trang Phục",
            "dresscode.subtext": "Trang trọng",

            "rsvp.title": "Xác nhận tham dự",
            "rsvp.subtext":
                "XÁC NHẬN THAM DỰ TIỆC CƯỚI. <br> ĐIỀU NÀY GIÚP CHÚNG TÔI CHU ĐÁO HƠN <br> TRONG VIỆC ĐÓN TIẾP QUÝ KHÁCH. XIN CẢM ƠN!!!",
            "rsvp.confirmYes": "CÓ",
            "rsvp.confirmNo": "KHÔNG",
            "rsvp.namePlaceholder": "TÊN",
            "rsvp.nonVeg": "Bình thường",
            "rsvp.veg": "Ăn chay",
            "rsvp.wishPlaceholder": "GỬI LỜI CHÚC ĐẾN CÔ DÂU CHÚ RỂ",
            "rsvp.confirmBtn": "XÁC NHẬN",

            "end.subtext": "sang năm thứ mười một",

            "music.label": "Bật nhạc <br> ở đây",

            "lang.popupTitle": "Chọn ngôn ngữ",
            "lang.popupSubtitle": "Quý khách vui lòng chọn ngôn ngữ hiển thị",
        },
        en: {
            "hero.subtext": "into our eleventh year together",

            "invite.saveourdate": "save our date",
            "invite.dayOfWeek": "Sunday",
            "invite.locationName": "Thiskyhall Sala <br> Convention Center",
            "invite.address":
                '<span class="bold">20th Floor – Space Above Hall</span> <br> 10 Mai Chí Thọ Street, An Khánh Ward, Ho Chi Minh City',
            "invite.mapBtn": "MAPS",

            "timeline.title": "Timeline",
            "timeline.item1": "Welcome <br> guests",
            "timeline.item2": "Vows <br> CEREMONY",
            "timeline.item3": "COCKTAIL & <br> DRINK",
            "timeline.item4": "Dinner <br> RECEPTION",
            "timeline.item5": "PARTY",

            "dresscode.title": "Dress Code",
            "dresscode.subtext": "Formal",

            "rsvp.title": "Attendance confirmation",
            "rsvp.subtext":
                "CONFIRMING ATTENDANCE AT THE PARTY. <br> THIS HELPS US TO HOST YOU MORE THOUGHTFULLY <br> AND FULLY. THANK YOU!!!",
            "rsvp.confirmYes": "YES",
            "rsvp.confirmNo": "NO",
            "rsvp.namePlaceholder": "NAME",
            "rsvp.nonVeg": "non-vegetarian",
            "rsvp.veg": "vegetarian",
            "rsvp.wishPlaceholder": "WRITE A WISH FOR THE BRIDE AND GROOM",
            "rsvp.confirmBtn": "CONFIRM",

            "end.subtext": "into our eleventh year together",

            "music.label": "Turn the <br> Music on",

            "lang.popupTitle": "Choose your language",
            "lang.popupSubtitle": "Please select your preferred language",
        },
    };

    const DEFAULT_LANG = "vi";
    let currentLang = DEFAULT_LANG;

    /* ======================================================
         APPLY TRANSLATIONS TO DOM
      ====================================================== */
    function applyTranslations(lang) {
        const dict = translations[lang] || translations[DEFAULT_LANG];

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        document.querySelectorAll("[data-i18n-html]").forEach((el) => {
            const key = el.dataset.i18nHtml;
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        document.documentElement.lang = lang;
    }

    function updateSwitcherUI(lang) {
        const switcher = document.querySelector(".lang-switcher");
        if (!switcher) return;

        const flag = switcher.querySelector(".lang-switcher-toggle .flag");
        const code = switcher.querySelector(".lang-switcher-toggle .lang-code");

        if (flag) flag.textContent = lang === "vi" ? "🇻🇳" : "🇬🇧";
        if (code) code.textContent = lang.toUpperCase();

        switcher.querySelectorAll(".lang-switcher-option").forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.lang === lang);
        });
    }

    function setLanguage(lang, meta = {}) {
        if (!translations[lang]) lang = DEFAULT_LANG;
        currentLang = lang;
        applyTranslations(lang);
        updateSwitcherUI(lang);

        window.dispatchEvent(new CustomEvent("lang:changed", {
            detail: { lang, ...meta }
        }));
    }

    /* ======================================================
         POPUP (shown every time the page loads)
      ====================================================== */
    function hidePopup() {
        const overlay = document.getElementById("lang-popup");
        if (!overlay) return;
        overlay.classList.add("is-hidden");
        document.body.classList.remove("lang-popup-active");

        document.documentElement.scrollLeft = 0;
        document.body.scrollLeft = 0;

        requestAnimationFrame(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        });

        setTimeout(() => overlay.remove(), 400);
    }

    function initPopup() {
        const overlay = document.getElementById("lang-popup");
        if (!overlay) return;

        document.body.classList.add("lang-popup-active");

        overlay.querySelectorAll("[data-lang-choice]").forEach((btn) => {
            btn.addEventListener("click", () => {
                setLanguage(btn.dataset.langChoice, { source: "popup" });
                hidePopup();
            });
        });
    }

    /* ======================================================
         FIXED CORNER SWITCHER
      ====================================================== */
    function initSwitcher() {
        const switcher = document.querySelector(".lang-switcher");
        if (!switcher) return;

        const toggleBtn = switcher.querySelector(".lang-switcher-toggle");

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            switcher.classList.toggle("is-open");
        });

        switcher.querySelectorAll(".lang-switcher-option").forEach((btn) => {
            btn.addEventListener("click", () => {
                setLanguage(btn.dataset.lang);
                switcher.classList.remove("is-open");
            });
        });

        document.addEventListener("click", (e) => {
            if (!switcher.contains(e.target)) switcher.classList.remove("is-open");
        });
    }

    /* ======================================================
         BOOTSTRAP
      ====================================================== */
    function init() {
        // Apply the default language to the page underneath the popup first,
        // so nothing looks broken/empty while the visitor is choosing.
        applyTranslations(DEFAULT_LANG);
        updateSwitcherUI(DEFAULT_LANG);

        initSwitcher();
        initPopup();
    }

    document.addEventListener("DOMContentLoaded", init);

    // Exposed so other scripts (e.g. the RSVP form submit handler in main.js)
    // can read the language the visitor picked.
    window.ThuPhatI18n = {
        getLang: () => currentLang,
        setLanguage,
    };
})();
