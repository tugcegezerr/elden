// ===============================
//    SATICI BİLDİRİM SİSTEMİ
// ===============================

// Bildirim anahtarı
function bildirimKey(mail) {
    return "saticiBildirim_" + mail;
}

// BİLDİRİM SAYISINI HESAPLA
function bildirimSayisiniGetir() {
    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    if (!aktif) return 0;

    let kayit = JSON.parse(localStorage.getItem(bildirimKey(aktif.mail))) || [];
    let okunmamis = kayit.filter(b => !b.okundu);

    return okunmamis.length;
}

// PANELDE BİLDİRİM SAYACINI GÜNCELLE
function bildirimGoster() {
    let sayi = bildirimSayisiniGetir();

    let el = document.getElementById("bildirimSayi");
    if (!el) return;

    if (sayi > 0) {
        el.style.display = "inline-block";
        el.innerText = sayi;
    } else {
        el.style.display = "none";
    }
}

// SATICI BİLDİRİMLERİNİ GETİR
function bildirimleriGetir() {
    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    if (!aktif) return [];

    return JSON.parse(localStorage.getItem(bildirimKey(aktif.mail))) || [];
}

// OKUNDU OLARAK İŞARETLE
function bildirimleriOkunduYap() {
    let aktif = JSON.parse(localStorage.getItem("aktifKullanici"));
    if (!aktif) return;

    let liste = bildirimleriGetir();

    liste.forEach(b => b.okundu = true);

    localStorage.setItem(bildirimKey(aktif.mail), JSON.stringify(liste));
}
