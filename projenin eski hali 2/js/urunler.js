// Dosya → Base64 çevirici
function resimToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}





// Ürünleri tutacağımız ana anahtar
const URUN_KEY = "eTicaretUrunler";

// Aktif Kullanıcı Bilgisi (Bu kısım değişmedi)
let aktifKullanici = JSON.parse(localStorage.getItem("aktifKullanici"));
const satilanKullaniciMail = aktifKullanici ? aktifKullanici.mail : null;

const saticilar = [
  {
    mail: "satici1@mail.com",
    ad: "Ayşe",
    lat: 39.9208,
    lng: 32.8541   // Kızılay
  },
  {
    mail: "satici2@mail.com",
    ad: "Mehmet",
    lat: 39.9300,
    lng: 32.8600
  },
  {
    mail: "satici3@mail.com",
    ad: "Elif",
    lat: 39.9250,
    lng: 32.8700
  }
];



// ===================== HAZIR VERİ SETİ (Yerel Görsel Yolu ile Düzeltildi) =======================
const hazirUrunler = [
    {
      "id": 1,
      "ad": "Ev Yapımı Mantı",
      "fiyat": 120,
      "kategori": "Ev Yemekleri",
      // YEREL YOL: resimler klasöründeki mantı.jpg dosyasını kullanır
      "resim": "resimler/manti.jpg", 
      "aciklama": "Taze hazırlanmış ev mantısı.",
      "saticiMail": "satici1@mail.com" 
    },
    {
      "id": 2,
      "ad": "Zeytinyağlı Sarma",
      "fiyat": 110,
      "kategori": "Ev Yemekleri",
      // YEREL YOL: resimler klasöründeki sarma.jpg dosyasını kullanır
      "resim": "resimler/sarma.jpg", 
      "aciklama": "Anne tarifiyle hazırlanmış sarma.",
      "saticiMail": "satici1@mail.com" 
    },
    {
      "id": 3,
      "ad": "Kuru Fasulye",
      "fiyat": 85,
      "kategori": "Ev Yemekleri",
      // YEREL YOL: resimler klasöründeki fasulye.jpg dosyasını kullanır
      "resim": "resimler/fasulye.jpg", 
      "aciklama": "Tereyağlı ev fasulyesi.",
      "saticiMail": "satici2@mail.com" 
    },
    {
      "id": 4,
      "ad": "Mücver (5 Adet)",
      "fiyat": 80,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/mucver.jpg", 
      "aciklama": "Taze kabak ve otlarla yapılmış mücver.",
      "saticiMail": "satici4@mail.com"
    },
    {
      "id": 5,
      "ad": "Karnıyarık (3 Adet)",
      "fiyat": 165,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/karniyarik.jpg", 
      "aciklama": "Kıymalı iç harcıyla fırında pişmiş lezzet.",
      "saticiMail": "satici1@mail.com" 
    },
    {
      "id": 6,
      "ad": "Ezogelin Çorbası",
      "fiyat": 40,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/ezogelin.jpg", 
      "aciklama": "Nane ve pul biberli, doyurucu bir başlangıç.",
      "saticiMail": "satici3@mail.com"
    },
    {
      "id": 7,
      "ad": "Mercimek Köftesi (10 Adet)",
      "fiyat": 90,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/mercimekkofte.jpg", 
      "aciklama": "Zeytinyağı ve taze soğanla yapılmış meze/yemek.",
      "saticiMail": "satici1@mail.com" 
    },
    {
      "id": 8,
      "ad": "Domates Çorbası",
      "fiyat": 45,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/domatescorba.jpg", 
      "aciklama": "Rendelenmiş domates ve tereyağlı unla hazırlanmıştır.",
      "saticiMail": "satici3@mail.com"
    },
    {
      "id": 9,
      "ad": "Pırasa Yemeği (Zeytinyağlı)",
      "fiyat": 115,
      "kategori": "Ev Yemekleri",
      // YEREL YOL
      "resim": "resimler/pirasa.jpg", 
      "aciklama": "Havuç ve pirinçle desteklenmiş, zeytinyağlı tencere yemeği.",
      "saticiMail": "satici2@mail.com" 
    },
    {
      "id": 10,
      "ad": "Sigara Böreği (10 Adet)",
      "fiyat": 85,
      "kategori": "Hamur İşleri",
      // YEREL YOL
      "resim": "resimler/sigaraboregi.jpg", 
      "aciklama": "İçi peynirli, çıtır çıtır ev sigara böreği.",
      "saticiMail": "satici4@mail.com" 
    }, 


    



    

    // ===========================================
    //               YENİ EKLENEN 4 TATLI ÜRÜN
    // ===========================================
    {
      "id": 21,
      "ad": "Ev Yapımı Islak Kek",
      "fiyat": 75,
      "kategori": "Tatlılar",
      // YEREL YOL
      "resim": "resimler/islakkek.jpg", 
      "aciklama": "Bol çikolata soslu, yumuşacık ıslak kek.",
      "saticiMail": "satici1@mail.com" 
    },
    {
      "id": 22,
      "ad": "Mozaik Pasta (Dilim)",
      "fiyat": 55,
      "kategori": "Tatlılar",
      // YEREL YOL
      "resim": "resimler/mozaikpasta.jpg", 
      "aciklama": "Bisküvi ve kakao ile hazırlanmış geleneksel lezzet.",
      "saticiMail": "satici3@mail.com" 
    },
    {
      "id": 23,
      "ad": "Şekerpare (4 Adet)",
      "fiyat": 80,
      "kategori": "Tatlılar",
      // YEREL YOL
      "resim": "resimler/sekerpare.jpg", 
      "aciklama": "Hafif şerbetli, ev yapımı şekerpare.",
      "saticiMail": "satici4@mail.com"
    },
    {
      "id": 24,
      "ad": "Tiramisu (Porsiyon)",
      "fiyat": 95,
      "kategori": "Tatlılar",
      // YEREL YOL
      "resim": "resimler/tiramisu.jpg", 
      "aciklama": "Maskarpon peyniri ve özel kahve sosu ile.",
      "saticiMail": "satici2@mail.com" 
    },



    // ... mevcuttaki 24 ürün buranın üstünde olmalı

    // ===========================================
    //               YENİ EKLENEN 4 EL İŞİ ÜRÜN
    // ===========================================
    {
      "id": 25,
      "ad": "Örgü Bebek Hırkası",
      "fiyat": 280,
      "kategori": "El İşleri",
      // YEREL YOL
      "resim": "resimler/orguhirka.jpg", 
      "aciklama": "El emeği, antialerjik ipten örülmüş bebek hırkası.",
      "saticiMail": "satici3@mail.com" 
    },
    {
      "id": 26,
      "ad": "Makrome Duvar Dekoru",
      "fiyat": 190,
      "kategori": "El İşleri",
      // YEREL YOL
      "resim": "resimler/makrome.jpg", 
      "aciklama": "Bohem tarzı, pamuk ipten yapılmış duvar süsü.",
      "saticiMail": "satici4@mail.com" 
    },
    
    // ===========================================
    //               YENİ EKLENEN 4 ORGANİK ÜRÜN
    // ===========================================
    {
      "id": 29,
      "ad": "Ev Yapımı Nar Ekşisi (500ml)",
      "fiyat": 180,
      "kategori": "Organik",
      // YEREL YOL
      "resim": "resimler/organik_nareksisi.jpg", 
      "aciklama": "Tamamen doğal nar suyundan, katkısız ve geleneksel yöntemlerle yapılmıştır.",
      "saticiMail": "satici3@mail.com" 
    },
    {
      "id": 30,
      "ad": "Doğal Çiçek Balı (500g)",
      "fiyat": 220,
      "kategori": "Organik",
      // YEREL YOL
      "resim": "resimler/organik_bal.jpg", 
      "aciklama": "Yüksek rakımlı yaylalardan toplanmış çiçeklerden elde edilen doğal bal.",
      "saticiMail": "satici4@mail.com" 
    },
    {
      "id": 31,
      "ad": "Köy Yumurtası (15 Adet)",
      "fiyat": 85,
      "kategori": "Organik",
      // YEREL YOL
      "resim": "resimler/organik_yumurta.jpg", 
      "aciklama": "Serbest gezen tavuklardan taze toplanmış köy yumurtası.",
      "saticiMail": "satici1@mail.com"
    },
    
]; 



