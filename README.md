# Chin Basketball Blog

Personal Blog แบบ Full Stack แยก Frontend และ Backend ชัดเจน:

```text
Chin-basketball-blog/
├── client/                 React + Vite
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/                 Express + PostgreSQL + Supabase Auth
│   ├── api/
│   ├── database/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── app.mjs
│   └── package.json
├── api/index.js            Vercel adapter
├── package.json            Workspace scripts
└── vercel.json
```

## ติดตั้ง

รันที่โฟลเดอร์หลักเพียงครั้งเดียว:

```bash
npm install
```

## Environment variables

สร้าง `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

สร้าง `server/.env`:

```env
PORT=4000
CONNECTION_STRING=postgresql://...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
FRONTEND_URL=http://localhost:5173
```

ไฟล์จริงถูก ignore โดย Git ส่วนค่าตัวอย่างอยู่ใน `.env.example` ของแต่ละฝั่ง

## รันโปรเจกต์จากโฟลเดอร์หลัก

Terminal 1 — Backend:

```bash
npm run start
```

ถ้าต้องการให้ Backend restart อัตโนมัติเมื่อแก้ไฟล์:

```bash
npm run dev:server
```

Terminal 2 — Frontend:

```bash
npm run dev
```

เปิดหน้าเว็บที่ `http://localhost:5173`

## รันจากแต่ละโฟลเดอร์

```bash
cd server
npm run dev
```

และอีก Terminal:

```bash
cd client
npm run dev
```

## ตรวจโค้ด

```bash
npm run lint
npm run build
```

หน้าทดสอบ API อยู่ที่ `http://localhost:5173/test-health`

## อัปโหลดรูปบทความ

1. ตั้งค่า Supabase Storage bucket ชื่อ `my-personal-blog`
2. ใส่ `SUPABASE_STORAGE_BUCKET=my-personal-blog` ใน `server/.env`
3. Login ด้วยผู้ใช้ที่มี role เป็น `admin`
4. เปิด `http://localhost:5173/admin/articles/create`
5. เลือกรูป JPEG, PNG, GIF หรือ WebP ขนาดไม่เกิน 5 MB แล้วบันทึกบทความ

Frontend จะส่ง `multipart/form-data` ไปที่ `POST /posts` และ Backend จะเก็บรูปใน Supabase Storage ก่อนบันทึก public URL ลงฐานข้อมูล
