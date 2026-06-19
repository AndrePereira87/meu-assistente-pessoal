import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Wallet, Brain, Plus, X, Camera, Receipt, PenLine, ChevronLeft, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

// IMPORTAÇÕES
import { supabase } from './supabaseClient';
import { Resumo } from './pages/Resumo';
import { Corpo } from './pages/Corpo';
import { Carteira } from './pages/Carteira';
import { Foco } from './pages/Foco';

// --- BARRA DE NAVEGAÇÃO ---
function BottomNav({ onOpenAction }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link to={to} className={`flex flex-col items-center justify-center w-16 h-full ${currentPath === to ? 'text-blue-600' : 'text-gray-400'}`}>
      <Icon size={24} strokeWidth={currentPath === to ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 h-20 px-4 flex justify-between items-center pb-4 z-40">
      <NavItem to="/" icon={Home} label="Resumo" />
      <NavItem to="/corpo" icon={Dumbbell} label="Corpo" />
      <button onClick={onOpenAction} className="bg-blue-600 text-white rounded-full p-4 -mt-8 shadow-lg shadow-blue-200 active:scale-95 transition-transform">
        <Plus size={28} strokeWidth={3} />
      </button>
      <NavItem to="/carteira" icon={Wallet} label="Wallet" />
      <NavItem to="/foco" icon={Brain} label="Foco" />
    </div>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Estados dos Modais
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  
  const [financeType, setFinanceType] = useState('saida');
  const [financeValue, setFinanceValue] = useState('');
  const [financeCategory, setFinanceCategory] = useState('');
  const [customCategories, setCustomCategories] = useState(["Alimentação", "Lazer", "Saúde/Desporto", "Educação", "Casa", "Outro"]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDate, setRecurringDate] = useState('');
  const [isConfirmingAI, setIsConfirmingAI] = useState(false);

  const [exercicio, setExercicio] = useState('');
  const [series, setSeries] = useState('');
  const [cargaTopo, setCargaTopo] = useState('');

  const [mealMode, setMealMode] = useState(null); 
  const cameraInputRef = useRef(null);
  const macroInputRef = useRef(null); 
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [macroPhotos, setMacroPhotos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Estados da Carteira na Nuvem
  const [movimentos, setMovimentos] = useState([]);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [gastoMes, setGastoMes] = useState(0);
  const [loadingFinancas, setLoadingFinancas] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const fetchFinancas = async () => {
    if (!session) return;
    setLoadingFinancas(true);
    try {
      const { data, error } = await supabase.from('movimentos_financeiros').select('*').eq('user_id', session.user.id).order('data_movimento', { ascending: false });
      if (error) throw error;
      setMovimentos(data || []);
      let total = 0; let totalMensal = 0; const mesAtual = new Date().getMonth();
      data?.forEach(mov => {
        const val = Number(mov.valor);
        if (mov.tipo === 'entrada') total += val;
        else if (mov.tipo === 'saida') {
          total -= val;
          if (new Date(mov.data_movimento).getMonth() === mesAtual) totalMensal += val;
        }
      });
      setSaldoAtual(total); setGastoMes(totalMensal);
    } catch (error) {
      console.error("Erro a buscar finanças:", error);
    } finally {
      setLoadingFinancas(false);
    }
  };

  useEffect(() => { if (session) fetchFinancas(); }, [session]);

  const handleAuth = async (e) => {
    e.preventDefault(); setAuthError(''); setAuthLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setAuthError(error.message); else alert('Conta criada! Verifica o teu e-mail.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  const resetModal = () => {
    setPhotoPreview(null); setMacroPhotos([]); setInputText(""); setExercicio(""); setSeries(""); setCargaTopo("");
    setIsAnalyzing(false); setMealMode(null); setCurrentAction(null); setFinanceType('saida');
    setFinanceValue(''); setFinanceCategory(''); setIsRecurring(false); setRecurringDate(''); setIsConfirmingAI(false);
  };

  const openActionMenu = (actionName) => {
    setCurrentAction(actionName); setIsMenuOpen(false);
    if (['Finanças', 'Treino', 'Nota Rápida'].includes(actionName)) setPhotoPreview('no-photo');
    else if (cameraInputRef.current) cameraInputRef.current.click();
  };

  // --- FUNÇÃO RESTAURADA QUE EVITA O ECRÃ BRANCO ---
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      const novaCategoria = prompt("Qual o nome da nova categoria?");
      if (novaCategoria && novaCategoria.trim() !== '') {
        setCustomCategories([...customCategories, novaCategoria]);
        setFinanceCategory(novaCategoria);
      } else {
        setFinanceCategory('');
      }
    } else {
      setFinanceCategory(value);
    }
  };

  const handleFinanceSubmit = async () => {
    if (photoPreview !== 'no-photo' && !isConfirmingAI) {
      setIsAnalyzing(true); setTimeout(() => { setIsAnalyzing(false); setIsConfirmingAI(true); }, 1500);
    } else {
      if (!financeValue || !financeCategory) return alert("Preenche o valor e a categoria.");
      setIsAnalyzing(true);
      const { error } = await supabase.from('movimentos_financeiros').insert([{ user_id: session.user.id, tipo: financeType, valor: parseFloat(financeValue), categoria: financeCategory, recorrente: isRecurring, data_recorrencia: isRecurring && recurringDate ? recurringDate : null }]);
      setIsAnalyzing(false);
      if (error) alert("Erro: " + error.message); else { alert("Guardado com sucesso!"); resetModal(); fetchFinancas(); }
    }
  };

  const handleTreinoENotaSubmit = async () => {
    setIsAnalyzing(true); let submitError = null;
    if (currentAction === 'Treino') {
      if (!exercicio || !series || !cargaTopo) { alert("Preenche todos os campos."); setIsAnalyzing(false); return; }
      const { error } = await supabase.from('historico_treinos').insert([{ user_id: session.user.id, exercicio, series: parseInt(series, 10), carga_topo: parseFloat(cargaTopo) }]);
      submitError = error;
    } else if (currentAction === 'Nota Rápida') {
      if (!inputText.trim()) { alert("Escreve algo."); setIsAnalyzing(false); return; }
      const { error } = await supabase.from('notas_rapidas').insert([{ user_id: session.user.id, descricao: inputText }]);
      submitError = error;
    }
    setIsAnalyzing(false);
    if (submitError) alert(`Erro: ` + submitError.message); else { alert("Guardado com sucesso!"); resetModal(); }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8"><div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><Brain size={32} /></div><h1 className="text-3xl font-extrabold text-gray-900">Assistente</h1><p className="text-gray-500 font-medium mt-1">Nutrição, Treino e Finanças</p></div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1 pl-1">E-mail</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none" /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1 pl-1">Palavra-passe</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none" /></div>
            {authError && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold text-center">{authError}</div>}
            <button type="submit" disabled={authLoading} className="w-full py-4 rounded-xl font-bold text-white bg-blue-600">{authLoading ? 'A processar...' : isSignUp ? 'Criar Conta' : 'Entrar'}</button>
          </form>
          <div className="text-center mt-6"><button onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }} className="text-sm font-semibold text-blue-600">{isSignUp ? 'Já tens conta? Login' : 'Criar uma conta'}</button></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col h-screen relative bg-gray-50">
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={(e) => { if(e.target.files[0]) setPhotoPreview(URL.createObjectURL(e.target.files[0])); e.target.value=''; }} className="hidden" />
        <input type="file" accept="image/*" capture="environment" ref={macroInputRef} onChange={(e) => { if(e.target.files[0]) setMacroPhotos(p => [...p, URL.createObjectURL(e.target.files[0])]); e.target.value=''; }} className="hidden" />
        
        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<Resumo />} />
            <Route path="/corpo" element={<Corpo />} />
            <Route path="/carteira" element={<Carteira movimentos={movimentos} saldoAtual={saldoAtual} gastoMes={gastoMes} loading={loadingFinancas} />} />
            <Route path="/foco" element={<Foco />} />
          </Routes>
        </main>
        
        <BottomNav onOpenAction={() => setIsMenuOpen(true)} />

        {isMenuOpen && !photoPreview && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
            <div className="bg-white w-full sm:w-96 p-6 rounded-t-3xl sm:rounded-3xl relative z-10 shadow-2xl">
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-extrabold text-gray-900">Novo Registo</h3><button onClick={() => setIsMenuOpen(false)} className="bg-gray-100 p-2 rounded-full"><X size={20} /></button></div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => openActionMenu('Refeição')} className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-2xl text-orange-600"><Camera size={32} className="mb-2" /><span className="font-semibold text-sm">Refeição</span></button>
                <button onClick={() => openActionMenu('Treino')} className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl text-blue-600"><Dumbbell size={32} className="mb-2" /><span className="font-semibold text-sm">Treino</span></button>
                <button onClick={() => openActionMenu('Finanças')} className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-2xl text-emerald-600"><Receipt size={32} className="mb-2" /><span className="font-semibold text-sm">Finanças</span></button>
                <button onClick={() => openActionMenu('Nota Rápida')} className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl text-purple-600"><PenLine size={32} className="mb-2" /><span className="font-semibold text-sm">Nota Rápida</span></button>
              </div>
            </div>
          </div>
        )}

        {photoPreview && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/95 sm:p-4">
            <div className="bg-white w-full sm:w-[28rem] rounded-3xl overflow-hidden mt-10 sm:mt-0 flex flex-col max-h-[90vh] shadow-2xl">
              <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white z-20 relative">
                <div className="flex items-center gap-2">
                  {currentAction === 'Refeição' && mealMode && <button onClick={() => { setMealMode(null); setMacroPhotos([]); }} className="p-1 -ml-2 text-gray-500 rounded-full"><ChevronLeft size={24} /></button>}
                  <h3 className="font-bold text-gray-800">Registo: {currentAction}</h3>
                </div>
                <button onClick={resetModal} className="bg-gray-100 p-2 rounded-full"><X size={20} /></button>
              </div>
              
              <div className="overflow-y-auto flex flex-col">
                {photoPreview !== 'no-photo' && !['Finanças', 'Treino', 'Nota Rápida'].includes(currentAction) && !(currentAction === 'Refeição' && !mealMode) && (
                  <div className="relative bg-gray-900 h-48 sm:h-64 shrink-0"><img src={photoPreview} alt="Preview" className="w-full h-full object-cover" /></div>
                )}

                {currentAction === 'Refeição' ? (
                  !mealMode ? (
                     <div className="p-5 flex flex-col gap-3">
                      <button onClick={() => setMealMode('ai_estimate')} className="flex flex-col p-4 bg-orange-50 border border-orange-100 rounded-xl text-left"><span className="font-bold text-orange-600">🤖 Estimativa da IA</span><span className="text-xs text-orange-600/80">Calcula arredondando por excesso.</span></button>
                      <button onClick={() => setMealMode('exact_macros')} className="flex flex-col p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-left"><span className="font-bold text-emerald-600">📸 Foto de Tabela</span><span className="text-xs text-emerald-600/80">Precisão Absoluta.</span></button>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col gap-4">
                      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Detalhes..." className="w-full bg-gray-50 border rounded-xl p-4 min-h-[100px]" />
                      <button onClick={() => { setIsAnalyzing(true); setTimeout(() => { alert("Guardado!"); resetModal(); }, 1500); }} disabled={isAnalyzing} className="w-full py-4 rounded-xl font-bold text-white bg-orange-500">{isAnalyzing ? 'A Analisar...' : 'Analisar e Guardar'}</button>
                    </div>
                  )
                ) : currentAction === 'Finanças' ? (
                  <div className="p-5 flex flex-col gap-4">
                    {isConfirmingAI ? (
                      <div className="animate-in fade-in"><div className="bg-emerald-50 rounded-2xl p-5 text-center mb-6"><h4 className="font-bold">Análise Concluída</h4></div><button onClick={handleFinanceSubmit} className="w-full py-4 rounded-xl font-bold text-white bg-emerald-600">Confirmar</button></div>
                    ) : (
                      <>
                        <div className="flex bg-gray-100 p-1 rounded-xl"><button onClick={() => setFinanceType('entrada')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold ${financeType === 'entrada' ? 'bg-white text-emerald-600' : 'text-gray-500'}`}>Entrada</button><button onClick={() => setFinanceType('saida')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold ${financeType === 'saida' ? 'bg-white text-red-600' : 'text-gray-500'}`}>Saída</button></div>
                        <div className="flex gap-3"><input type="number" value={financeValue} onChange={(e) => setFinanceValue(e.target.value)} placeholder="Valor" className="w-full bg-white border rounded-xl p-4" /><select value={financeCategory} onChange={handleCategoryChange} className="flex-1 bg-white border rounded-xl p-4"><option value="" disabled>Categoria...</option>{customCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></div>
                        <button onClick={handleFinanceSubmit} disabled={isAnalyzing} className="w-full py-4 rounded-xl font-bold text-white bg-emerald-600">{isAnalyzing ? 'A gravar...' : 'Registar'}</button>
                      </>
                    )}
                  </div>
                ) : currentAction === 'Treino' ? (
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-sm text-gray-500">Regista o teu recorde de carga.</p>
                    <input type="text" value={exercicio} onChange={(e) => setExercicio(e.target.value)} placeholder="Exercício (ex: Supino Reto)" className="w-full bg-gray-50 border rounded-xl p-4" />
                    <div className="flex gap-3"><input type="number" value={series} onChange={(e) => setSeries(e.target.value)} placeholder="Séries" className="w-full bg-gray-50 border rounded-xl p-4" /><input type="number" value={cargaTopo} onChange={(e) => setCargaTopo(e.target.value)} placeholder="Carga (kg)" className="w-full bg-gray-50 border rounded-xl p-4" /></div>
                    <button onClick={handleTreinoENotaSubmit} disabled={isAnalyzing} className="w-full py-4 rounded-xl font-bold text-white bg-blue-600">{isAnalyzing ? 'A Guardar...' : 'Guardar Treino'}</button>
                  </div>
                ) : currentAction === 'Nota Rápida' ? (
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-sm text-gray-500">Escreve a tua nota.</p>
                    <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Descreve..." className="w-full bg-gray-50 border rounded-xl p-4 min-h-[100px]" />
                    <button onClick={handleTreinoENotaSubmit} disabled={isAnalyzing} className="w-full py-4 rounded-xl font-bold text-white bg-purple-600">{isAnalyzing ? 'A Guardar...' : 'Guardar Nota'}</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}