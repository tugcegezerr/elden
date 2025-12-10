// =======================
// Firebase Başlatma
// =======================
const firebaseConfig = {
    apiKey: "AIzaSyBvVU40nDmUNC12CKYROOUORcIUBiTQcZ8",
    authDomain: "el-den.firebaseapp.com",
    projectId: "el-den",
    storageBucket: "el-den.appspot.com",
    messagingSenderId: "514266022612",
    appId: "1:514266022612:web:56dd24202281c564cc3141",
    measurementId: "G-KGHY7E7YL7"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);

// Storage referansı
const storage = firebase.storage();


// =======================
// RESİM YÜKLEME FONKSİYONU
// =======================
async function uploadImage(file) {
    return new Promise((resolve, reject) => {

        // Dosya ismi
        const fileName = Date.now() + "_" + file.name;

        // Firebase içindeki klasör
        const storageRef = storage.ref("urunResimleri/" + fileName);

        // Upload işlemi
        const uploadTask = storageRef.put(file);

        // Upload durumu
        uploadTask.on(
            "state_changed",
            null, // progress takibi gerekmez
            (error) => reject(error),
            async () => {
                // Yüklenen resmin URL'sini al
                const url = await uploadTask.snapshot.ref.getDownloadURL();
                resolve(url);
            }
        );
    });
}
