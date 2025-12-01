import React, { useEffect} from 'react';
import {BrowserRouter,Routes,Route,Navigate,useLocation,useNavigate,useParams} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ItemForm } from './pages/ItemForm';
import { ItemDetails } from './pages/ItemDetails';
import { PublicShared } from './pages/PublicShared';
import { Settings } from './pages/Settings';
import { AppShell } from './components/layout/AppShell';
import { Spinner } from './components/ui/Spinner';

type View ='landing'| 'login'| 'signup'| 'dashboard'| 'new'| 'edit'| 'item'| 'settings'| 'shared';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppRouter() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getViewFromPath = (pathname: string): View => {
    if (pathname.startsWith('/shared/')) return 'shared';
    if (pathname === '/login') return 'login';
    if (pathname === '/signup') return 'signup';
    if (pathname === '/dashboard' || pathname === '/') return user ? 'dashboard' : 'landing';
    if (pathname === '/new') return 'new';
    if (pathname.startsWith('/edit')) return 'edit';
    if (pathname.startsWith('/item')) return 'item';
    if (pathname === '/settings') return 'settings';
    if (pathname === '/collections') return 'collections' as View;
    if (pathname === '/tags') return 'tags' as View;
    return 'landing';
  };

  const currentView = getViewFromPath(location.pathname);

  useEffect(() => {
    if (!loading && user && location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, location.pathname, navigate]);

  const isPublicRoute = currentView === 'landing' || currentView === 'login' || currentView === 'signup' || currentView === 'shared';
  
  if (isPublicRoute || !user) {
    return (
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing onGetStarted={() => navigate('/signup')} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onSwitchToSignup={() => navigate('/signup')} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup onSwitchToLogin={() => navigate('/login')} />} />
        <Route path="/shared/:slug" element={<PublicSharedWrapper />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AppShell currentView={currentView} onNavigate={(view: string, itemId?: string) => {
      switch (view) {
        case 'dashboard':
          navigate('/dashboard');
          break;
        case 'new':
          navigate('/new');
          break;
        case 'edit':
          if (itemId) navigate(`/edit/${itemId}`);
          break;
        case 'item':
          if (itemId) navigate(`/item/${itemId}`);
          break;
        case 'settings':
          navigate('/settings');
          break;
        default:
          navigate('/');
      }
    }}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard onNavigate={(v: string, id?: string) => {
                switch (v) {
                  case 'dashboard':
                    navigate('/dashboard');
                    break;
                  case 'new':
                    navigate('/new');
                    break;
                  case 'edit':
                    if (id) {
                      console.log('Navigating to edit page with id:', id);
                      navigate(`/edit/${id}`);
                    } else {
                      console.error('Edit navigation called without id');
                    }
                    break;
                  case 'item':
                    if (id) navigate(`/item/${id}`);
                    break;
                  case 'settings':
                    navigate('/settings');
                    break;
                  default:
                    navigate('/');
                }
              }} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <ItemForm key="new-item" onNavigate={() => navigate('/dashboard')} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditItemWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item/:id"
          element={
            <ProtectedRoute>
              <ItemDetailsWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Coming soon pages */}
        <Route
          path="/collections"
          element={
            <ProtectedRoute>
              <ComingSoon title="collections" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tags"
          element={
            <ProtectedRoute>
              <ComingSoon title="tags" />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

function EditItemWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('EditItemWrapper - id from params:', id);
  console.log('EditItemWrapper - current location:', location.pathname);
  
  if (!id) {
    console.error('EditItemWrapper: No id parameter found in URL, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <ItemForm 
      itemId={id} 
      onNavigate={(view: string) => {
        if (view === 'dashboard') {
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
      }} 
    />
  );
}

function ItemDetailsWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  if (!id) return <Navigate to="/dashboard" replace />;
  
  return (
    <ItemDetails 
      itemId={id} 
      onNavigate={(view: string, itemId?: string) => {
        switch (view) {
          case 'dashboard':
            navigate('/dashboard');
            break;
          case 'edit':
            if (itemId) navigate(`/edit/${itemId}`);
            break;
          case 'item':
            if (itemId) navigate(`/item/${itemId}`);
            break;
          default:
            navigate('/dashboard');
        }
      }} 
    />
  );
}

function PublicSharedWrapper() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/" replace />;
  return <PublicShared slug={slug} />;
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 capitalize">{title}</h1>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
