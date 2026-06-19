import { Flame, Activity, CheckCircle, Coins, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Resumo = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Hoje</h1>
          <p className="text-gray-500 font-medium">Quarta-feira, 20 de Maio</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors" title="Terminar Sessão">
          <LogOut size={20} />
        </button>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Flame size={20} className="text-orange-500" />Nutrição</h2>
          <span className="text-sm font-semibold text-orange-500">1200 / 2500 kcal</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-5"><div className="bg-orange-500 h-3 rounded-full" style={{ width: '48%' }}></div></div>
        <div className="flex justify-between text-sm">
          <div className="flex flex-col items-center"><span className="text-gray-500 font-medium text-xs mb-1">Proteína</span><span className="font-bold text-gray-800">80g</span></div>
          <div className="flex flex-col items-center"><span className="text-gray-500 font-medium text-xs mb-1">Hidratos</span><span className="font-bold text-gray-800">140g</span></div>
          <div className="flex flex-col items-center"><span className="text-gray-500 font-medium text-xs mb-1">Gordura</span><span className="font-bold text-gray-800">35g</span></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4"><Activity size={20} className="text-blue-500" />Movimento & Hábitos</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2"><span className="text-gray-700">Passos</span><span className="text-blue-600">4,500 / 10,000</span></div>
            <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-700 font-medium text-sm">Toma de Creatina (5g)</span>
            <button className="text-gray-300 hover:text-green-500 transition-colors"><CheckCircle size={26} /></button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Coins size={20} className="text-emerald-500" />Carteira</h2>
          <span className="text-xl font-bold text-emerald-600">€ 145,20</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Saldo disponível até ao fim do mês</p>
      </div>
      <div className="h-10"></div>
    </div>
  );
};