// theme-utils.js - توابع مدیریت تم

/**
 * تغییر تم اصلی سایت
 * @param {string} theme - نام تم ('default', 'dark')
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/**
 * تغییر تم فصلی سایت
 * @param {string} season - نام فصل ('spring', 'summer', 'autumn', 'winter')
 */
function setSeason(season) {
    document.documentElement.setAttribute('data-season', season);
    localStorage.setItem('season', season);
}

/**
 * بازیابی تم ذخیره شده کاربر
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // بررسی تم سیستم کاربر
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('default');
        }
    }

    // بازیابی فصل ذخیره شده
    const savedSeason = localStorage.getItem('season');
    if (savedSeason) {
        setSeason(savedSeason);
    } else {
        // تنظیم فصل بر اساس ماه فعلی
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) {
            setSeason('spring');
        } else if (month >= 5 && month <= 7) {
            setSeason('summer');
        } else if (month >= 8 && month <= 10) {
            setSeason('autumn');
        } else {
            setSeason('winter');
        }
    }
}

/**
 * تغییر خودکار تم با توجه به زمان روز
 */
function setThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        setTheme('default');
    } else {
        setTheme('dark');
    }
}

export { setTheme, setSeason, loadSavedTheme, setThemeByTime };