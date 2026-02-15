# 🚀 خطة ترقية نظام التتبع

## ✅ الهدف:

دمج **Shipsgo** و **JSONCargo** للحصول على تتبع حقيقي مجاني لـ 10,000+ حاوية شهرياً

---

## 📊 المصادر الجديدة:

### 1. **Shipsgo API** (الأولوية الأولى)

- **مجاني:** Unlimited API calls
- **المميزات:**
  - اسم السفينة ✅
  - GPS (lat/lng) ✅
  - حالة الشحنة ✅
- **Endpoint:** `https://api.shipsgo.com/container/{containerNumber}`

### 2. **JSONCargo API** (الأولوية الثانية)

- **مجاني:** 10,000 طلب/شهر
- **المميزات:**
  - اسم السفينة ✅
  - GPS حقيقي (lat/lng) ✅
  - ETA ✅
- **Endpoint:** `https://api.jsoncargo.com/v1/track?container={containerNumber}`

### 3. **findTEU** (الأولوية الثالثة)

- **مجاني:** 10 حاويات/شهر
- **حالياً:** مدمج بالفعل

---

## 🔧 التعديلات المطلوبة:

### في `api/tracking.js`:

```javascript
// الترتيب الجديد للمصادر:
try {
  // 1. Shipsgo (Unlimited free - BEST!)
  let containerData = await tryShipsgo(trackingNumber);
  let source = "shipsgo";

  // 2. JSONCargo (10k/month free)
  if (!containerData) {
    containerData = await tryJSONCargo(trackingNumber);
    source = "jsoncargo";
  }

  // 3. findTEU (10/month free)
  if (!containerData) {
    containerData = await tryFindTEU(trackingNumber);
    source = "findteu";
  }

  // 4. Web scraping
  if (!containerData) {
    containerData = await tryWebScraping(trackingNumber);
    source = "webscrape";
  }

  // ... باقي الكود
}
```

### إضافة دالة JSONCargo:

```javascript
// JSONCargo API (10k/month free)
async function tryJSONCargo(trackingNumber) {
  try {
    const response = await fetch(
      `https://api.jsoncargo.com/v1/track?container=${trackingNumber}`,
      {
        headers: { Accept: "application/json" },
        timeout: 3000,
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.container) {
        return {
          delivery_status: data.container.status || "In Transit",
          last_event: data.container.last_location || "At Sea",
          vessel_name: data.container.vessel_name || "N/A",
          scheduled_delivery_date: data.container.eta || "N/A",
          origin_country_code: data.container.origin_port || "N/A",
          destination_country_code: data.container.destination_port || "N/A",
          latitude: data.container.latitude,
          longitude: data.container.longitude,
        };
      }
    }
  } catch (e) {
    console.log("JSONCargo failed:", e.message);
  }
  return null;
}
```

---

## 🎯 النتيجة المتوقعة:

- ✅ **10,000+ تتبع حقيقي شهرياً**
- ✅ **اسم السفينة الفعلية**
- ✅ **GPS حقيقي (lat/lng)**
- ✅ **مجاني 100%**
- ✅ **بدون تسجيل أو API keys**

---

## 📝 ملاحظات:

1. Shipsgo يعطي بيانات أكثر دقة من findTEU
2. JSONCargo يوفر GPS coordinates مباشرة
3. النظام سيجرب المصادر بالترتيب حتى يجد بيانات
4. إذا فشلت كل المصادر، يعود للمحاكاة الذكية

---

**تاريخ الإنشاء:** 2026-02-15  
**الحالة:** جاهز للتطبيق
