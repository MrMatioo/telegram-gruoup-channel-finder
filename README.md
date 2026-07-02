# 🤖 Telegram Finder API

An intelligent, fast, and secure TypeScript REST API to search for Telegram channels and groups based on keywords. It features an automated database caching layer to prevent Telegram API rate limits (`FloodWaitError`) and includes a built-in IP rate limiter.

یک API هوشمند، سریع و امن با تایپ‌اسکریپت برای جستجوی کانال‌ها و گروه‌های تلگرام بر اساس کلمات کلیدی. این پروژه مجهز به لایه کَش خودکار در دیتابیس برای جلوگیری از محدودیت‌های تلگرام و همچنین سیستم محدودکننده نرخ درخواست کاربر (IP Rate Limiter) است.

---

## 🚀 Features | قابلیت‌ها

- **Telegram Search Core:** Built using GramJS/Telegram API.
- **Database Caching:** Searches the PostgreSQL database first; hits the Telegram API only on cache misses to save resources and prevent bans.
- **Security:** Built-in IP Rate Limiting using `express-rate-limit` (100 requests per 15 minutes).
- **Interactive Documentation:** Ready-to-use mini Swagger UI customization (Green/Red theme).
- **Pure English Code:** Clean architecture with no mixed languages or comments.

---

## 🛠️ Tech Stack | تکنولوژی‌های مورد استفاده

- **Backend:** Node.js, Express, TypeScript
- **Database / ORM:** PostgreSQL, TypeORM (reflect-metadata)
- **Telegram Wrapper:** Telegram (GramJS)
- **API Documentation:** Swagger UI Express

---

## ⚙️ Installation & Setup | راه‌اندازی پروژه

### 1. Clone the repository | کلون کردن پروژه

```bash
git clone [https://github.com/your-username/telegram-finder-api.git](https://github.com/your-username/telegram-finder-api.git)
cd telegram-finder-api
```
