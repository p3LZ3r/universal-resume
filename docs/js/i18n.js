/**
 * Minimal i18n system for dynamic text swapping without page reload
 * Lightweight (~2.5KB), no dependencies
 */
(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        localesPath: './locales/',
        defaultLang: 'en',
        supportedLangs: ['en', 'de'],
        paramName: 'lang'
    };

    // Embedded translations to avoid CORS issues with file:/// protocol
    const EMBEDDED_TRANSLATIONS = {
        'en': {
            "meta": {
                "title": "Torsten Linnecke — Resume",
                "description": "Entrepreneur and COO",
                "keywords": "resume,cv,Torsten Linnecke",
                "author": "Torsten Linnecke"
            },
            "header": {
                "name": "Torsten Linnecke",
                "initials": "TL"
            },
            "about": {
                "title": "ABOUT ME",
                "company": "Design/Code - Torsten Linnecke",
                "period": "Since 2014",
                "description": "Design and implementation of digital brand experiences that convert, for local and national champions."
            },
            "experience": {
                "title": "EXPERIENCE",
                "positions": [
                    {
                        "company": "BM Sports Technology GmbH",
                        "period": "May 2017 – July 2025",
                        "position": "Chief Operating Officer",
                        "description": "Led comprehensive operational and strategic development initiatives that made the company a top player in the sports technology market, whose products are used daily by athletes around the world."
                    }
                ]
            },
            "education": {
                "title": "EDUCATION",
                "degrees": [
                    {
                        "institution": "Otto-von-Guericke University Magdeburg",
                        "period": "2014 – 2017",
                        "degree": "Master of Science in Industrial Engineering for Mechanical Engineering",
                        "description": "Specialization in Production Technology; discontinued to pursue entrepreneurial opportunities while writing master's thesis"
                    },
                    {
                        "institution": "Otto-von-Guericke University Magdeburg",
                        "period": "2009 – 2014",
                        "degree": "Bachelor of Science in Industrial Engineering for Mechanical Engineering",
                        "description": "Specialization in Production Technology & Resource Efficiency and Sustainability"
                    }
                ]
            },
            "projects": {
                "title": "PROJECTS",
                "items": [
                    {
                        "name": "Kickstarter Campaign",
                        "period": "2018",
                        "link": "Link",
                        "description": "Planning, design and implementation of a successfully funded Kickstarter campaign as a growth hack for an early stage startup."
                    },
                    {
                        "name": "Agoria - the digital marketplace for agricultural supplies",
                        "period": "2016 – 2017",
                        "type": "AgTech Platform",
                        "description": "Founded and developed a digital marketplace for agricultural products that connects farmers with suppliers through innovative technology solutions."
                    }
                ]
            },
            "qualifications": {
                "title": "QUALIFICATIONS",
                "skills": [
                    {
                        "category": "Business Development",
                        "level": "Expert Level",
                        "description": "Strategic planning, partnership development, market analysis, and entrepreneurial leadership with focus on agricultural technology and digital marketplaces.",
                        "tags": [
                            "Strategic Planning",
                            "Partnership Development",
                            "Market Analysis",
                            "AgTech"
                        ]
                    },
                    {
                        "category": "Additional Qualifications",
                        "tags": [
                            "Project Management",
                            "Digital Marketing",
                            "Product Development",
                            "Team Leadership",
                            "Innovation Management",
                            "German",
                            "English"
                        ]
                    }
                ]
            },
            "contact": {
                "title": "CONTACT",
                "items": [
                    {
                        "type": "linkedin",
                        "label": "LinkedIn",
                        "url": "//linkedin.com/in/torsten-linnecke"
                    },
                    {
                        "type": "location",
                        "label": "39112 Magdeburg, Germany"
                    },
                    {
                        "type": "email",
                        "label": "tlinnecke@gmail.com"
                    }
                ]
            }
        },
        'de': {
            "meta": {
                "title": "Torsten Linnecke — Resume",
                "description": "Unternehmer und COO",
                "keywords": "resume,cv,Torsten Linnecke",
                "author": "Torsten Linnecke"
            },
            "header": {
                "name": "Torsten Linnecke",
                "initials": "TL"
            },
            "about": {
                "title": "ÜBER MICH",
                "company": "Design/Code - Torsten Linnecke",
                "period": "Seit 2014",
                "description": "Gestaltung und Umsetzung digitaler Markenauftritte, die Konvertieren, für lokale und nationale Champions."
            },
            "experience": {
                "title": "ERFAHRUNG",
                "positions": [
                    {
                        "company": "BM Sports Technology GmbH",
                        "period": "Mai 2017 – Juli 2025",
                        "position": "Chief Operating Officer",
                        "description": "Leitung umfassender operativer und strategischer Entwicklungsinitiativen, die das Unternehmen zu einem Top-Player auf dem Sporttechnologiemarkt machten, dessen Produkte von Athleten auf der ganzen Welt tagtäglich genutzt werden."
                    }
                ]
            },
            "education": {
                "title": "AUSBILDUNG",
                "degrees": [
                    {
                        "institution": "Otto-von-Guericke-Universität Magdeburg",
                        "period": "2014 – 2017",
                        "degree": "Master of Science in Wirtschaftsingenieurwesen für Maschinenbau",
                        "description": "Vertiefung in Produktionstechnik; zum Wahrnehmen einer Unternehmensgründung während des Schreibens der Masterarbeit abgebrochen"
                    },
                    {
                        "institution": "Otto-von-Guericke-Universität Magdeburg",
                        "period": "2009 – 2014",
                        "degree": "Bachelor of Science in Wirtschaftsingenieurwesen für Maschinenbau",
                        "description": "Vertiefung in Produktionstechnik & Ressourceneffizienz und Nachhaltigkeit"
                    }
                ]
            },
            "projects": {
                "title": "PROJEKTE",
                "items": [
                    {
                        "name": "Kickstarter Kampagne",
                        "period": "2018",
                        "link": "Link",
                        "description": "Planung, Gestaltung und Umsetzung einer erfolgreich finanzierten Kickstarter Kampagne als Growth Hack für eine Early Stage Startup."
                    },
                    {
                        "name": "Agoria - der digitale Marktplatz für landwirtschaftliche Betriebsmittel",
                        "period": "2016 – 2017",
                        "type": "AgTech Platform",
                        "description": "Gründung und Entwicklung eines digitalen Marktplatzes für landwirtschaftliche Produkte, der Landwirte mit Lieferanten durch innovative Technologielösungen verbindet."
                    }
                ]
            },
            "qualifications": {
                "title": "QUALIFIKATIONEN",
                "skills": [
                    {
                        "category": "Business Development",
                        "level": "Expert Level",
                        "description": "Strategic planning, partnership development, market analysis, and entrepreneurial leadership with focus on agricultural technology and digital marketplaces.",
                        "tags": [
                            "Strategic Planning",
                            "Partnership Development",
                            "Market Analysis",
                            "AgTech"
                        ]
                    },
                    {
                        "category": "Zusätzliche Qualifikationen",
                        "tags": [
                            "Project Management",
                            "Digital Marketing",
                            "Product Development",
                            "Team Leadership",
                            "Innovation Management",
                            "German",
                            "English"
                        ]
                    }
                ]
            },
            "contact": {
                "title": "KONTAKT",
                "items": [
                    {
                        "type": "linkedin",
                        "label": "LinkedIn",
                        "url": "//linkedin.com/in/torsten-linnecke"
                    },
                    {
                        "type": "location",
                        "label": "39112 Magdeburg, Germany"
                    },
                    {
                        "type": "email",
                        "label": "tlinnecke@gmail.com"
                    }
                ]
            }
        }
    };

    // State
    let currentLang = CONFIG.defaultLang;
    let translations = {};

    /**
     * Get language from URL parameter
     */
    function getLangFromURL() {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get(CONFIG.paramName);
        return CONFIG.supportedLangs.includes(lang) ? lang : null;
    }

    /**
     * Detect browser language
     */
    function detectBrowserLang() {
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0];
        return CONFIG.supportedLangs.includes(lang) ? lang : CONFIG.defaultLang;
    }

    /**
     * Get current language (URL > browser detection > default)
     */
    function getCurrentLang() {
        return getLangFromURL() || detectBrowserLang();
    }

    /**
     * Set language and update URL
     */
    function setLang(lang) {
        if (!CONFIG.supportedLangs.includes(lang)) {
            console.warn(`Language '${lang}' not supported`);
            return;
        }

        currentLang = lang;

        // Update URL parameter
        const url = new URL(window.location);
        url.searchParams.set(CONFIG.paramName, lang);
        window.history.replaceState({}, '', url);

        // Load and apply translations
        loadTranslations(lang).then(() => {
            updatePageText();
            // Trigger custom event for other components to react
            window.dispatchEvent(new CustomEvent('i18nLanguageChanged', { detail: { lang } }));
        });
    }

    /**
     * Load translations for a specific language
     * Uses embedded translations to avoid CORS issues with file:/// protocol
     */
    async function loadTranslations(lang) {
        try {
            // Check if we have embedded translations for this language
            if (EMBEDDED_TRANSLATIONS[lang]) {
                translations = EMBEDDED_TRANSLATIONS[lang];
                return;
            }

            // Fallback: try to fetch from JSON files (for HTTP/HTTPS contexts)
            const response = await fetch(`${CONFIG.localesPath}${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            translations = await response.json();
        } catch (error) {
            console.warn(`Error loading translations for '${lang}':`, error);

            // First fallback: try embedded default language
            if (lang !== CONFIG.defaultLang && EMBEDDED_TRANSLATIONS[CONFIG.defaultLang]) {
                console.info(`Using embedded ${CONFIG.defaultLang} translations as fallback`);
                translations = EMBEDDED_TRANSLATIONS[CONFIG.defaultLang];
                return;
            }

            // Second fallback: try to fetch default language JSON (for HTTP/HTTPS contexts)
            if (lang !== CONFIG.defaultLang) {
                try {
                    const fallbackResponse = await fetch(`${CONFIG.localesPath}${CONFIG.defaultLang}.json`);
                    translations = await fallbackResponse.json();
                } catch (fallbackError) {
                    console.error('Failed to load fallback translations:', fallbackError);
                    // Ultimate fallback: use embedded default if available
                    translations = EMBEDDED_TRANSLATIONS[CONFIG.defaultLang] || {};
                }
            } else {
                // If we can't load the default language, use empty object
                translations = {};
            }
        }
    }

    /**
     * Get nested object value by dot-notation path
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Translation function - get text by key path
     */
    function t(key, fallback = null) {
        const value = getNestedValue(translations, key);

        if (value !== null) {
            return value;
        }

        // Return fallback or key if translation not found
        return fallback || key;
    }

    /**
     * Update all text elements on the page
     */
    function updatePageText() {
        // Update elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);

            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });

        // Update elements with data-i18n-html attribute (for HTML content)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');

        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = t(key);

            if (translation && translation !== key) {
                element.innerHTML = translation;
            }
        });

        // Update placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = t(key);

            if (translation && translation !== key) {
                element.setAttribute('placeholder', translation);
            }
        });

        // Update title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = t(key);

            if (translation && translation !== key) {
                element.setAttribute('title', translation);
            }
        });

        // Update document title
        const titleKey = document.documentElement.getAttribute('data-i18n-title') || 'meta.title';
        const titleTranslation = t(titleKey);
        if (titleTranslation && titleTranslation !== titleKey) {
            document.title = titleTranslation;
        }

        // Update meta description
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            const descTranslation = t('meta.description');
            if (descTranslation && descTranslation !== 'meta.description') {
                descMeta.setAttribute('content', descTranslation);
            }
        }
    }

    /**
     * Initialize the i18n system
     */
    async function init() {
        currentLang = getCurrentLang();

        // Load initial translations
        await loadTranslations(currentLang);

        // Update page text once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updatePageText);
        } else {
            updatePageText();
        }
    }

    /**
     * Create language switcher buttons
     */
    function createLanguageSwitcher(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        CONFIG.supportedLangs.forEach(lang => {
            const button = document.createElement('button');
            button.textContent = lang.toUpperCase();
            button.className = `lang-btn ${currentLang === lang ? 'active' : ''}`;
            button.setAttribute('type', 'button');
            button.setAttribute('aria-label', `Switch to ${lang.toUpperCase()}`);

            button.addEventListener('click', () => {
                setLang(lang);
                // Update active states
                container.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });

            container.appendChild(button);
        });
    }

    /**
     * Get available translations for current language
     */
    function getTranslations() {
        return translations;
    }

    /**
     * Check if a translation key exists
     */
    function hasTranslation(key) {
        return getNestedValue(translations, key) !== null;
    }

    // Public API
    const i18n = {
        t,
        setLang,
        getCurrentLang: () => currentLang,
        getSupportedLangs: () => CONFIG.supportedLangs,
        getTranslations,
        hasTranslation,
        updatePageText,
        createLanguageSwitcher,
        init
    };

    // Make available globally
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = i18n;
    } else {
        window.i18n = i18n;
    }

    // Auto-initialize
    i18n.init();
})();