// =========================================================================================

// — LocalStorage boşsa ürünleri ekle — 
if (!localStorage.getItem(URUN_KEY)) {
    localStorage.setItem(URUN_KEY, JSON.stringify(hazirUrunler));
}

// NOT: Eski bozuk ürünleri LocalStorage'dan silmeyi unutmayın!
// Geliştirici araçları (F12) -> Application -> Local Storage -> eTicaretUrunler anahtarını silin.


// ========================== ÜRÜNLERİ GETİR ==========================
function tumUrunleriGetir() {
    let urunler = localStorage.getItem(URUN_KEY);
    return urunler ? JSON.parse(urunler) : [];
}

// ===================================
// ÜRÜN EKLEME (CREATE - Satıcı Paneli)
// ===================================
// ========================
// FIREBASE İLE ÜRÜN EKLEME
// ========================
// ===================================
// ÜRÜN EKLEME (Firebase ile)
// ===================================
async function urunEkle() {
    if (!satilanKullaniciMail) {
        alert("Hata: Aktif satıcı bulunamadı.");
        return;
    }

    const ad = document.getElementById("urun-ad").value.trim();
    const fiyat = parseFloat(document.getElementById("urun-fiyat").value);
    const fileInput = document.getElementById("urun-resim");
    const file = fileInput.files[0];

    if (!ad || isNaN(fiyat) || fiyat <= 0 || !file) {
        alert("Lütfen tüm alanları doğru doldurun.");
        return;
    }

    // 🔥 Resmi Firebase'e yükle
    let resimUrl = "";
    try {
        resimUrl = await uploadImage(file); 
    } catch (err) {
        alert("Resim yüklenirken hata oluştu!");
        console.error(err);
        return;
    }

    // 🔥 Ürünü oluştur
    const yeniUrun = {
        id: Date.now(),
        saticiMail: satilanKullaniciMail,
        ad: ad,
        fiyat: fiyat,
        resim: resimUrl,
        kategori: ad.toLowerCase().includes("yemek") ? "Ev Yemekleri" : "Diğer",
        aciklama: ""
    };

    // 🔥 Kaydet
    let urunler = tumUrunleriGetir();
    urunler.push(yeniUrun);
    localStorage.setItem(URUN_KEY, JSON.stringify(urunler));

    alert("Ürün başarıyla eklendi!");

    // 🔥 Formu temizle
    document.getElementById("urun-ad").value = "";
    document.getElementById("urun-fiyat").value = "";
    fileInput.value = "";

    urunleriListeleSatici();
}



