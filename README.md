# Finance Tracker API
**Tugas Praktikum Pengembangan Perangkat Lunak I - Pertemuan 2**

## 1. Deskripsi Project
Finance Tracker API adalah aplikasi backend sederhana berbasis **Node.js** dan **Express** yang dirancang untuk mengelola catatan transaksi keuangan pribadi. Aplikasi ini memungkinkan pengguna untuk mencatat pemasukan (*income*) dan pengeluaran (*expense*) secara terorganisir.

Project ini mengimplementasikan standar industri seperti:
* **RESTful API Design**: Struktur endpoint yang bersih dan konsisten.
* **Containerization**: Menggunakan Docker untuk memastikan aplikasi berjalan lancar di lingkungan mana pun.
* **CI/CD/CS Pipeline**: Otomatisasi pengujian dan pemindaian keamanan menggunakan GitHub Actions.

## 2. Dokumentasi API (Endpoints)
Aplikasi berjalan secara default di `http://localhost:3000`.

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| **GET** | `/transactions` | Mengambil semua daftar transaksi |
| **GET** | `/transactions/:id` | Mengambil detail satu transaksi berdasarkan ID |
| **POST** | `/transactions` | Menambah transaksi baru (Income/Expense) |
| **PUT** | `/transactions/:id` | Memperbarui data transaksi yang sudah ada |
| **DELETE** | `/transactions/:id` | Menghapus data transaksi |
| **GET** | `/summary` | (Advanced) Melihat total saldo, pemasukan, dan pengeluaran |

## 3. Alur Kerja Git (Branching Strategy)
Proyek ini mengikuti *Standard Feature Branch Flow*:
* **`main`**: Berisi kode produksi yang sudah stabil dan teruji.
* **`develop`**: Branch utama untuk integrasi fitur-fitur baru.
* **`feature/*`**: Branch sementara untuk pengembangan fitur spesifik (misal: `feature/docker-setup`).

## 4. Panduan Instalasi & Docker
Untuk menjalankan aplikasi ini menggunakan Docker, pastikan Docker Desktop Anda sudah aktif, lalu ikuti langkah berikut:

1. Clone repositori:
   ```bash
   git clone [https://github.com/OdeChaerani/finance-tracker-api.git](https://github.com/OdeChaerani/finance-tracker-api.git)
2. Masuk ke direktori project:
    ```bash 
    cd finance-tracker-api
3. Jalankan Docker Compose:
    ```bash
    docker compose up --build
4. Akses API di: http://localhost:3000/transactions 

## 5. Panduan Instalasi & Docker
Project ini dilengkapi dengan pipeline otomatisasi via .github/workflows/ci-cd.yml yang mencakup:

1. Continuous Integration (CI): Otomatisasi npm install untuk memastikan dependensi terpasang tanpa error.
2. Continuous Security (CS): Pemindaian dasar untuk mencegah kebocoran data sensitif (Secret Scanning).
3. Docker Build Verification: Melakukan verifikasi Dockerfile dengan membangun (build) image di server GitHub. Status "Centang Hijau" pada tab Actions menandakan aplikasi siap dideploy.