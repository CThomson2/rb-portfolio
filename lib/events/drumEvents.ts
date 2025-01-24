import { EventEmitter } from "events";

/**
 * DrumEventEmitter: A singleton class for managing real-time drum status updates
 *
 * This code creates a system for broadcasting drum status changes across the app:
 *
 * 1. It uses Node's built-in EventEmitter to handle pub/sub events
 * 2. It's a singleton, meaning only one instance exists globally
 * 3. Used by:
 *    - API routes to emit status changes
 *    - Components to listen for updates
 *
 * Example usage:
 *
 * // Emit a status change:
 * drumEvents.emit('statusChange', { drumId: 123, newStatus: 'available' })
 *
 * // Listen for changes:
 * drumEvents.on('statusChange', ({ drumId, newStatus }) => {
 *   // Handle the change
 * })
 */
class DrumEventEmitter extends EventEmitter {
  // Store the single instance
  private static instance: DrumEventEmitter;

  // Private constructor prevents direct instantiation
  private constructor() {
    super();
  }

  // Public method to access the single instance
  public static getInstance(): DrumEventEmitter {
    if (!DrumEventEmitter.instance) {
      DrumEventEmitter.instance = new DrumEventEmitter();
    }
    return DrumEventEmitter.instance;
  }
}

// Export the singleton instance
export const drumEvents = DrumEventEmitter.getInstance();
