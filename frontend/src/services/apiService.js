/**
 * apiService.js
 * Backend API ile iletisim servisi
 */

const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  // Konusma analizi API cagrisi
  static async analyzeTranscript(transcript, duration = 0) {
    try {
      console.log('📡 Backend API çağrısı başladı');
      console.log(`📝 Gönderilen metin: ${transcript.substring(0, 50)}...`);

      const response = await fetch(`${API_BASE_URL}/api/analyze-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript.trim(),
          duration: duration
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Backend yanıt alındı');
      
      return {
        success: true,
        data: data.analysisResult,
        timestamp: data.timestamp
      };

    } catch (error) {
      console.error('❌ API çağrısı hatası:', error);
      
      return {
        success: false,
        error: error.message,
        // Fallback olarak mock data dön
        data: this.getFallbackAnalysis(transcript, duration)
      };
    }
  }

  // API hatası durumunda fallback analiz
  static getFallbackAnalysis(transcript, duration) {
    const kelimeSayisi = transcript.split(' ').length;
    const cumleSayisi = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    console.log('📋 Fallback analiz kullanılıyor (API hatası)');

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
        ortalamaCumleUzunlugu: Math.round(kelimeSayisi / (cumleSayisi || 1)),
        dolguKelimeler: [],
        olumluYonler: [
          "Konuşmanız anlaşılır bir yapıda",
          "Kelime seçiminiz uygun",
          "⚠️ Bu fallback analiz - API bağlantısı kontrol edilsin"
        ],
        gelisimAlanlari: [
          "Backend bağlantısı kurulamadı",
          "Gerçek AI analizi için API'yi kontrol edin"
        ],
        oneriler: [
          "Daha yavaş konuşmayı deneyin",
          "Ana fikrinizi net vurgulayın",
          "Backend servisinin çalıştığından emin olun"
        ]
      },
      duygusal_analiz: {
        ana_duygu: "nötr",
        guven_seviyesi: "orta",
        enerji_seviyesi: "orta",
        samimilik: "orta"
      },
      profesyonelOneriler: [
        "⚠️ Şu an fallback mode",
        "Backend API'si çalışmıyor",
        "Gerçek analiz için server'ı kontrol edin"
      ]
    };
  }

  // Backend health check
  static async checkBackendHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('💚 Backend sağlıklı:', data);
      return true;
    } catch (error) {
      console.error('💔 Backend bağlantı hatası:', error);
      return false;
    }
  }
}

export default ApiService;