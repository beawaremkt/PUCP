import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Clock, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { useCalculations } from '../hooks/useCalculations';
import { useApp } from '../context/AppContext';

const TabDashboard = () => {
  const { state } = useApp();
  const calcs = useCalculations();

  const cualitativasChartData = calcs.cualitativasPromedio.map(c => ({
    name: c.variable,
    despues: c.despues,
    antes: c.antes,
  }));

  const cuantitativasChartData = calcs.cuantitativasData.map(c => ({
    name: c.variable,
    despues: c.despues,
    antes: c.antes,
    unidad: c.unidad || '',
  }));

  // Calcular el valor máximo para normalizar las barras
  const maxCuantitativo = Math.max(
    ...cuantitativasChartData.map(c => Math.max(c.antes, c.despues)),
    1
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-pucp-blue">
        <h1 className="text-2xl font-bold text-gray-800 mx-auto">
          CALCULADORA DE IMPACTO: LÍDERES DIGITALES
        </h1>
      </div>

      {/* Project Info - Full width */}
      <div className="bg-gray-100 border-2 border-gray-400 p-4 mb-6 w-full">
        <p className="text-sm font-bold text-gray-800 mb-2 pb-2 border-b border-gray-400">Datos del Proyecto</p>
        <div className="text-sm">
          <p><strong>Nombre del Proyecto:</strong> {state.acta.nombreProyecto || '0'}</p>
          <p><strong>Unidad / Facultad:</strong> {state.acta.unidad || '0'}</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* Inversión Total */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">Inversión total</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            S/ {calcs.inversionTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Ahorro Financiero Anual */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">Ahorro Financiero Anual (S/.)</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            S/ {calcs.ahorroFinancieroAnual.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* ROI */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">ROI</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            {calcs.roi.toFixed(0)}%
          </p>
        </div>

        {/* Horas Liberadas al Año */}
        <div className="bg-gray-100 border-2 border-gray-400 p-4 text-center">
          <p className="text-sm font-bold text-gray-800 mb-2 pb-2 border-b border-gray-400">Horas Liberadas al Año</p>
          <div className="flex items-center justify-center gap-2">
            <Clock size={32} className="text-pucp-blue" />
            <p className="text-xl font-bold text-black">
              {calcs.horasLiberadasAlAno.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Impacto Cualitativo y Cuantitativo */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Impacto Cualitativo */}
        {cualitativasChartData.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Impacto Cualitativo
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cualitativasChartData} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#666' }}
                    interval={0}
                    height={60}
                  />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="antes" name="Antes" fill="#1e3a5f" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                  <Bar dataKey="despues" name="Después" fill="#c25e00" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* IMPACTO CUANTITATIVO */}
        {cuantitativasChartData.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Impacto Cuantitativo
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cuantitativasChartData} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#666' }}
                    interval={0}
                    height={60}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="antes" name="Antes" fill="#5d8a3e" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                  <Bar dataKey="despues" name="Después" fill="#c9a000" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDashboard;
