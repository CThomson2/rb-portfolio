// Import UI components for tooltips and avatars
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Arrow } from "@radix-ui/react-tooltip";

/**
 * ProjectManager Component
 *
 * Displays a project manager's avatar with a tooltip showing their full name.
 * The avatar shows the manager's image if available, or their initials as a fallback.
 *
 * @param {string} name - The full name of the project manager
 * @returns A tooltip-enabled avatar component
 */
const ProjectManager = ({ name }: { name: string }) => {
  return (
    <TooltipProvider>
      {/* Tooltip with 100ms delay before showing */}
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          {/* Square avatar with manager's image */}
          <Avatar className="w-7 h-7 rounded-md">
            <AvatarImage src="https://github.com/shadcn.png" />
            {/* Fallback shows initials from first and last name */}
            <AvatarFallback>
              {(() => {
                try {
                  return name[0] && name.split(" ")[1][0];
                } catch (error) {
                  return "___"; // Return underscores if name parsing fails
                }
              })()}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        {/* Tooltip displays full name below the avatar */}
        <TooltipContent side="bottom" className="bg-gray-900 text-base">
          <Arrow />
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProjectManager;
