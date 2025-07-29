/**
 * geminiService.js
 * Google Gemini AI ile konusma analizi servisi
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBqJ6EhIcaigN4XJyVz5ZkwSTwN_lG-F-k';
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable gerekli');
    }
    
    // v1beta API kullan + doğru model adı
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  // Konusma analizi prompt olustur (Dataset'li versiyon)
  createAnalysisPrompt(transcript, duration) {
    return `
Sen 20 yıllık deneyimli bir konuşma koçu ve Toastmasters International sertifikalı uzmanısın. 

REFERANS ÖRNEKLERİ:

KÖTÜ KONUŞMA ÖRNEKLERİ:
- "Eee şey yani bugün eee sizlere bir şey anlatacağım yani eee" → SKOR: 25/100 (Aşırı dolgu kelime)
- "Bu proje çok iyi bir proje bu proje gerçekten çok iyi" → SKOR: 35/100 (Tekrar fazla)
- "yapay zeka çok önemli yapay zeka gelecek yapay zeka her yerde" → SKOR: 30/100 (Bağlaç yok)

ORTA SEVİYE ÖRNEKLERİ:  
- "Bugün sizlere yapay zeka projesini anlatacağım. Bu proje konuşma analizi yapıyor." → SKOR: 65/100 (Düzenli ama duygusal bağ zayıf)
- "Merhaba arkadaşlar. Bu sunumda üç ana konuyu ele alacağım." → SKOR: 70/100 (Yapılandırılmış ama monoton)

İYİ KONUŞMA ÖRNEKLERİ:
- "Değerli dinleyiciler, bugün sizlerle hayatımızı değiştirecek bir teknolojiyi paylaşmak istiyorum." → SKOR: 85/100 (Etkileyici giriş)
- "Hayal edin, konuşmanızı anlık olarak analiz eden bir sistem." → SKOR: 95/100 (Mükemmel hikaye anlatımı)

PROFESYONELLİK KRİTERLERİ:
✓ Diksiyon: Net telaffuz, doğru vurgu
✓ Akıcılık: Dolgu kelime minimal, düzenli tempo  
✓ Yapı: Giriş-Gelişme-Sonuç mantığı
✓ İkna Gücü: Güçlü argümanlar, etkileyici dil
✓ Dinleyici Odağı: Kapsayıcı, etkileşimli yaklaşım

ŞİMDİ ANALİZ ET:
KONUŞMA METNİ: "${transcript}"
SÜRE: ${duration} saniye

Bu örneklere göre profesyonel analiz yap ve JSON formatında yanıt ver:

{
  "skorlar": {
    "akicilikSkoru": 0-100 (dolgu kelime, tekrar analizi),
    "dilbilgisiSkoru": 0-100 (gramer, cümle yapısı),
    "icerikKalitesi": 0-100 (mantık, yapı, derinlik),
    "sestonuSkoru": 0-100 (profesyonellik, etkileyicilik),
    "genel_skor": 0-100 (genel ortalama)
  },
  "detayliAnaliz": {
    "kelimeSayisi": sayı,
    "cumleSayisi": sayı,
    "konusmaSuresi": ${duration},
    "ortalamaCumleUzunlugu": sayı,
    "dolguKelimeler": ["tespit edilen dolgu kelimeler"],
    "tekrarEdenKelimeler": ["aşırı tekrar eden kelimeler"],
    "gucluKelimeler": ["etkili, profesyonel kelimeler"],
    "olumluYonler": [
      "Spesifik güçlü yönler",
      "Referans örneklerle kıyaslama"
    ],
    "gelisimAlanlari": [
      "Konkret iyileştirme alanları", 
      "Hangi seviyeye nasıl çıkabilir"
    ],
    "oneriler": [
      "Uygulanabilir pratik öneriler",
      "Bir sonraki seviyeye geçiş teknikleri"
    ]
  },
  "duygusal_analiz": {
    "ana_duygu": "pozitif/negatif/nötr/heyecanlı/kararsız/samimi",
    "guven_seviyesi": "düşük/orta/yüksek",
    "enerji_seviyesi": "düşük/orta/yüksek", 
    "samimilik": "düşük/orta/yüksek",
    "ikna_gucu": "zayıf/orta/güçlü"
  },
  "profesyonelOneriler": [
    "Bir üst seviyeye çıkmak için yapılacaklar",
    "Profesyonel konuşmacı olmak için adımlar",
    "Referans örneklerdeki teknikleri uygulama"
  ],
  "seviyeBelirlemesi": {
    "mevcut_seviye": "başlangıç/orta/ileri/uzman",
    "hedef_seviye": "bir sonraki hedef seviye",
    "gelisim_yolu": "seviye atlama stratejisi"
  }
}

ÖNEMLI: Referans örneklere göre objektif analiz yap. Sadece JSON yanıt ver. Türkçe analiz yap.
    `;
  }

  // Gemini ile analiz yap
  async analyzeTranscript(transcript, duration = 0) {
    try {
      console.log('🧠 Gemini 2.0 Flash API analiz başladı');
      console.log(`📝 Metin uzunluğu: ${transcript.length} karakter`);

      const prompt = this.createAnalysisPrompt(transcript, duration);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('✅ Gemini yanıt alındı');
      console.log('📄 Raw response:', text.substring(0, 200) + '...');

      // JSON parse et
      try {
        // JSON'u temizle (bazen ```json ile sarılı geliyor)
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
        const analysisResult = JSON.parse(cleanText);
        console.log('✅ JSON parse başarılı');
        return analysisResult;
      } catch (parseError) {
        console.error('❌ JSON parse hatası:', parseError);
        console.log('🔍 Ham metin:', text);
        // Fallback response
        return this.createFallbackResponse(transcript, duration);
      }

    } catch (error) {
      console.error('❌ Gemini API hatası:', error.message);
      console.error('🔍 Full error:', error);
      throw new Error('AI analizi yapılamadı: ' + error.message);
    }
  }

  // Hata durumunda fallback response
  createFallbackResponse(transcript, duration) {
    const kelimeSayisi = transcript.split(' ').length;
    const cumleSayisi = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    console.log('📋 Fallback response oluşturuluyor');

    return {
      skorlar: {
        akicilikSkoru: 75,
        dilbilgisiSkoru: 80,
        icerikKalitesi: 70,
        sestonuSkoru: 75,
        genel_skor: 75
      },
      detayliAnaliz: {
        kelimeSayisi: kelimeSayisi,
        cumleSayisi: cumleSayisi,
        konusmaSuresi: duration,
        ortalamaCumleUzunlugu: Math.round(kelimeSayisi / cumleSayisi) || 0,
        dolguKelimeler: [],
        olumluYonler: [
          "Konuşmanız anlaşılır bir yapıda",
          "Kelime seçiminiz uygun"
        ],
        gelisimAlanlari: [
          "Daha detaylı analiz için tekrar deneyin",
          "Daha uzun konuşma örnekleri verin"
        ],
        oneriler: [
          "Daha yavaş konuşmayı deneyin",
          "Ana fikrinizi net vurgulayın"
        ]
      },
      duygusal_analiz: {
        ana_duygu: "nötr",
        guven_seviyesi: "orta",
        enerji_seviyesi: "orta",
        samimilik: "orta"
      },
      profesyonelOneriler: [
        "AI analizi şu an kullanılamıyor",
        "Temel analiz sonuçları gösteriliyor",
        "API bağlantısını kontrol edin"
      ]
    };
  }
}

module.exports = GeminiService;
