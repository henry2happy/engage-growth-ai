
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart } from "@/components/ui/custom-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock audience data
const audienceGrowthData = [
  { date: "Jan", followers: 1240 },
  { date: "Feb", followers: 1580 },
  { date: "Mar", followers: 2390 },
  { date: "Apr", followers: 3490 },
  { date: "May", followers: 4920 },
];

const demographicsData = [
  { group: "18-24", percentage: 28 },
  { group: "25-34", percentage: 42 },
  { group: "35-44", percentage: 18 },
  { group: "45-54", percentage: 8 },
  { group: "55+", percentage: 4 },
];

const locationData = [
  { country: "United States", percentage: 42 },
  { country: "United Kingdom", percentage: 18 },
  { country: "Canada", percentage: 12 },
  { country: "Australia", percentage: 8 },
  { country: "Germany", percentage: 6 },
  { country: "Other", percentage: 14 },
];

const platformBreakdown = [
  { platform: "Instagram", followers: 8540, growth: "+3.2%" },
  { platform: "Twitter", followers: 5230, growth: "+1.8%" },
  { platform: "LinkedIn", followers: 3870, growth: "+4.5%" },
  { platform: "Facebook", followers: 6240, growth: "+0.9%" },
  { platform: "TikTok", followers: 12640, growth: "+8.7%" },
];

const Audience = () => {
  return (
    <DashboardLayout 
      title="Audience" 
      subtitle="Understand your followers and demographics"
    >
      <div className="space-y-6">
        {/* Platform overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {platformBreakdown.map((item) => (
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

        <Tabs defaultValue="growth" className="space-y-4">
          <TabsList>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="growth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <AreaChart 
                    data={audienceGrowthData}
                    categories={["followers"]}
                    index="date"
                    colors={["indigo"]}
                    valueFormatter={(value: number) => `${value.toLocaleString()}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <BarChart
                    data={demographicsData}
                    index="group"
                    categories={["percentage"]}
                    colors={["violet"]}
                    valueFormatter={(value: number) => `${value}%`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <BarChart
                    data={locationData}
                    index="country"
                    categories={["percentage"]}
                    colors={["cyan"]}
                    valueFormatter={(value: number) => `${value}%`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interests" className="space-y-4">
            <Card className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Interest data coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Audience Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="font-medium text-blue-700">Best time to post</p>
                  <p className="text-sm text-blue-600 mt-1">Your audience is most active on weekdays between 6-8 PM</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-100 rounded-md">
                  <p className="font-medium text-purple-700">Content preference</p>
                  <p className="text-sm text-purple-600 mt-1">Video content receives 2.3x more engagement than image posts</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                  <p className="font-medium text-amber-700">Engagement trend</p>
                  <p className="text-sm text-amber-600 mt-1">Questions in captions increase comments by 45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Engaged Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-muted-foreground">@alexj • 24 interactions</p>
                    </div>
                    <Button variant="outline" size="sm">Follow Back</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Audience;
