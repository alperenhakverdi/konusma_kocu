/**
 * AnalizSonucu.jsx
 * Analiz sonuclarini gosteren bilesni
 */

import React from 'react';
import RadarChart from './RadarChart';

const AnalizSonucu = ({ sonuc, onYeniAnaliz }) => {
  if (!sonuc) return null;

  const { skorlar, detayliAnaliz, duygusal_analiz, metinGirdi, analizTarihi } = sonuc;

  // Skor rengini belirle
  const skorRengi = (skor) => {
    if (skor >= 90) return 'text-green-600 bg-green-100';
    if (skor >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Başlık */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Analiz Sonuçları
        </h2>
        <p className="text-gray-600">
          Tarih: {analizTarihi}
        </p>
      </div>

      {/* Radar Chart ve Ana Skorlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Sol: Radar Chart */}
        <div>
          <RadarChart skorlar={skorlar} />
        </div>

        {/* Sağ: Ana Skorlar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Akıcılık</h3>
            <div className={`text-3xl font-bold py-2 px-4 rounded-lg ${skorRengi(skorlar.akicilikSkoru)}`}>
              {skorlar.akicilikSkoru}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dilbilgisi</h3>
            <div className={`text-3xl font-bold py-2 px-4 rounded-lg ${skorRengi(skorlar.dilbilgisiSkoru)}`}>
              {skorlar.dilbilgisiSkoru}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">İçerik</h3>
            <div className={`text-3xl font-bold py-2 px-4 rounded-lg ${skorRengi(skorlar.icerikKalitesi)}`}>
              {skorlar.icerikKalitesi}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Ses Tonu</h3>
            <div className={`text-3xl font-bold py-2 px-4 rounded-lg ${skorRengi(skorlar.sestonuSkoru)}`}>
              {skorlar.sestonuSkoru}
            </div>
          </div>
        </div>
      </div>

      {/* İki Sütun Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sol Taraf - Olumlu Yönler */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            ✅ Güçlü Yönler
          </h3>
          <ul className="space-y-3">
            {detayliAnaliz.olumluYonler.map((yön, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-700">{yön}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ Taraf - Gelişim Alanları */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-orange-700 mb-4 flex items-center">
            🎯 Gelişim Alanları
          </h3>
          <ul className="space-y-3">
            {detayliAnaliz.gelisimAlanlari.map((alan, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span className="text-gray-700">{alan}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Duygusal Analiz */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">
          🎭 Duygusal Analiz
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Ana Duygu</p>
            <p className="text-lg font-semibold text-purple-600 capitalize">
              {duygusal_analiz.ana_duygu}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Güven Seviyesi</p>
            <p className="text-lg font-semibold text-purple-600 capitalize">
              {duygusal_analiz.guven_seviyesi}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Samimiyet</p>
            <p className="text-lg font-semibold text-purple-600 capitalize">
              {duygusal_analiz.samimilik}
            </p>
          </div>
        </div>
      </div>

      {/* Öneriler */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          💡 Öneriler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {detayliAnaliz.oneriler.map((oneri, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700 text-center">{oneri}</p>
            </div>
          ))}
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          📈 İstatistikler
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{detayliAnaliz.kelimeSayisi}</p>
            <p className="text-gray-600">Kelime</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{detayliAnaliz.cumleSayisi}</p>
            <p className="text-gray-600">Cümle</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{detayliAnaliz.konusmaSuresi}s</p>
            <p className="text-gray-600">Süre</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{detayliAnaliz.ortalamaCumleUzunlugu}</p>
            <p className="text-gray-600">Ort. Cümle</p>
          </div>
        </div>
      </div>

      {/* Yeni Analiz Butonu */}
      <div className="text-center mt-8">
        <button 
          onClick={onYeniAnaliz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          🎤 Yeni Analiz Yap
        </button>
      </div>
    </div>
  );
};

export default AnalizSonucu;