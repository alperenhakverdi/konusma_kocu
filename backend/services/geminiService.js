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

  // Konusma analizi prompt olustur
  createAnalysisPrompt(transcript, duration) {
    return `
Sen profesyonel bir konuşma koçusun. Aşağıdaki konuşma metnini analiz et ve JSON formatında detaylı geri bildirim ver.

KONUŞMA METNİ: "${transcript}"
KONUŞMA SÜRESİ: ${duration} saniye

Lütfen şu formatta JSON yanıt ver:

{
  "skorlar": {
    "akicilikSkoru": 0-100 arası,
    "dilbilgisiSkoru": 0-100 arası,
    "icerikKalitesi": 0-100 arası,
    "sestonuSkoru": 0-100 arası,
    "genel_skor": 0-100 arası ortalama
  },
  "detayliAnaliz": {
    "kelimeSayisi": sayı,
    "cumleSayisi": sayı,
    "konusmaSuresi": ${duration},
    "ortalamaCumleUzunlugu": sayı,
    "dolguKelimeler": ["şey", "yani" gibi tespit edilen kelimeler],
    "olumluYonler": ["pozitif gözlemler listesi"],
    "gelisimAlanlari": ["iyileştirme alanları listesi"],
    "oneriler": ["pratik öneriler listesi"]
  },
  "duygusal_analiz": {
    "ana_duygu": "pozitif/negatif/nötr",
    "guven_seviyesi": "düşük/orta/yüksek",
    "enerji_seviyesi": "düşük/orta/yüksek",
    "samimilik": "düşük/orta/yüksek"
  },
  "profesyonelOneriler": [
    "Konuşma hızınızı kontrol edin",
    "Daha net telaffuz için çalışın",
    "Ana fikrinizi daha vurgulayın"
  ]
}

ÖNEMLI: Sadece JSON yanıt ver, başka metin ekleme. Türkçe analiz yap.
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