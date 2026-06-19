import { Brain, CheckCircle } from 'lucide-react';

export const Foco = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Foco & Projetos</h1>
        <p className="text-gray-500 font-medium">O teu centro de produtividade</p>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Brain size={20} className="text-purple-500" />UTAD - Engenharia Informática</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
            <div><p className="font-bold text-gray-800 text-sm">Análise Matemática</p><p className="text-[10px] text-purple-600 font-bold uppercase mt-1">Quinta-feira</p></div>
            <span className="bg-white px-2 py-1 rounded text-xs font-bold text-purple-600 shadow-sm">Prioridade</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <div><p className="font-bold text-gray-800 text-sm">Projeto Redes de Dados</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Afonso Gonçalves</p></div>
            <span className="text-gray-400"><CheckCircle size={18} /></span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Desenvolvimento</h2>
        <div className="space-y-5">
          <div className="border-b border-gray-50 pb-4">
            <div className="flex justify-between items-center mb-2"><p className="font-bold text-gray-800 text-sm">CRM Agência de Viagens</p><span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">Em Progresso</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '65%' }}></div></div>
          </div>
          <div className="border-b border-gray-50 pb-4">
            <div className="flex justify-between items-center mb-2"><p className="font-bold text-gray-800 text-sm">Assistente Pessoal PWA</p><span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md">Fase: UI/UX</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2"><p className="font-bold text-gray-800 text-sm">Estudos WebGL / C++</p><span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">Pausado</span></div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};