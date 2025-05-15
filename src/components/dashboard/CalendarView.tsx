
import React from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock calendar data
const generateCalendarDays = () => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i - 3); // Start 3 days before today
    
    // Generate some random posts for each day
    const posts = [];
    const numPosts = Math.floor(Math.random() * 4); // 0-3 posts per day
    
    const platforms = ["Instagram", "Twitter", "LinkedIn", "TikTok"];
    const statuses = ["draft", "pending", "scheduled", "published"];
    
    for (let j = 0; j < numPosts; j++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      posts.push({ 
        id: `post-${i}-${j}`, 
        platform, 
        status,
        title: `${platform} Post ${j+1}`
      });
    }
    
    days.push({
      date,
      posts,
      isToday: i === 3, // The 4th day (index 3) is today
    });
  }
  
  return days;
};

const calendarDays = generateCalendarDays();

interface PostItemProps {
  post: {
    id: string;
    platform: string;
    status: "draft" | "pending" | "scheduled" | "published";
    title: string;
  }
}

const PostItem = ({ post }: PostItemProps) => {
  // Map status to colors
  const statusColors = {
    draft: "bg-status-draft",
    pending: "bg-status-pending",
    scheduled: "bg-status-scheduled",
    published: "bg-status-published"
  };
  
  return (
    <div 
      className={`calendar-post ${statusColors[post.status]} text-white`}
      title={`${post.title} (${post.status})`}
    >
      {post.title}
    </div>
  );
};

const CalendarView = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Content Calendar</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-status-draft text-white">Draft</Badge>
          <Badge variant="outline" className="bg-status-pending text-white">Pending</Badge>
          <Badge variant="outline" className="bg-status-scheduled text-white">Scheduled</Badge>
          <Badge variant="outline" className="bg-status-published text-white">Published</Badge>
        </div>
      </div>
      
      <div className="calendar-grid">
        {calendarDays.map((day) => (
          <div 
            key={day.date.toISOString()} 
            className={`calendar-day ${day.isToday ? 'border-primary border-2' : ''}`}
          >
            <div className="calendar-day-header">
              <div className="flex justify-between">
                <span>{format(day.date, "EEE")}</span>
                <span>{format(day.date, "d MMM")}</span>
              </div>
            </div>
            
            {day.posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CalendarView;
