// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype.forEach ) {

  Array.prototype.forEach = function forEach( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) !== "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( Object.prototype.hasOwnProperty.call(O, k) ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}
;
// I18n.js
// =======
//
// This small library provides the Rails I18n API on the Javascript.
// You don't actually have to use Rails (or even Ruby) to use I18n.js.
// Just make sure you export all translations in an object like this:
//
//     I18n.translations.en = {
//       hello: "Hello World"
//     };
//
// See tests for specific formatting like numbers and dates.
//

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define("i18n", function(){ return factory(root);});
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals (root is window)
    root.I18n = factory(root);
  }
}(this, function(global) {
  "use strict";

  // Use previously defined object if exists in current scope
  var I18n = global && global.I18n || {};

  // Just cache the Array#slice function.
  var slice = Array.prototype.slice;

  // Apply number padding.
  var padding = function(number) {
    return ("0" + number.toString()).substr(-2);
  };

  // Improved toFixed number rounding function with support for unprecise floating points
  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
  var toFixed = function(number, precision) {
    return decimalAdjust('round', number, -precision).toFixed(precision);
  };

  // Is a given variable an object?
  // Borrowed from Underscore.js
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object'
  };

  var isFunction = function(func) {
    var type = typeof func;
    return type === 'function'
  };

  // Check if value is different than undefined and null;
  var isSet = function(value) {
    return typeof(value) !== 'undefined' && value !== null;
  };

  // Is a given value an array?
  // Borrowed from Underscore.js
  var isArray = function(val) {
    if (Array.isArray) {
      return Array.isArray(val);
    };
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  var isString = function(val) {
    return typeof value == 'string' || Object.prototype.toString.call(val) === '[object String]';
  };

  var isNumber = function(val) {
    return typeof val == 'number' || Object.prototype.toString.call(val) === '[object Number]';
  };

  var isBoolean = function(val) {
    return val === true || val === false;
  };

  var decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  var lazyEvaluate = function(message, scope) {
    if (isFunction(message)) {
      return message(scope);
    } else {
      return message;
    }
  }

  var merge = function (dest, obj) {
    var key, value;
    for (key in obj) if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (isString(value) || isNumber(value) || isBoolean(value)) {
        dest[key] = value;
      } else {
        if (dest[key] == null) dest[key] = {};
        merge(dest[key], value);
      }
    }
    return dest;
  };

  // Set default days/months translations.
  var DATE = {
      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , meridian: ["AM", "PM"]
  };

  // Set default number format.
  var NUMBER_FORMAT = {
      precision: 3
    , separator: "."
    , delimiter: ","
    , strip_insignificant_zeros: false
  };

  // Set default currency format.
  var CURRENCY_FORMAT = {
      unit: "$"
    , precision: 2
    , format: "%u%n"
    , sign_first: true
    , delimiter: ","
    , separator: "."
  };

  // Set default percentage format.
  var PERCENTAGE_FORMAT = {
      unit: "%"
    , precision: 3
    , format: "%n%u"
    , separator: "."
    , delimiter: ""
  };

  // Set default size units.
  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

  // Other default options
  var DEFAULT_OPTIONS = {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
      defaultLocale: "en"
    // Set the current locale to `en`.
    , locale: "en"
    // Set the translation key separator.
    , defaultSeparator: "."
    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
    // Set if engine should fallback to the default locale when a translation
    // is missing.
    , fallbacks: false
    // Set the default translation object.
    , translations: {}
    // Set missing translation behavior. 'message' will display a message
    // that the translation is missing, 'guess' will try to guess the string
    , missingBehaviour: 'message'
    // if you use missingBehaviour with 'message', but want to know that the
    // string is actually missing for testing purposes, you can prefix the
    // guessed string by setting the value here. By default, no prefix!
    , missingTranslationPrefix: ''
  };

  // Set default locale. This locale will be used when fallback is enabled and
  // the translation doesn't exist in a particular locale.
  I18n.reset = function() {
    var key;
    for (key in DEFAULT_OPTIONS) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };

  // Much like `reset`, but only assign options if not already assigned
  I18n.initializeOptions = function() {
    var key;
    for (key in DEFAULT_OPTIONS) if (!isSet(this[key])) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };
  I18n.initializeOptions();

  // Return a list of all locales that must be tried before returning the
  // missing translation message. By default, this will consider the inline option,
  // current locale and fallback locale.
  //
  //     I18n.locales.get("de-DE");
  //     // ["de-DE", "de", "en"]
  //
  // You can define custom rules for any locale. Just make sure you return a array
  // containing all locales.
  //
  //     // Default the Wookie locale to English.
  //     I18n.locales["wk"] = function(locale) {
  //       return ["en"];
  //     };
  //
  I18n.locales = {};

  // Retrieve locales based on inline locale, current locale or default to
  // I18n's detection.
  I18n.locales.get = function(locale) {
    var result = this[locale] || this[I18n.locale] || this["default"];

    if (isFunction(result)) {
      result = result(locale);
    }

    if (isArray(result) === false) {
      result = [result];
    }

    return result;
  };

  // The default locale list.
  I18n.locales["default"] = function(locale) {
    var locales = []
      , list = []
    ;

    // Handle the inline locale option that can be provided to
    // the `I18n.t` options.
    if (locale) {
      locales.push(locale);
    }

    // Add the current locale to the list.
    if (!locale && I18n.locale) {
      locales.push(I18n.locale);
    }

    // Add the default locale if fallback strategy is enabled.
    if (I18n.fallbacks && I18n.defaultLocale) {
      locales.push(I18n.defaultLocale);
    }

    // Locale code format 1:
    // According to RFC4646 (http://www.ietf.org/rfc/rfc4646.txt)
    // language codes for Traditional Chinese should be `zh-Hant`
    //
    // But due to backward compatibility
    // We use older version of IETF language tag
    // @see http://www.w3.org/TR/html401/struct/dirlang.html
    // @see http://en.wikipedia.org/wiki/IETF_language_tag
    //
    // Format: `language-code = primary-code ( "-" subcode )*`
    //
    // primary-code uses ISO639-1
    // @see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // @see http://www.iso.org/iso/home/standards/language_codes.htm
    //
    // subcode uses ISO 3166-1 alpha-2
    // @see http://en.wikipedia.org/wiki/ISO_3166
    // @see http://www.iso.org/iso/country_codes.htm
    //
    // @note
    //   subcode can be in upper case or lower case
    //   defining it in upper case is a convention only


    // Locale code format 2:
    // Format: `code = primary-code ( "-" region-code )*`
    // primary-code uses ISO 639-1
    // script-code uses ISO 15924
    // region-code uses ISO 3166-1 alpha-2
    // Example: zh-Hant-TW, en-HK, zh-Hant-CN
    //
    // It is similar to RFC4646 (or actually the same),
    // but seems to be limited to language, script, region

    // Compute each locale with its country code.
    // So this will return an array containing
    // `de-DE` and `de`
    // or
    // `zh-hans-tw`, `zh-hans`, `zh`
    // locales.
    locales.forEach(function(locale) {
      var localeParts = locale.split("-");
      var firstFallback = null;
      var secondFallback = null;
      if (localeParts.length === 3) {
        firstFallback = localeParts[0];
        secondFallback = [
          localeParts[0],
          localeParts[1]
        ].join("-");
      }
      else if (localeParts.length === 2) {
        firstFallback = localeParts[0];
      }

      if (list.indexOf(locale) === -1) {
        list.push(locale);
      }

      if (! I18n.fallbacks) {
        return;
      }

      [
        firstFallback,
        secondFallback
      ].forEach(function(nullableFallbackLocale) {
        // We don't want null values
        if (typeof nullableFallbackLocale === "undefined") { return; }
        if (nullableFallbackLocale === null) { return; }
        // We don't want duplicate values
        //
        // Comparing with `locale` first is faster than
        // checking whether value's presence in the list
        if (nullableFallbackLocale === locale) { return; }
        if (list.indexOf(nullableFallbackLocale) !== -1) { return; }

        list.push(nullableFallbackLocale);
      });
    });

    // No locales set? English it is.
    if (!locales.length) {
      locales.push("en");
    }

    return list;
  };

  // Hold pluralization rules.
  I18n.pluralization = {};

  // Return the pluralizer for a specific locale.
  // If no specify locale is found, then I18n's default will be used.
  I18n.pluralization.get = function(locale) {
    return this[locale] || this[I18n.locale] || this["default"];
  };

  // The default pluralizer rule.
  // It detects the `zero`, `one`, and `other` scopes.
  I18n.pluralization["default"] = function(count) {
    switch (count) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Return current locale. If no locale has been set, then
  // the current locale will be the default locale.
  I18n.currentLocale = function() {
    return this.locale || this.defaultLocale;
  };

  // Check if value is different than undefined and null;
  I18n.isSet = isSet;

  // Find and process the translation using the provided scope and options.
  // This is used internally by some functions and should not be used as an
  // public API.
  I18n.lookup = function(scope, options) {
    options = options || {}

    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , fullScope
      , translations
    ;

    fullScope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = fullScope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }
      while (scopes.length) {
        translations = translations[scopes.shift()];

        if (translations === undefined || translations === null) {
          break;
        }
      }

      if (translations !== undefined && translations !== null) {
        return translations;
      }
    }

    if (isSet(options.defaultValue)) {
      return lazyEvaluate(options.defaultValue, scope);
    }
  };

  // lookup pluralization rule key into translations
  I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
    var pluralizer = this.pluralization.get(locale)
      , pluralizerKeys = pluralizer(count)
      , pluralizerKey
      , message;

    if (isObject(translations)) {
      while (pluralizerKeys.length) {
        pluralizerKey = pluralizerKeys.shift();
        if (isSet(translations[pluralizerKey])) {
          message = translations[pluralizerKey];
          break;
        }
      }
    }

    return message;
  };

  // Lookup dedicated to pluralization
  I18n.pluralizationLookup = function(count, scope, options) {
    options = options || {}
    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , translations
      , message
    ;
    scope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = scope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }

      while (scopes.length) {
        translations = translations[scopes.shift()];
        if (!isObject(translations)) {
          break;
        }
        if (scopes.length == 0) {
          message = this.pluralizationLookupWithoutFallback(count, locale, translations);
        }
      }
      if (message != null && message != undefined) {
        break;
      }
    }

    if (message == null || message == undefined) {
      if (isSet(options.defaultValue)) {
        if (isObject(options.defaultValue)) {
          message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
        } else {
          message = options.defaultValue;
        }
        translations = options.defaultValue;
      }
    }

    return { message: message, translations: translations };
  };

  // Rails changed the way the meridian is stored.
  // It started with `date.meridian` returning an array,
  // then it switched to `time.am` and `time.pm`.
  // This function abstracts this difference and returns
  // the correct meridian or the default value when none is provided.
  I18n.meridian = function() {
    var time = this.lookup("time");
    var date = this.lookup("date");

    if (time && time.am && time.pm) {
      return [time.am, time.pm];
    } else if (date && date.meridian) {
      return date.meridian;
    } else {
      return DATE.meridian;
    }
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  //     #=> {name: "John Doe", role: "user"}
  //
  I18n.prepareOptions = function() {
    var args = slice.call(arguments)
      , options = {}
      , subject
    ;

    while (args.length) {
      subject = args.shift();

      if (typeof(subject) != "object") {
        continue;
      }

      for (var attr in subject) {
        if (!subject.hasOwnProperty(attr)) {
          continue;
        }

        if (isSet(options[attr])) {
          continue;
        }

        options[attr] = subject[attr];
      }
    }

    return options;
  };

  // Generate a list of translation options for default fallbacks.
  // `defaultValue` is also deleted from options as it is returned as part of
  // the translationOptions array.
  I18n.createTranslationOptions = function(scope, options) {
    var translationOptions = [{scope: scope}];

    // Defaults should be an array of hashes containing either
    // fallback scopes or messages
    if (isSet(options.defaults)) {
      translationOptions = translationOptions.concat(options.defaults);
    }

    // Maintain support for defaultValue. Since it is always a message
    // insert it in to the translation options as such.
    if (isSet(options.defaultValue)) {
      translationOptions.push({ message: options.defaultValue });
    }

    return translationOptions;
  };

  // Translate the given scope with the provided options.
  I18n.translate = function(scope, options) {
    options = options || {}

    var translationOptions = this.createTranslationOptions(scope, options);

    var translation;

    var optionsWithoutDefault = this.prepareOptions(options)
    delete optionsWithoutDefault.defaultValue

    // Iterate through the translation options until a translation
    // or message is found.
    var translationFound =
      translationOptions.some(function(translationOption) {
        if (isSet(translationOption.scope)) {
          translation = this.lookup(translationOption.scope, optionsWithoutDefault);
        } else if (isSet(translationOption.message)) {
          translation = lazyEvaluate(translationOption.message, scope);
        }

        if (translation !== undefined && translation !== null) {
          return true;
        }
      }, this);

    if (!translationFound) {
      return this.missingTranslation(scope, options);
    }

    if (typeof(translation) === "string") {
      translation = this.interpolate(translation, options);
    } else if (isObject(translation) && isSet(options.count)) {
      translation = this.pluralize(options.count, scope, options);
    }

    return translation;
  };

  // This function interpolates the all variables in the given message.
  I18n.interpolate = function(message, options) {
    options = options || {}
    var matches = message.match(this.placeholder)
      , placeholder
      , value
      , name
      , regex
    ;

    if (!matches) {
      return message;
    }

    var value;

    while (matches.length) {
      placeholder = matches.shift();
      name = placeholder.replace(this.placeholder, "$1");

      if (isSet(options[name])) {
        value = options[name].toString().replace(/\$/gm, "_#$#_");
      } else if (name in options) {
        value = this.nullPlaceholder(placeholder, message, options);
      } else {
        value = this.missingPlaceholder(placeholder, message, options);
      }

      regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      message = message.replace(regex, value);
    }

    return message.replace(/_#\$#_/g, "$");
  };

  // Pluralize the given scope using the `count` value.
  // The pluralized translation may have other placeholders,
  // which will be retrieved from `options`.
  I18n.pluralize = function(count, scope, options) {
    options = this.prepareOptions({count: String(count)}, options)
    var pluralizer, message, result;

    result = this.pluralizationLookup(count, scope, options);
    if (result.translations == undefined || result.translations == null) {
      return this.missingTranslation(scope, options);
    }

    if (result.message != undefined && result.message != null) {
      return this.interpolate(result.message, options);
    }
    else {
      pluralizer = this.pluralization.get(options.locale);
      return this.missingTranslation(scope + '.' + pluralizer(count)[0], options);
    }
  };

  // Return a missing translation message for the given parameters.
  I18n.missingTranslation = function(scope, options) {
    //guess intended string
    if(this.missingBehaviour == 'guess'){
      //get only the last portion of the scope
      var s = scope.split('.').slice(-1)[0];
      //replace underscore with space && camelcase with space and lowercase letter
      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
          s.replace('_',' ').replace(/([a-z])([A-Z])/g,
          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
    }

    var localeForTranslation = (options != null && options.locale != null) ? options.locale : this.currentLocale();
    var fullScope           = this.getFullScope(scope, options);
    var fullScopeWithLocale = [localeForTranslation, fullScope].join(this.defaultSeparator);

    return '[missing "' + fullScopeWithLocale + '" translation]';
  };

  // Return a missing placeholder message for given parameters
  I18n.missingPlaceholder = function(placeholder, message, options) {
    return "[missing " + placeholder + " value]";
  };

  I18n.nullPlaceholder = function() {
    return I18n.missingPlaceholder.apply(I18n, arguments);
  };

  // Format number using localization rules.
  // The options will be retrieved from the `number.format` scope.
  // If this isn't present, then the following options will be used:
  //
  // - `precision`: `3`
  // - `separator`: `"."`
  // - `delimiter`: `","`
  // - `strip_insignificant_zeros`: `false`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.format")
      , NUMBER_FORMAT
    );

    var negative = number < 0
      , string = toFixed(Math.abs(number), options.precision).toString()
      , parts = string.split(".")
      , precision
      , buffer = []
      , formattedNumber
      , format = options.format || "%n"
      , sign = negative ? "-" : ""
    ;

    number = parts[0];
    precision = parts[1];

    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    formattedNumber = buffer.join(options.delimiter);

    if (options.strip_insignificant_zeros && precision) {
      precision = precision.replace(/0+$/, "");
    }

    if (options.precision > 0 && precision) {
      formattedNumber += options.separator + precision;
    }

    if (options.sign_first) {
      format = "%s" + format;
    }
    else {
      format = format.replace("%n", "%s%n");
    }

    formattedNumber = format
      .replace("%u", options.unit)
      .replace("%n", formattedNumber)
      .replace("%s", sign)
    ;

    return formattedNumber;
  };

  // Format currency with localization rules.
  // The options will be retrieved from the `number.currency.format` and
  // `number.format` scopes, in that order.
  //
  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
  // the following options:
  //
  // - `unit`: `"$"`
  // - `precision`: `2`
  // - `format`: `"%u%n"`
  // - `delimiter`: `","`
  // - `separator`: `"."`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.currency.format")
      , this.lookup("number.format")
      , CURRENCY_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Localize several values.
  // You can provide the following scopes: `currency`, `number`, or `percentage`.
  // If you provide a scope that matches the `/^(date|time)/` regular expression
  // then the `value` will be converted by using the `I18n.toTime` function.
  //
  // It will default to the value's `toString` function.
  //
  I18n.localize = function(scope, value, options) {
    options || (options = {});

    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup("number.format");
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        var localizedValue;

        if (scope.match(/^(date|time)/)) {
          localizedValue = this.toTime(scope, value);
        } else {
          localizedValue = value.toString();
        }

        return this.interpolate(localizedValue, options);
    }
  };

  // Parse a given `date` string into a JavaScript Date object.
  // This function is time zone aware.
  //
  // The following string formats are recognized:
  //
  //    yyyy-mm-dd
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ssZ
  //    yyyy-mm-dd[ T]hh:mm::ss+0000
  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
  //
  I18n.parseDate = function(date) {
    var matches, convertedDate, fraction;
    // we have a date, so just return it.
    if (typeof(date) == "object") {
      return date;
    };

    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

    if (matches) {
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

      if (matches[8]) {
        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
      } else {
        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
      }
    } else if (typeof(date) == "number") {
      // UNIX timestamp
      convertedDate = new Date();
      convertedDate.setTime(date);
    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
      // webkit/firefox, but not by IE, so we must parse it manually.
      convertedDate = new Date();
      convertedDate.setTime(Date.parse([
        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
      ].join(" ")));
    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
      // a valid javascript format with timezone info
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    } else {
      // an arbitrary javascript string
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    }

    return convertedDate;
  };

  // Formats time according to the directives in the given format string.
  // The directives begins with a percent (%) character. Any text not listed as a
  // directive will be passed through to the output string.
  //
  // The accepted formats are:
  //
  //     %a  - The abbreviated weekday name (Sun)
  //     %A  - The full weekday name (Sunday)
  //     %b  - The abbreviated month name (Jan)
  //     %B  - The full month name (January)
  //     %c  - The preferred local date and time representation
  //     %d  - Day of the month (01..31)
  //     %-d - Day of the month (1..31)
  //     %H  - Hour of the day, 24-hour clock (00..23)
  //     %-H - Hour of the day, 24-hour clock (0..23)
  //     %I  - Hour of the day, 12-hour clock (01..12)
  //     %-I - Hour of the day, 12-hour clock (1..12)
  //     %m  - Month of the year (01..12)
  //     %-m - Month of the year (1..12)
  //     %M  - Minute of the hour (00..59)
  //     %-M - Minute of the hour (0..59)
  //     %p  - Meridian indicator (AM  or  PM)
  //     %S  - Second of the minute (00..60)
  //     %-S - Second of the minute (0..60)
  //     %w  - Day of the week (Sunday is 0, 0..6)
  //     %y  - Year without a century (00..99)
  //     %-y - Year without a century (0..99)
  //     %Y  - Year with century
  //     %z  - Timezone offset (+0545)
  //
  I18n.strftime = function(date, format) {
    var options = this.lookup("date")
      , meridianOptions = I18n.meridian()
    ;

    if (!options) {
      options = {};
    }

    options = this.prepareOptions(options, DATE);

    if (isNaN(date.getTime())) {
      throw new Error('I18n.strftime() requires a valid date object, but received an invalid date.');
    }

    var weekDay = date.getDay()
      , day = date.getDate()
      , year = date.getFullYear()
      , month = date.getMonth() + 1
      , hour = date.getHours()
      , hour12 = hour
      , meridian = hour > 11 ? 1 : 0
      , secs = date.getSeconds()
      , mins = date.getMinutes()
      , offset = date.getTimezoneOffset()
      , absOffsetHours = Math.floor(Math.abs(offset / 60))
      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
      , timezoneoffset = (offset > 0 ? "-" : "+") +
          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
    ;

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", padding(day));
    format = format.replace("%e", day);
    format = format.replace("%-d", day);
    format = format.replace("%H", padding(hour));
    format = format.replace("%-H", hour);
    format = format.replace("%I", padding(hour12));
    format = format.replace("%-I", hour12);
    format = format.replace("%m", padding(month));
    format = format.replace("%-m", month);
    format = format.replace("%M", padding(mins));
    format = format.replace("%-M", mins);
    format = format.replace("%p", meridianOptions[meridian]);
    format = format.replace("%S", padding(secs));
    format = format.replace("%-S", secs);
    format = format.replace("%w", weekDay);
    format = format.replace("%y", padding(year));
    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
    format = format.replace("%Y", year);
    format = format.replace("%z", timezoneoffset);

    return format;
  };

  // Convert the given dateString into a formatted date.
  I18n.toTime = function(scope, dateString) {
    var date = this.parseDate(dateString)
      , format = this.lookup(scope)
    ;

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  // Convert a number into a formatted percentage value.
  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.percentage.format")
      , this.lookup("number.format")
      , PERCENTAGE_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Convert a number into a readable size representation.
  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
        options
      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
    );

    return this.toNumber(size, options);
  };

  I18n.getFullScope = function(scope, options) {
    options = options || {}

    // Deal with the scope as an array.
    if (isArray(scope)) {
      scope = scope.join(this.defaultSeparator);
    }

    // Deal with the scope option provided through the second argument.
    //
    //    I18n.t('hello', {scope: 'greetings'});
    //
    if (options.scope) {
      scope = [options.scope, scope].join(this.defaultSeparator);
    }

    return scope;
  };
  /**
   * Merge obj1 with obj2 (shallow merge), without modifying inputs
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object} Merged values of obj1 and obj2
   *
   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
   * Idea is from:
   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
   */
  I18n.extend = function ( obj1, obj2 ) {
    if (typeof(obj1) === "undefined" && typeof(obj2) === "undefined") {
      return {};
    }
    return merge(obj1, obj2);
  };

  // Set aliases, so we can save some typing.
  I18n.t = I18n.translate;
  I18n.l = I18n.localize;
  I18n.p = I18n.pluralize;

  return I18n;
}));

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["i18n"], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    factory(require("i18n"));
  } else {
    // Browser globals (root is window)
    factory(root.I18n);
  }
}(this, function(I18n) {
  "use strict";

  I18n.translations = {"ar":{"activerecord":{"attributes":{"branch":{"industry":"تصنيف"},"industry":{"name":"اسم","rating_type":"نوع تصنيف","type":"نوع"},"personal_detail":{"address_line1":"تصنيف تصنيف 1","address_line2":"تصنيف تصنيف 2","city":"تصنيف","contact_number":"تصنيف تصنيف","country":"تصنيف","fax_number":"تصنيف تصنيف","gender":"تصنيف","landmark":"تصنيف تصنيف","name":"تصنيف","pincode":"تصنيف تصنيف","state":"تصنيف","website":"تصنيف"},"user":{"email":"اسم","first_name":"اسم اسم","last_name":"اسم اسم","password":"اسم","user_name":"اسم اسم"}},"errors":{"messages":{"record_invalid":"فشل التحقّق من: %{errors}","restrict_dependent_destroy":{"has_many":"لا يمكن حذف السجل لوجود سجلات تعتمد عليه %{record}","has_one":"لا يمكن حذف السجل لوجود سجل يعتمد عليه %{record}"}}}},"branches":{"add_image":{"cancel":"صحح","preview":"صحح","update":"صحح","upload_image":"صحح صحح"},"assign_image_head":{"image_uploaded":"الصناعات الصناعات الصناعات!"},"create":{"created":"الصناعات!","error":"الصناعات!"},"create_branch_head":{"assign":"الصناعات","branch_head":"الصناعات الصناعات","cancel":"الصناعات","error":"الصناعات الصناعات الصناعات!","head_created":"الصناعات الصناعات الصناعات الصناعات!","not_yet_created":"الصناعات الصناعات الصناعات","prompt_staff":"الصناعات الصناعات الصناعات","staff":"الصناعات"},"delete":{"are_you_sure":"صحح","cancel":"صحح","delete":"صحح"},"destroy":{"deleted":"الصناعات!","error":"الصناعات!"},"edit":{"cancel":"صحح","edit":"صحح","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","update":"صحح"},"edit_branch_head":{"cancel":"صحح","edit":"صحح","error":"الصناعات الصناعات الصناعات!","female":"صحح","head_updated":"الصناعات الصناعات الصناعات الصناعات!!","male":"صحح","other":"صحح","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"صحح"},"index":{"branch":{"one":"صحح","other":"صحح"},"branches":"صحح","create_branch":"صحح صحح","create_department":"துறை உருவாக்க","delete":"நீக்க","edit":"தொகு","go_to_industries":"صحح صحح صحح","head":"தலைவர்","head_count":{"one":"صحح","other":"صحح"},"industry":"صحح","manage":"நிர்வகிக்க","not_yet_created":"صحح صحح صحح","show_details":"صحح صحح"},"list":{"assign":"صحح","delete":"صحح","edit":"صحح","head":"صحح صحح","image":"صحح","manage":"صحح"},"new":{"branch":"العربية","cancel":"صحح","create":"صحح","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","prompt_industry":"حذف"},"show":{"cancel":"صحح","edit":"صحح","head":"صحح صحح"},"show_branch_head":{"branch_head":"صحح صحح","cancel":"صحح","edit":"صحح"},"update":{"error":"الصناعات!","updated":"الصناعات!"}},"date":{"abbr_day_names":["الأحد","الإثنين","الثّلاثاء","الأربعاء","الخميس","الجمعة","السّبت"],"abbr_month_names":[null,"ينا","فبر","مار","أبر","ماي","يون","يول","أغس","سبت","أكت","نوف","ديس"],"day_names":["الأحد","الإثنين","الثّلاثاء","الأربعاء","الخميس","الجمعة","السّبت"],"formats":{"default":"%d-%m-%Y","long":"%e %B، %Y","short":"%e %b"},"month_names":[null,"يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"few":"حوالي %{count} ساعات","many":"حوالي %{count} ساعة","one":"حوالي ساعة واحدة","other":"حوالي %{count} ساعة","two":"حوالي ساعتان","zero":"حوالي صفر ساعات"},"about_x_months":{"few":"حوالي %{count} أشهر","many":"حوالي %{count} شهر","one":"حوالي شهر واحد","other":"حوالي %{count} شهر","two":"حوالي شهران","zero":"حوالي صفر أشهر"},"about_x_years":{"few":"حوالي %{count} سنوات","many":"حوالي %{count} سنة","one":"حوالي سنة","other":"حوالي %{count} سنة","two":"حوالي سنتان","zero":"حوالي صفر سنوات"},"almost_x_years":{"few":"ما يقرب من %{count} سنوات","many":"ما يقرب من %{count} سنة","one":"تقريبا سنة واحدة","other":"ما يقرب من %{count} سنة","two":"ما يقرب من سنتين","zero":"ما يقرب من صفر سنوات"},"half_a_minute":"نصف دقيقة","less_than_x_minutes":{"few":"أقل من %{count} دقائق","many":"أقل من %{count} دقيقة","one":"أقل من دقيقة","other":"أقل من %{count} دقيقة","two":"أقل من دقيقتان","zero":"أقل من صفر دقائق"},"less_than_x_seconds":{"few":"أقل من %{count} ثوان","many":"أقل من %{count} ثانية","one":"أقل من ثانية","other":"أقل من %{count} ثانية","two":"أقل من ثانيتان","zero":"أقل من صفر ثواني"},"over_x_years":{"few":"أكثر من %{count} سنوات","many":"أكثر من %{count} سنة","one":"أكثر من سنة","other":"أكثر من %{count} سنة","two":"أكثر من سنتين","zero":"أكثر من صفر سنوات"},"x_days":{"few":"%{count} أيام","many":"%{count} يوم","one":"يوم واحد","other":"%{count} يوم","two":"يومان","zero":"صفر أيام"},"x_minutes":{"few":"%{count} دقائق","many":"%{count} دقيقة","one":"دقيقة واحدة","other":"%{count} دقيقة","two":"دقيقتان","zero":"صفر دقائق"},"x_months":{"few":"%{count} أشهر","many":"%{count} شهر","one":"شهر واحد","other":"%{count} شهر","two":"شهران","zero":"صفر أشهر"},"x_seconds":{"few":"%{count} ثوان","many":"%{count} ثانية","one":"ثانية واحدة","other":"%{count} ثانية","two":"ثانيتان","zero":"صفر ثواني"}},"prompts":{"day":"اليوم","hour":"ساعة","minute":"دقيقة","month":"الشهر","second":"ثانية","year":"السنة"}},"departments":{"add_image":{"cancel":"صحح","preview":"صحح","update":"صحح","upload_image":"صحح صحح"},"admin_branch":{"branch":"صحح","create_department":"صحح صحح","department":{"one":"صحح","other":"صحح"},"departments":"صحح","go_to_branches":"صحح صحح صحح","go_to_industries":"صحح صحح صحح","head_count":{"one":"صحح صحح","other":"صحح صحح"},"industry":"صحح","not_yet_created":"صحح صحح صحح","show_details":"صحح صحح"},"assign_image_head":{"image_uploaded":"Image uploaded successfully!"},"branch_drop_down":{"prompt_branch":"صحح صحح صحح"},"create":{"created":"Department created successfully!","error":"Something went wrong!"},"create_department_head":{"error":"Something went wrong!","head_created":"Department Head created successfully!"},"delete":{"are_you_sure":"صحح صحح صحح صحح صحح صحح صحح","cancel":"صحح","delete":"صحح"},"department_head":{"assign":"Assign","cancel":"Cancel","department_head":"Department Head","not_yet_created":"not yet created","prompt_staff":"Select a Staff","staff":"Staff"},"department_index":{"assign":"Assign","create_sub_department":"Create Sub Department","delete":"Delete","edit":"Edit","head":"Head","manage":"Manage"},"destroy":{"deleted":"Department deleted successfully!","error":"Something went wrong!"},"edit":{"branch":"صحح","cancel":"صحح","department":"صحح","edit":"صحح","industry":"صحح","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"صحح صحح صحح","prompt_industry":"صحح صحح صحح","update":"صحح"},"edit_head":{"cancel":"Cancel","edit":"Edit","female":"Female","male":"Male","other":"Other","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"Update"},"list_details":{"assign":"صحح","branch":"صحح","delete":"صحح","edit":"صحح","go_to_branches":"صحح صحح صحح","head":"صحح","image":"صحح","manage":"صحح","not_yet_created":"صحح صحح صحح"},"new":{"branch":"صحح","cancel":"صحح","create":"صحح","department":"صحح","industry":"صحح","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"صحح صحح صحح","prompt_industry":"صحح صحح صحح"},"show":{"cancel":"Cancel","department_head":"Department Head","edit":"Edit"},"update":{"error":"Something went wrong!","updated":"Department updated successfully!"},"update_department_head":{"error":"Something went wrong!","head_updated":"Department Head updated successfully!"}},"devise":{"registrations":{"edit":{"cancel":"تصنيف","confirmation":"(نحن بحاجة إلى كلمة المرور الحالية لتأكيد التغييرات)","current_password":"نوع تصنيف","edit":"أغلق","email":"نوع","leave_blank":"(ترك فارغا إذا كنت لا ترغب في تغييره)","password":"اسم","password_confirmation":"نوع تصنيف","update":"أغلق","user_name":"أغلق"}}},"errors":{"format":"%{message}","messages":{"accepted":"يجب أن تقبل %{attribute}","blank":"لا يمكن أن يكون محتوى %{attribute} فارغاً","confirmation":"محتوى %{attribute} لا يتوافق مع %{attribute}","empty":"لا يمكن أن يكون محتوى %{attribute} فارغاً","equal_to":"يجب أن يساوي طول %{attribute} %{count}","even":"يجب أن يكون عدد %{attribute} زوجياً","exclusion":"حقل %{attribute} محجوز","greater_than":"ميجب أن يكون عدد %{attribute} أكبر من %{count}","greater_than_or_equal_to":"يجب أن يكون عدد %{attribute} أكبر أو يساوي %{count}","inclusion":"%{attribute} غير وارد في القائمة","invalid":"محتوى %{attribute} غير صالح","less_than":"يجب أن يكون عدد %{attribute} أصغر من %{count}","less_than_or_equal_to":"يجب أن يكون عدد %{attribute} أصغر أو  يساوي %{count}","not_a_number":"يجب أن يكون محتوى %{attribute} رقماً","not_an_integer":"يجب أن يكون عدد %{attribute} عدد صحيحاً","odd":"يجب أن يكون عدد %{attribute} عدداً فردياً","other_than":{"few":"طول %{attribute} يجب ألاّ يكون %{count} أحرف","many":"طول %{attribute} يجب ألاّ يكون %{count} حرفاً","one":"طول %{attribute} يجب ألاّ يكون حرفاً واحداً","other":"طول %{attribute} يجب ألاّ يكون %{count} حرفاً","two":"طول %{attribute} يجب ألاّ يكون حرفان","zero":"طول %{attribute} يجب ألاّ يكون صفر حرف"},"present":"يجب ترك حقل %{attribute} فارغاً","taken":"حقل %{attribute} محجوز مسبقاً","too_long":{"few":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو %{count} حروف)","many":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو %{count} حرف)","one":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو حرف واحد)","other":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو %{count} حرف)","two":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو حرفان)","zero":"محتوى %{attribute} أطول من اللّازم (الحد الأقصى هو ولا حرف)"},"too_short":{"few":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو %{count} حروف)","many":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو %{count} حرف)","one":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو حرف واحد)","other":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو %{count} حرف)","two":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو حرفان)","zero":"محتوى %{attribute} أقصر من اللّازم (الحد الأدنى هو ولا حرف)"},"wrong_length":{"few":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون %{count} أحرف)","many":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون %{count} حرف)","one":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون حرف واحد)","other":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون %{count} حرف)","two":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون حرفان)","zero":"طول %{attribute} غير مطابق للحد المطلوب (يجب أن يكون ولا حرف)"}},"template":{"body":"يُرجى التحقّق من الحقول التّالية:%{attribute}","header":{"few":"ليس بالامكان حفظ %{model} لسبب وجود %{count} أخطاء.","many":"ليس بالامكان حفظ %{model} لسبب وجود %{count} خطأ.","one":"ليس بالامكان حفظ %{model} لسبب وجود خطأ واحد.","other":"ليس بالامكان حفظ %{model} لسبب وجود %{count} خطأ.","two":"ليس بالامكان حفظ %{model} لسبب وجود خطئان.","zero":"ليس بالامكان حفظ %{model} لسبب ولا خطأ."}}},"helpers":{"select":{"prompt":"يُرجى الاختيار"},"submit":{"create":"%{model} إنشاء","submit":"%{model} حِفظ","update":"%{model} تحديث"}},"industries":{"create":{"created":"الصناعات!","error":"الصناعات!"},"delete":{"are_you_sure":"صحح","cancel":"صحح","delete":"صحح"},"destroy":{"deleted":"الصناعات!","error":"الصناعات!"},"edit":{"cancel":"أغلق","edit":"صحح","placeholder_name":"Enter your Industry name...","update":"تحديث"},"index":{"create_industry":"إنشاء الصناعة","delete":"حذف","edit":"صحح","manage":"إدارة","no_of_branches":"عدد الفروع","title":"الصناعات"},"new":{"cancel":"أغلق","choose_file":"Choose File","create":"إنشاء","industry":"صناعة","placeholder_name":"Enter your Industry name...","prompt_industry":"حذف","prompt_rating_type":"حذف","upload_image":"Upload Image"},"show":{"create_branch":"أغلق","delete":"حذف","edit":"صحح","head":"أغلق","manage":"أغلق","no_of_departments":"أغلق"},"update":{"error":"الصناعات!","updated":"الصناعات!"}},"js":{"address_line1_error":"Minimum 3 characters","city_error":"Minimum 3 characters","contact_number_error":"Has to be fixed","country_error":"Minimum 3 characters","dropdown_error":"Select one from dropdown","email_error":"Invalid email address","entries":"الإنجليزية","filtered_from":"الإنجليزية","first_name_error":"Minimum 3 characters","last_name_error":"Minimum 3 characters","name_error":"Minimum 3 characters","no_data":"الإنجليزية","no_record":"أغلق","of":"صحح","pincode_error":"Has to be fixed","showing":"أغلق","state_error":"Minimum 3 characters","to":"نوع","total_entries":"أغلق","user_name_error":"Minimum 3 characters"},"layouts":{"layout_footer":{"copyright":"العربية","rights_reserved":"كل الحقوق محفوظة"},"top_bar_admin":{"dashboard":"العربية","users":"العربية"},"top_bar_all":{"account_settings":" كل الحقوق محفوظة","arabic":"العربية","english":"الإنجليزية","language":"العربية","logout":" العربية","tamil":"التاميل"},"top_bar_branch":{"dashboard":"العربية","users":"العربية"},"top_bar_department":{"dashboard":"العربية","users":"العربية"},"top_bar_sub_department":{"dashboard":"العربية","users":"العربية"}},"menus":{"branch_drop_down":{"prompt_branch":"صحح"},"department_drop_down":{"prompt_department":"صحح"}},"number":{"currency":{"format":{"delimiter":"،","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":"،","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"مليار","million":"مليون","quadrillion":"كدريليون","thousand":"ألفّ","trillion":"تريليون","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"few":"Bytes","many":"Bytes","one":"Byte","other":"Bytes","two":"Bytes","zero":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"sub_departments":{"add_image":{"cancel":"Cancel","preview":"Preview","update":"Update","upload_image":"Upload Image"},"admin_sub_department_view":{"branch":"Branch","branch_count":{"one":"Branch","other":"Branches"},"create_sub_department":"Create Sub Department","department":"Department","department_count":{"one":"Department","other":"Departments"},"go_to_branches":"Go to Branches","go_to_departments":"Go to Departments","go_to_industries":"Go to Industries","head_count":{"one":"Sub Department Head","other":"Sub Department Heads"},"industry":"Industry","not_yet_created":"not yet created","show_details":"Show Details","sub_department_count":{"one":"Sub Department","other":"Sub Departments"},"sub_departments":"Sub Departments"},"assign_image_head":{"image_uploaded":"Image uploaded successfully"},"branch_drop_down":{"prompt_branch":"Select a Branch"},"branch_sub_department_view":{"assign":"நியமி","create_sub_department":"துணை துறை உருவாக்க","delete":"நீக்க","department":"துறை","edit":"தொகு","sub_department":"துணை துறை","sub_departments":"துணை துறைகள்"},"create":{"created":"Sub Department created successfully!","error":"Something went wrong!"},"create_sub_department_head":{"assign":"Assign","cancel":"Cancel","error":"Something went wrong!","head_created":"Sub Department Head created successfully!","not_yet_created":"not yet created","prompt_staff":"Select a Staff","staff":"Staff","sub_department_head":"Sub Department Head"},"delete":{"are_you_sure":"Are you sure you want to remove","cancel":"Cancel","delete":"Delete"},"department_drop_down":{"prompt_department":"Select a Department"},"department_sub_department_view":{"assign":"நியமி","create_sub_department":"துணை துறை உருவாக்க","delete":"நீக்க","edit":"தொகு","head":"தலைவர்","manage":"நிர்வகிக்க","sub_department":"துணை துறை"},"destroy":{"deleted":"Sub Department deleted successfully!","error":"Something went wrong!"},"edit":{"branch":"Branch","cancel":"Cancel","department":"Department","edit":"Edit","industry":"Industry","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment name...","prompt_branch":"Select a Branch","prompt_department":"Select a Department","prompt_industry":"Select an Industry","update":"Update"},"edit_sub_department_head":{"cancel":"Cancel","edit":"Edit","error":"Something went wrong!","female":"Female","head_updated":"Sub Department Head updated successfully!","male":"Male","other":"Other","update":"Update"},"new":{"branch":"Branch","cancel":"Cancel","create":"Create","department":"Department","industry":"Industry","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment Name...","prompt_branch":"Select a Branch","prompt_department":"Select a Department","prompt_industry":"Select an Industry","sub_department":"Sub Department"},"show_industry_detail":{"assign":"Assign","branch":"Branch","delete":"Delete","department":"Department","edit":"Edit","head":"Head","image":"Image","manage":"Manage","sub_department":"Sub Department"},"show_sub_department_head":{"cancel":"Cancel","edit":"Edit","sub_department_head":"Sub Department Head"},"update":{"error":"Something went wrong!","updated":"Sub Department updated successfully!"}},"support":{"array":{"last_word_connector":" و ","two_words_connector":" و ","words_connector":" ، "}},"time":{"am":"صباحًا","formats":{"default":"%a %b %d %H:%M:%S %Z %Y","long":"%d %B, %Y %H:%M","short":"%d %b %H:%M"},"pm":"مساءً"},"user":{"admin":"நிர்வாகி","branch_head":"கிளை தலைவர்","department_head":"துறை தலைவர்","not_assigned":"நியமிக்கப்படவில்லை","sub_department_head":"துணை துறை தலைவர்"},"users":{"department_drop_down":{"prompt_department":"الصناعات"},"edit":{"cancel":"الصناعات","edit":"الصناعات","female":"الصناعات","male":"الصناعات","other":"الصناعات","update":"الصناعات"},"index":{"add_staff":"العربية العربية","branch":"العربية","department":"العربية","go_to_branches":"العربية العربية العربية","go_to_industries":"العربية العربية العربية","industry":"العربية","list":"العربية","manage":"العربية","not_yet_created":"العربية العربية العربية","post":"العربية","reset":"العربية","set":"العربية","staff":"العربية","sub_department":"العربية العربية"},"new":{"branch":"العربية","cancel":"العربية","create":"العربية","department":"العربية","female":"الصناعات","industry":"العربية","male":"الصناعات","other":"الصناعات","prompt_branch":"العربية العربية العربية","prompt_department":"العربية العربية العربية","prompt_industry":"العربية العربية العربية","prompt_sub_department":"الصناعات துணை الصناعات الصناعات","staff":"العربية","sub_department":"العربية العربية"},"reset":{"are_you_sure":"Are you sure you want to remove","cancel":"Cancel","from_position":"from head position","reset":"Reset","reset_head":"தலைவர் மீட்டமைக்க"},"set":{"as_head":"as the head","assign":"நியமி","cancel":"ரத்து","is_the_current_head":"is the current head","set_head":"தலை ஒதுக்க","want_to_assign":"Do you want to assign","want_to_re_assign":"Do you want to re-assign"},"show_head_details":{"cancel":"الصناعات","edit":"الصناعات"},"sub_department_drop_down":{"prompt_sub_department":"الصناعات"}}},"en":{"activerecord":{"attributes":{"branch":{"industry":"Industry"},"industry":{"name":"Name","rating_type":"Rating Type","type":"Type"},"personal_detail":{"address_line1":"Address Line 1","address_line2":"Address Line 2","city":"City","contact_number":"Contact Number","country":"Country","fax_number":"Fax Number","gender":"Gender","landmark":"Landmark","name":"Name","pincode":"Pincode","state":"State","website":"Website"},"user":{"email":"Email","first_name":"First Name","last_name":"Last Name","password":"Password","user_name":"User Name"}},"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"has_many":"Cannot delete record because dependent %{record} exist","has_one":"Cannot delete record because a dependent %{record} exists","many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"}}}},"branches":{"add_image":{"cancel":"Cancel","preview":"Preview","update":"Update","upload_image":"Upload Image"},"assign_image_head":{"image_uploaded":"Image uploaded successfully!"},"create":{"created":"Branch created successfully!","error":"Something went wrong!"},"create_branch_head":{"assign":"Assgin","branch_head":"Branch Head","cancel":"Cancel","error":"Something went wrong!","head_created":"Branch Head created successfully!","not_yet_created":"not yet created","prompt_staff":"Select a Staff","staff":"Staff"},"delete":{"are_you_sure":"Are you sure you want to delete","cancel":"Cancel","delete":"Delete"},"destroy":{"deleted":"Branch deleted successfully!","error":"Something went wrong!"},"edit":{"cancel":"Cancel","edit":"Edit","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","update":"Update"},"edit_branch_head":{"cancel":"Cancel","edit":"Edit","error":"Something went wrong!","female":"Female","head_updated":"Branch Head updated successfully!!","male":"Male","other":"Other","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"Update"},"index":{"branch":{"one":"Branch","other":"Branches"},"branches":"Branches","create_branch":"Create Branch","create_department":"Create Department","delete":"Delete","edit":"Edit","go_to_industries":"Go to Industries","head":"Head","head_count":{"one":"Branch Head","other":"Branch Heads"},"industry":"Industry","manage":"Manage","not_yet_created":"not yet created","show_details":"Show Details"},"list":{"assign":"Assign","delete":"Delete","edit":"Edit","head":"Head","image":"Image","manage":"Manage"},"new":{"branch":"Branch","cancel":"Cancel","create":"Create","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","prompt_industry":"Select an Industry"},"show":{"cancel":"Cancel","edit":"Edit","head":"Head"},"show_branch_head":{"branch_head":"Branch Head","cancel":"Cancel","edit":"Edit"},"update":{"error":"Something went wrong!","updated":"Branch updated successfully!"}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"departments":{"add_image":{"cancel":"Cancel","preview":"Preview","update":"Update","upload_image":"Upload Image"},"admin_branch":{"branch":"Branch","create_department":"Create Department","department":{"one":"Department","other":"Departments"},"departments":"Departments","go_to_branches":"Go to Branches","go_to_industries":"Go to Industries","head":{"one":"Department Head","other":"Department Heads"},"industry":"Industry","not_yet_created":"not yet created","show_details":"Show Details"},"assign_image_head":{"image_uploaded":"Image uploaded successfully!"},"branch_drop_down":{"prompt_branch":"Select a Branch"},"create":{"created":"Department created successfully!","error":"Something went wrong!"},"create_department_head":{"error":"Something went wrong!","head_created":"Department Head created successfully!"},"delete":{"are_you_sure":"Are you sure you want to delete","cancel":"Cancel","delete":"Delete"},"department_head":{"assign":"Assign","cancel":"Cancel","department_head":"Department Head","not_yet_created":"not yet created","prompt_staff":"Select a Staff","staff":"Staff"},"department_index":{"assign":"Assign","create_sub_department":"Create Sub Department","delete":"Delete","edit":"Edit","head":"Head","manage":"Manage"},"destroy":{"deleted":"Department deleted successfully!","error":"Something went wrong!"},"edit":{"branch":"Branch","cancel":"Cancel","department":"Department","edit":"Edit","industry":"Industry","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"Select a Branch","prompt_industry":"Select an Industry","update":"Update"},"edit_head":{"cancel":"Cancel","edit":"Edit","female":"Female","male":"Male","other":"Other","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"Update"},"list_details":{"assign":"Assign","branch":"Branch","delete":"Delete","edit":"Edit","go_to_branches":"Go to Branches","head":"Head","image":"Image","manage":"Manage","not_yet_created":"not yet created"},"new":{"branch":"Branch","cancel":"Cancel","create":"Create","department":"Department","industry":"Industry","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"Select a Branch","prompt_industry":"Select an Industry"},"show":{"cancel":"Cancel","department_head":"Department Head","edit":"Edit"},"update":{"error":"Something went wrong!","updated":"Department updated successfully!"},"update_department_head":{"error":"Something went wrong!","head_updated":"Department Head updated successfully!"}},"devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid email or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid email address or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"email_changed":{"subject":"Email Changed"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","edit":{"cancel":"Cancel","confirmation":"(we need your current password to confirm your changes)","current_password":"Current Password","edit":"Edit","email":"Email","leave_blank":"(leave blank if you don't want to change it)","password":"Password","password_confirmation":"Password Confirmation","update":"Update","user_name":"User Name"},"signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirm link to confirm your new email address.","updated":"Your account has been updated successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"errors":{"connection_refused":"Oops! Failed to connect to the Web Console middleware.\nPlease make sure a rails development server is running.\n","format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can't be blank","carrierwave_download_error":"could not be downloaded","carrierwave_integrity_error":"is not of an allowed file type","carrierwave_processing_error":"failed to be processed","confirmation":"doesn't match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","content_type_blacklist_error":"You are not allowed to upload %{content_type} files","content_type_whitelist_error":"You are not allowed to upload %{content_type} files","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","extension_blacklist_error":"You are not allowed to upload %{extension} files, prohibited types: %{prohibited_types}","extension_whitelist_error":"You are not allowed to upload %{extension} files, allowed types: %{allowed_types}","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","max_size_error":"File size should be less than %{max_size}","min_size_error":"File size should be greater than %{min_size}","mini_magick_processing_error":"Failed to manipulate with MiniMagick, maybe it is not an image? Original Error: %{e}","model_invalid":"Validation failed: %{errors}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","required":"must exist","rmagick_processing_error":"Failed to manipulate with rmagick, maybe it is not an image?","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}},"unacceptable_request":"A supported version is expected in the Accept header.\n","unavailable_session":"Session %{id} is is no longer available in memory.\n\nIf you happen to run on a multi-process server (like Unicorn or Puma) the process\nthis request hit doesn't store %{id} in memory. Consider turning the number of\nprocesses/workers to one (1) or using a different server in development.\n"},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"industries":{"create":{"created":"Industry created successfully!","error":"Something went wrong!"},"delete":{"are_you_sure":"Are you sure you want to delete","cancel":"Cancel","delete":"Delete"},"destroy":{"deleted":"Industry deleted successfully!","error":"Something went wrong!"},"edit":{"cancel":"Cancel","edit":"Edit","placeholder_name":"Enter Industry name...","update":"Update"},"index":{"create_industry":"Create Industry","delete":"Delete","edit":"Edit","manage":"Manage","no_of_branches":"No of Branches","title":"Industries"},"new":{"cancel":"Cancel","choose_file":"Choose File","create":"Create","industry":"Industry","placeholder_name":"Enter Industry name...","prompt_industry":"Select an Industry","prompt_rating_type":"Select a Rating Type","upload_image":"Upload Image"},"show":{"create_branch":"Create Branch","delete":"Delete","edit":"Edit","head":"Head","manage":"Manage","no_of_departments":"No of Departments"},"update":{"error":"Something went wrong!","updated":"Industry updated successfully!"}},"js":{"address_line1_error":"Minimum 3 characters","city_error":"Minimum 3 characters","contact_number_error":"Has to be fixed","country_error":"Minimum 3 characters","dropdown_error":"Select one from dropdown","email_error":"Invalid email address","entries":"entries","filtered_from":"filtered from","first_name_error":"Minimum 3 characters","last_name_error":"Minimum 3 characters","name_error":"Minimum 3 characters","no_data":"No data available in table","no_record":"No Matching records found","of":"of","pincode_error":"Has to be fixed","showing":"Showing","state_error":"Minimum 3 characters","to":"to","total_entries":"total entries","user_name_error":"Minimum 3 characters"},"layouts":{"layout_footer":{"copyright":"Copyright","rights_reserved":"All rights reserved"},"top_bar_admin":{"dashboard":"Dashboard","users":"Users"},"top_bar_all":{"account_settings":" Account Settings","arabic":"Arabic","english":"English","language":"Language","logout":" Logout","tamil":"Tamil"},"top_bar_branch":{"dashboard":"Dashboard","users":"Users"},"top_bar_department":{"dashboard":"Dashboard","users":"Users"},"top_bar_sub_department":{"dashboard":"Dashboard","users":"Users"}},"menus":{"branch_drop_down":{"prompt_branch":"Select a Branch"},"department_drop_down":{"prompt_department":"Select a Department"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"sub_departments":{"add_image":{"cancel":"Cancel","preview":"Preview","update":"Update","upload_image":"Upload Image"},"admin_sub_department_view":{"branch":"Branch","branch_count":{"one":"Branch","other":"Branches"},"create_sub_department":"Create Sub Department","department":"Department","department_count":{"one":"Department","other":"Departments"},"go_to_branches":"Go to Branches","go_to_departments":"Go to Departments","go_to_industries":"Go to Industries","head_count":{"one":"Sub Department Head","other":"Sub Department Heads"},"industry":"Industry","not_yet_created":"not yet created","show_details":"Show Details","sub_department_count":{"one":"Sub Department","other":"Sub Departments"},"sub_departments":"Sub Departments"},"assign_image_head":{"image_uploaded":"Image uploaded successfully"},"branch_drop_down":{"prompt_branch":"Select a Branch"},"branch_sub_department_view":{"assign":"Assign","create_sub_department":"Create SUb Department","delete":"Delete","department":"Department","edit":"Edit","sub_department":"Sub Department","sub_departments":"Sub Departments"},"create":{"created":"Sub Department created successfully!","error":"Something went wrong!"},"create_sub_department_head":{"assign":"Assign","cancel":"Cancel","error":"Something went wrong!","head_created":"Sub Department Head created successfully!","not_yet_created":"not yet created","prompt_staff":"Select a Staff","staff":"Staff","sub_department_head":"Sub Department Head"},"delete":{"are_you_sure":"Are you sure you want to remove","cancel":"Cancel","delete":"Delete"},"department_drop_down":{"prompt_department":"Select a Department"},"department_sub_department_view":{"assign":"Assign","create_sub_department":"Create Sub Department","delete":"Delete","edit":"Edit","head":"Head","manage":"Manage","sub_department":"Sub Department"},"destroy":{"deleted":"Sub Department deleted successfully!","error":"Something went wrong!"},"edit":{"branch":"Branch","cancel":"Cancel","department":"Department","edit":"Edit","industry":"Industry","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment name...","prompt_branch":"Select a Branch","prompt_department":"Select a Department","prompt_industry":"Select an Industry","update":"Update"},"edit_sub_department_head":{"cancel":"Cancel","edit":"Edit","error":"Something went wrong!","female":"Female","head_updated":"Sub Department Head updated successfully!","male":"Male","other":"Other","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"Update"},"new":{"branch":"Branch","cancel":"Cancel","create":"Create","department":"Department","industry":"Industry","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment Name...","prompt_branch":"Select a Branch","prompt_department":"Select a Department","prompt_industry":"Select an Industry","sub_department":"Sub Department"},"show_industry_detail":{"assign":"Assign","branch":"Branch","delete":"Delete","department":"Department","edit":"Edit","head":"Head","image":"Image","manage":"Manage","sub_department":"Sub Department"},"show_sub_department_head":{"cancel":"Cancel","edit":"Edit","sub_department_head":"Sub Department Head"},"update":{"error":"Something went wrong!","updated":"Sub Department updated successfully!"}},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"user":{"admin":"Admin","branch_head":"Branch Head","department_head":"Department Head","not_assigned":"Not Assigned","sub_department_head":"Sub Department Head"},"users":{"department_drop_down":{"prompt_department":"Select a Department"},"edit":{"cancel":"Cancel","edit":"Edit","female":"Female","male":"Male","other":"Other","update":"Update"},"index":{"add_staff":"Add Staff","branch":"Branch","department":"Department","go_to_branches":"Go to Branches","go_to_industries":"Go to Industries","industry":"Industry","list":"list","manage":"Manage","not_yet_created":"not yet created","post":"Post","reset":"Reset","set":"Set","staff":"Staff","sub_department":"Sub Department"},"new":{"branch":"Branch","cancel":"Cancel","create":"Create","department":"Department","female":"Female","industry":"Industry","male":"Male","other":"Other","prompt_branch":"Select a Branch","prompt_department":"Select a Department","prompt_industry":"Select an Industry","prompt_sub_department":"Select a Sub Department","staff":"Staff","sub_department":"Sub Department"},"reset":{"are_you_sure":"Are you sure you want to remove","cancel":"Cancel","from_position":"from head position","reset":"Reset","reset_head":"Reset Head"},"set":{"as_head":"as the head","assign":"Assign","cancel":"Cancel","is_the_current_head":"is the current head","set_head":"Set Head","want_to_assign":"Do you want to assign","want_to_re_assign":"Do you want to re-assign"},"show_head_details":{"cancel":"Cancel","edit":"Edit"},"sub_department_drop_down":{"prompt_sub_department":"Select a Sub Department"}},"will_paginate":{"next_label":"Next \u0026#8594;","page_entries_info":{"multi_page":"Displaying %{model} %{from} - %{to} of %{count} in total","multi_page_html":"Displaying %{model} \u003cb\u003e%{from}\u0026nbsp;-\u0026nbsp;%{to}\u003c/b\u003e of \u003cb\u003e%{count}\u003c/b\u003e in total","single_page":{"one":"Displaying 1 %{model}","other":"Displaying all %{count} %{model}","zero":"No %{model} found"},"single_page_html":{"one":"Displaying \u003cb\u003e1\u003c/b\u003e %{model}","other":"Displaying \u003cb\u003eall\u0026nbsp;%{count}\u003c/b\u003e %{model}","zero":"No %{model} found"}},"page_gap":"\u0026hellip;","previous_label":"\u0026#8592; Previous"}},"ta":{"activerecord":{"attributes":{"branch":{"industry":"தொழில்"},"industry":{"name":"பெயர்","rating_type":"மதிப்பெண் வகை","type":"வகை"},"personal_detail":{"address_line1":"முகவரி வரி 1","address_line2":"முகவரி வரி 2","city":"நகரம்","contact_number":"தொடர்பு எண்","country":"நாடு","fax_number":"தொலைநகல் எண்","gender":"பாலினம்","landmark":"குறிப்பிடத்தக்க தோற்றம்","name":"பெயர்","pincode":"அஞ்சல் குறியீடு","state":"மாநிலம்","website":"வலைத்தளம்"},"user":{"email":"மின்னஞ்சல்","first_name":"முதல் பெயர்","last_name":"குடும்ப பெயர்","password":"கடவுச்சொல்","user_name":"பயனர்பெயர்"}},"errors":{"messages":{"record_invalid":"சரிபார்த்தல் தோல்வியுற்றது: %{errors}","restrict_dependent_destroy":{"has_many":"பதிவை நீக்க முடியாது, ஏனெனில் சார்புகள் %{record} உள்ளது","has_one":"பதிவை நீக்க முடியாது, ஏனெனில் ஒரு சார்பு %{record} உள்ளது"}}}},"branches":{"add_image":{"cancel":"ரத்து","preview":"முற்காட்சி","update":"மேம்படுத்து","upload_image":"படத்தை பதிவேற்ற"},"assign_image_head":{"image_uploaded":"படம் வெற்றிகரமாக பதிவேற்றம் செய்யப்பட்டது"},"create":{"created":"கிளை வெற்றிகரமாக உருவாக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"create_branch_head":{"assign":"நியமி","branch_head":"கிளை தலைவர்","cancel":"ரத்து","error":"ஏதோ தவறு நடந்துவிட்டது!","head_created":"கிளை தலைவர் வெற்றிகரமாக உருவாக்கப்பட்டது!","not_yet_created":"இன்னும் உருவாகபடவில்லை","prompt_staff":"ஒரு பணியாளர் தேர்ந்தெடுக்கவும்","staff":"பணியாளர்"},"delete":{"are_you_sure":"நீங்கள் நீக்க வேண்டும் என்பதில் உறுதியாக உள்ளன","cancel":"ரத்து","delete":"நீக்க"},"destroy":{"deleted":"கிளை வெற்றிகரமாக நீக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"edit":{"cancel":"ரத்து","edit":"தொகு","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","update":"மேம்படுத்து"},"edit_branch_head":{"cancel":"ரத்து","edit":"தொகு","error":"ஏதோ தவறு நடந்துவிட்டது!","female":"பெண்","head_updated":"கிளை தலைவர் வெற்றிகரமாக மேம்படுத்தப்பட்டது!","male":"ஆண்","other":"வேறு","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"மேம்படுத்து"},"index":{"branch":{"one":"கிளை","other":"கிளைகள்"},"branches":"கிளைகள்","create_branch":"கிளை உருவாக்க","create_department":"துறை உருவாக்க","delete":"நீக்க","edit":"தொகு","go_to_industries":"தொழில்கள் செல்ல","head":"தலைவர்","head_count":{"one":"துறை தலைவர்","other":"துறை தலைவர்கள்"},"industry":"தொழில்","manage":"நிர்வகிக்க","not_yet_created":"இன்னும் உருவாகபடவில்லை","show_details":"விவரங்களை காட்டு"},"list":{"assign":"நியமி","delete":"நீக்க","edit":"தொகு","head":"துறை தலைவர்","image":"புகைப்படம்","manage":"நிர்வகிக்க"},"new":{"branch":"கிளை","cancel":"ரத்து","create":"உருவாக்க","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"Has to be fixed","placeholder_country":"Enter Country name...","placeholder_fax_number":"Has to be fixed","placeholder_landmark":"Enter landmark...","placeholder_name":"Enter Branch name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_website":"Enter Website URL...","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்"},"show":{"cancel":"ரத்து","edit":"தொகு","head":"துறை தலைவர்"},"show_branch_head":{"branch_head":"கிளை தலைவர்","cancel":"ரத்து","edit":"தொகு"},"update":{"error":"ஏதோ தவறு நடந்துவிட்டது!","updated":"கிளை வெற்றிகரமாக மேம்படுத்தப்பட்டது!"}},"date":{"abbr_day_names":["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],"abbr_month_names":[null,"ஜன","பிப்","மார்ச்","ஏப்","மே","ஜூன்","ஜூலை","ஆக","செப்","அக்","நவ","டிச"],"day_names":["ஞாயிற்றுக்கிழமை","திங்கட்கிழமை","செவ்வாய்க்கிழமை","புதன்கிழமை","வியாழக்கிழமை","வெள்ளிக்கிழமை","சனிக்கிழமை"],"formats":{"default":"%d-%m-%Y","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"சுமார் 1 மணி நேரம்","other":"சுமார் %{count} மணி"},"about_x_months":{"one":"சுமார் 1 மாதம்","other":"சுமார் %{count} மாதங்களுக்கு"},"about_x_years":{"one":"சுமார் 1  ஆண்டு","other":"சுமார் %{count}  ஆண்டுகள்"},"almost_x_years":{"one":"கிட்டத்தட்ட 1  ஆண்டு","other":"கிட்டத்தட்ட %{count}  ஆண்டுகள்"},"half_a_minute":"அரை நிமிடம்","less_than_x_minutes":{"one":"ஒரு நிமிடத்திற்கும் குறைவாக","other":"குறைவாக %{count} நிமிடங்கள்"},"less_than_x_seconds":{"one":"ஒரு வினாடிக்கும் குறைவாக","other":"குறைவாக %{count} வினாடிகள்"},"over_x_years":{"one":"ஒரு  ஆண்டிற்கு மேலாக","other":"%{count}  ஆண்டிற்கு மேலாக"},"x_days":{"one":"1 நாள்","other":"%{count} நாட்கள்"},"x_minutes":{"one":"1 நிமிடம்","other":"%{count} நிமிடங்கள்"},"x_months":{"one":"1 மாதம்","other":"%{count} மாதங்கள்"},"x_seconds":{"one":"1 வினாடி","other":"%{count} விநாடிகள்"}},"prompts":{"day":"நாள்","hour":"மணி","minute":"நிமிடம்","month":"மாதம்","second":"விநாடிகள்","year":"ஆண்டு"}},"departments":{"add_image":{"cancel":"ரத்து","preview":"முற்காட்சி","update":"மேம்படுத்து","upload_image":"படத்தை பதிவேற்ற"},"admin_branch":{"branch":"கிளை","create_department":"துறை உருவாக்க","department":{"one":"துறை","other":"துறைகள்"},"departments":"துறைகள்","go_to_branches":"கிளைகள் செல்ல","go_to_industries":"தொழில்கள் செல்ல","head_count":{"one":"துறை தலைவர்","other":"துறை தலைவர்கள்"},"industry":"தொழில்","not_yet_created":"இன்னும் உருவாகபடவில்லை","show_details":"விவரங்களை காட்டு"},"assign_image_head":{"image_uploaded":"படம் வெற்றிகரமாக பதிவேற்றம் செய்யப்பட்டது"},"branch_drop_down":{"prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்"},"create":{"created":"துறை வெற்றிகரமாக உருவாக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"create_department_head":{"error":"ஏதோ தவறு நடந்துவிட்டது!","head_created":"துறை தலைவர் வெற்றிகரமாக உருவாக்கப்பட்டது!"},"delete":{"are_you_sure":"நீங்கள் நீக்க வேண்டும் என்பதில் உறுதியாக உள்ளன","cancel":"ரத்து","delete":"நீக்க"},"department_head":{"assign":"நியமி","cancel":"ரத்து","department_head":"துறை தலைவர்","not_yet_created":"இன்னும் உருவாகபடவில்லை","prompt_staff":"ஒரு பணியாளர் தேர்ந்தெடுக்கவும்","staff":"பணியாளர்"},"department_index":{"assign":"நியமி","create_sub_department":"துணை துறை உருவாக்க","delete":"நீக்க","edit":"தொகு","head":"தலைவர்","manage":"நிர்வகிக்க"},"destroy":{"deleted":"துறை வெற்றிகரமாக நீக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"edit":{"branch":"கிளை","cancel":"ரத்து","department":"துறை","edit":"தொகு","industry":"தொழில்","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்","update":"மேம்படுத்து"},"edit_head":{"cancel":"ரத்து","edit":"தொகு","female":"பெண்","male":"ஆண்","other":"வேறு","placeholder_address_line1":"Enter address line 1...","placeholder_address_line2":"Enter address line 2...","placeholder_city":"Enter City name...","placeholder_contact_number":"07258956895...","placeholder_country":"Enter Country name...","placeholder_email":"Enter Email...","placeholder_first_name":"Enter First Name...","placeholder_landmark":"Enter landmark...","placeholder_last_name":"Enter Last Name...","placeholder_pincode":"Has to be fixed","placeholder_state":"Enter State name...","placeholder_user_name":"Enter User Name...","update":"மேம்படுத்து"},"list_details":{"assign":"நியமி","branch":"கிளை","delete":"நீக்க","edit":"தொகு","go_to_branches":"கிளைகள் செல்ல","head":"தலைவர்","image":"புகைப்படம்","manage":"நிர்வகிக்க","not_yet_created":"இன்னும் உருவாகபடவில்லை"},"new":{"branch":"கிளை","cancel":"ரத்து","create":"உருவாக்க","department":"துறை","industry":"தொழில்","placeholder_contact_number":"Has to be fixed","placeholder_name":"Enter Department name...","prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்"},"show":{"cancel":"ரத்து","department_head":"துறை தலைவர்","edit":"தொகு"},"update":{"error":"ஏதோ தவறு நடந்துவிட்டது!","updated":"துறை வெற்றிகரமாக மேம்படுத்தப்பட்டது!"},"update_department_head":{"error":"ஏதோ தவறு நடந்துவிட்டது!","head_updated":"துறை தலைவர் வெற்றிகரமாக மேம்படுத்தப்பட்டது!"}},"devise":{"registrations":{"edit":{"cancel":"ரத்து","confirmation":"(நாங்கள் உங்கள் மாற்றங்களை உறுதிப்படுத்த உங்கள் தற்போதைய கடவுச்சொல்லை வேண்டும்)","current_password":"தற்போதைய கடவுச்சொல்லை","edit":"தொகு","email":"மின்னஞ்சல்","leave_blank":"(நீங்கள் அதை மாற்ற விரும்பவில்லை என்றால் வெறுமையாக விடுக)","password":"கடவுச்சொல்","password_confirmation":"கடவுச்சொல் உறுதிப்படுத்தும்","update":"மேம்படுத்து","user_name":"பயனர்பெயர்"}}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"ஏற்கப்பட வேண்டும்","blank":"காலியாக இருக்க முடியாது","confirmation":"%{attribute}  பொருந்தவில்லை","empty":"வெறுமையாக இருக்க முடியாது","equal_to":"%{count} சமமாக இருக்க வேண்டும்","even":"இரட்டைப்படை இருக்க வேண்டும்","exclusion":"ஒதுக்கப்பட்டுள்ளது","greater_than":"%{count} ஐ விட அதிகமாக இருக்க வேண்டும்","greater_than_or_equal_to":"%{count}  அதிகமாக அல்லது சமமாக இருக்க வேண்டும்","inclusion":"பட்டியலில் சேர்க்கப்படவில்லை","invalid":"செல்லுபடியானதல்ல","less_than":"%{count} ஐ விட குறைவாக இருக்க வேண்டும்","less_than_or_equal_to":"%{count} குறைவாக அல்லது சமமாக இருக்க வேண்டும்","not_a_number":"ஒரு எண் அல்ல","not_an_integer":"ஒரு முழு எண்ணாக இருக்க வேண்டும்","odd":"ஒற்றைப்படை இருக்க வேண்டும்","other_than":"%{count} தவிர வேறு இருக்க வேண்டும்","present":"காலியாக இருக்க வேண்டும்","taken":"ஏற்கனவே எடுத்துகொள்ள பட்டது","too_long":{"one":"மிக நீளமாக உள்ளது (அதிகபட்சமாக ஒரு எழுத்து)","other":"மிக நீளமாக உள்ளது (அதிகபட்சமாக %{count} எழுத்துக்கள்)"},"too_short":{"one":"மிகவும் குறுகியதாக உள்ளது (குறைந்தபட்சம் ஒரு எழுத்து)","other":"மிகவும் குறுகியதாக உள்ளது (குறைந்தபட்சம் %{count} எழுத்துக்கள்)"},"wrong_length":{"one":"தவறான நீளம் (1 எழுத்து இருக்கவேண்டும்)","other":"தவறான நீளம் (%{count} எழுத்துக்கள் இருக்கவேண்டும்)"}},"template":{"body":"பின்வரும் புலங்களில் பிரச்சினைகள் உள்ளது:","header":{"one":"1 பிழை இந்த %{model} ஐ சேமிக்க தடையாக உள்ளது","other":"%{count} பிழைகள் இந்த %{model} ஐ சேமிக்க தடையாக உள்ளது"}}},"helpers":{"placeholder":{"industry":{"name":"பெயர்"}},"select":{"prompt":"தேர்வு செய்க"},"submit":{"create":"%{model} ஐ  உருவாக்கு","submit":"%{model} ஐ சேமி","update":"%{model} ஐ புதுப்பி"}},"industries":{"create":{"created":"தொழில் வெற்றிகரமாக உருவாக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"delete":{"are_you_sure":"நீங்கள் நீக்க வேண்டும் என்பதில் உறுதியாக உள்ளன","cancel":"ரத்து","delete":"நீக்க"},"destroy":{"deleted":"தொழில் வெற்றிகரமாக நீக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"edit":{"cancel":"ரத்து","edit":"தொகு","placeholder_name":"Enter your Industry name...","update":"மேம்படுத்து"},"index":{"create_industry":"தொழில் உருவாக்க","delete":"நீக்க","edit":"தொகு","manage":"நிர்வகிக்க","no_of_branches":"கிளைகள் எண்ணிக்கை","title":"தலைப்பு"},"new":{"cancel":"ரத்து","choose_file":"கோப்பை தேர்ந்தெடுக்கவும்","create":"உருவாக்க","industry":"தொழில்","placeholder_name":"Enter your Industry name...","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்","prompt_rating_type":"ஒரு மதிப்பெண் வகை தேர்ந்தெடுக்கவும்","upload_image":"படத்தை பதிவேற்ற"},"show":{"create_branch":"கிளை உருவாக்க","delete":"நீக்க","edit":"தொகு","head":"துறை தலைவர்","manage":"நிர்வகிக்க","no_of_departments":"துறைகள் எண்ணிக்கை"},"update":{"error":"ஏதோ தவறு நடந்துவிட்டது!","updated":"தொழில் வெற்றிகரமாக மேம்படுத்தப்பட்டது!"}},"js":{"address_line1_error":"Minimum 3 characters","city_error":"Minimum 3 characters","contact_number_error":"Has to be fixed","country_error":"Minimum 3 characters","dropdown_error":"Select one from dropdown","email_error":"Invalid email address","entries":"பதிவுகள்","filtered_from":"இருந்து வடிகட்டப்பட்ட","first_name_error":"Minimum 3 characters","last_name_error":"Minimum 3 characters","name_error":"Minimum 3 characters","no_data":"அட்டவணை தகவல்கள் இல்லை","no_record":"பொருத்தம் இல்லை பதிவுகளை காணப்படவில்லை","of":"உள்ள","pincode_error":"Has to be fixed","showing":"காண்பிக்கப்படுகிறது","state_error":"Minimum 3 characters","to":"இருந்து","total_entries":"மொத்த உள்ளீடுகளை","user_name_error":"Minimum 3 characters"},"layouts":{"layout_footer":{"copyright":"பதிப்புரிமை","rights_reserved":"அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை"},"top_bar_admin":{"dashboard":"கட்டுப்பாட்டு அறை","users":"பயனர்கள்"},"top_bar_all":{"account_settings":" கணக்கு அமைப்புகள்","arabic":"அரபு","english":"ஆங்கிலம்","language":"மொழி","logout":" வெளியேறு","tamil":"தமிழ்"},"top_bar_branch":{"dashboard":"கட்டுப்பாட்டு அறை","users":"பயனர்கள்"},"top_bar_department":{"dashboard":"கட்டுப்பாட்டு அறை","users":"பயனர்கள்"},"top_bar_sub_department":{"dashboard":"கட்டுப்பாட்டு அறை","users":"பயனர்கள்"}},"menus":{"branch_drop_down":{"prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்"},"department_drop_down":{"prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"₹"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"பில்லியன்","million":"மில்லியன்","quadrillion":"குவாட்ரில்லியன்","thousand":"ஆயிரம்","trillion":"டிரில்லியன்","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"sub_departments":{"add_image":{"cancel":"ரத்து","preview":"முற்காட்சி","update":"மேம்படுத்து","upload_image":"படத்தை பதிவேற்ற"},"admin_sub_department_view":{"branch":"கிளை","branch_count":{"one":"கிளை","other":"கிளைகள்"},"create_sub_department":"துணை துறை உருவாக்க","department":"துறை","department_count":{"one":"துறை","other":"துறைகள்"},"go_to_branches":"கிளைகள் செல்ல","go_to_departments":"துறைகள் செல்ல","go_to_industries":"தொழில்கள் செல்ல","head_count":{"one":"துணை துறை தலைவர்","other":"துணை துறை தலைவர்கள்"},"industry":"தொழில்","not_yet_created":"இன்னும் உருவாகபடவில்லை","show_details":"விவரங்களை காட்டு","sub_department_count":{"one":"துணை துறை","other":"துணை துறைகள்"},"sub_departments":"துணை துறைகள்"},"assign_image_head":{"image_uploaded":"படம் வெற்றிகரமாக பதிவேற்றம் செய்யப்பட்டது"},"branch_drop_down":{"prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்"},"branch_sub_department_view":{"assign":"நியமி","create_sub_department":"துணை துறை உருவாக்க","delete":"நீக்க","department":"துறை","edit":"தொகு","sub_department":"துணை துறை","sub_departments":"துணை துறைகள்"},"create":{"created":"துணை துறை வெற்றிகரமாக உருவாக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"create_sub_department_head":{"assign":"நியமி","cancel":"ரத்து","error":"ஏதோ தவறு நடந்துவிட்டது!","head_created":"துணை துறை தலைவர் வெற்றிகரமாக உருவாக்கப்பட்டது!","not_yet_created":"இன்னும் உருவாகபடவில்லை","prompt_staff":"ஒரு பணியாளர் தேர்ந்தெடுக்கவும்","staff":"பணியாளர்","sub_department_head":"துணை துறை தலைவர்"},"delete":{"are_you_sure":"நீங்கள் நீக்க வேண்டும் என்பதில் உறுதியாக உள்ளன","cancel":"ரத்து","delete":"நீக்க"},"department_drop_down":{"prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்"},"department_sub_department_view":{"assign":"நியமி","create_sub_department":"துணை துறை உருவாக்க","delete":"நீக்க","edit":"தொகு","head":"தலைவர்","manage":"நிர்வகிக்க","sub_department":"துணை துறை"},"destroy":{"deleted":"துணை துறை வெற்றிகரமாக நீக்கப்பட்டது!","error":"ஏதோ தவறு நடந்துவிட்டது!"},"edit":{"branch":"கிளை","cancel":"ரத்து","department":"துறை","edit":"தொகு","industry":"தொழில்","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment name...","prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்","prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்","update":"மேம்படுத்து"},"edit_sub_department_head":{"cancel":"ரத்து","edit":"தொகு","error":"ஏதோ தவறு நடந்துவிட்டது!","female":"பெண்","head_updated":"துணை துறை தலைவர் வெற்றிகரமாக மேம்படுத்தப்பட்டது!","male":"ஆண்","other":"வேறு","update":"மேம்படுத்து"},"new":{"branch":"கிளை","cancel":"ரத்து","create":"உருவாக்க","department":"துறை","industry":"தொழில்","placeholder_contact_number":"Enter phone Number...","placeholder_name":"Enter Sub deprtment Name...","prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்","prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்","sub_department":"துணை துறை"},"show_industry_detail":{"assign":"நியமி","branch":"கிளை","delete":"நீக்க","department":"துறை","edit":"தொகு","head":"தலைவர்","image":"புகைப்படம்","manage":"நிர்வகிக்க","sub_department":"துணை துறை"},"show_sub_department_head":{"cancel":"ரத்து","edit":"தொகு","sub_department_head":"துணை துறை தலைவர்"},"update":{"error":"ஏதோ தவறு நடந்துவிட்டது!","updated":"துணை துறை வெற்றிகரமாக மேம்படுத்தப்பட்டது!"}},"support":{"array":{"last_word_connector":", மற்றும் ","two_words_connector":" மற்றும் ","words_connector":", "}},"time":{"am":"மு.ப.","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"பி.ப."},"user":{"admin":"நிர்வாகி","branch_head":"கிளை தலைவர்","department_head":"துறை தலைவர்","not_assigned":"நியமிக்கப்படவில்லை","sub_department_head":"துணை துறை தலைவர்"},"users":{"department_drop_down":{"prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்"},"edit":{"cancel":"ரத்து","edit":"தொகு","female":"பெண்","male":"ஆண்","other":"வேறு","update":"மேம்படுத்து"},"index":{"add_staff":"ஊழியர்கள் சேர்க்க","branch":"கிளை","department":"துறை","go_to_branches":"கிளைகள் செல்ல","go_to_industries":"தொழில்கள் செல்ல","industry":"தொழில்","list":"பட்டியல்","manage":"நிர்வகிக்க","not_yet_created":"இன்னும் உருவாகபடவில்லை","post":"பதவி","reset":"மீட்டமைக்க","set":"பொறுத்து","staff":"ஊழியர்கள்","sub_department":"துணை துறை"},"new":{"branch":"கிளை","cancel":"ரத்து","create":"உருவாக்க","department":"துறை","female":"பெண்","industry":"தொழில்","male":"ஆண்","other":"வேறு","prompt_branch":"ஒரு கிளை தேர்ந்தெடுக்கவும்","prompt_department":"ஒரு துறை தேர்ந்தெடுக்கவும்","prompt_industry":"ஒரு தொழில் தேர்ந்தெடுக்கவும்","prompt_sub_department":"ஒரு துணை துறை தேர்ந்தெடுக்கவும்","staff":"பணியாளர்","sub_department":"துணை துறை"},"reset":{"are_you_sure":"நீங்கள் நீக்க வேண்டும் என்பதில் உறுதியாக இருக்கிறீர்களா","cancel":"ரத்து","from_position":"தலையில் நிலையில் இருந்து","reset":"மீட்டமைக்க","reset_head":"தலைவர் மீட்டமைக்க"},"set":{"as_head":"தலைவராக","assign":"நியமி","cancel":"ரத்து","is_the_current_head":"தற்போதைய தலைவர் ஆகும்","set_head":"தலை ஒதுக்க","want_to_assign":"நீங்கள் ஒதுக்க விரும்புகிறீர்கள","want_to_re_assign":"மீண்டும் ஒதுக்க வேண்டும் என்று நீங்கள் விரும்புகிறீர்களா"},"show_head_details":{"cancel":"ரத்து","edit":"தொகு"},"sub_department_drop_down":{"prompt_sub_department":"ஒரு துணை துறை தேர்ந்தெடுக்கவும்"}}}};
}));



