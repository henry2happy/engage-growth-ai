
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Heart, MessageSquare, Share } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Platform icons mapping
const platformIcons: Record<string, string> = {
  Instagram: "📸",
  Twitter: "🐦",
  LinkedIn: "💼",
  Facebook: "📱",
  TikTok: "🎵",
};

// Status color mapping
const statusColors: Record<string, string> = {
  draft: "bg-status-draft text-white",
  scheduled: "bg-status-scheduled text-white",
  published: "bg-status-published text-white",
  failed: "bg-destructive text-destructive-foreground"
};

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    image: string | null;
    platforms: string[];
    scheduledFor: string;
    status: string;
    engagement: {
      likes: number;
      comments: number;
      shares: number;
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const isPublished = post.status === "published";
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={statusColors[post.status]}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <h3 className="font-medium truncate">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 h-10">
          {post.content}
        </p>
      </div>
      
      <CardContent className="p-0">
        <div className="flex items-center gap-1 px-4 pb-2">
          {post.platforms.map((platform) => (
            <span key={platform} title={platform}>
              {platformIcons[platform] || "📄"}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-2 border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {format(new Date(post.scheduledFor), "MMM d, h:mm a")}
        </div>
        
        {isPublished && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              {post.engagement.likes}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {post.engagement.comments}
            </span>
            <span className="flex items-center">
              <Share className="h-3 w-3 mr-1" />
              {post.engagement.shares}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
