# Finance Tracker API
[cite_start]Tugas Praktikum Perangkat Lunak I - Pertemuan 2 [cite: 8]

## 1. Deskripsi Project
[cite_start]API ini digunakan untuk mencatat transaksi keuangan (pemasukan dan pengeluaran) secara sederhana menggunakan Node.js dan Express [cite: 569-571].

## [cite_start]2. Dokumentasi API [cite: 572-574]
- **GET /transactions**: Melihat semua riwayat transaksi.
- **POST /transactions**: Menambah transaksi baru (Income/Expense).
- **PUT /transactions/:id**: Mengubah data transaksi.
- **DELETE /transactions/:id**: Menghapus transaksi.
- **GET /summary**: (Bonus) Melihat ringkasan total saldo.

## [cite_start]3. Panduan Instalasi (Docker) [cite: 575-577]
Pastikan Docker Desktop sudah menyala, lalu jalankan:
```bash
docker-compose up --build