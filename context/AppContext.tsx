"use client";
/* ═══════════════════════════════════════
   APP CONTEXT — Global State Provider
   Replaces: currentUser, activeClinicId, activeFrame,
   showFrame(), loginSuccess(), switchClinic(),
   showToast(), updateAllForClinic(), darkMode
═══════════════════════════════════════ */
import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { User, Role, ClinicId, FrameId, Toast, ToastType, Notification } from '@/lib/types';
import { ROLE_PERMISSIONS, AI_FRAME_IDS, FRAME_TITLES } from '@/lib/role-permissions';
import { DEMO_USERS, CLINICS_DATA, INITIAL_NOTIFICATIONS } from '@/lib/constants';

// ── State Shape ──
interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  authError: string;
  authTab: 'login' | 'signup';

  // Navigation
  activeFrame: FrameId;
  aiSubmenuOpen: boolean;

  // Clinic
  activeClinicId: ClinicId;

  // Cross-frame
  currentPatient: string;

  // UI
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  darkMode: boolean;
  toasts: Toast[];
  notifications: Notification[];

  // Setup
  setupCompleted: boolean;
}

// ── Actions ──
type AppAction =
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR'; message: string }
  | { type: 'SET_AUTH_TAB'; tab: 'login' | 'signup' }
  | { type: 'CLEAR_AUTH_ERROR' }
  | { type: 'SHOW_FRAME'; frame: FrameId }
  | { type: 'TOGGLE_AI_SUBMENU' }
  | { type: 'SWITCH_CLINIC'; clinicId: ClinicId }
  | { type: 'SET_CURRENT_PATIENT'; patientId: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_MOBILE_SIDEBAR' }
  | { type: 'CLOSE_MOBILE_SIDEBAR' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'REMOVE_TOAST'; id: number }
  | { type: 'MARK_NOTIF_READ'; id: string }
  | { type: 'MARK_ALL_NOTIF_READ' }
  | { type: 'SET_SETUP_COMPLETED' };

// ── Initial State ──
const initialState: AppState = {
  currentUser: null,
  isAuthenticated: false,
  authError: '',
  authTab: 'login',
  activeFrame: 'dashboard',
  aiSubmenuOpen: false,
  activeClinicId: 'rawalpindi',
  currentPatient: 'ayesha',
  sidebarOpen: true,
  mobileSidebarOpen: false,
  darkMode: false,
  toasts: [],
  notifications: [...INITIAL_NOTIFICATIONS],
  setupCompleted: false,
};

// ── Reducer ──
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.user,
        isAuthenticated: true,
        authError: '',
        activeClinicId: action.user.clinic,
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'AUTH_ERROR':
      return { ...state, authError: action.message };
    case 'SET_AUTH_TAB':
      return { ...state, authTab: action.tab, authError: '' };
    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: '' };
    case 'SHOW_FRAME': {
      // Role guard (original: showFrame line 1912)
      if (state.currentUser) {
        const allowed = ROLE_PERMISSIONS[state.currentUser.role] || [];
        if (!allowed.includes(action.frame)) return state;
      }
      // Toggle AI submenu state
      const isAiFrame = AI_FRAME_IDS.includes(action.frame);
      return {
        ...state,
        activeFrame: action.frame,
        aiSubmenuOpen: isAiFrame ? true : state.aiSubmenuOpen,
      };
    }
    case 'TOGGLE_AI_SUBMENU':
      return { ...state, aiSubmenuOpen: !state.aiSubmenuOpen };
    case 'SWITCH_CLINIC':
      return { ...state, activeClinicId: action.clinicId };
    case 'SET_CURRENT_PATIENT':
      return { ...state, currentPatient: action.patientId };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'TOGGLE_MOBILE_SIDEBAR':
      return { ...state, mobileSidebarOpen: !state.mobileSidebarOpen };
    case 'CLOSE_MOBILE_SIDEBAR':
      return { ...state, mobileSidebarOpen: false };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    case 'MARK_NOTIF_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case 'MARK_ALL_NOTIF_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };
    case 'SET_SETUP_COMPLETED':
      return { ...state, setupCompleted: true };
    default:
      return state;
  }
}

