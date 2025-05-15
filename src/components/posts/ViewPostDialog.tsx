
import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Heart, Share, Edit, Trash2 } from "lucide-react";

interface Post {
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
}

interface ViewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post | null;
}

const ViewPostDialog = ({ open, onOpenChange, post }: ViewPostDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // Initialize edit form when dialog opens with post data
  const handleDialogOpenChange = (open: boolean) => {
    if (open && post) {
      setEditedTitle(post.title);
      setEditedContent(post.content);
      setIsEditing(false);
    }
    onOpenChange(open);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving changes:", { 
      id: post?.id,
      title: editedTitle,
      content: editedContent 
    });
    setIsEditing(false);
    // Here you'd typically update the post in your state or backend
  };

  const handleDelete = () => {
    if (post) {
      console.log("Deleting post:", post.id);
      onOpenChange(false);
      // Here you'd typically delete the post from your state or backend
    }
  };

  if (!post) return null;

  const isPublished = post.status === "published";
  
  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {isEditing ? "Edit Post" : "Post Details"}
            </span>
            <Badge variant="outline" className={`${post.status === "published" ? "bg-status-published" : post.status === "scheduled" ? "bg-status-scheduled" : "bg-status-draft"} text-white`}>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {isPublished 
              ? `Published on ${format(new Date(post.scheduledFor), "MMMM d, yyyy 'at' h:mm a")}`
              : post.status === "scheduled" 
              ? `Scheduled for ${format(new Date(post.scheduledFor), "MMMM d, yyyy 'at' h:mm a")}`
              : "Draft created on " + format(new Date(), "MMMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="engagement" disabled={!isPublished}>
              {isPublished ? "Engagement" : "Engagement (after publishing)"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Post Title</label>
                  <Input
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Post Content</label>
                  <Textarea
                    id="content"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="min-h-32 resize-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground mt-2 whitespace-pre-line">{post.content}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.platforms.map(platform => (
                    <Badge variant="outline" key={platform}>
                      {platform}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="media">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {post.image ? (
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="max-h-64 mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-muted-foreground mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-muted-foreground">No media attached to this post</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="engagement">
            {isPublished ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <Heart className="h-6 w-6 mx-auto text-rose-500 mb-2" />
                    <p className="text-2xl font-bold">{post.engagement.likes}</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <MessageSquare className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{post.engagement.comments}</p>
                    <p className="text-sm text-muted-foreground">Comments</p>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <Share className="h-6 w-6 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">{post.engagement.shares}</p>
                    <p className="text-sm text-muted-foreground">Shares</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Recent Comments</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div>
                        <p className="text-sm font-medium">Jane Smith</p>
                        <p className="text-sm text-muted-foreground">Great insights! Thanks for sharing</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div>
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">I've been implementing these strategies with success!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Engagement data will be available after publishing</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center mt-4">
          <div>
            {!isEditing && (
              <Button variant="outline" className="text-red-500" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPostDialog;
