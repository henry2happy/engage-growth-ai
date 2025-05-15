
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for connected platforms
const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    connected: true,
    accountName: "@yourbrand",
    followers: "12.5K",
    color: "from-pink-500 to-purple-500",
    icon: "📸"
  },
  {
    id: "twitter",
    name: "Twitter/X",
    connected: true,
    accountName: "@yourbrand",
    followers: "8.2K",
    color: "from-blue-400 to-blue-600",
    icon: "🐦"
  },
  {
    id: "tiktok",
    name: "TikTok",
    connected: false,
    color: "from-black to-gray-800",
    icon: "🎵"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    connected: true,
    accountName: "Your Brand",
    followers: "5.7K",
    color: "from-blue-700 to-blue-900",
    icon: "💼"
  }
];

const PlatformCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {platforms.map((platform) => (
        <Card key={platform.id} className="overflow-hidden border">
          <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-xl">{platform.icon}</span> 
                {platform.name}
              </CardTitle>
              {platform.connected ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                  Not Connected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            {platform.connected ? (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{platform.accountName}</p>
                <p className="font-medium">{platform.followers} followers</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Connect your {platform.name} account to manage posts</p>
            )}
          </CardContent>
          <CardFooter>
            {platform.connected ? (
              <Button variant="outline" size="sm" className="w-full">Manage Account</Button>
            ) : (
              <Button size="sm" className="w-full">Connect</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PlatformCards;