// ── Context Type ──
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;

  // Convenience actions (replacing original global functions)
  doLogin: (email: string, password: string) => void;
  doSignup: (name: string, email: string, password: string, role: Role, clinic: ClinicId) => void;
  demoLogin: (role: Role) => void;
  doLogout: () => void;
  showFrame: (frame: FrameId) => void;
  switchClinic: (clinicId: ClinicId) => void;
  showToast: (message: string, type?: ToastType) => void;
  openPatientTimeline: (patientId: string) => void;
  setCurrentPatient: (patientId: string) => void;
  canAccess: (frame: FrameId) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

// ── Toast counter ──
let _toastId = 0;

// ── Provider ──
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ── doLogin (original: doLogin, L1789) ──
  const doLogin = useCallback((email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!e || !password) {
      dispatch({ type: 'AUTH_ERROR', message: 'Enter email and password.' });
      return;
    }
    const u = DEMO_USERS[e];
    if (!u || u.password !== password) {
      dispatch({ type: 'AUTH_ERROR', message: 'Incorrect email or password.' });
      return;
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: { name: u.name, email: u.email, role: u.role, clinic: u.clinic, initials: u.initials, roleLabel: u.roleLabel },
    });
  }, []);

  // ── doSignup (original: doSignup, L1790) ──
  const doSignup = useCallback((name: string, email: string, password: string, role: Role, clinic: ClinicId) => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      dispatch({ type: 'AUTH_ERROR', message: 'All fields required. Password min 6 chars.' });
      return;
    }
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const roleLabels: Record<Role, string> = { admin: 'Admin', doctor: 'Doctor', receptionist: 'Receptionist' };
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: { name, email, role, clinic, initials, roleLabel: roleLabels[role] },
    });
  }, []);

  // ── demoLogin (original: demoLogin, L1791) ──
  const demoLogin = useCallback((role: Role) => {
    const demoMap: Record<Role, string> = {
      admin: 'admin@herbamed.pk',
      doctor: 'doctor@herbamed.pk',
      receptionist: 'recep@herbamed.pk',
    };
    const u = DEMO_USERS[demoMap[role]];
    if (!u) return;
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: { name: u.name, email: u.email, role: u.role, clinic: u.clinic, initials: u.initials, roleLabel: u.roleLabel },
    });
  }, []);

  // ── doLogout ──
  const doLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  // ── showFrame (original: showFrame, L1910–1993, 90 lines) ──
  const showFrame = useCallback((frame: FrameId) => {
    dispatch({ type: 'SHOW_FRAME', frame });
    dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' });
    // Scroll content to top (original: showFrame line 1969)
    requestAnimationFrame(() => {
      const content = document.querySelector('.content');
      if (content) content.scrollTop = 0;
      else window.scrollTo(0, 0);
    });
  }, []);

  // ── switchClinic (original: switchClinic) ──
  const switchClinic = useCallback((clinicId: ClinicId) => {
    dispatch({ type: 'SWITCH_CLINIC', clinicId });
  }, []);

  // ── showToast (original: showToast / toast, called 107+ times) ──
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++_toastId;
    dispatch({ type: 'ADD_TOAST', toast: { id, message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id }), 2500);
  }, []);

  // ── openPatientTimeline (original: openPatientTimeline, called 21 times) ──
  const openPatientTimeline = useCallback((patientId: string) => {
    dispatch({ type: 'SET_CURRENT_PATIENT', patientId });
    dispatch({ type: 'SHOW_FRAME', frame: 'patient_timeline' });
  }, []);

  // ── setCurrentPatient ──
  const setCurrentPatient = useCallback((patientId: string) => {
    dispatch({ type: 'SET_CURRENT_PATIENT', patientId });
  }, []);

  // ── canAccess ──
  const canAccess = useCallback((frame: FrameId): boolean => {
    if (!state.currentUser) return false;
    const allowed = ROLE_PERMISSIONS[state.currentUser.role] || [];
    return allowed.includes(frame);
  }, [state.currentUser]);

  // ── Dark mode persistence (original: localStorage 'hm-dark') ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hm-dark');
      if (saved === '1') dispatch({ type: 'TOGGLE_DARK_MODE' });
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', state.darkMode);
    try { localStorage.setItem('hm-dark', state.darkMode ? '1' : '0'); } catch {}
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{
      state, dispatch,
      doLogin, doSignup, demoLogin, doLogout,
      showFrame, switchClinic, showToast,
      openPatientTimeline, setCurrentPatient, canAccess,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ──
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
