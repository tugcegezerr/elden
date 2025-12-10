console.log("SATICI.JS YÜKLENDİ");

// -------------------------------
// POPUP AÇMA
// -------------------------------
function popupAc(tur) {

    // Arka plan ve kutuyu görünür yap
    document.getElementById("popupArka").style.display = "flex";
    document.getElementById("popupKutu").style.display = "block";

    const icerik = document.getElementById("popupIcerik");

    // İçeriği her açışta sıfırla
    icerik.innerHTML = "";

    // -------------------------
    // ÜRÜN EKLE POPUP
    // -------------------------
    if (tur === "urunEkle") {
        icerik.innerHTML = `
            <h2>Ürün Ekle</h2>
            <input id="urunAd" type="text" placeholder="Ürün Adı">
            <input id="urunFiyat" type="number" placeholder="Fiyat (₺)">
            <input id="urunResim" type="file" accept="image/*">
            <button onclick="urunEkle()">Ekle</button>
        `;
    }

    // -------------------------
    // BİLDİRİMLER POPUP
    // -------------------------
    else if (tur === "bildirimler") {
        let bildirim = localStorage.getItem("saticiBildirim") || "Bildirim bulunmuyor.";
        icerik.innerHTML = `
            <h2>Bildirimler</h2>
            <p>${bildirim}</p>
        `;
    }

    // -------------------------
    // PROFİL POPUP
    // -------------------------
    else if (tur === "profil") {
        let aktif = JSON.parse(localStorage.getItem("aktifKullanici")) || {};

        icerik.innerHTML = `
            <h2>Profilim</h2>

            <label>Ad Soyad</label>
            <input id="pAdSoyad" type="text" value="${aktif.adSoyad || ""}">

            <label>E-posta</label>
            <input id="pMail" type="text" value="${aktif.mail || ""}" disabled>

            <label>Telefon</label>
            <input id="pTel" type="text" value="${aktif.tel || ""}">

            <label>Şifre</label>
            <input id="pSifre" type="password" value="${aktif.sifre || ""}">

            <button onclick="profilKaydet()">Kaydet</button>
        `;
    }
}

// -------------------------------
// POPUP KAPATMA
// -------------------------------
function popupKapat() {
    document.getElementById("popupArka").style.display = "none";
    document.getElementById("popupKutu").style.display = "none";
    document.getElementById("popupIcerik").innerHTML = "";
}

// -------------------------------
// PROFİL KAYDETME
// -------------------------------
function profilKaydet() {
    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    aktif.adSoyad = document.getElementById("pAdSoyad").value;
    aktif.tel = document.getElementById("pTel").value;
    aktif.sifre = document.getElementById("pSifre").value;

    localStorage.setItem("aktifKullanici", JSON.stringify(aktif));

    alert("Profil güncellendi!");
    popupKapat();
}

// -------------------------------
// ÇIKIŞ
// -------------------------------
function cikisYap() {
    localStorage.removeItem("aktifKullanici");
    window.location.href = "index.html";
}

// -------------------------------
// ÜRÜNLERİ LİSTELE (SATICI)
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    let tum = tumUrunleriGetir();

    let kendi = tum.filter(u => u.saticiMail === aktif.mail);
    urunleriListele(kendi);
});
