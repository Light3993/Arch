import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './components/auth/Login';
import { Licence } from './pages/Licence';
import { Master } from './pages/Master';
import { Concours } from './pages/Concours';
import { Annonces } from './pages/Annonces';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-[280px]' : 'ml-0'} p-4 md:p-8`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/licence" element={
                  <ProtectedRoute>
                    <Licence />
                  </ProtectedRoute>
                } />
                <Route path="/licence/:filiere" element={
                  <ProtectedRoute>
                    <Licence />
                  </ProtectedRoute>
                } />
                <Route path="/licence/:filiere/:semestre" element={
                  <ProtectedRoute>
                    <Licence />
                  </ProtectedRoute>
                } />
                <Route path="/master" element={
                  <ProtectedRoute>
                    <Master />
                  </ProtectedRoute>
                } />
                <Route path="/master/:parcours" element={
                  <ProtectedRoute>
                    <Master />
                  </ProtectedRoute>
                } />
                <Route path="/concours" element={<Concours />} />
                <Route path="/annonces" element={<Annonces />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;