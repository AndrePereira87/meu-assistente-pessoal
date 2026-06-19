import { Receipt, Activity, Brain, Home, Coins, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const getCategoryIcon = (categoria) => {
  if (categoria === 'Alimentação') return { icon: Receipt, color: 'text-orange-500', bg: 'bg-orange-50' };
  if (categoria === 'Saúde/Desporto') return { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' };
  if (categoria === 'Educação') return { icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' };
  if (categoria === 'Casa') return { icon: Home, color: 'text-emerald-500', bg: 'bg-emerald-50' };
  return { icon: Coins, color: 'text-gray-500', bg: 'bg-gray-100' };
};

export const Carteira = ({ movimentos, saldoAtual, gastoMes, loading }) => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Carteira</h1>
        <p className="text-gray-500 font-medium">As tuas finanças pessoais</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 shadow-md text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-100 font-medium text-sm mb-1">Saldo Atual</p>
            <h2 className="text-4xl font-extrabold">{loading ? 'A calcular...' : `€ ${saldoAtual.toFixed(2)}`}</h2>
            <div className="mt-6 flex items-center justify-between text-sm">
              <div><p className="text-emerald-200">Gasto este mês</p><p className="font-bold">€ {gastoMes.toFixed(2)}</p></div>
              <div><p className="text-emerald-200">Orçamento Limite</p><p className="font-bold">€ 500,00</p></div>
            </div>
            <div className="w-full bg-emerald-800/50 rounded-full h-1.5 mt-3">
              <div className="bg-white h-1.5 rounded-full" style={{ width: `${Math.min((gastoMes / 500) * 100, 100)}%` }}></div>
            </div>
          </div>
          <Coins size={120} className="absolute -bottom-6 -right-6 text-white opacity-10" />
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Movimentos Recentes</h3>
            <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{movimentos.length} registos</span>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-4">A carregar dados...</p>
            ) : movimentos.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Ainda não tens movimentos registados.</p>
            ) : (
              movimentos.map((mov) => {
                const style = getCategoryIcon(mov.categoria);
                const Icon = style.icon;
                const dataFormatada = new Date(mov.data_movimento).toLocaleDateString('pt-PT');
                const isSaida = mov.tipo === 'saida';

                return (
                  <div key={mov.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 ${style.bg} rounded-xl flex items-center justify-center ${style.color}`}><Icon size={18} /></div>
                      <div><p className="font-bold text-gray-800 text-sm capitalize">{mov.categoria}</p><p className="text-[10px] font-semibold text-gray-400">{dataFormatada}</p></div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${isSaida ? 'text-gray-900' : 'text-emerald-600'}`}>{isSaida ? '- ' : '+ '}€ {Number(mov.valor).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};