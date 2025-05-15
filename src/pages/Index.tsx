
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import PlatformCards from "@/components/dashboard/PlatformCards";
import CalendarView from "@/components/dashboard/CalendarView";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import AiAssistant from "@/components/dashboard/AiAssistant";

const Index = () => {
  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Manage your social media presence"
    >
      <div className="space-y-6">
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlatformCards />
            <CalendarView />
          </div>
          
          <div className="space-y-6">
            <UpcomingPosts />
            <AiAssistant />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
