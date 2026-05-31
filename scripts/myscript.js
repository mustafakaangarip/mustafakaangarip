window.onload = function() {
    if (document.title.includes("Ana Sayfa")) {
        setTimeout(bedenVeIndirimBulucu, 2000); 
    }
    sepetiYukle();
};

function bedenVeIndirimBulucu() {
    let onay = confirm("Ölçülerinize uygun takım elbise bedenini öğrenmek ve bugüne özel hediye kazanmak ister misiniz?");
    
    if (onay) {
        // DEĞİŞKENLER
        let boy, kilo;
        
        do {
            boy = prompt("Lütfen boyunuzu santimetre cinsinden giriniz (Örn: 180):");
        } while (isNaN(boy) || boy <= 0 || boy == null);
        
        do {
            kilo = prompt("Lütfen kilonuzu kilogram cinsinden giriniz (Örn: 75):");
        } while (isNaN(kilo) || kilo <= 0 || kilo == null);

        boy = Number(boy);
        kilo = Number(kilo);

        let boyMetre = boy / 100;
        let vki = kilo / Math.pow(boyMetre, 2); 
        vki = Math.round(vki * 10) / 10; 

        let onerilenBeden = "";

        if (vki < 18.5) {
            onerilenBeden = "Drop 6 - Ekstra Slim Fit (Örn: 46/48 Beden)";
        } else if (vki >= 18.5 && vki <= 24.9) {
            onerilenBeden = "Drop 4 - Slim Fit (Örn: 50/52 Beden)";
        } else if (vki >= 25 && vki <= 29.9) {
            onerilenBeden = "Drop 2 - Regular Fit (Örn: 54/56 Beden)";
        } else {
            onerilenBeden = "Drop 0 - Comfort/Klasik Kesim (Örn: 58+ Beden)";
        }

        let bugun = new Date().getDay(); 
        let gununHediyesi = "";

        switch (bugun) {
            case 1:
            case 2:
            case 3:
            case 4: 
                gununHediyesi = "Hafta içi şıklığı için %10 İndirim Kodu: HAFTAICI10";
                break;
            case 5:
                gununHediyesi = "Cuma'ya özel, sepetinize ücretsiz ipek kravat eklendi!";
                break;
            case 6:
            case 0: 
                gununHediyesi = "Hafta sonu alışverişlerinize özel kargo bedava!";
                break;
            default:
                gununHediyesi = "Sürpriz hediye sepetinizde!";
        }

        let stilOnerileri = ["İnce Desenli Mendil", "Deri Kemer", "Klasik Kol Saati"];
        let onerilerMetni = "";
  
        for (let i = 0; i < stilOnerileri.length; i++) {
            onerilerMetni += "- " + stilOnerileri[i] + "\n";
        }

        let musteriProfili = {
            vkiDegeri: vki,
            beden: onerilenBeden,
            hediye: gununHediyesi
        };

        alert("Vücut Kitle İndeksiniz: " + musteriProfili.vkiDegeri + "\n\n" +
              "Size En Uygun Kalıp: " + musteriProfili.beden + "\n\n" +
              "Günün Sürprizi: " + musteriProfili.hediye + "\n\n" +
              "Takım Elbisenizi Tamamlayacak Aksesuar Önerileri:\n" + onerilerMetni);
    }
}

function sepeteEkle(urunIsmi, urunFiyati) {
    let yeniUrun = {
        ad: urunIsmi,
        fiyat: urunFiyati
    };

    let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
    
    sepet.push(yeniUrun);
    localStorage.setItem('atakMensSepet', JSON.stringify(sepet));
    
    alert(urunIsmi + " başarıyla sepete eklendi!");
    window.location.href = "urunler.html";
}

function sepetiYukle() {
    let sepetIcerigiAlani = document.getElementById('sepet-icerigi');
    
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

    sepetIcerigiAlani.innerHTML = "";
    let toplamTutar = 0;

    for (let i = 0; i < sepet.length; i++) {
        let urun = sepet[i];
        toplamTutar += urun.fiyat;
        
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
    
    araToplamAlani.innerText = "Ara Toplam: ₺" + toplamTutar;
    genelToplamAlani.innerText = "Genel Toplam: ₺" + toplamTutar;
}

function urunuSilDinamik(index) {
    let silmeOnayi = confirm("Bu ürünü sepetten çıkarmak istediğinize emin misiniz?");
    
    if (silmeOnayi) {
        let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
        sepet.splice(index, 1);
        localStorage.setItem('atakMensSepet', JSON.stringify(sepet));
        sepetiYukle();
    }
}

function alisverisiTamamla() {
    let sepet = JSON.parse(localStorage.getItem('atakMensSepet')) || [];
    
    if (sepet.length === 0) {
        alert("Sepetiniz boş. Lütfen önce ürün ekleyin!");
        return;
    }

    let siparisOnay = confirm("Siparişinizi onaylıyor musunuz?");
    
    if (siparisOnay) {
        let bugun = new Date();
        bugun.setDate(bugun.getDate() + 3);
        let teslimatTarihi = bugun.toLocaleDateString('tr-TR');
        
        alert("Teşekkür ederiz! Siparişiniz başarıyla alındı.\nTahmini Teslimat Tarihiniz: " + teslimatTarihi);
        
        localStorage.removeItem('atakMensSepet');
        sepetiYukle();
    }
}