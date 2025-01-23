import { EventEmitter } from "events";

// Create a singleton event emitter for drum status changes
class DrumEventEmitter extends EventEmitter {
  private static instance: DrumEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): DrumEventEmitter {
    if (!DrumEventEmitter.instance) {
      DrumEventEmitter.instance = new DrumEventEmitter();
    }
    return DrumEventEmitter.instance;
  }
}

export const drumEvents = DrumEventEmitter.getInstance();
