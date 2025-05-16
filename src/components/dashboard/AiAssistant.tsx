
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Brain, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

interface AiResponse {
  id: string;
  content: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [responses, setResponses] = useState<AiResponse[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Store user prompt for context
    const userPrompt = prompt;
    setPrompt("");
    
    // Simulate AI generation with timed response
    setTimeout(() => {
      const generatedContent = generateResponse(userPrompt);
      
      // Create new response
      const newResponse: AiResponse = {
        id: crypto.randomUUID(),
        content: generatedContent,
        timestamp: new Date()
      };
      
      setResponses(prev => [...prev, newResponse]);
      setIsGenerating(false);
      toast({
        title: "Content generated",
        description: "Your AI content has been created successfully",
      });
    }, 1500);
  };
  
  // Simulate AI response generation based on prompt
  const generateResponse = (prompt: string): string => {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes("tweet") || promptLower.includes("twitter")) {
      return `📱 Here are 3 tweet ideas for your campaign:

1. "Ready to transform your social strategy? Our new AI tool analyzes engagement patterns to boost your reach by up to 40%. #SocialMediaTips #AIMarketing"

2. "The future of content creation is here! Try our platform's smart scheduling feature and watch your engagement soar. First-time users reporting 2x more clicks! #ContentStrategy"

3. "Behind every viral post is a solid strategy. Our analytics show that Tuesday at 2PM is your audience's most active time. Schedule your next big announcement then! #DataDrivenMarketing"`;
    } 
    
    if (promptLower.includes("instagram") || promptLower.includes("photo")) {
      return `📸 Instagram caption:

✨ Elevating your social media game one post at a time ✨

Our team has been working tirelessly to bring you content that resonates with your audience. This photo captures the essence of what we do - creating meaningful connections through strategic digital presence.

#SocialMediaStrategy #DigitalMarketing #ContentCreation #BrandGrowth`;
    }
    
    if (promptLower.includes("hashtag")) {
      return `🔍 Trending hashtags for tech startups:

#TechInnovation
#StartupLife
#AIRevolution
#FutureOfTech
#DisruptiveTech
#SaaSTribe
#TechEntrepreneur
#VentureCapital
#ProductDevelopment
#DigitalTransformation`;
    }
    
    if (promptLower.includes("linkedin")) {
      return `🔹 LinkedIn post draft:

Excited to announce that our team has reached a significant milestone this quarter! 🚀

We've successfully helped over 100 businesses increase their social media engagement by an average of 43% through our data-driven approach to content optimization.

The key to our success? A combination of AI-powered analytics and human creativity that ensures each post resonates with the target audience while maintaining authentic brand voice.

Thank you to our amazing clients who trusted us with their digital presence, and to our dedicated team who makes this magic happen daily.

#BusinessGrowth #SocialMediaSuccess #DigitalMarketing`;
    }
    
    // Default response
    return `Based on your request, I've created the following content:

"${prompt}"

This content is optimized for maximum engagement while maintaining your brand voice. Our analysis suggests this content has a high potential for user interaction and sharing.`;
  };
  
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-1 rounded text-sm">AI</span> 
          <span>Content Assistant</span>
          <Sparkles className="h-4 w-4 text-amber-500 ml-1" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {responses.length > 0 && (
          <div className="mb-4 space-y-3 max-h-[250px] overflow-y-auto">
            {responses.map((response) => (
              <div key={response.id} className="p-3 bg-muted/30 rounded-lg border">
                <div className="text-sm whitespace-pre-wrap">{response.content}</div>
                <div className="text-xs text-muted-foreground mt-2 text-right">
                  {response.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
          <p className="font-medium flex items-center">
            <Brain className="h-4 w-4 mr-2 text-primary" />
            Generate content by asking me:
          </p>
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
        
        {isGenerating && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              <p className="text-sm font-medium">Generating content...</p>
            </div>
            <Skeleton className="h-16 mt-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          AI will adapt to your brand voice
        </p>
        <Button 
          type="submit"
          size="sm"
          disabled={!prompt.trim() || isGenerating}
          className={isGenerating ? "opacity-70" : ""}
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
