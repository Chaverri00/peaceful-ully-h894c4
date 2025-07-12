import { useState } from "react";
import { CheckCircle, RotateCcw, Clock, Target, Award } from "lucide-react";

const ejercicios = [
  {
    nombre: "Puente de glúteo",
    repeticiones: "3 x 12-15 reps",
    instrucciones:
      "Tumbado boca arriba, pies apoyados, eleva la pelvis apretando glúteos.",
    duracion: "2-3 min",
    dificultad: "Fácil",
  },
  {
    nombre: "Marcha supina",
    repeticiones: "2 x 10-12 reps por pierna",
    instrucciones:
      "Desde puente de glúteo, eleva una pierna manteniendo pelvis estable.",
    duracion: "2-3 min",
    dificultad: "Medio",
  },
  {
    nombre: "Clamshell (con goma si no hay dolor)",
    repeticiones: "2 x 12 reps por lado",
    instrucciones:
      "De lado, rodillas flexionadas, separa rodillas sin mover pelvis.",
    duracion: "2-3 min",
    dificultad: "Medio",
  },
  {
    nombre: "Plancha en rodillas",
    repeticiones: "10-15 seg x 2",
    instrucciones:
      "Apoya antebrazos y rodillas, mantén el cuerpo recto desde rodillas hasta cabeza. Activa abdomen y respira normalmente.",
    duracion: "1-2 min",
    dificultad: "Medio",
  },
  {
    nombre: "Elevación de talones",
    repeticiones: "2 x 15 reps",
    instrucciones: "De pie, sube y baja lentamente sobre puntas de pies.",
    duracion: "2 min",
    dificultad: "Fácil",
  },
  {
    nombre: "Respiración diafragmática",
    repeticiones: "2-3 minutos",
    instrucciones:
      "Tumbado, una mano en pecho y otra en abdomen. Respira inflando barriga.",
    duracion: "3 min",
    dificultad: "Fácil",
  },
];

export default function App() {
  const [completado, setCompletado] = useState(
    Array(ejercicios.length).fill(false)
  );
  const [sesionesCompletadas, setSesionesCompletadas] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(null);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);

  const toggleEjercicio = (index) => {
    const nuevoEstado = [...completado];
    nuevoEstado[index] = !nuevoEstado[index];
    setCompletado(nuevoEstado);

    // Iniciar contador si es el primer ejercicio
    if (!tiempoInicio && nuevoEstado[index]) {
      setTiempoInicio(Date.now());
    }
  };

  const progreso =
    (completado.filter(Boolean).length / ejercicios.length) * 100;
  const ejerciciosCompletados = completado.filter(Boolean).length;

  const reiniciarSesion = () => {
    if (progreso === 100) {
      setSesionesCompletadas((prev) => prev + 1);
    }
    setCompletado(Array(ejercicios.length).fill(false));
    setTiempoInicio(null);
    setTiempoTranscurrido(0);
  };

  const getDificultadColor = (dificultad) => {
    switch (dificultad) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Medio":
        return "bg-yellow-100 text-yellow-800";
      case "Difícil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Fase 1 - Trocanteritis
        </h1>
        <p className="text-gray-600">
          Ejercicios de rehabilitación y fortalecimiento
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Progreso</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(progreso)}%
              </p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completados</p>
              <p className="text-2xl font-bold text-green-600">
                {ejerciciosCompletados}/{ejercicios.length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sesiones</p>
              <p className="text-2xl font-bold text-purple-600">
                {sesionesCompletadas}
              </p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso de la sesión
          </span>
          <span className="text-sm text-gray-500">
            {ejerciciosCompletados} de {ejercicios.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
      </div>

      {/* Ejercicios */}
      <div className="space-y-4 mb-6">
        {ejercicios.map((ejercicio, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 shadow-md transition-all duration-300 ${
              completado[index]
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
                : "bg-white hover:shadow-lg"
            }`}
          >
            <label className="flex items-start gap-4 cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={completado[index]}
                  onChange={() => toggleEjercicio(index)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2
                    className={`text-lg font-semibold ${
                      completado[index] ? "text-green-800" : "text-gray-800"
                    }`}
                  >
                    {ejercicio.nombre}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getDificultadColor(
                      ejercicio.dificultad
                    )}`}
                  >
                    {ejercicio.dificultad}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                  <span className="font-medium">{ejercicio.repeticiones}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {ejercicio.duracion}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {ejercicio.instrucciones}
                </p>
              </div>

              {completado[index] && (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              )}
            </label>
          </div>
        ))}
      </div>

      {/* Mensaje de felicitación */}
      {progreso === 100 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-6 mb-6 shadow-lg">
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-xl font-bold mb-2">¡Sesión Completada!</h3>
            <p>
              Excelente trabajo. Has completado todos los ejercicios de la Fase
              1.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={reiniciarSesion}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <RotateCcw className="w-5 h-5" />
          {progreso === 100 ? "Completar y Nueva Sesión" : "Reiniciar Sesión"}
        </button>
      </div>

      {/* Info adicional */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-2">Recomendaciones:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Realiza estos ejercicios 2-3 veces por semana</li>
          <li>• Detente si sientes dolor agudo</li>
          <li>• Mantén una respiración constante durante los ejercicios</li>
          <li>• Progresa gradualmente en intensidad</li>
        </ul>
      </div>
    </div>
  );
}
