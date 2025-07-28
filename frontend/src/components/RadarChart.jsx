/**
 * RadarChart.jsx
 * Chart.js ile radar chart bileseni
 */

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Chart.js kayit
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ skorlar }) => {
  const data = {
    labels: [
      'Akıcılık',
      'Dilbilgisi', 
      'İçerik Kalitesi',
      'Ses Tonu',
    ],
    datasets: [
      {
        label: 'Performans Skoru',
        data: [
          skorlar.akicilikSkoru,
          skorlar.dilbilgisiSkoru,
          skorlar.icerikKalitesi,
          skorlar.sestonuSkoru,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: true,
          stepSize: 20,
          font: {
            size: 12,
          },
          color: '#6B7280',
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#374151',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.r}/100`;
          }
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        📊 Performans Radar Grafiği
      </h3>
      <div className="relative h-80">
        <Radar data={data} options={options} />
      </div>
      
      {/* Genel Skor */}
      <div className="mt-6 text-center">
        <div className="inline-block bg-blue-100 rounded-lg px-6 py-3">
          <p className="text-sm text-gray-600 mb-1">Genel Skor</p>
          <p className="text-3xl font-bold text-blue-600">
            {skorlar.genel_skor}/100
          </p>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;