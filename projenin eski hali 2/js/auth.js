/* ==========================================================
     HEADER OTOMATİK OLUŞTUR (Misafir / Alıcı / Satıcı)
========================================================== */

function headerOlustur() {
    const menu = document.getElementById("menuArea");
    if (!menu) return;

    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    /* ---------- GİRİŞ YAPILMAMIŞ KULLANICI ---------- */
    if (!aktif) {
        menu.innerHTML = `
            <a onclick="ac('girisModal')">Giriş Yap</a>
            <a onclick="ac('uyeModal')">Üye Ol</a>
            <a onclick="sepetiAc()">Sepet</a>
        `;
        return;
    }

    /* ---------- SATICI GİRİŞİ ---------- */
    if (aktif.rol === "satici") {

    menu.innerHTML = `
        <a href="satici_anasayfa.html">Anasayfa</a>
        <a href="satici.html">Ürün Ekle</a>
        <a href="bildirimler.html">Bildirimler</a>
        <a href="profil.html">Profil</a>
        <a onclick="cikisYap()">Çıkış Yap</a>
    `;

    // Yönlendirme en sona alındı
    if (!location.href.includes("satici_")) {
        window.location.href = "satici_anasayfa.html";
    }

    return;
    }

    /* ---------- ALICI GİRİŞİ ---------- */
    if (
        aktif.rol === "alici" ||
        aktif.rol === "ALICI" ||
        aktif.aktifRol === "alici" ||
        aktif.aktifRol === "ALICI"
    ) {

        menu.innerHTML = `
            <a onclick="ac('popupBildirimler')">Bildirimler</a>
            <a onclick="acProfil()">Profil</a>
            <a onclick="acSepet()">Sepet</a>
            <a onclick="cikisYap()">Çıkış Yap</a>
    `;
}

}

headerOlustur();

function acProfil() {
    const aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    if (!aktif) return;

    document.getElementById("pAd").value = aktif.ad || "";
    document.getElementById("pTel").value = aktif.tel || "";
    document.getElementById("pMail").value = aktif.mail || "";
    
    ac("popupProfil");
}

function profilKaydet() {
    const aktif = JSON.parse(localStorage.getItem("aktifKullanici"));

    aktif.ad = document.getElementById("pAd").value;
    aktif.tel = document.getElementById("pTel").value;

    localStorage.setItem("aktifKullanici", JSON.stringify(aktif));

    alert("Profil güncellendi!");
    kapat("popupProfil");
}


function acSepet() {
    const sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    let alan = document.getElementById("sepetIcerik");

    if (!alan) {
        console.log("popupSepet bulunamadı!");
        return;
    }

    if (sepet.length === 0) {
        alan.innerHTML = `<p style="text-align:center;opacity:0.7;">Sepetiniz boş.</p>`;
    } else {
        alan.innerHTML = "";

        sepet.forEach(item => {
            alan.innerHTML += `
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:15px;border-bottom:1px solid #ddd;padding-bottom:10px;">
                    <img src="${item.resim}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
                    <div>
                        <strong>${item.ad}</strong><br>
                        <span>${item.fiyat} ₺</span>
                    </div>
                </div>
            `;
        });
    }

    ac("popupSepet");
}

    




/* ==========================================================
                         ÇIKIŞ
========================================================== */

function cikisYap() {
    localStorage.removeItem("aktifKullanici");
    window.location.href = "index.html";
}



/* ==========================================================
                         GİRİŞ
========================================================== */

function girisYap() {
    let mail = girisMail.value.trim();
    let sifre = girisSifre.value.trim();

    let kullanici = JSON.parse(localStorage.getItem(mail));

    if (!kullanici || kullanici.sifre !== sifre) {
        alert("E-posta veya şifre yanlış");
        return;
    }

    document.getElementById("girisRolSecim").style.display = "block";
}

function rolIleGiris(rol) {

    let mail = girisMail.value.trim();

    localStorage.setItem("aktifKullanici", JSON.stringify({
        mail: mail,
        rol: rol
    }));

    if (rol === "satici") {
        window.location.href = "satici_anasayfa.html";
    } else {
        location.reload();
    }
}



/* ==========================================================
                         ÜYE OL
========================================================== */

function uyeOl() {
    let ad = uyeAdSoyad.value.trim();
    let tel = uyeTel.value.trim();
    let mail = uyeMail.value.trim();
    let sifre = uyeSifre.value.trim();
    let rol = uyeRol.value;

    if (!ad || !tel || !mail || !sifre) {
        alert("Lütfen tüm alanları doldurun");
        return;
    }

    localStorage.setItem(mail, JSON.stringify({
        ad, tel, mail, sifre, rol
    }));

    alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    kapat("uyeModal");
}


function sepettenSil(i) {
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    sepet.splice(i, 1);
    localStorage.setItem("sepet", JSON.stringify(sepet));
    acSepet(); // popupı güncelle
}


function odemeyiTamamla() {
    let ad = document.getElementById("odemeAd").value;
    let kart = document.getElementById("odemeKart").value;
    let cvc = document.getElementById("odemeCVC").value;

    if (!ad || !kart || !cvc) {
        alert("Lütfen tüm bilgileri doldurun.");
        return;
    }

    alert("Ödeme başarılı! Siparişiniz alınmıştır.");
    localStorage.removeItem("sepet");

    kapat("odemeModal");
    kapat("popupSepet");
}


