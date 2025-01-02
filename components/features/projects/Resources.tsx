/**
 * ProjectResources Component
 *
 * Displays a count of project resources in a circular badge with a tooltip that shows the full list.
 * When hovering over the badge, a tooltip appears showing all resource names in a vertical list.
 *
 * Features:
 * - Shows total count of resources in a gray circular badge
 * - Tooltip appears on hover with 100ms delay
 * - Tooltip displays "Resources" header and full list of resource names
 * - Styled with consistent dark theme and indigo accents
 *
 * @param {string[]} resources - Array of resource names to display
 * @returns A tooltip-enabled badge component showing resource count and details
 */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";

const ProjectResources = ({ resources }: { resources: string[] }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          {/* Badge showing total resource count */}
          <div className="bg-gray-200 h-7 w-7 items-center justify-center flex rounded-md">
            {resources.length}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-gray-900 text-base p-4">
          <Arrow />
          <div className="flex flex-col gap-1">
            {/* Tooltip header */}
            <p className="text-indigo-200 uppercase text-sm mb-3">Resources</p>
            {/* List of all resource names */}
            {resources.map((resource) => (
              <p key={resource} className="text-base">
                {resource}
              </p>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProjectResources;
