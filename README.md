# 📊 AnalytixPro - Business Analytics Dashboard Template

> **Professional, Clean, & Interactive Business Analytics Dashboard**
> *Modern vanilla HTML/CSS/JS template for analytics applications*

## 🌟 Overview

**AnalytixPro** adalah template dashboard analitik bisnis yang dirancang dengan **HTML, CSS, dan JavaScript murni (Vanilla)**. Template ini menawarkan antarmuka yang bersih, responsif, dan profesional tanpa ketergantungan pada framework JavaScript berat seperti React atau Vue.

Template ini sangat cocok untuk:
- 📈 Dashboard Analitik & Reporting
- 🛍️ E-commerce Admin Panel
- 👥 User & Segment Management
- 💼 SAAS Application Starter

---

## 🚀 Key Features

*   **⚡ Zero Dependencies:** Dibangun dengan Vanilla JS & CSS. Ringan dan cepat.
*   **🎨 Theme Support:** **Light Mode** & **Dark Mode** toggle yang persisten.
*   **📱 Fully Responsive:** Tampilan mobile-friendly dengan sidebar toggle halus.
*   **📊 Interactive Charts:** Integrasi **Chart.js** yang dioptimalkan untuk tema terang/gelap (auto-adjust colors).
*   **📂 Organized Structure:** Struktur folder yang rapih dan modular (`pages/`, `layouts/`, `assets/`).
*   **🔍 Interactive Tables:** Sorting, Pagination, dan Filtering siap pakai.
*   **🔔 Notifications:** Toast notification system built-in.

---

## 📂 Project Structure

Struktur file disusun secara profesional berdasarkan kategori untuk memudahkan maintenance:

### 📄 Pages (`/pages`)
Halaman-halaman utama aplikasi dikelompokkan berdasarkan fungsinya:

| Directory | File | Description |
|-----------|------|-------------|
| **`dashboard/`** | `index.html` | **Main Dashboard**. Berisi summary cards, grafik pendapatan/aktivitas, dan recent activities. |
| | `settings.html` | Halaman pengaturan aplikasi termasuk **Dark Mode toggle**. |
| **`reports/`** | `index.html` | **Transaction List**. Tabel lengkap dengan sorting, filtering, dan pagination. |
| | `generate.html` | Form untuk membuat laporan baru dengan validasi input. |
| | `view.html` | Halaman detail transaksi/laporan spesifik. |
| **`segments/`** | `index.html` | **Segmentation Tool**. Halaman filter lanjutan untuk data analisis. |
| | `create.html` | Form wizard untuk membuat segmen pengguna baru. |
| | `edit.html` | Interface edit untuk segmen yang sudah ada. |
| **`user/`** | `profile.html` | Halaman profil pengguna dengan editable fields. |
| | `help.html` | Pusat bantuan/FAQ dengan navigasi accordion. |
| **`auth/`** | `login.html` | Halaman login responsive. |
| | `register.html` | Halaman pendaftaran akun baru. |

### 🛠️ Layouts & Scripts (`/layouts`, `/css`, `/js`)
Komponen pendukung dan logika aplikasi:

| File | Description |
|------|-------------|
| **`css/style.css`** | **Style Utama**. Berisi CSS variables (colors, spacing), layout grid, utility classes, dan styling komponen UI. |
| **`js/main.js`** | Utility functions global (seperti Toast notifications, format currency helpers). |
| **`js/theme.js`** | Menangani logika **Dark/Light Mode** dan persistensi ke `localStorage`. |
| **`js/charts.js`** | Konfigurasi **Chart.js**. Menangani grafik pendapatan dan aktivitas dengan pewarnaan dinamis. |
| **`js/datatable.js`** | Logika inti untuk interaksi tabel (Sorting, Pagination, Rows per page). |
| **`js/data.js`** | Dummy data generator untuk simulasi backend dan handling export CSV/Excel. |
| **`js/header.js`** | Menangani interaksi header (Dropdown profil, Notifikasi popup). |
| **`layouts/header.html`** | Komponen header yang dapat digunakan kembali (snippet referensi). |

---

## 🔧 Getting Started

1.  **Clone/Download** project ini.
2.  Buka `index.html` yang berada di folder root di browser Anda.
3.  Anda akan diarahkan otomatis ke halaman **Dashboard** (`pages/dashboard/index.html`).
4.  Jelajahi fitur-fitur seperti:
    *   **Toggle Theme:** Pergi ke Settings > Dark Mode.
    *   **Reports Table:** Coba sorting kolom atau ganti halaman di menu Reports.
    *   **Export Data:** Coba tombol Export di halaman Reports.

---

## 💡 Customization Guide

### Mengganti Warna Tema
Edit root variables di bagian atas file `css/style.css`:
```css
:root {
  --color-primary: #your-color;
  /* ... */
}
```

### Mengubah Data Dummy
Edit `js/data.js` untuk mengganti `sampleTransactions` dengan data real dari API Anda:
```javascript
// js/data.js
const sampleTransactions = [
  // Masukkan data Anda di sini
];
```

---

*Dibuat dengan ❤️ untuk memudahkan pengembangan dashboard bisnis yang elegan.*
