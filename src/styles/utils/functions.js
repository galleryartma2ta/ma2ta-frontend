// functions.js - توابع کمکی مورد استفاده در کل پروژه

/**
 * فرمت کردن قیمت به تومان
 * @param {number} price - مبلغ به عدد
 * @param {boolean} withCurrency - آیا واحد پول نمایش داده شود؟ (پیش فرض: true)
 * @returns {string} - مبلغ به صورت رشته فرمت شده
 */
export function formatPrice(price, withCurrency = true) {
    if (price === undefined || price === null) return '';

    // فرمت کردن عدد با جداکننده هزارگان
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // اضافه کردن واحد پول اگر لازم باشد
    return withCurrency ? `${formattedPrice} تومان` : formattedPrice;
}

/**
 * گرفتن زمان نسبی (چند دقیقه پیش، چند ساعت پیش و...)
 * @param {string|Date} date - تاریخ مورد نظر
 * @returns {string} - زمان نسبی
 */
export function getRelativeTime(date) {
    const now = new Date();
    const inputDate = new Date(date);
    const diff = now - inputDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return 'چند لحظه پیش';
    } else if (minutes < 60) {
        return `${minutes} دقیقه پیش`;
    } else if (hours < 24) {
        return `${hours} ساعت پیش`;
    } else if (days < 30) {
        return `${days} روز پیش`;
    } else if (months < 12) {
        return `${months} ماه پیش`;
    } else {
        return `${years} سال پیش`;
    }
}

/**
 * تبدیل تاریخ میلادی به شمسی
 * @param {string|Date} date - تاریخ میلادی
 * @param {boolean} withTime - آیا زمان هم نمایش داده شود؟ (پیش فرض: false)
 * @returns {string} - تاریخ شمسی
 */
