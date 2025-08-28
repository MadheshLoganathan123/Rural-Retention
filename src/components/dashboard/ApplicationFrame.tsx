import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplicationFrameProps {
  title: string;
  url: string;
  isActive: boolean;
}

const ApplicationFrame = ({ title, url, isActive }: ApplicationFrameProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  if (!isActive) return null;

  return (
    <div className="flex-1 h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(url, '_blank')}
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Open in New Tab
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-background flex items-center justify-center z-10">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading {title}...</p>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={url}
        title={title}
        className="w-full h-[calc(100%-73px)] border-0"
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};

export default ApplicationFrame;