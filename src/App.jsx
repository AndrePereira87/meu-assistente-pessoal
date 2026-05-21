import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Wallet, Brain, Plus, Flame, Activity, CheckCircle, Coins, X, Camera, Receipt, PenLine, ChevronLeft, ArrowUpCircle, ArrowDownCircle, CalendarClock, LogOut } from 'lucide-react';

// IMPORTAÇÃO APENAS DO CLIENTE PURO (Sem UI externa instável)
import { supabase } from './supabaseClient';

// --- ECRÃ: RESUMO ---
const Resumo = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Hoje</h1>
          <p className="text-gray-500 font-medium">Quarta-feira, 20 de Maio</p>
        </div>
        {/* BOTÃO DE LOGOUT */}
        <button 
          onClick={() => supabase.auth.signOut()} 
          className="bg-gray-100 p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors"
          title="Terminar Sessão"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Flame size={20} className="text-orange-500" />
            Nutrição
          </h2>
          <span className="text-sm font-semibold text-orange-500">1200 / 2500 kcal</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-5">
          <div className="bg-orange-500 h-3 rounded-full" style={{ width: '48%' }}></div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-medium text-xs mb-1">Proteína</span>
            <span className="font-bold text-gray-800">80g</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-medium text-xs mb-1">Hidratos</span>
            <span className="font-bold text-gray-800">140g</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-medium text-xs mb-1">Gordura</span>
            <span className="font-bold text-gray-800">35g</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Activity size={20} className="text-blue-500" />
          Movimento & Hábitos
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700">Passos</span>
              <span className="text-blue-600">4,500 / 10,000</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-700 font-medium text-sm">Toma de Creatina (5g)</span>
            <button className="text-gray-300 hover:text-green-500 transition-colors">
              <CheckCircle size={26} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Coins size={20} className="text-emerald-500" />
            Carteira
          </h2>
          <span className="text-xl font-bold text-emerald-600">€ 145,20</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Saldo disponível até ao fim do mês</p>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

// --- ECRÃ: CORPO & TREINO ---
const Corpo = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Corpo & Treino</h1>
        <p className="text-gray-500 font-medium">O teu progresso no ginásio</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Peso Atual</h2>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-gray-900">90.0</span>
            <span className="text-lg font-semibold text-gray-400">kg</span>
          </div>
        </div>
        <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
          <Activity size={28} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Dumbbell size={20} className="text-blue-500" />
            Treino de Hoje
          </h2>
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
              <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500">
                <Dumbbell size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Leg Press</p>
                <p className="text-xs text-gray-500">4 séries</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">120 kg</p>
              <p className="text-[10px] text-blue-500 font-bold uppercase mt-1">Há 2 dias</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500">
                <Dumbbell size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Supino Reto</p>
                <p className="text-xs text-gray-500">3 séries</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">80 kg</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Há 4 dias</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

