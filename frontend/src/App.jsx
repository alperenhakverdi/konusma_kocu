/**
 * App.jsx
 * TalkSense AI ana uygulama bileseni
 */

import React from 'react';
import SesKayit from './components/SesKayit';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 relative overflow-hidden">
      {/* Arka plan dekoratif şekiller */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-25 blur-lg"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl">🎤</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-slide-down">
            TalkSense AI
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Konuşma becerinizi yapay zeka ile analiz edin ve 
            <span className="font-semibold text-purple-600"> profesyonel seviyeye</span> taşıyın
          </p>
          
          {/* Alt başlık özellikleri */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in-delay">
            <div className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm font-medium">Gerçek Zamanlı Analiz</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-sm font-medium">AI Destekli Öneriler</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-sm font-medium">Detaylı Raporlama</span>
            </div>
          </div>
        </header>

        {/* Ana İçerik */}
        <main className="animate-fade-in-up">
          <SesKayit />
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 animate-fade-in">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
          <p className="text-sm">
            🚀 Yapay Zeka ile Konuşma Koçunuz • 
            <span className="font-medium"> TalkSense AI</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;