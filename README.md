# OrizzDev Hub

Project latihan web menggunakan **Next.js** dan **TypeScript** yang berisi kumpulan tools sederhana buat bantu nugas kuliah dan ngoding sehari-hari.

Project ini dikerjakan bertahap (dicicil per fitur) sambil belajar struktur komponen React dan pengelolaan state di browser.

## Fitur Saat Ini

1. **JSON Formatter & Validator (`/tools/json-formatter`)**
   - Merapikan data JSON yang berantakan (pilihan indentasi 2 atau 4 spasi).
   - Mengubah JSON menjadi 1 baris (*minify*).
   - Mengecek kalau ada penulisan JSON yang kurang koma atau kurung.

2. **Pomodoro Timer & Catatan Tugas (`/workspace/focus`)**
   - Timer fokus 25 menit dan istirahat 5/15 menit.
   - Catatan daftar tugas (*to-do list*) dengan kategori sederhana yang tersimpan di `localStorage` browser.

## Rencana Fitur Selanjutnya (To-Do)

- [x] Halaman Utama & Navigasi Dasar
- [x] JSON Formatter & Validator
- [x] Pomodoro Timer & To-Do List (`localStorage`)
- [ ] Password & UUID Generator
- [ ] Base64 Encode / Decode
- [ ] Catatan Potongan Kode (Snippet)
- [ ] Regex Tester Sederhana
- [ ] Integrasi Public API GitHub

## Tech Stack

- Next.js (App Router)
- React & TypeScript
- Tailwind CSS
- Vitest (untuk latihan unit testing fungsi-fungsi dasar)

## Cara Menjalankan di Laptop

```bash
npm install
npm run dev
```

Setelah jalan, buka `http://localhost:3000` di browser.
