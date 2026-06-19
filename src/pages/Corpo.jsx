import { Activity, Dumbbell } from 'lucide-react';

export const Corpo = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Corpo & Treino</h1>
        <p className="text-gray-500 font-medium">O teu progresso no ginásio</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Peso Atual</h2>
          <div className="flex items-baseline gap-1"><span className="text-4xl font-extrabold text-gray-900">90.0</span><span className="text-lg font-semibold text-gray-400">kg</span></div>
        </div>
        <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner"><Activity size={28} /></div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Dumbbell size={20} className="text-blue-500" />Treino de Hoje</h2>
          <button className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-lg">Alterar</button>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="font-extrabold text-gray-800 text-lg">Push Day</h3>
          <p className="text-sm text-gray-500 mt-1">Peito, Ombros e Tríceps</p>
          <div className="mt-4 flex gap-2">
            <span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">Supino Reto</span>
            <span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">Desenvolvimento</span>
            <span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">+4</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Últimas Cargas de Topo</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500"><Dumbbell size={18} /></div>
              <div><p className="font-bold text-gray-800 text-sm">Leg Press</p><p className="text-xs text-gray-500">4 séries</p></div>
            </div>
            <div className="text-right"><p className="font-bold text-gray-900">120 kg</p><p className="text-[10px] text-blue-500 font-bold uppercase mt-1">Há 2 dias</p></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500"><Dumbbell size={18} /></div>
              <div><p className="font-bold text-gray-800 text-sm">Supino Reto</p><p className="text-xs text-gray-500">3 séries</p></div>
            </div>
            <div className="text-right"><p className="font-bold text-gray-900">80 kg</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Há 4 dias</p></div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};