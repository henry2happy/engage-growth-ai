
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart } from "@/components/ui/custom-charts";
import { Badge } from "@/components/ui/badge";

const engagementData = [
  { name: "Jan", likes: 423, comments: 140, shares: 80 },
  { name: "Feb", likes: 528, comments: 207, shares: 110 },
  { name: "Mar", likes: 602, comments: 285, shares: 124 },
  { name: "Apr", likes: 790, comments: 345, shares: 182 },
  { name: "May", likes: 903, comments: 408, shares: 231 },
];

const audienceData = [
  { name: "18-24", followers: 2340 },
  { name: "25-34", followers: 5240 },
  { name: "35-44", followers: 3280 },
  { name: "45-54", followers: 2110 },
  { name: "55+", followers: 950 },
];

const platformsData = [
  { platform: "Instagram", followers: 8540, growth: "+3.2%" },
  { platform: "Twitter", followers: 5230, growth: "+1.8%" },
  { platform: "LinkedIn", followers: 3870, growth: "+4.5%" },
  { platform: "Facebook", followers: 6240, growth: "+0.9%" },
  { platform: "TikTok", followers: 12640, growth: "+8.7%" },
];

const contentPerformanceData = [
  { type: "Images", engagement: 68 },
  { type: "Videos", engagement: 87 },
  { type: "Text", engagement: 42 },
  { type: "Links", engagement: 38 },
  { type: "Carousels", engagement: 72 },
];

const Analytics = () => {
  return (
    <DashboardLayout 
      title="Analytics" 
      subtitle="Track your growth and engagement"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {platformsData.map((item) => (
            <Card key={item.platform}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{item.platform}</p>
                    <p className="text-2xl font-bold">{item.followers.toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {item.growth}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <AreaChart 
                    data={engagementData}
                    categories={["likes", "comments", "shares"]}
                    index="name"
                    colors={["indigo", "rose", "amber"]}
                    valueFormatter={(value: number) => `${value.toLocaleString()}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <BarChart
                    data={audienceData}
                    index="name"
                    categories={["followers"]}
                    colors={["violet"]}
                    valueFormatter={(value: number) => `${value.toLocaleString()}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <BarChart
                    data={contentPerformanceData}
                    index="type"
                    categories={["engagement"]}
                    colors={["cyan"]}
                    valueFormatter={(value: number) => `${value}%`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-4">
            <Card className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Traffic source data coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">Industry Insights: {2025 + i} Trends</p>
                      <p className="text-sm text-muted-foreground">LinkedIn • {i + 2} days ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{(843 - i * 120).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Engagements</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="font-medium text-blue-700">Post more video content</p>
                  <p className="text-sm text-blue-600 mt-1">Videos are generating 87% more engagement on your profiles</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-100 rounded-md">
                  <p className="font-medium text-purple-700">Optimize posting time</p>
                  <p className="text-sm text-purple-600 mt-1">Try posting at 9:30 AM for better Instagram reach</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                  <p className="font-medium text-amber-700">Increase hashtag variety</p>
                  <p className="text-sm text-amber-600 mt-1">Add 3-5 more niche hashtags to improve discovery</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                  <p className="font-medium text-green-700">Boost trending post</p>
                  <p className="text-sm text-green-600 mt-1">Consider boosting your "Customer Testimonial" post</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
