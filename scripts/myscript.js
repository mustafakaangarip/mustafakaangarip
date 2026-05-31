// --- FONKSİYON VE BAŞLANGIÇ ---
// Sayfa yüklendiğinde çalışacak ana olaylar
window.onload = function() {
    if (document.title.includes("Ana Sayfa")) {
        setTimeout(bedenVeIndirimBulucu, 2000); 
    }
    sepetiYukle(); // Sayfa yüklendiğinde sepeti hesaplar ve ekrana basar
};

function bedenVeIndirimBulucu() {
    // 1. CONFIRM KULLANIMI: Kullanıcıya soru sorup True/False (Evet/Hayır) yanıtı alırız
    let onay = confirm("Ölçülerinize uygun takım elbise bedenini öğrenmek ve bugüne özel hediye kazanmak ister misiniz?");
    
    // Eğer kullanıcı 'Tamam'a tıklarsa (onay == true) işlemler başlar
    if (onay) {
        // DEĞİŞKENLER
        let boy, kilo;
        
        // 2. DO-WHILE DÖNGÜSÜ VE PROMPT KULLANIMI
        // Kullanıcı geçerli bir sayı girene kadar (boş veya harf girmesini engellemek için) tekrar tekrar sorar
        do {
            boy = prompt("Lütfen boyunuzu santimetre cinsinden giriniz (Örn: 180):");
        } while (isNaN(boy) || boy <= 0 || boy == null);
        
        do {
            kilo = prompt("Lütfen kilonuzu kilogram cinsinden giriniz (Örn: 75):");
        } while (isNaN(kilo) || kilo <= 0 || kilo == null);

        // Girilen metinleri matematiksel işlem yapabilmek için Sayıya (Number) çeviriyoruz
        boy = Number(boy);
        kilo = Number(kilo);

        // 3. MATEMATİKSEL FONKSİYONLAR (Math.pow ve Math.round)
        // Vücut Kitle İndeksi (VKİ) = Kilo / (Boy uzunluğunun karesi)
        let boyMetre = boy / 100;
        let vki = kilo / Math.pow(boyMetre, 2); // Math.pow karesini alır
        vki = Math.round(vki * 10) / 10; // Math.round yuvarlama yapar (örn: 24.56 -> 24.6)

        let onerilenBeden = "";

        // 4. IF-ELSE KULLANIMI
        // VKİ değerine göre kalıp/beden tahmini yapıyoruz
        if (vki < 18.5) {
            onerilenBeden = "Drop 6 - Ekstra Slim Fit (Örn: 46/48 Beden)";
        } else if (vki >= 18.5 && vki <= 24.9) {
            onerilenBeden = "Drop 4 - Slim Fit (Örn: 50/52 Beden)";
        } else if (vki >= 25 && vki <= 29.9) {
            onerilenBeden = "Drop 2 - Regular Fit (Örn: 54/56 Beden)";
        } else {
            onerilenBeden = "Drop 0 - Comfort/Klasik Kesim (Örn: 58+ Beden)";
        }

        // 5. DATE (TARİH) VE SWITCH-CASE KULLANIMI
        // Date nesnesi ile bugünün hangi gün olduğunu alıyoruz (0: Pazar, 1: Pazartesi ... 6: Cumartesi)
        let bugun = new Date().getDay(); 
        let gununHediyesi = "";

        switch (bugun) {
            case 1: // Pazartesi
            case 2: // Salı
            case 3: // Çarşamba
            case 4: // Perşembe
                gununHediyesi = "Hafta içi şıklığı için %10 İndirim Kodu: HAFTAICI10";
                break;
            case 5: // Cuma
                gununHediyesi = "Cuma'ya özel, sepetinize ücretsiz ipek kravat eklendi!";
                break;
            case 6: // Cumartesi
            case 0: // Pazar
                gununHediyesi = "Hafta sonu alışverişlerinize özel kargo bedava!";
                break;
            default:
                gununHediyesi = "Sürpriz hediye sepetinizde!";
        }

        // 6. DİZİLER (Arrays) VE FOR DÖNGÜSÜ KULLANIMI
        // Takım elbiseyi tamamlayacak aksesuar listesi (Dizi)
        let stilOnerileri = ["İnce Desenli Mendil", "Deri Kemer", "Klasik Kol Saati"];
        let onerilerMetni = "";
        
        // For döngüsü ile dizinin içindeki elemanları tek tek alıp alt alta ekliyoruz
        for (let i = 0; i < stilOnerileri.length; i++) {
            onerilerMetni += "- " + stilOnerileri[i] + "\n";
        }

        // 7. OBJELER (Objects) KULLANIMI
        // Elde ettiğimiz tüm müşteri verilerini düzenli bir obje içinde topluyoruz
        let musteriProfili = {
            vkiDegeri: vki,
            beden: onerilenBeden,
            hediye: gununHediyesi
        };

        // 8. EKRANA YAZDIRMA (Alert)
        // Objeden ve döngüden gelen verileri kullanıcıya gösteriyoruz
        alert("Vücut Kitle İndeksiniz: " + musteriProfili.vkiDegeri + "\n\n" +
              "Size En Uygun Kalıp: " + musteriProfili.beden + "\n\n" +
              "Günün Sürprizi: " + musteriProfili.hediye + "\n\n" +
              "Takım Elbisenizi Tamamlayacak Aksesuar Önerileri:\n" + onerilerMetni);
    }
}

