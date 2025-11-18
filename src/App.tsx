import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { ExcelPage } from "./components/ExcelPage";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { FinancialManagement } from "./components/FinancialManagement";
import { ExpenseModal } from "./components/ExpenseModal";
import { MemberManagement } from "./components/MemberManagement";
import { CalendarView } from "./components/CalendarView";
import { MessagesView } from "./components/MessagesView";
import { PermissionsManagement } from "./components/PermissionsManagement";
import { MobileApp } from "./components/MobileApp";
import { MemberMobileApp } from "./components/MemberMobileApp";
import { MemberDesktopView } from "./components/MemberDesktopView";
import { AdminNetworkDashboard } from "./components/AdminNetworkDashboard";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState<'admin' | 'member' | 'network-admin' | null>(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [showExcelPage, setShowExcelPage] = useState(false);
  const [waitlistData, setWaitlistData] = useState<{
    name: string;
    email: string;
    clubName: string;
    university: string;
    role: string;
    orgType: string;
  } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);
  const [showExpenseModal, setShowExpenseModal] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setActiveView("dashboard");
  };

  const handleRoleSelect = (role: 'admin' | 'member' | 'network-admin') => {
    setUserRole(role);
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <Dashboard
            user={user}
            onOpenExpenseModal={() => setShowExpenseModal(true)}
            onNavigateToFinances={() => setActiveView("finances")}
            onNavigateToMembers={() => setActiveView("members")}
            onNavigateToEvents={() => setActiveView("events")}
          />
        );
      case "finances":
        return (
          <FinancialManagement
            onOpenExpenseModal={() => setShowExpenseModal(true)}
          />
        );
      case "members":
        return <MemberManagement />;
      case "events":
        return <CalendarView />;
      case "messages":
        return <MessagesView />;
      case "permissions":
        return <PermissionsManagement />;
      default:
        return (
          <Dashboard
            user={user}
            onOpenExpenseModal={() => setShowExpenseModal(true)}
            onNavigateToFinances={() => setActiveView("finances")}
            onNavigateToMembers={() => setActiveView("members")}
            onNavigateToEvents={() => setActiveView("events")}
          />
        );
    }
  };

  // Show landing page first
  if (showLanding) {
    return (
      <>
        <LandingPage 
          onEnter={() => setShowLanding(false)} 
          onJoinWaitlist={(data) => {
            setWaitlistData(data);
            setShowLanding(false);
            setShowExcelPage(true);
          }}
        />
        <Toaster />
      </>
    );
  }

  // Show Excel page if sign up is selected or after waitlist submission
  if (showExcelPage) {
    return (
      <>
        <ExcelPage 
          onBackToLogin={() => {
            setShowExcelPage(false);
            setWaitlistData(null);
            // Return to landing page instead of login
            setShowLanding(true);
          }}
          waitlistData={waitlistData || undefined}
        />
        <Toaster />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Login 
          onLogin={handleLogin} 
          onSignUp={() => setShowExcelPage(true)}
        />
        <Toaster />
      </>
    );
  }

  // Role selection screen
  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="h-16 w-16 bg-[#122B5B] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">EX</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to EXCHKR</h1>
              <p className="text-muted-foreground">
                Select your role to continue
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleRoleSelect('network-admin')}
                className="w-full h-16 bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white text-lg"
              >
                <div className="text-left">
                  <p className="font-semibold">Network Admin</p>
                  <p className="text-xs opacity-90">Manage all clubs & organizations</p>
                </div>
              </Button>

              <Button
                onClick={() => handleRoleSelect('admin')}
                className="w-full h-16 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white text-lg"
              >
                <div className="text-left">
                  <p className="font-semibold">Club Officer</p>
                  <p className="text-xs opacity-90">Manage finances, members & events</p>
                </div>
              </Button>

              <Button
                onClick={() => handleRoleSelect('member')}
                variant="outline"
                className="w-full h-16 border-2 border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/5 text-lg"
              >
                <div className="text-left">
                  <p className="font-semibold">Club Member</p>
                  <p className="text-xs opacity-75">View events & connect with members</p>
                </div>
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              You can always switch roles from your profile
            </p>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <>
        {userRole === 'member' ? <MemberMobileApp /> : <MobileApp />}
        <Toaster />
      </>
    );
  }

  // Network Admin view
  if (userRole === 'network-admin') {
    return (
      <>
        <AdminNetworkDashboard />
        <Toaster />
      </>
    );
  }

  // Desktop view - Check if member role
  if (userRole === 'member') {
    return (
      <>
        <MemberDesktopView onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  // Admin/Officer Desktop view
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* EXCHKR brand background elements - Navy & Gold */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#122B5B]/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#c39a4e]/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#122B5B]/08 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#c39a4e]/08 rounded-full blur-2xl"></div>
        {/* Formal geometric accent */}
        <div className="absolute top-10 right-20 w-32 h-32 border border-[#122B5B]/10 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#c39a4e]/15 rotate-12 rounded-lg"></div>
      </div>

      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={handleLogout}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed(!sidebarCollapsed)
        }
      />

      <main className="flex-1 overflow-auto relative z-10">
        <div className="p-8">{renderContent()}</div>
      </main>

      <ExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
      />
      <Toaster />
    </div>
  );
}