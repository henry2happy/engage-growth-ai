
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socialPlatforms = [
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "twitter", name: "Twitter", icon: "🐦" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "facebook", name: "Facebook", icon: "📱" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
];

const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log({
        title,
        content,
        platforms: selectedPlatforms,
        scheduledFor: selectedDate,
      });
      
      // Reset form and close dialog
      setTitle("");
      setContent("");
      setSelectedPlatforms([]);
      setSelectedDate(new Date());
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };
  
  const isValid = title.trim() !== "" && 
                 content.trim() !== "" && 
                 selectedPlatforms.length > 0 &&
                 selectedDate !== undefined;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create content to be shared across your social media platforms
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Post Title
              </label>
              <Input
                id="title"
                placeholder="Enter a title for your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Post Content
              </label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                className="min-h-32 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center justify-center">
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
                <p className="mb-2 text-sm font-medium">
                  Drag and drop an image or video
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PNG, JPG, GIF, or MP4 up to 10MB
                </p>
                <Button type="button" variant="outline" size="sm">
                  Select File
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Platforms</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {socialPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <Checkbox
                      id={`platform-${platform.id}`}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <label
                      htmlFor={`platform-${platform.id}`}
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="text-lg">{platform.icon}</span>
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Date and Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-1"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground">Time</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  >
                    <option value="9:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
