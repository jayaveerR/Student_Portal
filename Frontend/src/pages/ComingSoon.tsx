import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const ComingSoon = () => {
  const { "*": path } = useParams();
  const pageName = path?.split("/").pop()?.replace(/-/g, " ") || "Page";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-4 opacity-0 animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-8">
            <Clock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 capitalize">
            {pageName}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Coming Soon...
          </p>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