// ===================================
// SATICININ ÜRÜNLERİNİ LİSTELEME (READ - Satıcı Paneli)
// ===================================
function urunleriListeleSatici() {
    if (!satilanKullaniciMail) return;

    const urunlerDiv = document.getElementById("satici-urunleri");
    if (!urunlerDiv) return; 

    urunlerDiv.innerHTML = ""; 

    const tumUrunler = tumUrunleriGetir();
    const saticininUrunleri = tumUrunler.filter(urun => urun.saticiMail === satilanKullaniciMail);

    if (saticininUrunleri.length === 0) {
        urunlerDiv.innerHTML = "<p style='text-align:center; margin-top:20px; font-style:italic;'>Henüz eklediğiniz bir ürün bulunmamaktadır.</p>";
        return;
    }

    saticininUrunleri.forEach(u => {
        const urunElementi = document.createElement("div");
        urunElementi.className = "urun";
        urunElementi.innerHTML = `
          <img src="${u.resim}" onclick="urunDetayAc(${u.id})" style="cursor:pointer;">
                ? u.resim 
                : 'https://via.placeholder.com/300x200?text=Görsel+Yok'}">
          <h3>${u.ad}</h3>
          <p>Fiyat: ${u.fiyat.toFixed(2)} ₺</p>
          <small>${u.kategori}</small><br>
          <button onclick="urunDuzenlePopup(${u.id})">Düzenle</button>
          <button onclick="urunSil(${u.id})" style="background-color: #c93d3d;">Sil</button>
        `;
        urunlerDiv.appendChild(urunElementi);
    });
}


// ========================== ÜRÜN DÜZENLEME POPUP ==========================
function urunDuzenlePopup(id) {
    let modal = document.getElementById("duzenleModal");
    let ic = document.getElementById("duzenleIcerik");

    let urun = tumUrunleriGetir().find(u => u.id === id);

    ic.innerHTML = `
        <span class="kapat" onclick="kapat('duzenleModal')">&times;</span>
        <h2>Ürünü Düzenle: ${urun.ad}</h2>

        <label>Ad:</label>
        <input id="dAd" value="${urun.ad}">

        <label>Fiyat:</label>
        <input id="dFiyat" type="number" value="${urun.fiyat}">

        <label>Resim:</label>
        <input id="dResim" value="${urun.resim}">

        <label>Kategori:</label>
        <input id="dKategori" value="${urun.kategori}">

        <label>Açıklama:</label>
        <textarea id="dAciklama">${urun.aciklama || ""}</textarea>

        <button onclick="urunGuncelle(${urun.id})">Kaydet</button>
    `;

    ac('duzenleModal'); 
}


