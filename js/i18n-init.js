(function($) {
    var STORAGE_KEY = 'r355_lang';
    var DEFAULT_LANG = 'zh';
    var SUPPORTED_LANGS = ['zh', 'en', 'es', 'fr', 'ru'];

    function getLang() {
        var lang = localStorage.getItem(STORAGE_KEY);
        if (!lang) {
            lang = (navigator.language || navigator.userLanguage).toLowerCase();
            if (lang.indexOf('zh') !== -1) lang = 'zh';
            else if (lang.indexOf('en') !== -1) lang = 'en';
            else if (lang.indexOf('es') !== -1) lang = 'es';
            else if (lang.indexOf('fr') !== -1) lang = 'fr';
            else if (lang.indexOf('ru') !== -1) lang = 'ru';
            else lang = DEFAULT_LANG;
        }
        return lang;
    }

    function setLang(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) !== -1) {
            localStorage.setItem(STORAGE_KEY, lang);
            location.reload();
        }
    }

    function updateLangSwitcherUI(lang) {
        var langMap = {
            'zh': '中文', 'en': 'English', 'es': 'Español', 'fr': 'Français', 'ru': 'Русский'
        };
        $('.lang-current .lang-text').text(langMap[lang] || '中文');
    }

    function translate(key, data) {
        if (!data) return key;
        var keys = key.split('.');
        var value = data;
        for (var i = 0; i < keys.length; i++) {
            value = value ? value[keys[i]] : null;
        }
        return value || key;
    }

    function applyTranslations(data) {
        $('[data-localize]').each(function() {
            var $el = $(this);
            var key = $el.attr('data-localize');
            var val = translate(key, data);
            
            if ($el.is('input') || $el.is('textarea')) {
                if ($el.attr('placeholder') !== undefined) {
                    $el.attr('placeholder', val);
                } else {
                    $el.val(val);
                }
            } else if ($el.is('img')) {
                $el.attr('alt', val);
            } else {
                $el.html(val);
            }
        });
    }

    function initSimpleI18n() {
        var lang = getLang();
        updateLangSwitcherUI(lang);

        $.getJSON('/i18n/site-' + lang + '.json')
            .done(function(data) {
                window.i18nData = data;
                applyTranslations(data);
                $(document).trigger('localize.completed');
            })
            .fail(function() {
                console.error('Failed to load translation file for language: ' + lang);
            });
    }

    $(function() {
        initSimpleI18n();

        $(document).on('click', '.lang-list li', function() {
            var lang = $(this).data('lang');
            setLang(lang);
        });
    });

    // Expose globally
    window.i18nHandler = {
        getLang: getLang,
        setLang: setLang,
        translate: function(key) {
            return translate(key, window.i18nData);
        }
    };
})(jQuery);
