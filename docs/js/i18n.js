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
                "title": "Torsten Linnecke — Resume | COO & Entrepreneur",
                "description": "Entrepreneur and COO with expertise in sports technology, business development, and strategic operations. Magdeburg, Germany.",
                "keywords": "resume,cv,Torsten Linnecke,COO,sports technology,business development,entrepreneur,magdeburg,germany,strategic planning,operations management",
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
                        "category": "Strategic Operations & Scale-Up Leadership",
                        "level": "Expert Level",
                        "description": "End-to-end business scaling from startup to seven-figure revenue with expertise in sports technology, supply chain optimization, and international market development.",
                        "tags": [
                            "Strategic Planning & Execution",
                            "Supply Chain Management",
                            "Full-Stack Business Development",
                            "Sports Technology Innovation",
                            "International Logistics & Expansion",
                            "Cross-Functional Team Leadership",
                            "DevOps & Technical Operations",
                            "Customer Relations & Key Account Management"
                        ]
                    },
                    {
                        "category": "Additional Qualifications",
                        "tags": [
                            "UX/UI Design",
                            "Digital Marketing",
                            "Design Engineering",
                            "Accounting",
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
                "title": "Torsten Linnecke — Lebenslauf | COO & Unternehmer",
                "description": "Unternehmer und COO mit Expertise in Sporttechnologie, Geschäftsentwicklung und strategischen Operationen. Magdeburg, Deutschland.",
                "keywords": "resume,cv,lebenslauf,Torsten Linnecke,COO,sporttechnologie,geschäftsentwicklung,unternehmer,magdeburg,deutschland,strategic planning,business development",
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
                        "category": "Strategic Operations & Scale-Up Leadership",
                        "level": "Experten Level",
                        "description": "End-to-End-Geschäftsskalierung vom Startup bis zum siebenstelligen Umsatz mit Expertise in Sporttechnologie, Lieferkettenoptimierung und internationaler Marktentwicklung",
                        "tags": [
                            "Strategische Planung & Ausführung",
                            "Lieferkettenmanagement",
                            "Full-Stack Business Development",
                            "Sport-Technologie-Innovation",
                            "Internationale Logistik und Expansion",
                            "Funktionsübergreifende Teamführung",
                            "DevOps & Technischer Betrieb",
                            "Kundenbeziehungen & Key Account Management"
                        ]
                    },
                    {
                        "category": "Zusätzliche Qualifikationen",
                        "tags": [
                            "UX/UI Design",
                            "Digitales Marketing",
                            "Design Engineering",
                            "Buchaltung",
                            "Deutsch",
                            "Englisch"
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
     * Always tries to fetch JSON files first, uses embedded as fallback only
     */
    async function loadTranslations(lang) {
        try {
            // Always try to fetch from JSON files first
            const response = await fetch(`${CONFIG.localesPath}${lang}.json?v=${Date.now()}`);
            if (response.ok) {
                translations = await response.json();
                console.info(`Loaded ${lang}.json translations successfully`);
                return;
            }
            throw new Error(`Failed to load ${lang}.json - status: ${response.status}`);
        } catch (error) {
            console.warn(`Error loading translations from JSON for '${lang}':`, error);

            // Fallback: try embedded translations
            if (EMBEDDED_TRANSLATIONS[lang]) {
                console.warn(`Using embedded ${lang} translations as fallback`);
                translations = EMBEDDED_TRANSLATIONS[lang];
                return;
            }

            // Second fallback: try default language JSON
            if (lang !== CONFIG.defaultLang) {
                try {
                    const fallbackResponse = await fetch(`${CONFIG.localesPath}${CONFIG.defaultLang}.json?v=${Date.now()}`);
                    if (fallbackResponse.ok) {
                        translations = await fallbackResponse.json();
                        console.info(`Using ${CONFIG.defaultLang}.json as fallback`);
                        return;
                    }
                } catch (fallbackError) {
                    console.error('Failed to load fallback JSON:', fallbackError);
                }
            }

            // Ultimate fallback: use embedded default
            if (EMBEDDED_TRANSLATIONS[CONFIG.defaultLang]) {
                console.warn(`Using embedded ${CONFIG.defaultLang} translations as ultimate fallback`);
                translations = EMBEDDED_TRANSLATIONS[CONFIG.defaultLang];
            } else {
                console.error('No translations available');
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

        // Update meta tags with data-i18n-attr attribute
        const metaElements = document.querySelectorAll('[data-i18n-attr][data-i18n]');
        metaElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const attr = element.getAttribute('data-i18n-attr');
            const translation = t(key);
            
            if (translation && translation !== key && attr) {
                element.setAttribute(attr, translation);
            }
        });
        
        // Legacy: Update meta description for backward compatibility
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta && !descMeta.hasAttribute('data-i18n-attr')) {
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

        CONFIG.supportedLangs.forEach((lang, index) => {
            const button = document.createElement('button');
            button.textContent = lang.toUpperCase();

            // Simple inline styles that work without Tailwind
            button.style.cssText = `
                padding: 0.5rem 0.75rem;
                font-size: 0.875rem;
                font-weight: 500;
                border: 1px solid #d1d5db;
                cursor: pointer;
                transition: all 0.2s;
                background: white;
                color: #6b7280;
                ${index === 0 ? 'border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem;' : ''}
                ${index === CONFIG.supportedLangs.length - 1 ? 'border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;' : ''}
                ${index > 0 ? 'border-left: none;' : ''}
            `;

            // Active/inactive state
            const isActive = currentLang === lang;
            if (isActive) {
                button.style.backgroundColor = '#374151';
                button.style.color = 'white';
                button.style.borderColor = '#374151';
            }

            button.className = 'lang-switch-btn';
            button.setAttribute('type', 'button');
            button.setAttribute('aria-label', `Switch to ${lang.toUpperCase()}`);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

            button.addEventListener('click', () => {
                setLang(lang);
                // Update active states for all buttons
                container.querySelectorAll('button').forEach((btn, btnIndex) => {
                    const btnLang = CONFIG.supportedLangs[btnIndex];
                    const btnIsActive = btnLang === lang;

                    // Update visual state
                    if (btnIsActive) {
                        btn.style.backgroundColor = '#374151';
                        btn.style.color = 'white';
                        btn.style.borderColor = '#374151';
                        btn.setAttribute('aria-pressed', 'true');
                    } else {
                        btn.style.backgroundColor = 'white';
                        btn.style.color = '#6b7280';
                        btn.style.borderColor = '#d1d5db';
                        btn.setAttribute('aria-pressed', 'false');
                    }
                });
            });

            // Add hover effects
            button.addEventListener('mouseenter', () => {
                if (currentLang !== lang) {
                    button.style.backgroundColor = '#f9fafb';
                    button.style.borderColor = '#9ca3af';
                    button.style.color = '#374151';
                }
            });

            button.addEventListener('mouseleave', () => {
                if (currentLang !== lang) {
                    button.style.backgroundColor = 'white';
                    button.style.borderColor = '#d1d5db';
                    button.style.color = '#6b7280';
                }
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