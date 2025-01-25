import { EventEmitter } from "events";

/**
 * DrumEventEmitter: A strongly-typed singleton class for managing real-time drum status updates
 *
 * This class extends Node's EventEmitter to provide type-safe event handling across the app:
 *
 * Key Features:
 * 1. Type-safe events defined by DrumEvents interface:
 *    - drumStatus: Emitted when a drum's status changes
 *    - orderUpdate: Emitted when an order's received quantity changes
 *
 * 2. Singleton pattern ensures one global event bus
 *
 * 3. Generic type constraints ensure type safety:
 *    - emit<K>: Can only emit events defined in DrumEvents
 *    - on<K>: Can only listen to defined events with correct parameters
 *    - off<K>: Type-safe event unsubscription
 *
 * Example usage:
 *
 * // Emit a drum status change (type-checked):
 * drumEvents.emit('drumStatus', 123, 'available')
 *
 * // Listen for changes (parameters are type-checked):
 * drumEvents.on('drumStatus', (drumId, newStatus) => {
 *   // TypeScript knows drumId is number, newStatus is string
 * })
 *
 * Note: When using with SSE (Server-Sent Events), ensure event names match
 * between the SSE endpoint and DrumEvents interface. The SSE connection
 * should emit events that this emitter can then broadcast locally.
 */

declare interface DrumEvents {
  drumStatus: (drumId: number, newStatus: string) => void;
  orderUpdate: (
    orderId: number,
    drumId: number,
    newQuantityReceived: number
  ) => void;
}

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

  emit<K extends keyof DrumEvents>(
    event: K,
    ...args: Parameters<DrumEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }

  on<K extends keyof DrumEvents>(event: K, listener: DrumEvents[K]): this {
    return super.on(event, listener);
  }

  off<K extends keyof DrumEvents>(event: K, listener: DrumEvents[K]): this {
    return super.off(event, listener);
  }
}

// Export the singleton instance
export const drumEvents = DrumEventEmitter.getInstance();
