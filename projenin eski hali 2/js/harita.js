// ========================================================
//                HARİTA – SATICI KONUM SİSTEMİ
// ========================================================

// Satıcı listesini ürünler.js içindeki global değişkenden alıyoruz
console.log("Satıcı listesi:", saticilar);

let map;

// --------------------------------------------------------
//               SAYFA AÇILINCA HARİTA OLUŞTUR
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    map = L.map('harita').setView([39.9208, 32.8541], 13);

    // OpenStreetMap arka planı
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
    }).addTo(map);
});

// --------------------------------------------------------
//               KULLANICI KONUMUNU AL
// --------------------------------------------------------
function konumAl() {

    if (!navigator.geolocation) {
        alert("Tarayıcınız konum hizmetini desteklemiyor.");
        return;
    }

    navigator.geolocation.getCurrentPosition((konum) => {

        let userLat = konum.coords.latitude;
        let userLng = konum.coords.longitude;

        console.log("Kullanıcı konumu:", userLat, userLng);

        // Kullanıcı konumuna odaklan
        map.setView([userLat, userLng], 15);

        // Harita üzerindeki tüm markerları temizle
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Kullanıcı marker
        L.marker([userLat, userLng]).addTo(map)
            .bindPopup("Sizin Konumunuz")
            .openPopup();

        // Yakındaki satıcıları bul
        haritadaSaticilariGoster(userLat, userLng);

    }, (hata) => {
        alert("Konum alınamadı: " + hata.message);
    });
}

// --------------------------------------------------------
//         SATICILARI HARİTAYA YERLEŞTİR
// --------------------------------------------------------
function haritadaSaticilariGoster(userLat, userLng) {

    console.log("Yakın satıcılar hesaplanıyor...");

    // Yakınlık filtresi — 0.05 ≈ 3–4 km yarıçap
    let yakinSaticilar = saticilar.filter(s => {
        let fark = Math.sqrt(
            Math.pow(s.lat - userLat, 2) +
            Math.pow(s.lng - userLng, 2)
        );
        return fark < 0.05;
    });

    console.log("Bulunan satıcılar:", yakinSaticilar);

    if (yakinSaticilar.length === 0) {
        alert("Yakınınızda satıcı bulunamadı.");
        return;
    }

    // Her bir satıcıyı haritaya marker olarak ekle
    yakinSaticilar.forEach(s => {
        L.marker([s.lat, s.lng])
            .addTo(map)
            .bindPopup(
                `<b>${s.ad}</b><br>${s.mail}`
            );
    });
}
