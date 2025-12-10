// Sepeti al
function sepetiGetir() {
  return JSON.parse(localStorage.getItem("sepet")) || [];
}

// Sayfada ürünleri listele
function urunleriYazdir() {
  const listeDiv = document.getElementById("urunListesi");
  const sepet = sepetiGetir();

  if (sepet.length === 0) {
    listeDiv.innerHTML = "<p>Sepetiniz boş.</p>";
    return;
  }

  let html = "";
  let toplam = 0;

  sepet.forEach(u => {
    toplam += u.fiyat;

    html += `
      <div class="urun">
        <span>${u.ad}</span>
        <span>${u.fiyat}₺</span>
      </div>
    `;
  });

  html += `<div class="urun" style="font-weight:700;">
    <span>Toplam</span>
    <span>${toplam}₺</span>
  </div>`;

  listeDiv.innerHTML = html;
}

urunleriYazdir();

// Siparişi kaydet
function siparisiOnayla() {
  const adSoyad = document.getElementById("adSoyad").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const adres = document.getElementById("adres").value.trim();

  if (!adSoyad || !telefon || !adres) {
    alert("Lütfen tüm bilgileri doldurunuz.");
    return;
  }

  const sepet = sepetiGetir();

  if (sepet.length === 0) {
    alert("Sepetiniz boş!");
    return;
  }

  const siparis = {
    id: Date.now(),
    musteri: adSoyad,
    telefon,
    adres,
    urunler: sepet,
    tarih: new Date().toLocaleString()
  };

  // Siparişi kaydet
  let siparisler = JSON.parse(localStorage.getItem("siparisler")) || [];
  siparisler.push(siparis);
  localStorage.setItem("siparisler", JSON.stringify(siparisler));

  // Sepeti sıfırla
  localStorage.removeItem("sepet");

  alert("Sipariş başarıyla oluşturuldu!");
  window.location.href = "index.html";
}
