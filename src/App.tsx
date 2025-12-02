import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ExcelPage } from "./components/ExcelPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [showExcelPage, setShowExcelPage] = useState(false);
  const [waitlistData, setWaitlistData] = useState<{
    name: string;
    email: string;
    clubName: string;
    university: string;
    role: string;
    orgType: string;
  } | null>(null);

  // Show Excel page if sign up is selected or after waitlist submission
  if (showExcelPage) {
    return (
      <>
        <ExcelPage 
          onBackToLogin={() => {
            setShowExcelPage(false);
            setWaitlistData(null);
          }}
          waitlistData={waitlistData || undefined}
        />
        <Toaster />
      </>
    );
  }

  // Always show landing page
  return (
    <>
      <LandingPage 
        onEnter={() => {}} 
        onJoinWaitlist={(data) => {
          setWaitlistData(data);
          setShowExcelPage(true);
        }}
      />
      <Toaster />
    </>
  );
}