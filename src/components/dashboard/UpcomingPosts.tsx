
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock upcoming posts data
const upcomingPosts = [
  {
    id: "post1",
    title: "New Product Launch",
    platform: "Instagram",
    scheduledFor: "Today, 3:00 PM",
    status: "scheduled"
  },
  {
    id: "post2",
    title: "Customer Story: How XYZ improved...",
    platform: "LinkedIn",
    scheduledFor: "Tomorrow, 9:00 AM",
    status: "scheduled"
  },
  {
    id: "post3",
    title: "Weekly Tips & Tricks",
    platform: "Twitter",
    scheduledFor: "Wed, 11:30 AM",
    status: "scheduled"
  },
  {
    id: "post4",
    title: "Behind the scenes video",
    platform: "TikTok",
    scheduledFor: "Thu, 5:45 PM",
    status: "pending"
  }
];

// Platform icons
const platformIcons = {
  Instagram: "📸",
  Twitter: "🐦",
  LinkedIn: "💼",
  TikTok: "🎵",
  Facebook: "📱"
};

const UpcomingPosts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-lg">
                  {platformIcons[post.platform as keyof typeof platformIcons]}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{post.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {post.platform} • {post.scheduledFor}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`
                  ${post.status === "scheduled" ? "bg-status-scheduled text-white" : ""}
                  ${post.status === "pending" ? "bg-status-pending text-white" : ""}
                `}
              >
                {post.status === "scheduled" ? "Scheduled" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
