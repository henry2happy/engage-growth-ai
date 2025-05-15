
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const AiAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setPrompt("");
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-1 rounded text-sm">AI</span> Content Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
          <p className="font-medium">Generate content by asking me:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>"Create 3 tweet ideas about our new product launch"</li>
            <li>"Write an engaging Instagram caption for this photo"</li>
            <li>"Suggest trending hashtags for tech startups"</li>
            <li>"Draft a LinkedIn post about our recent milestone"</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Ask AI to create content for you..."
            className="min-h-24 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          AI will adapt to your brand voice
        </p>
        <Button 
          type="submit"
          size="sm"
          disabled={!prompt.trim() || isGenerating}
          className={isGenerating ? "animate-pulse-slow" : ""}
          onClick={handleSubmit}
        >
          {isGenerating ? "Generating..." : "Generate"} 
          <Send className="h-3.5 w-3.5 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiAssistant;
