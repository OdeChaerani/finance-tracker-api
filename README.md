# Finance Tracker API
**Tugas Praktikum Pengembangan Perangkat Lunak I**

RESTful API sederhana untuk mengelola transaksi keuangan (*income* dan *expense*) menggunakan **Node.js** dan **Express**.

---

## Daftar Isi
- [Instalasi & Menjalankan](#instalasi--menjalankan)
- [Dokumentasi API](#dokumentasi-api)
- [Format Response](#format-response)
- [Docker](#docker)
- [CI/CD](#cicd)

---

## Instalasi & Menjalankan

### Prasyarat
- Node.js >= 18
- Docker (opsional)

---

### Menjalankan Secara Lokal

```bash
git clone https://github.com/<username>/finance-tracker-api.git
cd finance-tracker-api
npm install
node src/index.js
```

Akses API:
```
http://localhost:3000
```

---

### Menjalankan dengan Docker

```bash
docker compose up --build
```

Akses API:
```
http://localhost:3000
```

---

## Dokumentasi API

### Base URL
```
http://localhost:3000
```

---

### Endpoint List

| Method | Endpoint            | Deskripsi |
|--------|-------------------|----------|
| GET    | `/transactions`     | Mengambil semua transaksi |
| GET    | `/transactions/:id` | Mengambil transaksi berdasarkan ID |
| POST   | `/transactions`     | Menambahkan transaksi baru |
| PUT    | `/transactions/:id` | Mengupdate transaksi |
| DELETE | `/transactions/:id` | Menghapus transaksi |
| GET    | `/summary`          | Melihat ringkasan keuangan |

---

### Query Parameters

**GET /transactions**

| Parameter | Tipe   | Deskripsi |
|----------|--------|----------|
| `type`   | string | Filter berdasarkan `income` atau `expense` |
| `sort`   | string | Urutkan berdasarkan tanggal (`desc` = terbaru) |

Contoh:
```
GET /transactions?type=income&sort=desc
```

---

### Request Body

**POST / PUT**

```json
{
  "type": "income",
  "amount": 100000,
  "description": "Gaji",
  "date": "2026-03-22"
}
```

| Field        | Tipe   | Keterangan |
|-------------|--------|-----------|
| `type`      | string | wajib (`income` / `expense`) |
| `amount`    | number | wajib |
| `description` | string | opsional |
| `date`      | string | opsional (default: hari ini) |

---

## Format Response

Semua endpoint menggunakan format berikut:

```json
{
  "status": "OK / ERROR",
  "message": "Pesan response",
  "data": {},
  "errors": null
}
```

---

### Contoh Success

```json
{
  "status": "OK",
  "message": "Success retrieve transactions",
  "data": [
    {
      "id": 1,
      "type": "income",
      "amount": 500000,
      "description": "Uang saku",
      "date": "2026-03-22"
    }
  ],
  "errors": null
}
```

---

### Contoh Error

```json
{
  "status": "ERROR",
  "message": "Transaction not found",
  "data": null,
  "errors": ["Invalid ID"]
}
```

---

### Contoh Summary

```json
{
  "status": "OK",
  "message": "Financial Summary retrieved",
  "data": {
    "total_income": 500000,
    "total_expense": 25000,
    "balance": 475000
  },
  "errors": null
}
```

---

## Docker

### Menjalankan dengan Docker

```bash
docker compose up --build
```

---

## CI/CD

Project ini menggunakan **GitHub Actions** untuk:

- **Continuous Integration (CI)**  
  Menjalankan test otomatis (`npm test`)

- **Continuous Security (CS)**  
  Scan keamanan dependency

- **Docker Build Check**  
  Memastikan Docker image dapat di-build tanpa error

---

## Note

- Data disimpan sementara di memory (tidak menggunakan database)