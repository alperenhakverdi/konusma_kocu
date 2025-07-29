/**
 * speechDataset.js
 * Konuşma analizi için örnek dataset
 */

const speechDataset = {
  // Kötü konuşma örnekleri
  kotU_ornekler: [
    {
      metin: "Eee şey yani bugün eee sizlere bir şey anlatacağım yani eee",
      analiz: "Çok fazla dolgu kelime, akıcılık sorunu",
      skor: 25,
      oneriler: ["Dolgu kelimeleri azaltın", "Duraklamalarınızı planlayın", "Cümle başlarını hazırlayın"]
    },
    {
      metin: "Bu proje çok iyi bir proje bu proje gerçekten çok iyi çok beğendim bu projeyi",
      analiz: "Kelime tekrarı fazla, monoton anlatım",
      skor: 35,
      oneriler: ["Kelime çeşitliliğini artırın", "Eş anlamlı kelimeler kullanın", "Cümle yapısını değiştirin"]
    },
    {
      metin: "yapay zeka çok önemli yapay zeka gelecek yapay zeka her yerde",
      analiz: "Aşırı tekrar, bağlaç eksikliği",
      skor: 30,
      oneriler: ["Bağlaç kullanın", "Cümleleri birleştirin", "Akış oluşturun"]
    }
  ],

  // Orta seviye örnekler
  orta_ornekler: [
    {
      metin: "Bugün sizlere yapay zeka projesini anlatacağım. Bu proje konuşma analizi yapıyor ve öneriler veriyor.",
      analiz: "Düzenli yapı ama duygusal bağ zayıf",
      skor: 65,
      oneriler: ["Daha etkileyici giriş yapın", "Dinleyiciyle göz teması kurun", "Örnekler verin"]
    },
    {
      metin: "Merhaba arkadaşlar. Bu sunumda üç ana konuyu ele alacağım. İlki teknoloji, ikincisi eğitim, üçüncüsü gelecek.",
      analiz: "Yapılandırılmış ama monoton",
      skor: 70,
      oneriler: ["Ses tonunu değiştirin", "Vurgu yapın", "Heyecan katın"]
    }
  ],

  // İyi konuşma örnekleri
  iyi_ornekler: [
    {
      metin: "Değerli dinleyiciler, bugün sizlerle hayatımızı değiştirecek bir teknolojiyi paylaşmak istiyorum. Yapay zeka, sadece bir araç değil, geleceğimizin mimarı.",
      analiz: "Etkileyici giriş, güçlü kelimeler, akıcı geçişler",
      skor: 85,
      oneriler: ["Bu seviyeyi koruyun", "Örnekleri artırın", "İnteraktif elementler ekleyin"]
    },
    {
      metin: "Hayal edin, konuşmanızı anlık olarak analiz eden bir sistem. İşte bugün size tam da bunu sunuyorum. TalkSense AI ile konuşma becerilerinizi bir üst seviyeye taşıyabilirsiniz.",
      analiz: "Mükemmel hikaye anlatımı, dinleyici odaklı, ikna edici",
      skor: 95,
      oneriler: ["Bu kaliteyi sürdürün", "Başarı hikayesi ekleyin", "Call-to-action güçlendirin"]
    }
  ],

  // Profesyonel sunum örnekleri
  profesyonel_ornekler: [
    {
      metin: "Sayın yönetim kurulu üyeleri, Q4 sonuçlarımızı sunmaktan mutluluk duyuyorum. Hedeflerimizi %120 aştık ve pazar payımızı %15 artırdık.",
      analiz: "Profesyonel ton, net veriler, otoriteyi yansıtan",
      skor: 88,
      kategori: "İş sunumu"
    },
    {
      metin: "Sevgili öğrenciler, bugün öğreneceğiniz konular gelecekteki kariyerinizin temelini oluşturacak. Dikkatinizi vererek bu yolculuğa başlayalım.",
      analiz: "Eğitici ton, motive edici, kapsayıcı",
      skor: 82,
      kategori: "Eğitim sunumu"
    }
  ],

  // Duygusal analiz örnekleri
  duygusal_ornekler: [
    {
      metin: "Bu proje benim için çok önemli çünkü uzun zamandır üzerinde çalışıyorum",
      duygu: "samimi",
      enerji: "orta",
      guven: "orta"
    },
    {
      metin: "Kesinlikle bu çözüm işe yarayacak! Sonuçlar ortada, rakamlar konuşuyor!",
      duygu: "heyecanlı",
      enerji: "yüksek", 
      guven: "yüksek"
    },
    {
      metin: "Belki bu fikir işe yarar, emin değilim ama denemeye değer sanırım",
      duygu: "kararsız",
      enerji: "düşük",
      guven: "düşük"
    }
  ]
};

module.exports = speechDataset;