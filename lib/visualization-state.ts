export interface VisualizationNode {
  id: string
  label: string
  x: number
  y: number
}

export interface VisualizationConnection {
  id: string
  source: string
  target: string
}

export interface VisualizationState {
  niche: string
  nodes: VisualizationNode[]
  connections: VisualizationConnection[]
  timestamp: string
}

/**
 * Serialize visualization state to JSON for database storage
 * @param state - The visualization state to serialize
 * @returns JSON string ready for database storage
 */
export function serializeVisualizationState(state: VisualizationState): string {
  return JSON.stringify(state, null, 2)
}

/**
 * Deserialize visualization state from JSON
 * @param jsonString - JSON string from database
 * @returns Parsed visualization state
 */
export function deserializeVisualizationState(jsonString: string): VisualizationState {
  return JSON.parse(jsonString)
}

/**
 * Export visualization state for API calls
 * @param state - The visualization state
 * @returns Object ready to send to backend/database
 */
export function exportVisualizationForDatabase(state: VisualizationState) {
  return {
    niche: state.niche,
    visualization_data: serializeVisualizationState(state),
    created_at: state.timestamp,
    node_count: state.nodes.length,
    connection_count: state.connections.length,
  }
}

/**
 * Validate visualization state structure
 * @param state - The state to validate
 * @returns true if valid, false otherwise
 */
export function isValidVisualizationState(state: unknown): state is VisualizationState {
  if (typeof state !== "object" || state === null) return false

  const s = state as Record<string, unknown>
  return (
    typeof s.niche === "string" &&
    Array.isArray(s.nodes) &&
    Array.isArray(s.connections) &&
    typeof s.timestamp === "string"
  )
}
