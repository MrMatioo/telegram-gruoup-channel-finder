# Telegram Finder API

An intelligent, fast, and secure TypeScript REST API to search for Telegram channels and groups based on keywords. It features an automated database caching layer to prevent Telegram API rate limits.

یک API هوشمند، سریع و امن با تایپ‌اسکریپت برای جستجوی کانال‌ها و گروه‌های تلگرام بر اساس کلمات کلیدی. این پروژه مجهز به لایه کش خودکار در دیتابیس برای جلوگیری از محدودیت‌های تلگرام است.

---

## 📌 Features | قابلیت‌ها

- Telegram Search Core — Built using GramJS/Telegram API for reliable and up-to-date searches.
- Database Caching — Searches the PostgreSQL database first; hits the Telegram API only on cache misses to save resources and prevent bans.
- Interactive Documentation — Ready-to-use Swagger UI with a custom Green/Red theme.
- Pure English Code — Clean architecture with no mixed languages or comments.
- TypeScript — Fully typed for better developer experience and maintainability.

---

## 🛠️ Tech Stack | تکنولوژی‌های مورد استفاده

| Category          | Technology                             |
| :---------------- | :------------------------------------- |
| Backend           | Node.js, Express, TypeScript           |
| Database / ORM    | PostgreSQL, TypeORM (reflect-metadata) |
| Telegram Wrapper  | Telegram (GramJS)                      |
| API Documentation | Swagger UI Express                     |

---

## ⚙️ Installation & Setup | راه‌اندازی پروژه

1. Clone the repository | کلون کردن پروژه

```bash
git clone https://https://github.com/MrMatioo/Telegram-Finder-API.git
cd Telegram-Finder-API
```

2. Install dependencies | نصب وابستگی‌ها

   ```bash
   npm install
   ```

3. Configure environment variables | تنظیم متغیرهای محیطی
   Create a .env file in the root directory with the following variables:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=telegram_finder
   TELEGRAM_API_ID=your_api_id
   TELEGRAM_API_HASH=your_api_hash
   TELEGRAM_SESSION=your_session_string
   ```

Note: You can obtain your Telegram API credentials from my.telegram.org.

4. Run the application | اجرای برنامه
   ```bash
   npm run dev
   ```

````

The server will start on http://localhost:3000.

---

## 🚀 Usage | استفاده

Search Endpoint:

```http
GET /api/search?q={keyword}
````

Example Request | نمونه درخواست:

```bash
curl "http://localhost:3000/api/search?q=programming"
```

Example Response | نمونه پاسخ:

```json
{
  "source": "cache",
  "count": 5,
  "results": [
    {
      "id": 1,
      "channelId": "123456789",
      "username": "programming_channel",
      "title": "Programming Hub",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

Field Description:

- source: "cache" (from database) or "telegram_api" (fresh from Telegram)
- count: Number of results found
- results: Array of channel/group objects

API Documentation | مستندات API:
Interactive Swagger UI is available at http://localhost:3000/api-docs

---

## 🔄 How It Works | نحوه عملکرد

1. User sends a search request with a keyword via /api/search?q=keyword.
2. Cache check — The system first checks if the keyword has been searched before.
3. If cached — Results are returned directly from the PostgreSQL database.
4. If not cached — The system queries the Telegram API using GramJS.
5. Results are saved to the database for future requests.
6. Response is returned to the user with a source indicator (cache or telegram_api).

This approach significantly reduces API calls to Telegram, preventing FloodWaitError and improving response times.

---

## 👤 Author | نویسنده

MrMatioo — GitHub

## ⭐ Support

If you find this project useful, please consider giving it a star on GitHub!
