
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Plus, 
  BarChart, 
  MessageSquare, 
  Settings, 
  Users,
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active && "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarProps {
  currentPath: string;
}

const Sidebar = ({ currentPath }: SidebarProps) => {
  const navigate = useNavigate();
  
  const handleCreatePost = () => {
    navigate('/posts', { state: { openCreateDialog: true } });
  };
  
  return (
    <div className="bg-sidebar h-screen flex flex-col border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <span className="gradient-text">EngageAI</span>
        </h1>
        <p className="text-sidebar-foreground/60 text-sm mt-1">Smart social management</p>
      </div>
      
      <div className="mt-2 px-3">
        <Button 
          className="w-full bg-gradient-brand hover:opacity-90" 
          size="lg"
          onClick={handleCreatePost}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <nav className="mt-6 px-3 space-y-1">
        <SidebarItem 
          icon={<Calendar className="h-5 w-5" />} 
          label="Calendar" 
          href="/" 
          active={currentPath === "/"}
        />
        <SidebarItem 
          icon={<FileText className="h-5 w-5" />} 
          label="Posts" 
          href="/posts" 
          active={currentPath === "/posts"}
        />
        <SidebarItem 
          icon={<BarChart className="h-5 w-5" />} 
          label="Analytics" 
          href="/analytics"
          active={currentPath === "/analytics"} 
        />
        <SidebarItem 
          icon={<MessageSquare className="h-5 w-5" />} 
          label="Engagement" 
          href="/engagement"
          active={currentPath === "/engagement"} 
        />
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          label="Audience" 
          href="/audience"
          active={currentPath === "/audience"} 
        />
      </nav>

      <div className="mt-auto px-3 mb-6">
        <SidebarItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          href="/settings"
          active={currentPath === "/settings"} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