// ========================== ÜRÜN GÜNCELLE ==========================
function urunGuncelle(id) {
    let urunler = tumUrunleriGetir();
    let index = urunler.findIndex(u => u.id === id);

    urunler[index].ad = document.getElementById("dAd").value;
    urunler[index].fiyat = Number(document.getElementById("dFiyat").value);
    urunler[index].resim = document.getElementById("dResim").value;
    urunler[index].kategori = document.getElementById("dKategori").value;
    urunler[index].aciklama = document.getElementById("dAciklama").value;

    localStorage.setItem(URUN_KEY, JSON.stringify(urunler));

    alert("Ürün güncellendi!");
    kapat("duzenleModal");
    urunleriListeleSatici();
    urunleriListele(); 
}


// ========================== ÜRÜN SİL ==========================
function urunSil(id) {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
        return;
    }
    let liste = tumUrunleriGetir();
    let yeni = liste.filter(u => u.id !== id);

    localStorage.setItem(URUN_KEY, JSON.stringify(yeni));
    alert("Ürün silindi!");
    urunleriListeleSatici();
    urunleriListele(); 
}


// ===================================
// TÜM ÜRÜNLERİ LİSTELEME (READ - Ana Sayfa)
// ===================================
function urunleriListele(filtreliUrunler = null) {
  const urunListesiDiv = document.getElementById("urun-listesi");
  if (!urunListesiDiv) return; 
  
  urunListesiDiv.innerHTML = ""; 

  const tumUrunler = filtreliUrunler || tumUrunleriGetir();

  if (tumUrunler.length === 0) {
    urunListesiDiv.innerHTML = "<p style='text-align:center; margin-top:20px; font-style:italic;'>Şu anda listelenecek ürün bulunmamaktadır.</p>";
    return;
  }

  tumUrunler.forEach(urun => {
    const urunElementi = document.createElement("div");
    urunElementi.className = "urun";
    urunElementi.innerHTML = `
      <img src="${urun.resim && urun.resim.trim() !== '' 
          ? urun.resim 
          : 'https://placehold.co/300x200?text=Görsel+Yok'}"
           alt="${urun.ad}" onclick="urunDetayAc(${urun.id})">
      <h3>${urun.ad}</h3>
      <p>Fiyat: **${urun.fiyat.toFixed(2)} ₺**</p>
      <button onclick="sepeteEkle(${urun.id})">Sepete Ekle</button>
    `;
    urunListesiDiv.appendChild(urunElementi);
  });
}

// ===================================
// ARAMA FONKSİYONU (Ana Sayfa)
// ===================================
function aramaYap() {
  const aramaMetni = document.getElementById("aramaInput").value.toLowerCase().trim();
  const tumUrunler = tumUrunleriGetir();

  const filtrelenmisUrunler = tumUrunler.filter(urun => 
    urun.ad.toLowerCase().includes(aramaMetni) || 
    (urun.saticiMail && urun.saticiMail.toLowerCase().includes(aramaMetni)) ||
    (urun.kategori && urun.kategori.toLowerCase().includes(aramaMetni))
  );

  urunleriListele(filtrelenmisUrunler);
}




// ========================== ÜRÜN DETAY MODALI ==========================
function urunDetayAc(id) {
    let urun = tumUrunleriGetir().find(u => u.id === id);

    let modal = document.getElementById("urunDetayModal");
    let ic = document.getElementById("urunDetayIcerik");

    ic.innerHTML = `
        <span class="kapat" onclick="kapat('urunDetayModal')">&times;</span>
        <img src="${urun.resim && urun.resim.trim() !== '' 
            ? urun.resim 
            : 'https://via.placeholder.com/600x400?text=Görsel+Yok'}"
            style="width:100%;height:200px;object-fit:cover;border-radius: 6px;">

        <h2>${urun.ad}</h2>
        <p style="font-size: 24px; color: #7a5c3c; font-weight: bold;">${urun.fiyat.toFixed(2)} ₺</p>
        <p>Satıcı: **${urun.saticiMail || "Bilinmiyor"}**</p>
        /* FORM GRUP DÜZENİ */
.form-grup {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-grup label {
    font-weight: 600;
    margin-bottom: 6px;
}

.form-grup input,
.form-grup textarea {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 15px;
    background: #fafafa;
}

.kaydetBtn {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 8px;
    background: #281600;
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

.kaydetBtn:hover {
    background: #3b2400;
}

.silBtn {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 8px;
}

        <p>${urun.aciklama || ""}</p>
    `;

    ac('urunDetayModal');
}


// ========================== SAYFA AÇILINCA ÇALIŞSIN ==========================




