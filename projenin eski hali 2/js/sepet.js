// ========================================================
//                     SEPET SİSTEMİ
// ========================================================

// LocalStorage anahtarı
const SEPET_KEY = "eTicaretSepet"; 

// --------------------------------------------------------
// 1) SEPETİ GETİR (localStorage)
// --------------------------------------------------------
function sepetiGetir() {
    let sepet = localStorage.getItem(SEPET_KEY); 

    if (!sepet) return [];

    return JSON.parse(sepet);
}


// --------------------------------------------------------
// 2) SEPETE ÜRÜN EKLE
// --------------------------------------------------------
function sepeteEkle(id) {
    let urunler = tumUrunleriGetir(); 
    let urun = urunler.find(u => u.id === id);

    if (!urun) {
        alert("Ürün bulunamadı!");
        return;
    }
    
    let sepet = sepetiGetir();

    let varMi = sepet.find(s => s.id === id);

    if (varMi) {
        varMi.adet++;
    } else {
        sepet.push({
            id: urun.id,
            ad: urun.ad,
            fiyat: urun.fiyat,
            resim: urun.resim,
            adet: 1
        });
    }

    localStorage.setItem(SEPET_KEY, JSON.stringify(sepet));

    alert(`"${urun.ad}" sepete eklendi!`);
}


// --------------------------------------------------------
// 3) SEPET PANELİNİ AÇ
// --------------------------------------------------------
function sepetiAc() {
    let sepet = sepetiGetir();
    
    let modal = document.getElementById("sepetPanel");
    let icerik = document.getElementById("sepetIcerik");

    if (sepet.length === 0) {
        icerik.innerHTML = `
            <span class="kapat" onclick="kapat('sepetPanel')">&times;</span>
            <h2 style="color:#7a5c3c;">Sepet Boş 🧺</h2>
            <p>Hemen ürün eklemeye başlayın!</p>
        `;
        ac("sepetPanel"); 
        return;
    }

    let toplam = 0;

    let html = `
        <span class="kapat" onclick="kapat('sepetPanel')">&times;</span>
        <h2 style="color:#7a5c3c;">Sepetim</h2>
    `;

    sepet.forEach(urun => {
        toplam += urun.fiyat * urun.adet; 

        html += `
            <div style="border-bottom:1px solid #ddd; padding:8px 0; display:flex; gap:10px; align-items:center;">
                <img src="${urun.resim}" style="width:60px; height:60px; border-radius:5px; object-fit:cover;">
                
                <div style="flex:1;">
                    <strong style="color:#281600;">${urun.ad}</strong><br>
                    <span style="font-size:0.9em;">${urun.fiyat.toFixed(2)} ₺ x **${urun.adet}**</span>
                </div>

                <div style="display:flex; gap:5px;">
                    <button onclick="adetAzalt(${urun.id})" style="padding: 5px 10px; background:#efede7; border:1px solid #ccc; color:#281600;">-</button>
                    <button onclick="adetArtir(${urun.id})" style="padding: 5px 10px; background:#efede7; border:1px solid #ccc; color:#281600;">+</button>
                    <button onclick="sepetUrunSil(${urun.id})" style="padding: 5px 10px; background:#c93d3d; border:none; color:white;">🗑</button>
                </div>
            </div>
        `;
    });

    html += `
        <h3 style="margin-top:20px; color:#a16b3f;">Toplam: **${toplam.toFixed(2)} ₺**</h3>

        <!-- 🔥 BURASI DÜZELTİLDİ -->
        <button onclick="odemeSayfasinaGit()" 
            style="width: 100%; padding: 12px; background-color: #a16b3f; border: none; color: white; border-radius: 5px; margin-top: 10px; font-weight: 600;">
            Ödemeye Geç
        </button>

        <button onclick="sepetiBosalt()" 
            style="width: 100%; padding: 12px; background-color: #5d422a; border: none; color: white; border-radius: 5px; margin-top: 5px;">
            Sepeti Boşalt
        </button>
    `;

    icerik.innerHTML = html;

    ac("sepetPanel"); 
}


// --------------------------------------------------------
// 4) ADET ARTIR
// --------------------------------------------------------
function adetArtir(id) {
    let sepet = sepetiGetir();
    let urun = sepet.find(s => s.id === id);

    if (urun) {
        urun.adet++;
        localStorage.setItem(SEPET_KEY, JSON.stringify(sepet));
        sepetiAc();
    }
}


// --------------------------------------------------------
// 5) ADET AZALT
// --------------------------------------------------------
function adetAzalt(id) {
    let sepet = sepetiGetir();
    let urun = sepet.find(s => s.id === id);
    
    if (!urun) return;

    if (urun.adet > 1) {
        urun.adet--;
        localStorage.setItem(SEPET_KEY, JSON.stringify(sepet));
    }
    else {
        let yeniSepet = sepet.filter(s => s.id !== id);
        localStorage.setItem(SEPET_KEY, JSON.stringify(yeniSepet));
    }

    sepetiAc();
}


// --------------------------------------------------------
// 6) ÜRÜNÜ SEPETTEN SİL
// --------------------------------------------------------
function sepetUrunSil(id) {
    if (!confirm("Bu ürünü sepetten tamamen kaldırmak istediğinizden emin misiniz?")) {
        return;
    }
    
    let sepet = sepetiGetir();
    let yeniSepet = sepet.filter(s => s.id !== id);

    localStorage.setItem(SEPET_KEY, JSON.stringify(yeniSepet));

    sepetiAc();
}


// --------------------------------------------------------
// 7) SEPETİ BOŞALT
// --------------------------------------------------------
function sepetiBosalt() {
    if (!confirm("Sepetin tamamını boşaltmak istediğinizden emin misiniz?")) {
        return;
    }
    
    localStorage.removeItem(SEPET_KEY);
    sepetiAc();
}


// --------------------------------------------------------
// 8) ÖDEME SAYFASINA GİT (DÜZELTİLDİ)
// --------------------------------------------------------
function odemeSayfasinaGit() {

    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    // 🔥 Giriş yoksa ödeme sayfasına izin verme
    if (!aktif || aktif.aktifRol !== "alici") {
        alert("Ödeme yapabilmek için önce ALICI olarak giriş yapmalısınız!");
        kapat('sepetPanel');
        ac('girisModal');
        return;
    }

    let sepet = JSON.parse(localStorage.getItem("eTicaretSepet")) || [];

    if (sepet.length === 0) {
        alert("Sepetiniz boş, ödeme sayfasına gidilemiyor.");
        return;
    }

    window.location.href = "odeme.html";
}

