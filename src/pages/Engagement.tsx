
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/ui/custom-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock engagement data
const engagementData = [
  { date: "Jan 1", likes: 145, comments: 28, shares: 12 },
  { date: "Jan 2", likes: 132, comments: 19, shares: 8 },
  { date: "Jan 3", likes: 187, comments: 35, shares: 22 },
  { date: "Jan 4", likes: 210, comments: 41, shares: 25 },
  { date: "Jan 5", likes: 176, comments: 32, shares: 18 },
  { date: "Jan 6", likes: 230, comments: 45, shares: 30 },
  { date: "Jan 7", likes: 310, comments: 67, shares: 48 },
];

const recentComments = [
  {
    id: 1,
    author: "Emma Wilson",
    handle: "@emmaw",
    comment: "Love this content! Really helpful tips that I can immediately apply.",
    time: "2 hours ago",
    likes: 24,
    post: "Industry Insights: 2025 Trends",
    platform: "LinkedIn"
  },
  {
    id: 2,
    author: "Michael Scott",
    handle: "@michaelscott",
    comment: "This is exactly what our team needed. Thank you for sharing!",
    time: "4 hours ago",
    likes: 18,
    post: "Weekly Tips & Tricks",
    platform: "Twitter"
  },
  {
    id: 3,
    author: "Sarah Johnson",
    handle: "@sarahj",
    comment: "The visuals in this post are stunning! What tools do you use?",
    time: "6 hours ago",
    likes: 15,
    post: "New Product Launch",
    platform: "Instagram"
  },
  {
    id: 4,
    author: "David Chang",
    handle: "@davidchang",
    comment: "I've implemented these strategies and seen a 30% increase already!",
    time: "1 day ago",
    likes: 42,
    post: "Customer Testimonial",
    platform: "Facebook"
  },
];

const Engagement = () => {
  return (
    <DashboardLayout 
      title="Engagement" 
      subtitle="Monitor and respond to audience interactions"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-rose-500" />
                <div>
                  <p className="text-2xl font-bold">3,245</p>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">842</p>
                  <p className="text-sm text-muted-foreground">Total Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Share className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">512</p>
                  <p className="text-sm text-muted-foreground">Total Shares</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[350px]">
              <AreaChart 
                data={engagementData}
                categories={["likes", "comments", "shares"]}
                index="date"
                colors={["rose", "blue", "green"]}
                valueFormatter={(value: number) => `${value}`}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="comments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="messages">Direct Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search comments..." className="max-w-sm" />
              <Button variant="outline">Search</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4">
                      <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0"></div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{comment.author}</p>
                              <p className="text-sm text-muted-foreground">{comment.handle}</p>
                              <Badge variant="outline" className="text-xs">{comment.platform}</Badge>
                            </div>
                            <p className="mt-1">{comment.comment}</p>
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <p>On "{comment.post}"</p>
                              <span className="mx-2">•</span>
                              <p>{comment.time}</p>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                <Heart className="h-3.5 w-3.5 mr-1" />
                                {comment.likes}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentions">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Your recent mentions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Your direct messages will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Engagement;