// --- ECRÃ: CARTEIRA ---
const Carteira = () => {
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
            <h2 className="text-4xl font-extrabold">€ 145,20</h2>
            <div className="mt-6 flex items-center justify-between text-sm">
              <div>
                <p className="text-emerald-200">Gasto este mês</p>
                <p className="font-bold">€ 354,80</p>
              </div>
              <div>
                <p className="text-emerald-200">Orçamento Limite</p>
                <p className="font-bold">€ 500,00</p>
              </div>
            </div>
            <div className="w-full bg-emerald-800/50 rounded-full h-1.5 mt-3">
              <div className="bg-white h-1.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <Coins size={120} className="absolute -bottom-6 -right-6 text-white opacity-10" />
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Agendamentos Fixos</h3>
            <button className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-lg">Gerir</button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-emerald-500"><ArrowUpCircle size={20} /></div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Mesada</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Dia 1</p>
                </div>
              </div>
              <p className="font-bold text-emerald-600">+ € 150,00</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-red-500"><ArrowDownCircle size={20} /></div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Ginásio</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Dia 5</p>
                </div>
              </div>
              <p className="font-bold text-gray-900">- € 35,00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Movimentos Recentes</h3>
            <button className="text-gray-400 hover:text-emerald-600 text-sm font-bold transition">Ver tudo</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                  <Receipt size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Pingo Doce</p>
                  <p className="text-xs font-semibold text-orange-500">Alimentação</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">- € 12,50</p>
                <p className="text-[10px] text-gray-400">Hoje</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Prozis</p>
                  <p className="text-xs font-semibold text-blue-500">Saúde/Desporto</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">- € 24,99</p>
                <p className="text-[10px] text-gray-400">Ontem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

// --- ECRÃ: FOCO ---
const Foco = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Foco & Projetos</h1>
        <p className="text-gray-500 font-medium">O teu centro de productivity</p>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Brain size={20} className="text-purple-500" />
            UTAD - Engenharia Informática
          </h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
            <div>
              <p className="font-bold text-gray-800 text-sm">Análise Matemática</p>
              <p className="text-[10px] text-purple-600 font-bold uppercase mt-1">Quinta-feira</p>
            </div>
            <span className="bg-white px-2 py-1 rounded text-xs font-bold text-purple-600 shadow-sm">Prioridade</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-800 text-sm">Projeto Redes de Dados</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Afonso Gonçalves</p>
            </div>
            <span className="text-gray-400"><CheckCircle size={18} /></span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Desenvolvimento</h2>
        
        <div className="space-y-5">
          <div className="border-b border-gray-50 pb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-gray-800 text-sm">CRM Agência de Viagens</p>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">Em Progresso</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="border-b border-gray-50 pb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-gray-800 text-sm">Assistente Pessoal PWA</p>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md">Fase: UI/UX</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-gray-800 text-sm">Estudos WebGL / C++</p>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">Pausado</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

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
      
      <button 
        onClick={onOpenAction}
        className="bg-blue-600 text-white rounded-full p-4 -mt-8 shadow-lg shadow-blue-200 active:scale-95 transition-transform"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      <NavItem to="/carteira" icon={Wallet} label="Wallet" />
      <NavItem to="/foco" icon={Brain} label="Foco" />
    </div>
  );
}

