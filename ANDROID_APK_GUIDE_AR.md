# تحويل المشروع إلى APK باستخدام Capacitor — اختياري

الطريقة الأسهل للاستخدام اليومي هي تثبيت نسخة PWA من Chrome. أما إذا كنت تحتاج ملف APK فعلياً، استخدم الخطوات التالية بعد تثبيت Android Studio وAndroid SDK.

داخل مجلد المشروع:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "فاتورة الغاز" "com.gasbill.app" --web-dir=dist
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

داخل Android Studio:

1. انتظر اكتمال Gradle Sync.
2. من القائمة اختر `Build`.
3. اختر `Build Bundle(s) / APK(s)`.
4. اختر `Build APK(s)`.
5. بعد الانتهاء اضغط `locate` للوصول إلى ملف APK.

بعد أي تعديل في React شغّل:

```bash
npm run build
npx cap sync android
```

ثم افتح Android Studio وابنِ APK مرة أخرى.