document.addEventListener("DOMContentLoaded", () => {
    const aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    // Eğer satıcı ana sayfadaysa → sadece kendi ürünlerini göster
    if (aktif && aktif.aktifRol === "satici" && document.getElementById("urun-listesi")) {
        
        const tumUrunler = tumUrunleriGetir();
        const kendiUrunlerim = tumUrunler.filter(u => u.saticiMail === aktif.saticiMail);

        urunleriListele(kendiUrunlerim);

        // Başlık değiştir
        const baslik = document.getElementById("urun-listesi-baslik");
        if (baslik) baslik.textContent = "Tüm Ürünleriniz";

        return;
    }

    // Normal alıcı veya giriş yapmamış kişi → tüm ürünleri görsün
    if (document.getElementById("urun-listesi")) {
        urunleriListele();
    }

    // Satıcı paneliyse kendi ürün listesini aç
    if (window.location.pathname.includes("satici.html")) {
        urunleriListeleSatici();
    }
});



// ===========================================
//          KATEGORİ FİLTRELEME FONKSİYONU
// ===========================================
function kategoriFiltre(kategoriAdi) {
    const aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    const tumUrunler = tumUrunleriGetir();
    let filtrelenmisUrunler = [];

    // Eğer giriş yapan SATICI ise:
    if (aktif && aktif.aktifRol === "satici") {

        // 1. Önce sadece bu satıcının ürünlerini al
        const kendiUrunlerim = tumUrunler.filter(u => u.saticiMail === aktif.saticiMail);

        // 2. "Hepsi" ise → kendi tüm ürünleri göster
        if (kategoriAdi === "Hepsi") {
            filtrelenmisUrunler = kendiUrunlerim;
        }
        // 3. Yoksa sadece kendi ürünleri arasında arama yap
        else {
            filtrelenmisUrunler = kendiUrunlerim.filter(u => u.kategori === kategoriAdi);
        }

        // 4. Listeyi güncelle
        urunleriListele(filtrelenmisUrunler);

        // 5. Başlığı değiştir
        const baslik = document.getElementById("urun-listesi-baslik");
        if (baslik) baslik.textContent = "Tüm Ürünleriniz";

        return; // en önemlisi → alıcı filtresine geçmesini engelliyor
    }

    // ALICI ise → normal filtreleme
    if (kategoriAdi === "Hepsi") {
        filtrelenmisUrunler = tumUrunler;
    } else {
        filtrelenmisUrunler = tumUrunler.filter(u => u.kategori === kategoriAdi);
    }

    urunleriListele(filtrelenmisUrunler);
}


// ========================================
//            ARAMA FONKSİYONU
// ========================================
function aramaYap() {

    const aramaMetni = document.getElementById("aramaInput").value
        .toLowerCase()
        .trim();

    const tumUrunler = tumUrunleriGetir();

    const kategoriDiv = document.querySelector(".kategoriler");
    const baslik2 = document.getElementById("urun-listesi-baslik");

    // Eğer arama boşsa → her şeyi geri getir
    if (aramaMetni === "") {
        kategoriDiv.style.display = "flex";
        baslik1.style.display = "block";
        baslik2.style.display = "block";
        urunleriListele(tumUrunler);
        return;
    }

    // Arama varsa → kategorileri ve başlıkları gizle
    kategoriDiv.style.display = "none";
    baslik2.style.display = "none";

    // Filtreleme
    const filtrelenmis = tumUrunler.filter(urun =>
        urun.ad.toLowerCase().includes(aramaMetni) ||
        urun.kategori.toLowerCase().includes(aramaMetni) ||
        (urun.aciklama && urun.aciklama.toLowerCase().includes(aramaMetni)) ||
        (urun.saticiMail && urun.saticiMail.toLowerCase().includes(aramaMetni))
    );

    urunleriListele(filtrelenmis);
}


// ========================================
//       ENTER TUŞU İLE ARAMA ÇALIŞSIN
// ========================================
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        aramaYap();
    }
});


function sepeteEkle(id) {

    // 1) Aktif kullanıcıyı al
    const aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    // 2) Alıcı değilse uyarı ver
    if (!aktif || aktif.rol !== "alici") {
        alert("Sepete eklemek için alıcı olarak giriş yapmanız gerekir.");
        return;
    }

    // 3) Sepeti al
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    // 4) Tüm ürünleri getir
    let tumUrunler = tumUrunleriGetir();

    // 5) Eklenecek ürünü bul
    let urun = tumUrunler.find(u => u.id === id);

    if (!urun) return;

    // 6) Sepete ekle
    sepet.push({
        id: urun.id,
        ad: urun.ad,
        fiyat: urun.fiyat
    });

    // 7) Kaydet
    localStorage.setItem("sepet", JSON.stringify(sepet));

    alert("Ürün sepete eklendi!");
}
