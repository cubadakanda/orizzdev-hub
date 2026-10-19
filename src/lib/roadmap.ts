export interface RoadmapItem {
  id: string;
  title: string;
  category: "Toolkit" | "Workspace";
  status: "Active" | "Coming Soon";
  version: string;
  href?: string;
  description: string;
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    category: "Toolkit",
    status: "Active",
    version: "Selesai",
    href: "/tools/json-formatter",
    description:
      "Alat buat ngerapihin data JSON yang berantakan dan ngecek kalau ada kurung atau koma yang salah.",
  },
  {
    id: "focus-workspace",
    title: "Pomodoro & Catatan Tugas",
    category: "Workspace",
    status: "Active",
    version: "Selesai",
    href: "/workspace/focus",
    description:
      "Timer 25 menit buat bantu fokus waktu lagi nugas atau ngoding, ditambah catetan to-do list sederhana.",
  },
  {
    id: "password-uuid-generator",
    title: "Password & UUID Generator",
    category: "Toolkit",
    status: "Coming Soon",
    version: "Rencana",
    description:
      "Buat bikin password acak dan UUID waktu ngetes form registrasi atau database.",
  },
  {
    id: "base64-url-converter",
    title: "Base64 Encode / Decode",
    category: "Toolkit",
    status: "Coming Soon",
    version: "Rencana",
    description:
      "Konversi teks biasa ke format Base64 dan sebaliknya.",
  },
  {
    id: "code-scratchpad",
    title: "Catatan Potongan Kode (Snippet)",
    category: "Workspace",
    status: "Coming Soon",
    version: "Rencana",
    description:
      "Tempat nyimpen potongan kode sementara di browser biar nggak perlu bikin file .txt baru.",
  },
  {
    id: "regex-tester",
    title: "Regex Tester Sederhana",
    category: "Toolkit",
    status: "Coming Soon",
    version: "Rencana",
    description:
      "Buat ngetes pola regular expression waktu bikin validasi form.",
  },
  {
    id: "github-activity-widget",
    title: "Cek Profil GitHub",
    category: "Workspace",
    status: "Coming Soon",
    version: "Rencana",
    description:
      "Latihan ambil data dari public API GitHub buat nampilin daftar repo.",
  },
];