export function toJalaliDate(date, withTime = false) {
    // این تابع نیاز به کتابخانه moment-jalaali دارد
    // اگر کتابخانه در پروژه استفاده نشده، فقط فرمت تاریخ میلادی را برمی‌گرداند

    // نمونه پیاده‌سازی فرضی
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    let result = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;

    if (withTime) {
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        result += ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return result;
}

/**
 * کوتاه کردن متن و اضافه کردن ... در انتها
 * @param {string} text - متن کامل
 * @param {number} maxLength - حداکثر طول متن (پیش فرض: 100)
 * @returns {string} - متن کوتاه شده
 */
export function truncateText(text, maxLength = 100) {
    if (!text) return '';

    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + '...';
}

/**
 * تولید شناسه یکتا
 * @returns {string} - شناسه یکتا
 */
export function generateUniqueId() {
    return '_' + Math.random().toString(36).substring(2, 11);
}

/**
 * تبدیل اسلاگ به متن خوانا
 * @param {string} slug - اسلاگ (مثلا modern-art)
 * @returns {string} - متن خوانا (مثلا Modern Art)
 */
export function slugToTitle(slug) {
    if (!slug) return '';

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * تبدیل متن به اسلاگ
 * @param {string} text - متن (مثلا Modern Art)
 * @returns {string} - اسلاگ (مثلا modern-art)
 */
export function textToSlug(text) {
    if (!text) return '';

    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

/**
 * فرمت کردن شماره تلفن
 * @param {string} phone - شماره تلفن (مثلا 09123456789)
 * @returns {string} - شماره فرمت شده (مثلا 0912-345-6789)
 */
export function formatPhoneNumber(phone) {
    if (!phone) return '';

    // فرمت برای شماره تلفن ایران
    if (phone.length === 11 && phone.startsWith('09')) {
        return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
    }

    return phone;
}

/**
 * تبدیل بایت به فرمت خوانا (KB, MB, GB)
 * @param {number} bytes - حجم به بایت
 * @returns {string} - حجم به فرمت خوانا
 */
export function formatBytes(bytes) {
    if (bytes === 0) return '0 بایت';

    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * بررسی اعتبار ایمیل
 * @param {string} email - آدرس ایمیل
 * @returns {boolean} - آیا معتبر است؟
 */
export function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * استخراج کد رنگ از استایل CSS
 * @param {string} variableName - نام متغیر CSS (مثلا --primary-color)
 * @returns {string} - کد رنگ (مثلا #3a7cb2)
 */
export function getCSSVariableValue(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * اعمال تم روی عناصر خاص
 * @param {string} selector - سلکتور CSS برای عناصر
 * @param {string} theme - نام تم (default, dark, gallery, و...)
 */
export function applyThemeToElements(selector, theme) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.setAttribute('data-theme', theme);
    });
}

/**
 * تأخیر در اجرای کد
 * @param {number} ms - زمان تأخیر به میلی‌ثانیه
 * @returns {Promise} - پرامیس که بعد از تأخیر حل می‌شود
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * گرفتن پارامترهای URL
 * @param {string} param - نام پارامتر
 * @returns {string|null} - مقدار پارامتر یا null اگر پارامتر وجود نداشته باشد
 */
export function getURLParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * بررسی پشتیبانی مرورگر از ویژگی خاص
 * @param {string} feature - نام ویژگی
 * @returns {boolean} - آیا پشتیبانی می‌شود؟
 */
export function isBrowserSupported(feature) {
    switch (feature) {
        case 'ar':
            return 'xr' in navigator && 'isSessionSupported' in navigator.xr;
        case 'webp':
            const canvas = document.createElement('canvas');
            if (canvas.getContext && canvas.getContext('2d')) {
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            }
            return false;
        case 'localStorage':
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        default:
            return false;
    }
}

/**
 * تبدیل آرایه‌ای از آبجکت‌ها به آبجکت با کلید خاص
 * @param {Array} array - آرایه آبجکت‌ها
 * @param {string} key - نام کلید برای تبدیل
 * @returns {Object} - آبجکت تبدیل شده
 */
export function arrayToObject(array, key) {
    return array.reduce((obj, item) => {
        obj[item[key]] = item;
        return obj;
    }, {});
}

/**
 * پنهان کردن بخشی از شماره کارت
 * @param {string} cardNumber - شماره کارت (مثلا 1234567812345678)
 * @returns {string} - شماره کارت پنهان شده (مثلا 1234-56**-****-5678)
 */
export function maskCardNumber(cardNumber) {
    if (!cardNumber) return '';

    const clean = cardNumber.replace(/\s+/g, '');

    return `${clean.substring(0, 4)}-${clean.substring(4, 6)}**-****-${clean.substring(12, 16)}`;
}

/**
 * تشخیص نوع دستگاه کاربر
 * @returns {string} - نوع دستگاه (mobile, tablet, desktop)
 */
export function getDeviceType() {
    const userAgent = navigator.userAgent;

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return 'tablet';
    }

    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return 'mobile';
    }

    return 'desktop';
}

/**
 * تبدیل عدد به عدد فارسی
 * @param {number|string} num - عدد
 * @returns {string} - عدد فارسی
 */
export function toFarsiNumber(num) {
    if (num === undefined || num === null) return '';

    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return num.toString().replace(/\d/g, x => farsiDigits[x]);
}

/**
 * لود تنبل (lazy) تصاویر
 * @param {string} selector - سلکتور CSS برای تصاویر
 */
export function lazyLoadImages(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    } else {
        // پشتیبانی فال‌بک برای مرورگرهای قدیمی
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * تبدیل فرم به آبجکت
 * @param {HTMLFormElement} form - فرم HTML
 * @returns {Object} - داده‌های فرم به صورت آبجکت
 */
export function formToObject(form) {
    const formData = new FormData(form);
    const object = {};

    formData.forEach((value, key) => {
        // اگر کلید قبلاً وجود داشته باشد، آن را به آرایه تبدیل می‌کنیم
        if (object[key]) {
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        } else {
            object[key] = value;
        }
    });

    return object;
}

/**
 * ذخیره داده در localStorage
 * @param {string} key - کلید
 * @param {any} value - مقدار (به صورت خودکار به JSON تبدیل می‌شود)
 */
export function saveToLocalStorage(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

/**
 * خواندن داده از localStorage
 * @param {string} key - کلید
 * @param {any} defaultValue - مقدار پیش‌فرض در صورت عدم وجود
 * @returns {any} - مقدار ذخیره شده
 */
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue);
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return defaultValue;
    }
}

/**
 * اسکرول نرم به عنصر
 * @param {string} selector - سلکتور CSS عنصر
 * @param {number} offset - فاصله از بالا (پیش فرض: 0)
 * @param {number} duration - مدت زمان انیمیشن به میلی‌ثانیه (پیش فرض: 500)
 */
export function smoothScrollTo(selector, offset = 0, duration = 500) {
    const element = document.querySelector(selector);

    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * تبدیل ثانیه به فرمت زمان (mm:ss)
 * @param {number} seconds - زمان به ثانیه
 * @returns {string} - زمان فرمت شده
 */
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}