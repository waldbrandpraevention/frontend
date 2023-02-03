export enum DroneEventType {
  SMOKE = 1,
  FIRE = 2,
}

export type DroneEvent = {
  /**
   * Drone ID
   */
  drone_id: number,
  /**
   * Type of the event
   */
  type: DroneEventType,
  /**
   * Timestamp of the event
   */
  timestamp: Date,
  /**
   * Longitude of the event
   */
  long: number,
  /**
   * Latitude of the event
   */
  lat: number,
  /**
   * Confidence of the AI
   */
  confidence: number,
  /**
   * URL for actual drone image
   */
  picture_path: string,
  /**
   * URL for AI image
   */
  ai_path: string,
}