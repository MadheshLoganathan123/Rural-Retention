import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  BarChart3, 
  MapPin, 
  Lightbulb, 
  Users, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import edupulseLogo from "@/assets/edupulse-logo.png";

export interface Application {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const applications: Application[] = [
  {
    id: 'pedagogy',
    title: 'AI Pedagogy Library',
    url: 'https://v0-rural-teacher-resource-app.vercel.app/',
    icon: BookOpen,
    description: 'Access teaching resources and methodologies'
  },
  {
    id: 'feedback',
    title: 'Data Driven Feedback System',
    url: 'https://educator-lens.lovable.app',
    icon: BarChart3,
    description: 'Analyze student performance and feedback'
  },
  {
    id: 'travel',
    title: 'Teacher Travel & Safety Assistant',
    url: 'https://teachtrav-qftkvv.manus.space/',
    icon: MapPin,
    description: 'Plan safe educational trips and excursions'
  },
  {
    id: 'lesson',
    title: 'Local Context Lesson Generator',
    url: 'https://local-context-lesson-ylic.bolt.host/',
    icon: Lightbulb,
    description: 'Create contextually relevant lesson plans'
  },
  {
    id: 'classifier',
    title: 'AI Teacher Classifier',
    url: 'https://teacher-scout.lovable.app/',
    icon: Users,
    description: 'Classify and organize teaching resources'
  }
];

interface DashboardSidebarProps {
  activeApp: string;
  onAppSelect: (appId: string) => void;
  onLogout: () => void;
}

const DashboardSidebar = ({ activeApp, onAppSelect, onLogout }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Save last active application
  useEffect(() => {
    localStorage.setItem('lastActiveApp', activeApp);
  }, [activeApp]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleAppSelect = (appId: string) => {
    onAppSelect(appId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const sidebarClass = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    : `${sidebarWidth} transition-all duration-300`;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 bg-card"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      )}

      {/* Sidebar */}
      <div className={`${sidebarClass} bg-sidebar border-r border-sidebar-border flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img 
              src={edupulseLogo} 
              alt="EduPulse AI" 
              className="h-8 w-auto"
            />
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">EduPulse AI</h1>
                <p className="text-xs text-sidebar-foreground/70">Teacher Portal</p>
              </div>
            )}
          </div>
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="mt-2 w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Menu className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Collapse</span>}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {applications.map((app) => {
            const IconComponent = app.icon;
            const isActive = activeApp === app.id;
            
            return (
              <Button
                key={app.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-auto p-3 ${
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${isCollapsed ? "px-2" : ""}`}
                onClick={() => handleAppSelect(app.id)}
              >
                <IconComponent className={`h-5 w-5 ${isCollapsed ? "mx-auto" : ""}`} />
                {!isCollapsed && (
                  <div className="text-left">
                    <div className="font-medium text-sm">{app.title}</div>
                    <div className="text-xs opacity-70">{app.description}</div>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="outline"
            onClick={onLogout}
            className={`w-full justify-start gap-3 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent ${
              isCollapsed ? "px-2" : ""
            }`}
          >
            <LogOut className={`h-4 w-4 ${isCollapsed ? "mx-auto" : ""}`} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;