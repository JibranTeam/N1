"use client";
import { useApp } from '@/context/AppContext';
import AuthScreen from '@/components/auth/AuthScreen';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import FrameRouter from '@/components/layout/FrameRouter';
import ToastContainer from '@/components/layout/ToastContainer';

export default function AppShell() {
  const { state, dispatch } = useApp();
  const { isAuthenticated, mobileSidebarOpen, activeFrame } = state;

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <>
      <Sidebar mobileOpen={mobileSidebarOpen} />
      <div className={`main-wrap page-${activeFrame}`}>
        <Topbar />
        <div className="content">
          <FrameRouter />
        </div>
      </div>
      <ToastContainer />
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="mobile-overlay show" onClick={() => dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' })}></div>
      )}
    </>
  );
}
