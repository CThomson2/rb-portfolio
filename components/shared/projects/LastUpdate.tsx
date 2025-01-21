// Component that displays a project's last update date with a tooltip
// The tooltip shows a note explaining the current project status
// Props:
// - date: string - The date of the last update to display

import { NotepadText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Arrow } from "@radix-ui/react-tooltip";

const ProjectLastUpdate = ({ date }: { date: string }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Tooltip wrapper */}
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          {/* Notepad icon that triggers the tooltip */}
          <TooltipTrigger>
            <NotepadText className="w-5 h-5 text-primary" />
          </TooltipTrigger>
          {/* Tooltip content showing the status note */}
          <TooltipContent side="bottom" className="bg-gray-900 w-96 text-base">
            <Arrow />
            This is a note, user fills in while changing the status, which
            explains the current project status.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* Display the last update date */}
      <p className="text-base font-light">{date}</p>
    </div>
  );
};

export default ProjectLastUpdate;
