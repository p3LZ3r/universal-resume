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

    // Minimal embedded translations as ultimate fallback only
    const EMBEDDED_TRANSLATIONS = {
        'en': {
            "meta": { "title": "Torsten Linnecke — Resume" },
            "header": { "name": "Torsten Linnecke" }
        },
        'de': {
            "meta": { "title": "Torsten Linnecke — Lebenslauf" },
            "header": { "name": "Torsten Linnecke" }
        }
    };

    // State
    let currentLang = CONFIG.defaultLang;
    let translations = {};
    let cachedElements = null; // Cache DOM elements for better performance

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
            // Recreate language switcher to update visual state
            const languageSwitcher = document.querySelector('#language-switcher');
            if (languageSwitcher) {
                createLanguageSwitcher('#language-switcher');
            }
            // Trigger custom event for other components to react
            window.dispatchEvent(new CustomEvent('i18nLanguageChanged', { detail: { lang } }));
        });
    }

    /**
     * Load translations with streamlined fallback strategy
     */
    async function loadTranslations(lang) {
        const fallbackChain = [
            () => loadFromJSON(lang),
            () => loadFromJSON(CONFIG.defaultLang),
            () => useEmbeddedTranslations(CONFIG.defaultLang)
        ];

        for (const loadStrategy of fallbackChain) {
            try {
                const result = await loadStrategy();
                if (result) {
                    translations = result;
                    return;
                }
            } catch (error) {
                console.warn(`Translation loading strategy failed:`, error);
            }
        }

        console.error('All translation loading strategies failed');
        translations = {};
    }

    /**
     * Load translations from JSON file
     */
    async function loadFromJSON(lang) {
        const response = await fetch(`${CONFIG.localesPath}${lang}.json?v=${Date.now()}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${lang}.json - status: ${response.status}`);
        }
        const data = await response.json();
        console.info(`Loaded ${lang}.json translations successfully`);
        return data;
    }

    /**
     * Use embedded translations as fallback
     */
    function useEmbeddedTranslations(lang) {
        if (EMBEDDED_TRANSLATIONS[lang]) {
            console.warn(`Using minimal embedded ${lang} translations as ultimate fallback`);
            return EMBEDDED_TRANSLATIONS[lang];
        }
        return null;
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
     * Cache DOM elements for better performance
     */
    function cacheElements() {
        if (cachedElements) return cachedElements;

        cachedElements = {
            textElements: document.querySelectorAll('[data-i18n]'),
            htmlElements: document.querySelectorAll('[data-i18n-html]'),
            placeholderElements: document.querySelectorAll('[data-i18n-placeholder]'),
            titleElements: document.querySelectorAll('[data-i18n-title]'),
            metaElements: document.querySelectorAll('[data-i18n-attr][data-i18n]'),
            legacyDescMeta: document.querySelector('meta[name="description"]:not([data-i18n-attr])')
        };

        return cachedElements;
    }

    /**
     * Update all text elements on the page
     */
    function updatePageText() {
        const elements = cacheElements();

        // Update elements with data-i18n attribute
        elements.textElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);

            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });

        // Update elements with data-i18n-html attribute (for HTML content)
        elements.htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = t(key);

            if (translation && translation !== key) {
                element.innerHTML = translation;
            }
        });

        // Update placeholder attributes
        elements.placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = t(key);

            if (translation && translation !== key) {
                element.setAttribute('placeholder', translation);
            }
        });

        // Update title attributes
        elements.titleElements.forEach(element => {
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
        elements.metaElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const attr = element.getAttribute('data-i18n-attr');
            const translation = t(key);

            if (translation && translation !== key && attr) {
                element.setAttribute(attr, translation);
            }
        });

        // Legacy: Update meta description for backward compatibility
        if (elements.legacyDescMeta) {
            const descTranslation = t('meta.description');
            if (descTranslation && descTranslation !== 'meta.description') {
                elements.legacyDescMeta.setAttribute('content', descTranslation);
            }
        }
    }

    /**
     * Clear cached elements when DOM changes
     */
    function clearElementCache() {
        cachedElements = null;
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
            button.setAttribute('aria-label', `Switch to ${lang === 'de' ? 'German' : 'English'}`);
            button.setAttribute('type', 'button');

            const isActive = lang === currentLang;

            // Base classes for all buttons
            const baseClasses = [
                'px-3', 'h-6', 'flex', 'items-center', 'text-sm', 'font-medium', 'cursor-pointer',
                'transition-all', 'duration-200', 'ease-in-out',
                'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-stone-500'
            ];

            // Conditional classes based on position
            const positionClasses = [];
            if (index === 0) {
                positionClasses.push('rounded-l-full');
            }
            if (index === CONFIG.supportedLangs.length - 1) {
                positionClasses.push('rounded-r-full');
            }
            if (CONFIG.supportedLangs.length === 1) {
                positionClasses.push('rounded-full');
            }

            // Active/inactive state classes
            const stateClasses = isActive
                ? ['bg-stone-400', 'text-stone-700', 'dark:bg-stone-600', 'dark:text-stone-200']
                : ['bg-stone-200', 'text-stone-700', 'hover:bg-stone-300', 'dark:bg-stone-700', 'dark:text-stone-200', 'dark:hover:bg-stone-600'];

            // Combine all classes
            const allClasses = [...baseClasses, ...positionClasses, ...stateClasses];
            button.className = allClasses.join(' ');
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

            button.addEventListener('click', () => {
                setLang(lang);
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
        clearElementCache,
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