// --- DİNAMİK SEPET İŞLEMLERİ ---

// 1. Ürünü Sepete Ekleme Fonksiyonu
function sepeteEkle(urunIsmi, urunFiyati) {
    // Derste işlenen Objeler (Objects) konusu
    let yeniUrun = {
        ad: urunIsmi,
        fiyat: urunFiyati
    };

    // Tarayıcı hafızasındaki (localStorage) sepeti çekiyoruz. Yoksa boş Dizi [] oluşturuyoruz.
    let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
    
    // Yeni ürünü diziye ekle ve tekrar hafızaya kaydet
    sepet.push(yeniUrun);
    localStorage.setItem('atakMensSepet', JSON.stringify(sepet));
    
    alert(urunIsmi + " başarıyla sepete eklendi!");
    // İşlem bitince kullanıcıyı sepet sayfasına yönlendir
    window.location.href = "urunler.html";
}

// 2. Sepet Yüklendiğinde Ürünleri ve Fiyatları Ekrana Basma Fonksiyonu
function sepetiYukle() {
    let sepetIcerigiAlani = document.getElementById('sepet-icerigi');
    
    // Eğer sepet sayfasında değilsek bu fonksiyon çalışıp hata vermesin diye durduruyoruz
    if (!sepetIcerigiAlani) return;

    let araToplamAlani = document.getElementById('ara-toplam');
    let genelToplamAlani = document.getElementById('genel-toplam');
    
    let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
    
    if (sepet.length === 0) {
        sepetIcerigiAlani.innerHTML = '<p style="text-align: center; color: #666;">Sepetiniz şu an boş.</p>';
        araToplamAlani.innerText = "Ara Toplam: ₺0";
        genelToplamAlani.innerText = "Genel Toplam: ₺0";
        return;
    }

    // Sepet doluysa HTML alanını temizle ve ürünleri yazmaya başla
    sepetIcerigiAlani.innerHTML = "";
    let toplamTutar = 0;

    // Derste işlenen For Döngüsü ve Diziler konusu
    for (let i = 0; i < sepet.length; i++) {
        let urun = sepet[i];
        toplamTutar += urun.fiyat; // Fiyatları üst üste topla
        
        // HTML ürün kartını dinamik olarak basıyoruz
        sepetIcerigiAlani.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3>${urun.ad}</h3>
                </div>
                <div class="cart-item-price">₺${urun.fiyat}</div>
                <button class="remove-btn" onclick="urunuSilDinamik(${i})">Sil</button>
            </div>
        `;
    }
    
    // Toplam tutarları HTML'e yazdır
    araToplamAlani.innerText = "Ara Toplam: ₺" + toplamTutar;
    genelToplamAlani.innerText = "Genel Toplam: ₺" + toplamTutar;
}

// 3. Sepetten Ürün Silme Fonksiyonu
function urunuSilDinamik(index) {
    let silmeOnayi = confirm("Bu ürünü sepetten çıkarmak istediğinize emin misiniz?");
    
    if (silmeOnayi) {
        let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
        // Derste işlenen 'splice' ile diziden o sıradaki ürünü sil
        sepet.splice(index, 1);
        // Güncel diziyi hafızaya kaydet
        localStorage.setItem('atakMensSepet', JSON.stringify(sepet));
        // Sepeti ekranda yenile (Fiyatlar otomatik tekrar hesaplanır)
        sepetiYukle();
    }
}

// 4. Alışverişi Tamamlama Fonksiyonu
function alisverisiTamamla() {
    let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
    
    if (sepet.length === 0) {
        alert("Sepetiniz boş. Lütfen önce ürün ekleyin!");
        return;
    }

    let siparisOnay = confirm("Siparişinizi onaylıyor musunuz?");
    
    if (siparisOnay) {
        let bugun = new Date();
        bugun.setDate(bugun.getDate() + 3); // Teslimat için 3 gün ekle
        let teslimatTarihi = bugun.toLocaleDateString('tr-TR');
        
        alert("Teşekkür ederiz! Siparişiniz başarıyla alındı.\nTahmini Teslimat Tarihiniz: " + teslimatTarihi);
        
        // Sipariş verildiği için hafızadaki sepeti tamamen boşalt
        localStorage.removeItem('atakMensSepet');
        sepetiYukle(); // Ekrana 0 TL ve boş sepet yazısını getir
    }
}