// --- APP PRINCIPAL (Estado, Modais e LOGIN) ---
export default function App() {
  // ESTADO DE SESSÃO DO SUPABASE
  const [session, setSession] = useState(null);

  // Estados do Formulário de Login Customizado
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

  const [mealMode, setMealMode] = useState(null); 
  
  const cameraInputRef = useRef(null);
  const macroInputRef = useRef(null); 
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [macroPhotos, setMacroPhotos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // EFEITO DO SUPABASE PARA VERIFICAR LOGIN
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Lógica de Autenticação Ativa (Formulário Seguro)
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setAuthError(error.message);
      else alert('Conta criada! Verifica o teu e-mail para confirmar a ativação.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  // SE NÃO HOUVER SESSÃO, MOSTRA O ECRÃ DE LOGIN PERSONALIZADO
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center mb-8">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <Brain size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Assistente</h1>
            <p className="text-gray-500 font-medium mt-1">Nutrição, Treino e Finanças</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1 pl-1">E-mail</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1 pl-1">Palavra-passe</label>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold text-center">
                {authError === 'Invalid login credentials' ? 'Dados de login inválidos.' : authError}
              </div>
            )}

            <button 
              type="submit" disabled={authLoading}
              className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition active:scale-[0.99] flex justify-center items-center"
            >
              {authLoading ? 'A processar...' : isSignUp ? 'Criar Conta Gratuita' : 'Entrar na Aplicação'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {isSignUp ? 'Já tens conta? Faz login aqui' : 'Não tens conta? Cria uma gratuitamente'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- O RESTO DA APP SÓ RODA SE HOUVER SESSÃO ---

  const resetModal = () => {
    setPhotoPreview(null);
    setMacroPhotos([]); 
    setInputText("");
    setIsAnalyzing(false);
    setMealMode(null);
    setCurrentAction(null);
    setFinanceType('saida');
    setFinanceValue('');
    setFinanceCategory('');
    setIsRecurring(false);
    setRecurringDate('');
    setIsConfirmingAI(false);
  };

  const openActionMenu = (actionName) => {
    setCurrentAction(actionName);
    setIsMenuOpen(false);
    if (['Finanças', 'Nota Rápida'].includes(actionName)) {
      setPhotoPreview('no-photo'); 
    } else {
      if (cameraInputRef.current) cameraInputRef.current.click();
    }
  };

  const handlePhotoTaken = (event) => {
    const file = event.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
    event.target.value = '';
  };

  const handleMacroPhotoTaken = (event) => {
    const file = event.target.files[0];
    if (file) setMacroPhotos(prev => [...prev, URL.createObjectURL(file)]);
    event.target.value = '';
  };

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

  const handleFinanceSubmit = () => {
    if (photoPreview !== 'no-photo' && !isConfirmingAI) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsConfirmingAI(true);
      }, 1500);
    } else {
      alert(`Registado com sucesso!\nValor: €${financeValue || 'N/A'}\nCategoria: ${financeCategory || 'N/A'}`);
      resetModal();
    }
  };

  return (
    <Router>
      <div className="flex flex-col h-screen relative bg-gray-50">
        
        {/* INPUTS ESCONDIDOS DAS CÂMARAS */}
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handlePhotoTaken} className="hidden" />
        <input type="file" accept="image/*" capture="environment" ref={macroInputRef} onChange={handleMacroPhotoTaken} className="hidden" />

        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<Resumo />} />
            <Route path="/corpo" element={<Corpo />} />
            <Route path="/carteira" element={<Carteira />} />
            <Route path="/foco" element={<Foco />} />
          </Routes>
        </main>
        
        <BottomNav onOpenAction={() => setIsMenuOpen(true)} />

        {/* --- MODAL DO MENU [ + ] --- */}
        {isMenuOpen && !photoPreview && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
            <div className="bg-white w-full sm:w-96 p-6 rounded-t-3xl sm:rounded-3xl relative z-10 shadow-2xl animate-in slide-in-from-bottom-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-extrabold text-gray-900">Novo Registo</h3>
                <button onClick={() => setIsMenuOpen(false)} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => openActionMenu('Refeição')} className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-2xl text-orange-600 active:bg-orange-100">
                  <Camera size={32} className="mb-2" />
                  <span className="font-semibold text-sm text-center">Refeição</span>
                </button>
                <button onClick={() => openActionMenu('Treino')} className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl text-blue-600 active:bg-blue-100">
                  <Dumbbell size={32} className="mb-2" />
                  <span className="font-semibold text-sm text-center">Treino</span>
                </button>
                <button onClick={() => openActionMenu('Finanças')} className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-2xl text-emerald-600 active:bg-emerald-100">
                  <Receipt size={32} className="mb-2" />
                  <span className="font-semibold text-sm text-center">Finanças</span>
                </button>
                <button onClick={() => openActionMenu('Nota Rápida')} className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl text-purple-600 active:bg-purple-100">
                  <PenLine size={32} className="mb-2" />
                  <span className="font-semibold text-sm text-center">Nota Rápida</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL DE SUBMISSÃO --- */}
        {photoPreview && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/95 sm:p-4">
            <div className="bg-white w-full sm:w-[28rem] rounded-3xl overflow-hidden mt-10 sm:mt-0 flex flex-col max-h-[90vh] shadow-2xl animate-in fade-in zoom-in-95">
              
              <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white z-20 relative">
                <div className="flex items-center gap-2">
                  {currentAction === 'Refeição' && mealMode && (
                    <button onClick={() => { setMealMode(null); setMacroPhotos([]); }} className="p-1 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  <h3 className="font-bold text-gray-800">
                    Registo: {currentAction}
                  </h3>
                </div>
                <button onClick={resetModal} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto flex flex-col">
                
                {photoPreview !== 'no-photo' && currentAction !== 'Finanças' && !(currentAction === 'Refeição' && !mealMode) && (
                  <div className="relative bg-gray-900 h-48 sm:h-64 shrink-0">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* --- LÓGICA DE REFEIÇÃO --- */}
                {currentAction === 'Refeição' ? (
                  !mealMode ? (
                     <div className="p-5 flex flex-col gap-3">
                      <h4 className="font-bold text-gray-800 mb-2">Como queres analisar este prato?</h4>
                      <button onClick={() => setMealMode('ai_estimate')} className="flex flex-col p-4 bg-orange-50 border border-orange-100 rounded-xl text-left active:bg-orange-100">
                        <span className="font-bold text-orange-600 flex items-center gap-2 mb-1">🤖 Estimativa da IA</span>
                        <span className="text-xs text-orange-600/80 leading-snug">A IA calcula as calorias arredondando sempre por excesso.</span>
                      </button>
                      <button onClick={() => setMealMode('ingredients_only')} className="flex flex-col p-4 bg-blue-50 border border-blue-100 rounded-xl text-left active:bg-blue-100">
                        <span className="font-bold text-blue-600 flex items-center gap-2 mb-1">📝 Introduzir Ingredientes</span>
                        <span className="text-xs text-blue-600/80 leading-snug">A IA pesquisa na BD e faz as contas (por excesso).</span>
                      </button>
                      <button onClick={() => setMealMode('exact_macros')} className="flex flex-col p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-left active:bg-emerald-100">
                        <span className="font-bold text-emerald-600 flex items-center gap-2 mb-1">📸 Foto de Tabela Nutricional</span>
                        <span className="text-xs text-emerald-600/80 leading-snug">Modo Precisão Absoluta. Fotografa rótulos para guardar na BD.</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col gap-4">
                      {mealMode === 'exact_macros' && (
                        <>
                          <p className="text-sm text-gray-500 font-medium">Fotografa as tabelas e indica a quantidade.</p>
                          {macroPhotos.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                              {macroPhotos.map((photo, index) => (
                                <div key={index} className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm">
                                  <img src={photo} className="w-full h-full object-cover opacity-80" alt={`Tabela ${index + 1}`} />
                                  <div className="absolute top-0 left-0 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">#{index + 1}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <button onClick={() => macroInputRef.current?.click()} className="py-4 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-600 font-semibold flex items-center justify-center gap-2 hover:bg-emerald-50 transition">
                            <Camera size={20} /> Adicionar Tabela Nutricional
                          </button>
                        </>
                      )}
                      <textarea 
                        value={inputText} onChange={(e) => setInputText(e.target.value)}
                        placeholder="Descreve a refeição ou quantidades..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] resize-none"
                      />
                      <button 
                        onClick={() => {
                          setIsAnalyzing(true);
                          setTimeout(() => {
                            alert("Calorias estimadas e guardadas!");
                            resetModal();
                          }, 1500);
                        }}
                        disabled={isAnalyzing}
                        className="w-full py-4 rounded-xl font-bold text-white bg-orange-500 active:scale-95 transition flex justify-center items-center gap-2"
                      >
                        {isAnalyzing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Analisar e Guardar'}
                      </button>
                    </div>
                  )
                ) : currentAction === 'Finanças' ? (
                  // --- LÓGICA DE FINANÇAS ---
                  <div className="p-5 flex flex-col gap-4">
                    
                    {isConfirmingAI ? (
                      <div className="animate-in fade-in slide-in-from-right-4">
                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center mb-6">
                          <Brain className="text-emerald-500 mx-auto mb-3" size={36} />
                          <h4 className="font-bold text-gray-900 mb-1 text-lg">Análise da IA Concluída</h4>
                          <p className="text-sm text-gray-600 mb-4">A inteligência artificial leu o teu talão. Verifica os dados:</p>
                          
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100 text-left space-y-3">
                             <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                               <span className="text-gray-500 text-sm font-medium">Valor Lido:</span>
                               <span className="font-bold text-gray-900 text-lg">€ 24,50</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                               <span className="text-gray-500 text-sm font-medium">Categoria Sugerida:</span>
                               <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-sm">Alimentação</span>
                             </div>
                             <div className="flex justify-between items-center">
                               <span className="text-gray-500 text-sm font-medium">Tipo:</span>
                               <span className="font-bold text-red-500 text-sm">Saída</span>
                             </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                           <button onClick={() => setIsConfirmingAI(false)} className="flex-1 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                             Editar
                           </button>
                           <button onClick={handleFinanceSubmit} className="flex-1 py-4 rounded-xl font-bold text-white bg-emerald-600 active:scale-95 transition">
                             Confirmar
                           </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                          <button onClick={() => setFinanceType('entrada')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${financeType === 'entrada' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}>
                            <div className="flex justify-center items-center gap-2"><ArrowUpCircle size={18} /> Entrada</div>
                          </button>
                          <button onClick={() => setFinanceType('saida')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${financeType === 'saida' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'}`}>
                            <div className="flex justify-center items-center gap-2"><ArrowDownCircle size={18} /> Saída</div>
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                            <input 
                              type="number" 
                              value={financeValue}
                              onChange={(e) => setFinanceValue(e.target.value)}
                              placeholder="0.00"
                              className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-8 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                          
                          <select 
                            value={financeCategory}
                            onChange={handleCategoryChange}
                            className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-gray-700 font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                          >
                            <option value="" disabled>Categoria...</option>
                            {customCategories.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                            <option value="new" className="font-bold text-emerald-600">+ Adicionar Nova...</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <input 
                            type="checkbox" 
                            id="recurring"
                            checked={isRecurring} 
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                          />
                          <label htmlFor="recurring" className="text-sm font-bold text-gray-700 flex-1 cursor-pointer select-none">Movimento Recorrente?</label>
                        </div>

                        {isRecurring && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block pl-1">Data do Movimento</label>
                            <input 
                              type="date" 
                              value={recurringDate}
                              onChange={(e) => setRecurringDate(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                        )}

                        {photoPreview === 'no-photo' ? (
                          <button 
                            onClick={() => cameraInputRef.current?.click()}
                            className="flex flex-col items-center justify-center gap-2 w-full py-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold hover:bg-gray-50 transition"
                          >
                            <Camera size={24} className="text-gray-400" />
                            <span>Tirar foto ao talão (A IA preenche por ti)</span>
                          </button>
                        ) : (
                          <div className="relative h-40 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                            <img src={photoPreview} alt="Talão" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                              <span className="text-white text-xs font-bold flex items-center gap-1"><Brain size={14}/> IA Pronta para Analisar</span>
                            </div>
                            <button 
                              onClick={() => setPhotoPreview('no-photo')}
                              className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}

                        <button 
                          onClick={handleFinanceSubmit}
                          disabled={isAnalyzing || (isRecurring && !recurringDate)}
                          className={`w-full py-4 rounded-xl font-bold text-white transition flex justify-center items-center gap-2 mt-2
                            ${isAnalyzing || (isRecurring && !recurringDate) ? 'bg-gray-300' : 'bg-emerald-600 active:scale-95'}`}
                        >
                          {isAnalyzing ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> A analisar talão...</>
                          ) : (
                            photoPreview !== 'no-photo' ? 'Analisar Talão com IA' : 'Registar na Carteira'
                          )}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  // --- LÓGICA DE TREINO E NOTAS ---
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                      {currentAction === 'Treino' ? 'Regista o teu exercício (ex: Supino, 3 séries com 80kg).' : 'Escreve aqui o que não queres esquecer.'}
                    </p>
                    <textarea 
                      value={inputText} onChange={(e) => setInputText(e.target.value)}
                      placeholder="Escreve aqui..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                    />
                    <button 
                      onClick={() => {
                        setIsAnalyzing(true);
                        setTimeout(() => {
                          alert(`Registo de ${currentAction} guardado com sucesso!`);
                          resetModal();
                        }, 1000);
                      }}
                      disabled={isAnalyzing}
                      className={`w-full py-4 rounded-xl font-bold text-white transition flex justify-center items-center gap-2
                        ${currentAction === 'Treino' ? 'bg-blue-600' : 'bg-purple-600'}
                        ${isAnalyzing ? 'opacity-70' : 'active:scale-95'}`}
                    >
                      {isAnalyzing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Guardar Registo'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}