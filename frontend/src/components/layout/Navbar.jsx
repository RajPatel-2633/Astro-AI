import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User, Bell, X, LogOut, Settings, ChevronRight, Loader2, AlertTriangle, CheckCircle, Pencil, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import useTransitStore from '../../store/useTransitStore';

// ─── Bell / Notification Dropdown ────────────────────────────────────────────
const IMPACT_COLORS = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  positive: 'bg-green-100 text-green-700 border-green-200',
};

const BellDropdown = ({ onClose }) => {
  const { transits, userAlerts, isLoading, unsubscribeFromAlert, isSubscribing, isSubscribedTo, getAlertIdFor } = useTransitStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 gap-2 text-[#8B6E4A]">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading alerts...</span>
      </div>
    );
  }

  if (!transits || transits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2 text-[#8B6E4A]">
        <Bell className="w-6 h-6 opacity-40" />
        <p className="text-sm font-medium text-center">No upcoming transits found.<br />
          <span className="text-xs opacity-70">Check back after seeding the DB.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#C4A15A]/20">
      {/* My Active Alert Subscriptions */}
      {userAlerts.length > 0 && (
        <div className="pb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E4A] px-4 pt-3 pb-2">Your Active Alerts</p>
          {userAlerts.map(alert => {
            const transit = alert.transit_id;
            const name = transit?.title || 'Transit Alert';
            const impact = transit?.impact_level || 'medium';
            return (
              <div key={alert._id} className="flex items-center justify-between px-4 py-2 hover:bg-[#C4A15A]/10 transition-colors gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-[#4A3319] font-medium truncate">{name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold capitalize flex-shrink-0 ${IMPACT_COLORS[impact]}`}>{impact}</span>
                </div>
                <button
                  onClick={() => unsubscribeFromAlert(alert._id)}
                  disabled={isSubscribing}
                  className="text-[#8B6E4A] hover:text-red-600 transition-colors flex-shrink-0"
                  title="Unsubscribe"
                >
                  {isSubscribing ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upcoming Transits */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E4A] px-4 pt-3 pb-2">Upcoming Transits</p>
        {transits.slice(0, 4).map(transit => {
          const subscribed = isSubscribedTo(transit._id);
          const colors = IMPACT_COLORS[transit.impact_level] || IMPACT_COLORS.medium;
          return (
            <div key={transit._id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#C4A15A]/10 transition-colors">
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${subscribed ? 'text-green-600' : 'text-amber-600'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#4A3319] truncate">{transit.title}</p>
                <p className="text-xs text-[#8B6E4A] mt-0.5 line-clamp-2">{transit.description?.slice(0, 80)}...</p>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold capitalize flex-shrink-0 ${colors}`}>
                {transit.impact_level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── User Profile Dropdown ────────────────────────────────────────────────────
const UserDropdown = ({ onClose }) => {
  const { user, logout, updateUserProfile, isAuthLoading } = useAppStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/');
    onClose();
  };

  const handleStartEditName = () => {
    setEditName(user?.name || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    const ok = await updateUserProfile({ name: editName.trim() });
    if (ok) setIsEditingName(false);
  };

  return (
    <div>
      {/* User Info Header */}
      <div className="px-4 py-4 bg-gradient-to-b from-[#C4A15A]/20 to-transparent border-b border-[#C4A15A]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-[#EAD7A1]" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSaveName(); if (e.key === 'Escape') setIsEditingName(false); }}
                  className="flex-1 text-sm font-bold text-[#4A3319] bg-white/80 border border-[#C4A15A] rounded px-2 py-0.5 focus:outline-none min-w-0"
                  autoFocus
                />
                <button onClick={handleSaveName} disabled={isAuthLoading} className="text-green-600 hover:text-green-700 flex-shrink-0">
                  {isAuthLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setIsEditingName(false)} className="text-[#8B6E4A] hover:text-[#4A3319] flex-shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <p className="font-bold text-[#4A3319] text-sm truncate">{user?.name || 'Seeker'}</p>
                <button onClick={handleStartEditName} className="text-[#8B6E4A] hover:text-[#4A3319] transition-colors flex-shrink-0" title="Edit name">
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
            )}
            <p className="text-xs text-[#8B6E4A] truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          to="/chart"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3 hover:bg-[#C4A15A]/10 transition-colors group"
        >
          <span className="text-sm font-medium text-[#4A3319]">My Birth Chart</span>
          <ChevronRight className="w-4 h-4 text-[#8B6E4A] group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link
          to="/compatibility"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-3 hover:bg-[#C4A15A]/10 transition-colors group"
        >
          <span className="text-sm font-medium text-[#4A3319]">Kundli Matching</span>
          <ChevronRight className="w-4 h-4 text-[#8B6E4A] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-[#C4A15A]/20 py-2">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left group"
        >
          {isLoggingOut
            ? <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            : <LogOut className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 transition-transform" />
          }
          <span className="text-sm font-medium text-red-600">{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    </div>
  );
};

// ─── Reusable Dropdown Wrapper ────────────────────────────────────────────────
const NavDropdown = ({ trigger, children, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div className={`absolute top-full mt-3 w-80 bg-[#FBF3E2] border border-[#C4A15A]/40 rounded-2xl shadow-2xl shadow-[#8B6E4A]/20 overflow-hidden z-[200] ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation();
  const { userAlerts } = useTransitStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const unreadCount = userAlerts?.length || 0;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/chart', label: 'Birth Chart' },
    { to: '/compatibility', label: 'Compatibility' },
    { to: '/history', label: 'History' },
  ];

  return (
    <nav className="w-full sticky top-0 z-[100] bg-[#EBD6A7]/80 backdrop-blur-lg border-b border-[#C4A15A]/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EBD6A7]/80 to-transparent pointer-events-none"></div>

      <div className="w-full px-[4vw] relative z-10">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/dashboard" className="font-serif text-gold-3d font-bold tracking-wide text-[clamp(1.5rem,3vw,2.5rem)]">
              Astro AI
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8">
            {[
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/chart', label: 'Birth Chart' },
              { to: '/compatibility', label: 'Compatibility' },
              { to: '/history', label: 'History' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 text-sm font-bold transition-all ${isActive(to)
                    ? 'text-[#8A5A2B] border-b-[3px] border-[#8A5A2B]'
                    : 'text-[#8A5A2B]/70 hover:text-[#8A5A2B]'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">

            {/* Bell — Transit Alerts Dropdown */}
            <NavDropdown
              align="right"
              trigger={
                <button className="relative drop-shadow-md hover:drop-shadow-lg transition-all text-[#C19E63] hover:text-[#D8BD8A] cursor-pointer">
                  <Bell className="w-6 h-6 fill-current" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 rounded-full border-2 border-[#EBD6A7] flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
              }
            >
              {(close) => (
                <div>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#C4A15A]/20">
                    <h3 className="font-serif font-bold text-[#4A3319] text-base">Cosmic Alerts</h3>
                    <button onClick={close} className="text-[#8B6E4A] hover:text-[#4A3319] transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-h-[420px] overflow-y-auto">
                    <BellDropdown onClose={close} />
                  </div>
                </div>
              )}
            </NavDropdown>

            {/* User Avatar — Profile Dropdown */}
            <NavDropdown
              align="right"
              trigger={
                <button className="w-10 h-10 rounded-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                  <User className="w-5 h-5 text-[#EAD7A1]" strokeWidth={2} />
                </button>
              }
            >
              {(close) => <UserDropdown onClose={close} />}
            </NavDropdown>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#8A5A2B] cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-[#FBF3E2] shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-[#8C642A] font-bold text-2xl">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#8B6E4A]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-bold text-lg transition-all ${isActive(to)
                      ? 'bg-[#C4A15A] text-[#FFF5E1]'
                      : 'text-[#8B6E4A] hover:bg-[#C4A15A]/10'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-[#C4A15A]/20">
              <UserDropdown onClose={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
