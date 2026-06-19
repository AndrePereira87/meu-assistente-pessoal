import { useState, useEffect } from 'react';
import { Activity, Dumbbell } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Corpo = () => {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreinos = async () => {
      // 1. Descobrir quem é o utilizador logado
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 2. Ir à tabela buscar os treinos desse utilizador
      const { data, error } = await supabase
        .from('historico_treinos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('data_treino', { ascending: false }) // CORRIGIDO PARA O NOME REAL DA COLUNA
        .limit(5); // Mostrar apenas os últimos 5 recordes

      if (!error && data) {
        setTreinos(data);
      } else {
        console.error("Erro a carregar treinos:", error);
      }
      setLoading(false);
    };

    fetchTreinos();
  }, []);

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

      {/* --- SECÇÃO DINÂMICA: LIGADA À BASE DE DADOS --- */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Últimas Cargas de Topo</h2>
        
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-4">A carregar treinos...</p>
          ) : treinos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Ainda não registaste nenhum recorde.</p>
          ) : (
            treinos.map((treino) => {
              // Formatar a data para ser mais legível
              const dataTreino = new Date(treino.data_treino).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
              
              return (
                <div key={treino.id} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                      <Dumbbell size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm capitalize">{treino.exercicio}</p>
                      <p className="text-xs text-gray-500 font-medium">{treino.series} séries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{treino.carga_topo} kg</p>
                    <p className="text-[10px] text-blue-500 font-bold uppercase mt-1">{dataTreino}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};