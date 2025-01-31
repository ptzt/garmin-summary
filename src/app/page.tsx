"use client";
import { useState, useRef } from "react";
import { handleFileUpload, groupDataByCategory, secondsToTime } from "@/helpers/helpers";
export default function Home() {
  const fileInputRef = useRef(null);
  const [data, setData] = useState([]);
  const groupedData = groupDataByCategory(data);

  const handleChange = (event) => {
    handleFileUpload(event, setData);
  };

  const canvasRef = useRef(null);

  const generateStoryImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#ff8a00");
    gradient.addColorStop(1, "#e52e71");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ajustar la posición inicial de los textos
    let yPosition = 200; // Posición inicial para el primer bloque de texto

    // Iterar sobre el array groupedData y generar los textos para cada objeto
    Object.keys(groupedData).map((category) => {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 60px Arial";

      // Agregar título del entrenamiento
      ctx.fillText(`🏋️ ${category}`, 100, yPosition);
      yPosition += 100; // Separar texto de título

      // Agregar calorías
      ctx.fillText(`🔥 Calorías: ${groupedData[category].totalCalories} kcal`, 100, yPosition);
      yPosition += 100; // Separar texto de calorías

      // Agregar duración
      ctx.fillText(`⏳ Duración: ${secondsToTime(groupedData[category].totalTime)}`, 100, yPosition);
      yPosition += 100; // Separar texto de duración

      if (groupedData[category].totalDistance > 0) {
        ctx.fillText(`📏 Distancia: ${groupedData[category].totalDistance} km`, 100, yPosition);
        yPosition += 100; // Separar texto de distancia
      }

      // Agregar un espacio extra entre los bloques de entrenamiento
      yPosition += 50;
    });

    // Descargar imagen
    const link = document.createElement("a");
    link.download = "workout_story.png";  // Nombre de la imagen
    link.href = canvas.toDataURL("image/png");
    link.click();
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
      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Subir CSV
        </button>
        {data && data.length > 0 && (
          <button onClick={generateStoryImage} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Convertir a imagen
          </button>
        )}

      </div>

      <canvas ref={canvasRef} width={1080} height={1920} className="hidden"></canvas>

      {/* 🔥 Renderizado por categorías */}
      {Object.keys(groupedData).map((category) => (
        <div key={category} className="mt-8 w-full max-w-5xl">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-white mb-2">{category}</h2>
            {/* Mostrar el tiempo total y las calorías totales */}
            <h2>Tiempo total: {secondsToTime(groupedData[category].totalTime)} minutos</h2>
            <h2>Calorías totales: {groupedData[category].totalCalories} kcal</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupedData[category].exercises.map((exercise, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 text-black">
                <h2 className="text-xl font-semibold">{exercise.title}</h2>
                <p className="text-gray-600">🔥 Calorías: {exercise.calories}</p>
                <p className="text-gray-600">⏱️ Tiempo: {exercise.time} minutos</p>
                {exercise.distance > 0 && (
                  <p className="text-gray-600">📏 Distancia: {exercise.distance} km</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
