"use client";
import { useState, useRef } from "react";
import { handleFileUpload, groupDataByCategory } from "@/helpers/helpers";
export default function Home() {
  const fileInputRef = useRef(null);
  const [data, setData] = useState([]);

  // 🔥 Agrupar datos por tipo de actividad
  const groupedData = groupDataByCategory(data);

  const handleChange = (event) => {
    handleFileUpload(event, setData);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Garmin Monthly Summary</h1>

      {/* Input oculto para subir archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        multiple
        style={{ display: "none" }}
      />

      {/* Botón para seleccionar CSV */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Subir CSV
      </button>

      {/* 🔥 Renderizado por categorías */}
      {Object.keys(groupedData).map((category) => (
        <div key={category} className="mt-8 w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-white mb-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupedData[category].map((exercise, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 text-black">
                <h2 className="text-xl font-semibold">{exercise.title}</h2>
                <p className="text-gray-600">🔥 Calorías: {exercise.calories}</p>
                <p className="text-gray-600">⏱️ Tiempo: {exercise.time}</p>
                {exercise.distance > 0 && (
                  <p className="text-gray-600">📏 Distancia: {exercise.distance}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
