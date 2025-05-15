
import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "./PostCard";

// Mock post data
const mockPosts = [
  {
    id: "post1",
    title: "New Product Launch",
    content: "We're excited to announce our latest product...",
    image: null,
    platforms: ["Instagram", "Twitter", "LinkedIn"],
    scheduledFor: "2025-05-20T15:00:00",
    status: "scheduled",
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
  {
    id: "post2",
    title: "Industry Insights: 2025 Trends",
    content: "Our analysis of the top trends for 2025 shows...",
    image: null,
    platforms: ["LinkedIn"],
    scheduledFor: "2025-05-23T10:00:00",
    status: "draft",
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
  {
    id: "post3",
    title: "Customer Testimonial",
    content: "\"This product has completely changed our workflow!\" - Jane Smith, CEO",
    image: null,
    platforms: ["Instagram", "Facebook"],
    scheduledFor: "2025-05-16T09:00:00",
    status: "published",
    engagement: {
      likes: 243,
      comments: 18,
      shares: 32
    }
  },
  {
    id: "post4",
    title: "Weekly Tips & Tricks",
    content: "Here are 5 ways to improve your productivity this week...",
    image: null,
    platforms: ["Twitter", "LinkedIn"],
    scheduledFor: "2025-05-25T11:30:00",
    status: "scheduled",
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
];

const PostsList = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter posts based on active tab
  const filteredPosts = activeTab === "all" 
    ? mockPosts 
    : mockPosts.filter(post => post.status === activeTab);
  
  return (
    <Card>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="border-b px-6 py-3">
          <TabsList className="grid grid-cols-5 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="published" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="failed" className="mt-0">
            <div className="text-center py-8 text-muted-foreground">
              No failed posts
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default PostsList;
