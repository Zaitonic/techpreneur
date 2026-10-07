# CDM Eats - Full Stack Project

## Project Structure

```
cdmearts9999/
├── frontend/               # Clean Modular Frontend
│   ├── index.html          # Clean HTML-only markup (split from monolithic index.html)
│   ├── css/
│   │   └── style.css       # Complete CSS design system & animations
│   ├── js/
│   │   └── main.js         # Interactive JavaScript & Laravel API client
│   └── images/             # Food images (SILOG, CANTON, KOREAN, SIOMAI)
│
├── backend/                # Fully Installed & Working Laravel 13 PHP Backend
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── MenuController.php     # GET /api/menu, GET /api/menu/{id}
│   │   │   ├── ReviewController.php   # GET /api/reviews/{id}, POST /api/reviews
│   │   │   ├── CouponController.php   # GET /api/coupons, POST /api/coupons/validate
│   │   │   └── ContactController.php  # POST /api/contact
│   │   └── Models/
│   │       ├── MenuItem.php           # Eloquent model for menu items
│   │       ├── Review.php             # Eloquent model for food reviews
│   │       └── ContactMessage.php     # Eloquent model for contact submissions
│   ├── database/
│   │   ├── database.sqlite            # Active SQLite database
│   │   ├── migrations/                # Schema migrations
│   │   └── seeders/                   # Pre-seeded menu items & sample data
│   ├── routes/
│   │   ├── api.php                    # REST API routes
│   │   └── web.php                    # Web routes (serves CDM Eats app)
│   ├── public/                        # Laravel public root with assets
│   ├── vendor/                        # Full Composer dependencies installed
│   ├── artisan                        # Laravel Artisan CLI
│   └── .env                           # Environment settings (App Key generated)
│
├── index.html              # Original monolithic file (kept intact for reference)
└── composer.phar           # Local Composer CLI
```

---

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | List all menu items with ratings & badges |
| `GET` | `/api/menu/{id}` | Get specific food item details |
| `GET` | `/api/reviews/{foodId}` | Get reviews for a food item (`silog`, `pancit`, `kbop`, `siomai`) |
| `POST` | `/api/reviews` | Submit a review (`food_id`, `name`, `comment`, `rating`) |
| `GET` | `/api/coupons` | List all active student discount coupons |
| `POST` | `/api/coupons/validate`| Validate a coupon code (e.g. `CDMEATS20`, `CDMBOGO`, `CDMDRINK`) |
| `POST` | `/api/contact` | Submit contact form inquiry |

---

## Running the Application

### 1. Start Laravel Backend & Web Server
From the root directory:
```bash
cd backend
php artisan serve
```
The application will be live at:
- **Web App**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API Base**: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

### 2. Standalone Frontend (Optional)
You can also run the static frontend separately:
```bash
# From project root
php -S localhost:5500 -t frontend/
```
The frontend automatically connects to the Laravel API at `http://127.0.0.1:8000/api` when available, with automatic offline fallback.

---

## Database Management

Migrations and seeders are already executed in SQLite (`backend/database/database.sqlite`).
To re-run or reset:
```bash
cd backend
php artisan migrate:fresh --seed
```

---

## Technologies Used

- **Frontend**: HTML5, Vanilla CSS3 (Custom Responsive Design), JavaScript (ES6+ Fetch API)
- **Backend**: Laravel 13 (PHP 8.5)
- **Database**: SQLite with Eloquent ORM
- **Security & Networking**: Configured OpenSSL CA certificates for Windows / Avast Web Shield compatibility
