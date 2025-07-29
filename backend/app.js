/**
 * app.js
 * TalkSense AI Backend Express sunucusu
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Environment variables yukle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basit loglama middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({
    message: '🎤 TalkSense AI Backend Calisiyor!',
    version: '1.0.0',
    status: 'active'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Analiz endpoint (Gemini AI ile)
app.post('/api/analyze-speech', async (req, res) => {
  console.log('🧠 Konusma analizi istegi alindi');
  
  const { transcript, duration } = req.body;
  
  if (!transcript) {
    console.log('❌ Transkript eksik');
    return res.status(400).json({ 
      error: 'Transkript gerekli' 
    });
  }
  
  console.log(`📊 Analiz ediliyor: ${transcript.length} karakter`);
  
  try {
    // Gemini servisi import et
    const GeminiService = require('./services/geminiService');
    const geminiService = new GeminiService();
    
    // AI analizi yap
    const analysisResult = await geminiService.analyzeTranscript(transcript, duration);
    
    console.log('✅ Analiz tamamlandi');
    
    res.json({
      success: true,
      analysisResult: analysisResult,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Analiz hatasi:', error.message);
    res.status(500).json({
      error: 'Analiz yapılamadı',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint bulunamadi',
    availableEndpoints: [
      'GET /',
      'GET /health', 
      'POST /api/analyze-speech'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server hatasi:', err);
  res.status(500).json({ 
    error: 'Sunucu hatasi',
    message: err.message 
  });
});

// Sunucuyu baslat
app.listen(PORT, () => {
  console.log(`🚀 TalkSense AI Backend baslatildi!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`⏰ Zaman: ${new Date().toLocaleString()}`);
});