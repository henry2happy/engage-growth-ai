
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import PostsList from "@/components/posts/PostsList";
import CreatePostDialog from "@/components/posts/CreatePostDialog";

const Posts = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <DashboardLayout title="Posts" subtitle="Create and manage your social content">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Content Library</h2>
            <p className="text-muted-foreground">Manage all your posts across platforms</p>
          </div>
          
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </div>
        
        <PostsList />
        <CreatePostDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Posts;
