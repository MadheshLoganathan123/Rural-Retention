import { useState, useEffect } from "react";
import DashboardSidebar, { applications } from "./DashboardSidebar";
import ApplicationFrame from "./ApplicationFrame";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeApp, setActiveApp] = useState("pedagogy");
  const isMobile = useIsMobile();

  // Load last active application on mount
  useEffect(() => {
    const lastActiveApp = localStorage.getItem('lastActiveApp');
    if (lastActiveApp && applications.find(app => app.id === lastActiveApp)) {
      setActiveApp(lastActiveApp);
    }
  }, []);

  const currentApp = applications.find(app => app.id === activeApp);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar 
        activeApp={activeApp}
        onAppSelect={setActiveApp}
        onLogout={onLogout}
      />
      
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : ''}`}>
        {currentApp && (
          <ApplicationFrame
            title={currentApp.title}
            url={currentApp.url}
            isActive={true}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;