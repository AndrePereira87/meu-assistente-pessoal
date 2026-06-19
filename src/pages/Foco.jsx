import { useState, useEffect } from 'react';
import { Brain, CheckCircle, PenLine } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Foco = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotas = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('notas_rapidas')
        .select('*')
        .eq('user_id', session.user.id)
        .order('data_nota', { ascending: false }); // Do mais recente para o mais antigo

      if (!error && data) {
        setNotas(data);
      } else {
        console.error("Erro a carregar notas:", error);
      }
      setLoading(false);
    };

    fetchNotas();
  }, []);

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

      {/* --- SECÇÃO DINÂMICA: NOTAS RÁPIDAS --- */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <PenLine size={20} className="text-yellow-500" />
            Notas Rápidas
          </h2>
          <span className="text-xs font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md">{notas.length} notas</span>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-4">A carregar notas...</p>
          ) : notas.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Não tens notas guardadas. Usa o botão + para adicionar.</p>
          ) : (
            notas.map((nota) => {
              const dataFormatada = new Date(nota.data_nota).toLocaleDateString('pt-PT', { 
                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
              });
              
              return (
                <div key={nota.id} className="p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100 shadow-sm">
                  <p className="text-sm text-gray-800 font-medium whitespace-pre-wrap">{nota.descricao}</p>
                  <p className="text-[10px] text-yellow-600/60 font-bold mt-2 text-right uppercase tracking-wider">{dataFormatada}</p>
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