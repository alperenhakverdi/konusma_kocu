/**
 * mockData.js
 * Sahte analiz verileri - UI testi icin
 */

export const ornekAnalizSonucu = {
  metinGirdi: "Merhaba, bugün hava çok güzel. Sizeriniz nasıl geçiyor? Ben bu projeyi geliştiriyorum.",
  analizTarihi: new Date().toLocaleDateString('tr-TR'),
  analizSuresi: 3.2, // saniye
  
  skorlar: {
    akicilikSkoru: 85,
    dilbilgisiSkoru: 72,
    icerikKalitesi: 78,
    sestonuSkoru: 88,
    genel_skor: 81
  },
  
  detayliAnaliz: {
    kelimeSayisi: 12,
    cumleSayisi: 3,
    konusmaSuresi: 8.5, // saniye
    ortalamaCumleUzunlugu: 4.0,
    
    olumluYonler: [
      "Konuşma tonunuz oldukça samimi ve dostane",
      "Cümle yapınız genel olarak doğru", 
      "Kelime seçiminiz uygun"
    ],
    
    gelisimAlanlari: [
      "Bazı dilbilgisi hatalarına dikkat edin",
      "Cümle geçişlerini daha akıcı hale getirebilirsiniz",
      "İçerik derinliğini artırabilirsiniz"
    ],
    
    oneriler: [
      "Daha yavaş konuşmayı deneyin",
      "Cümleler arası kısa duraksama yapın",
      "Ana konuyu daha net vurgulayın"
    ]
  },
  
  duygusal_analiz: {
    ana_duygu: "pozitif",
    guven_seviyesi: "yüksek",
    enerji_seviyesi: "orta",
    samimilik: "yüksek"
  }
};

// Farklı senaryolar için mock datalar
export const ornekSenaryolar = {
  "merhaba nasılsınız": {
    ...ornekAnalizSonucu,
    metinGirdi: "Merhaba nasılsınız?",
    skorlar: {
      akicilikSkoru: 90,
      dilbilgisiSkoru: 95,
      icerikKalitesi: 60,
      sestonuSkoru: 85,
      genel_skor: 82
    }
  },
  
  "sunum yapıyorum": {
    ...ornekAnalizSonucu,
    metinGirdi: "Bu sunumda size projemizi tanıtacağım. Amacımız kullanıcı deneyimini iyileştirmek.",
    skorlar: {
      akicilikSkoru: 78,
      dilbilgisiSkoru: 88,
      icerikKalitesi: 92,
      sestonuSkoru: 80,
      genel_skor: 84
    }
  }
};

// Mock API fonksiyonu
export const mockAnalizYap = async (metinGirdi) => {
  // Gerçek API gibi bekleme süresi
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Basit anahtar kelime kontrolü
  const lowerText = metinGirdi.toLowerCase();
  
  if (lowerText.includes('merhaba')) {
    return ornekSenaryolar["merhaba nasılsınız"];
  } else if (lowerText.includes('sunum') || lowerText.includes('proje')) {
    return ornekSenaryolar["sunum yapıyorum"];
  }
  
  // Varsayılan sonuç
  return {
    ...ornekAnalizSonucu,
    metinGirdi: metinGirdi
  };
};  