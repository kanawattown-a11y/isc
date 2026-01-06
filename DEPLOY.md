# دليل نشر التطبيق على منصة Render

هذا الدليل يشرح خطوة بخطوة كيفية رفع ونشر تطبيقك (React + Express) على استضافة Render المجانية.

## المتطلبات الأساسية
1.  حساب على [GitHub](https://github.com/).
2.  برنامج [Git](https://git-scm.com/downloads) مثبت على جهازك.
3.  حساب على [Render](https://render.com/).

## الخطوة 1: رفع المشروع على GitHub

1.  تأكد من أنك في مجلد المشروع الرئيسي.
2.  قم بتهيئة Git (إذا لم يكن مهيئاً):
    ```bash
    git init
    ```
3.  قم بإضافة الملفات:
    ```bash
    git add .
    ```
4.  قم بعمل Commit:
    ```bash
    git commit -m "Initial commit for deployment"
    ```
5.  اذهب إلى GitHub وأنشئ مستودعاً جديداً (New Repository).
6.  اربط المستودع المحلي بالمستودع البعيد (استبدل الرابط برابط مستودعك):
    ```bash
    git remote add origin https://github.com/USERNAME/REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## الخطوة 2: إعداد قاعدة البيانات (PostgreSQL) على Render

1.  سجل الدخول إلى [Render Dashboard](https://dashboard.render.com/).
2.  اضغط على **New +** واختر **PostgreSQL**.
3.  الاسم: `jabal-bashan-db` (أو أي اسم تفضله).
4.  اترك باقي الخيارات كما هي (الخطة المجانية Free Tier جيدة للتجربة).
5.  اضغط **Create Database**.
6.  انسخ رابط الاتصال **Internal Database URL** (سنحتاجه لاحقاً).

## الخطوة 3: نشر التطبيق (Web Service)

1.  في لوحة تحكم Render، اضغط **New +** واختر **Web Service**.
2.  اختر **Build and deploy from a Git repository**.
3.  اربط حساب GitHub الخاص بك واختر المستودع الذي رفعته للتو.
4.  في إعدادات الخدمة:
    *   **Name**: `jabal-bashan-app`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start`
5.  انزل إلى قسم **Environment Variables** وأضف التالي:
    *   `DATABASE_URL`: (ألصق رابط قاعدة البيانات الذي نسخته في الخطوة السابقة).
    *   `SESSION_SECRET`: اكتب أي نص عشوائي طويل وآمن.
    *   `NODE_ENV`: `production`
6.  اضغط **Create Web Service**.

## الخطوة 4: تهيئة قاعدة البيانات

بعد أن يتم النشر بنجاح، سيحاول التطبيق العمل. إذا كنت تستخدم Drizzle ORM، قد تحتاج لرفع الجداول إلى قاعدة البيانات.
يمكنك فعل ذلك بإضافة أمر في `package.json` للنشر التلقائي أو تشغيله يدوياً عبر Render Shell، ولكن الطريقة الأسهل للبداية هي التأكد من أن التطبيق يقوم بذلك أو استخدام أداة إدارة قواعد بيانات للاتصال برابط `External Database URL` وتنفيذ ملفات الـ SQL.

## ملاحظات هامة
*   تأكد من أن ملف `vite.config.ts` يبني الملفات إلى المجلد الصحيح (`dist/public`) وهو ما تم ضبطه بالفعل.
*   تأكد من أن `script/build.ts` يعمل بشكل صحيح (وقد جربناه محلياً ونجح).

مبروك! موقعك الآن يجب أن يكون متاحاً على الرابط الذي يوفره Render (مثل `https://jabal-bashan-app.onrender.com`).
