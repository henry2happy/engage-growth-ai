
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back to the dashboard.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="default" 
          size="lg"
          onClick={() => navigate('/')}
        >
          Go to Dashboard
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
      
      <div className="mt-16 text-sm text-muted-foreground">
        <p>Need help? Contact support@engageai.com</p>
      </div>
    </div>
  );
};

export default NotFound;
