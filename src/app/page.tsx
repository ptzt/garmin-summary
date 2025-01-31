"use client"
import { useState, useRef } from 'react';

export default function Home() {
  const fileInputRef = useRef(null); // Referencia al input file
  const [data, setData] = useState([])

  function parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map(header => header.toLowerCase());
    const data = lines.slice(1).map(line => {
      const values = line.split(",");
      return Object.fromEntries(headers.map((header, i) => [header, values[i]?.replace(/"/g, '')]));
    });
    return data;
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const jsonData = parseCSV(text);
      setData(jsonData)
      console.log(jsonData[0]); // Muestra el JSON con todos los registros
    };
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Garmin Monthly Summary</h1>

      {/* Input oculto para subir archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Botón para seleccionar CSV */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Subir CSV
      </button>

      {/* Renderizado de las cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {data.map((exercise, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 text-black">
            <h2 className="text-xl font-semibold">{exercise.title}</h2>
            <p className="text-gray-600">🔥 Calorías: {exercise.calories}</p>
            <p className="text-gray-600">⏱️ Tiempo: {exercise.time}</p>
            {exercise.distance > 0 && (
              <p className="text-gray-600">⏱️ Distancia: {exercise.distance}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
