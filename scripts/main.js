/* scripts/main.js */
const contentData = {
    en: {
        title: "Jordan Flag Day",
        langBtn: "عربي",
        sections: {
            black: {
                tag: "The Top Stripe",
                title: "Black",
                subtitle: "Abbasid Caliphate",
                desc: "The black stripe represents the Abbasid Caliphate (750-1258 AD). Black was their dynastic color and the color of the Prophet Muhammad's banner. It symbolizes dignity, heritage, and the glorious intellectual era of the Islamic Golden Age in Baghdad.",
                img: "assets/add_sound_seed2642935822.mp4"
            },
            white: {
                tag: "The Middle Stripe",
                title: "White",
                subtitle: "Umayyad Caliphate",
                desc: "The white stripe represents the Umayyad Caliphate (661-750 AD), who ruled from Damascus. White was their mourning color and the symbol of the Battle of Badr. It stands for purity, peace, and the radiant future.",
                img: "assets/nice_seed211049596.mp4"
            },
            green: {
                tag: "The Bottom Stripe",
                title: "Green",
                subtitle: "Fatimid Caliphate",
                desc: "The green stripe symbolizes the Fatimid Caliphate (909-1171 AD) and the Rashidun caliphates. Green is the traditional color of Islam, symbolizing growth, agriculture, and the enduring prosperity of the land.",
                img: "assets/can_u__just_let_it_move_like_therr_is_life_in_this_picture_and_no_edit_no_change_just_like_what_is_i_seed991253954.mp4"
            },
            red: {
                tag: "The Chevron & Star",
                title: "Red & Star",
                subtitle: "Hashemite Dynasty & Unity",
                desc: "The red chevron represents the Hashemite dynasty and the Great Arab Revolt of 1916, symbolizing the struggle for independence and freedom from tyranny. The seven-pointed star stands for the seven verses of Al-Fatiha (the opening of the Quran) and the unity of the Arab peoples.",
                img: "assets/kling_20260311_作品__1440_0.mp4"
            }
        }
    },
    ar: {
        title: "يوم العلم الأردني",
        langBtn: "English",
        sections: {
            black: {
                tag: "الشريط العلوي",
                title: "الأسود",
                subtitle: "الخلافة العباسية",
                desc: "يُمثل اللون الأسود راية الخلافة العباسية (750-1258 م). وهو لون راية النبي محمد صلى الله عليه وسلم. يرمز إلى الكرامة والتراث العربي وعصر النهضة الفكرية المزدهر في بغداد.",
                img: "assets/add_sound_seed2642935822.mp4"
            },
            white: {
                tag: "الشريط الأوسط",
                title: "الأبيض",
                subtitle: "الخلافة الأموية",
                desc: "يُمثل اللون الأبيض راية الدولة الأموية (661-750 م) التي اتخذت من دمشق عاصمة لها. ويرمز إلى النقاء والسلام والمستقبل المشرق والتسامح.",
                img: "assets/nice_seed211049596.mp4"
            },
            green: {
                tag: "الشريط السفلي",
                title: "الأخضر",
                subtitle: "الخلافة الفاطمية",
                desc: "يُمثل اللون الأخضر راية الدولة الفاطمية (909-1171 م) وهو اللون التقليدي للإسلام. يرمز إلى النمو والزراعة والعطاء المستمر والارتباط العميق بالأرض الأردنية.",
                img: "assets/can_u__just_let_it_move_like_therr_is_life_in_this_picture_and_no_edit_no_change_just_like_what_is_i_seed991253954.mp4"
            },
            red: {
                tag: "المثلث والنجمة",
                title: "الأحمر والنجمة",
                subtitle: "الثورة العربية الكبرى",
                desc: "المثلث الأحمر يمثل السلالة الهاشمية وراية الثورة العربية الكبرى عام 1916، ويرمز للتضحية والنضال من أجل الحرية. النجمة السباعية البيضاء تدل على السبع المثاني (سورة الفاتحة) في القرآن الكريم، وترمز إلى توحد الشعوب العربية وتلاحمها.",
                img: "assets/kling_20260311_作品__1440_0.mp4"
            }
        }
    }
};

let currentLang = 'en';

document.addEventListener("DOMContentLoaded", () => {
    // Select elements only after DOM is fully loaded
    const langToggleBtn = document.getElementById('lang-toggle');
    const sections = document.querySelectorAll('.stripe, .red-triangle');
    const modal = document.getElementById('details-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    function applyContent() {
        const data = contentData[currentLang];
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.querySelector('.logo').textContent = data.title;
        langToggleBtn.textContent = data.langBtn;

        sections.forEach(el => {
            const id = el.dataset.section;
            if(!id || !data.sections[id]) return;
            const item = data.sections[id];
            
            const titleEl = el.querySelector('.section-title');
            const subtitleEl = el.querySelector('.section-subtitle');
            const discoverEl = el.querySelector('.discover-text');

            if(titleEl) titleEl.textContent = item.title;
            if(subtitleEl) subtitleEl.textContent = item.subtitle;
            if(discoverEl) discoverEl.innerHTML = currentLang === 'ar' ? `اكتشف <span class="arrow">←</span>` : `Discover <span class="arrow">→</span>`;
        });
        
        // Update modal immediately if it is currently open
        if(modal.classList.contains('active')) {
            const activeSection = modal.dataset.activeSection;
            if(activeSection) updateModalTextData(activeSection);
        }
    }

    function updateModalTextData(id) {
        const data = contentData[currentLang].sections[id];
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
    }

    // Toggle Language
    langToggleBtn.addEventListener('click', () => {
        // Add class to fade out text briefly
        document.body.classList.add('content-translating');
        
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        
        setTimeout(() => {
            applyContent();
            document.body.classList.remove('content-translating');
        }, 150); // Matches the new CSS opacity transition speed
    });

    // Opening Premium Modal
    sections.forEach(section => {
        section.addEventListener('click', () => {
            const id = section.dataset.section;
            if(!id) return;
            const data = contentData[currentLang].sections[id];
            
            modal.dataset.activeSection = id;
            modalVideo.src = data.img;
            updateModalTextData(id);
            
            // Allow DOM to update image src before revealing with class
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
            });
        });
    });

    // Closing Premium Modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Init Content
    applyContent();
});
