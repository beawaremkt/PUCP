import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import TabActaNacimiento from './components/TabActaNacimiento';
import TabLaInversion from './components/TabLaInversion';
import TabRegistroCuantitativo from './components/TabRegistroCuantitativo';
import TabDashboard from './components/TabDashboard';
import PUCPLogo from '../logos/PUCP.png';

const tabs = [
  { id: 'acta', label: 'Acta de Nacimiento' },
  { id: 'inversion', label: 'Registro de Costos' },
  { id: 'cuantitativo', label: 'Registro del Proyecto' },
  { id: 'dashboard', label: 'Dashboard' },
];

const tabComponents = {
  acta: TabActaNacimiento,
  inversion: TabLaInversion,
  cuantitativo: TabRegistroCuantitativo,
  dashboard: TabDashboard,
};

function App() {
  const [activeTab, setActiveTab] = useState('acta');

  const ActiveComponent = tabComponents[activeTab];

  return (
    <AppProvider activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-200 border-r border-gray-400 flex flex-col">
          {/* Title */}
          <div className="p-6 border-b border-gray-400 text-center">
            <img src={PUCPLogo} alt="PUCP Logo" className="w-full max-w-[180px] mx-auto mb-4" />
            <h1 className="text-lg font-bold text-pucp-blue leading-tight">
              CALCULADORA DE IMPACTO
              <br />
              <span className="text-sm font-semibold">Líderes Digitales</span>
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium text-left whitespace-nowrap border-b border-gray-300 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-pucp-blue border-l-4 border-l-pucp-blue'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          <ActiveComponent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
