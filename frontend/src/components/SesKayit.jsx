/**
 * SesKayit.jsx
 * Web Speech API ile ses kayit bileseni
 */

import React, { useState, useRef } from 'react';
import AnalizSonucu from './AnalizSonucu';
import { mockAnalizYap } from '../mockData';

const SesKayit = () => {
  const [kayitAktif, setKayitAktif] = useState(false);
  const [metinCiktisi, setMetinCiktisi] = useState('');
  const [hataVar, setHataVar] = useState('');
  const [analizYapiliyor, setAnalizYapiliyor] = useState(false);
  const [analizSonucu, setAnalizSonucu] = useState(null);
  const sesAlgilimaRef = useRef(null);

  // Web Speech API desteği kontrolu
  const speechAPIDestekliMi = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  // Ses kaydini baslat
  const sesKaydiBaslat = () => {
    if (!speechAPIDestekliMi()) {
      setHataVar('Tarayıcınız ses tanıma özelliğini desteklemiyor');
      return;
    }

    // SpeechRecognition nesnesi olustur
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    sesAlgilimaRef.current = new SpeechRecognition();
    
    // Ayarlar
    sesAlgilimaRef.current.continuous = true;
    sesAlgilimaRef.current.interimResults = true;
    sesAlgilimaRef.current.lang = 'tr-TR';

    // Kayit basladiginda
    sesAlgilimaRef.current.onstart = () => {
      setKayitAktif(true);
      setHataVar('');
      setMetinCiktisi('');
      setAnalizSonucu(null); // Önceki sonucu temizle
      console.log('Ses kaydi basladi...');
    };

    // Sonuc alindığında
    sesAlgilimaRef.current.onresult = (event) => {
      let sonMetin = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          sonMetin += event.results[i][0].transcript;
        }
      }
      
      if (sonMetin) {
        setMetinCiktisi(prev => prev + sonMetin + ' ');
      }
    };

    // Hata durumunda
    sesAlgilimaRef.current.onerror = (event) => {
      console.error('Ses tanima hatasi:', event.error);
      setHataVar(`Ses tanıma hatası: ${event.error}`);
      setKayitAktif(false);
    };

    // Kayit bittiginde
    sesAlgilimaRef.current.onend = () => {
      setKayitAktif(false);
      console.log('Ses kaydi bitti');
    };

    // Kaydı baslat
    sesAlgilimaRef.current.start();
  };

  // Ses kaydini durdur
  const sesKaydiDurdur = () => {
    if (sesAlgilimaRef.current && kayitAktif) {
      sesAlgilimaRef.current.stop();
    }
  };

  // Metni analiz et (Mock API)
  const metniAnalazEt = async () => {
    if (!metinCiktisi.trim()) {
      setHataVar('Analiz için metin gerekli');
      return;
    }

    setAnalizYapiliyor(true);
    setHataVar('');

    try {
      const sonuc = await mockAnalizYap(metinCiktisi.trim());
      setAnalizSonucu(sonuc);
    } catch (error) {
      setHataVar('Analiz sırasında hata oluştu');
      console.error('Analiz hatasi:', error);
    } finally {
      setAnalizYapiliyor(false);
    }
  };

  // Yeni analiz için sıfırla
  const yeniAnalizBaslat = () => {
    setMetinCiktisi('');
    setAnalizSonucu(null);
    setHataVar('');
    setAnalizYapiliyor(false);
  };

  // Eğer analiz sonucu varsa, onu göster
  if (analizSonucu) {
    return <AnalizSonucu sonuc={analizSonucu} onYeniAnaliz={yeniAnalizBaslat} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20 hover-lift">
        <div className="text-center">
          {/* Mikrofon ikonu */}
          <div className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 relative overflow-hidden ${
            kayitAktif ? 'bg-gradient-to-r from-red-400 to-pink-500 animate-pulse-custom shadow-2xl' : 
            analizYapiliyor ? 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse-custom shadow-2xl' : 
            'bg-gradient-to-r from-blue-500 to-purple-600 hover-glow shadow-xl'
          }`}>
            
            {/* Dalgalar efekti - kayıt sırasında */}
            {kayitAktif && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full bg-red-300 opacity-30 animate-ping animation-delay-200"></div>
                <div className="absolute inset-4 rounded-full bg-red-200 opacity-40 animate-ping animation-delay-400"></div>
              </>
            )}
            
            <span className="text-7xl relative z-10 transform transition-transform duration-300 hover:scale-110">
              {analizYapiliyor ? '🧠' : kayitAktif ? '🔴' : '🎤'}
            </span>
          </div>
          
          {/* Başlık */}
          <h2 className="text-3xl font-bold mb-4 transition-all duration-300">
            <span className={`${
              analizYapiliyor ? 'text-orange-600 animate-pulse' :
              kayitAktif ? 'text-red-600 animate-bounce-custom' : 
              'bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent'
            }`}>
              {analizYapiliyor ? 'AI Analiz Ediyor...' :
               kayitAktif ? 'Dinliyorum...' : 'Konuşmaya Başlayın'}
            </span>
          </h2>
          
          {/* Açıklama */}
          <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            {analizYapiliyor ? (
              <span className="flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-bounce"></span>
                AI konuşmanızı analiz ediyor, lütfen bekleyin...
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-2 animate-bounce animation-delay-200"></span>
              </span>
            ) :
             kayitAktif ? (
               <span className="flex items-center justify-center text-red-600 font-medium">
                 <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                 Konuşun, sözleriniz metne dönüştürülüyor...
               </span>
             ) : 
             'Mikrofon butonuna basarak konuşmanızı kaydedin ve profesyonel AI analizini alın'}
          </p>
          
          {/* Kayıt Butonu */}
          {!analizYapiliyor && (
            <button 
              onClick={kayitAktif ? sesKaydiDurdur : sesKaydiBaslat}
              className={`font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                kayitAktif 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="text-2xl mr-3">
                  {kayitAktif ? '🛑' : '🎤'}
                </span>
                {kayitAktif ? 'Kaydı Durdur' : 'Ses Kaydını Başlat'}
              </span>
            </button>
          )}

          {/* Loading Progress Bar - Analiz sırasında */}
          {analizYapiliyor && (
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-yellow-500 h-3 rounded-full animate-pulse shimmer" style={{width: '75%'}}></div>
              </div>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          )}

          {/* Hata Mesajı */}
          {hataVar && (
            <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md animate-fade-in">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <span className="font-medium">{hataVar}</span>
              </div>
            </div>
          )}

          {/* Metin Çıktısı */}
          {metinCiktisi && !analizYapiliyor && (
            <div className="mt-10 animate-fade-in-up">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
                <span className="text-3xl mr-3">📝</span>
                Konuşma Metni
              </h3>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-left mb-8 hover-lift">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {metinCiktisi}
                </p>
              </div>
              
              {/* Butonlar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                  onClick={metniAnalazEt}
                  disabled={analizYapiliyor}
                >
                  <span className="flex items-center justify-center">
                    <span className="text-xl mr-2">📊</span>
                    AI ile Analiz Et
                  </span>
                </button>
                
                <button 
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={yeniAnalizBaslat}
                >
                  <span className="flex items-center justify-center">
                    <span className="text-xl mr-2">🔄</span>
                    Temizle
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SesKayit;