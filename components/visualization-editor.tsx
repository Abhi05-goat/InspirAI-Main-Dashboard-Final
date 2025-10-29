"use client"

import type React from "react"
import { useState, useRef } from "react"

interface Node {
  id: string
  label: string
  x: number
  y: number
}

interface Connection {
  id: string
  source: string
  target: string
}

interface VisualizationEditorProps {
  niche: string
  index: number
  onStateChange?: (state: VisualizationState) => void
}

export interface VisualizationState {
  niche: string
  nodes: Node[]
  connections: Connection[]
  timestamp: string
}

export default function VisualizationEditor({ niche, index, onStateChange }: VisualizationEditorProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", label: "Core Idea", x: 50, y: 50 },
    { id: "2", label: "Target Users", x: 20, y: 80 },
    { id: "3", label: "Key Features", x: 50, y: 80 },
    { id: "4", label: "Revenue Model", x: 80, y: 80 },
  ])
  const [connections, setConnections] = useState<Connection[]>([
    { id: "c1", source: "1", target: "2" },
    { id: "c2", source: "1", target: "3" },
    { id: "c3", source: "1", target: "4" },
  ])
  const [newNodeLabel, setNewNodeLabel] = useState("")
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [connectionMode, setConnectionMode] = useState(false)
  const [selectedForConnection, setSelectedForConnection] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const saveVisualizationState = (updatedNodes: Node[], updatedConnections: Connection[]) => {
    const state: VisualizationState = {
      niche,
      nodes: updatedNodes,
      connections: updatedConnections,
      timestamp: new Date().toISOString(),
    }
    onStateChange?.(state)
  }

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (connectionMode) {
      e.stopPropagation()
      if (!selectedForConnection) {
        setSelectedForConnection(nodeId)
      } else if (selectedForConnection !== nodeId) {
        const newConnection: Connection = {
          id: `c${Date.now()}`,
          source: selectedForConnection,
          target: nodeId,
        }
        const updatedConnections = [...connections, newConnection]
        setConnections(updatedConnections)
        saveVisualizationState(nodes, updatedConnections)
        setSelectedForConnection(null)
      }
      return
    }

    setDraggedNode(nodeId)
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const node = nodes.find((n) => n.id === nodeId)
      if (node) {
        setDragOffset({
          x: e.clientX - rect.left - (node.x / 100) * rect.width,
          y: e.clientY - rect.top - (node.y / 100) * rect.height,
        })
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100
      const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100

      const updatedNodes = nodes.map((node) =>
        node.id === draggedNode
          ? {
              ...node,
              x: Math.max(0, Math.min(100, newX)),
              y: Math.max(0, Math.min(100, newY)),
            }
          : node,
      )
      setNodes(updatedNodes)
      saveVisualizationState(updatedNodes, connections)
    }
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
  }

  const addNode = () => {
    if (newNodeLabel.trim()) {
      const newNode: Node = {
        id: Date.now().toString(),
        label: newNodeLabel,
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20,
      }
      const updatedNodes = [...nodes, newNode]
      setNodes(updatedNodes)
      saveVisualizationState(updatedNodes, connections)
      setNewNodeLabel("")
    }
  }

  const deleteNode = (id: string) => {
    const updatedNodes = nodes.filter((node) => node.id !== id)
    const updatedConnections = connections.filter((conn) => conn.source !== id && conn.target !== id)
    setNodes(updatedNodes)
    setConnections(updatedConnections)
    saveVisualizationState(updatedNodes, updatedConnections)
  }

  const deleteConnection = (id: string) => {
    const updatedConnections = connections.filter((conn) => conn.id !== id)
    setConnections(updatedConnections)
    saveVisualizationState(nodes, updatedConnections)
  }

  const updateNodeLabel = (id: string, newLabel: string) => {
    const updatedNodes = nodes.map((node) => (node.id === id ? { ...node, label: newLabel } : node))
    setNodes(updatedNodes)
    saveVisualizationState(updatedNodes, connections)
  }

  const getLineCoordinates = (sourceId: string, targetId: string) => {
    const source = nodes.find((n) => n.id === sourceId)
    const target = nodes.find((n) => n.id === targetId)
    if (!source || !target) return null

    return {
      x1: source.x,
      y1: source.y,
      x2: target.x,
      y2: target.y,
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">Mind Map Editor (Drag to Move)</h3>

        {/* Canvas Area */}
        <div
          ref={canvasRef}
          className="bg-blue-50 rounded-lg border-2 border-blue-200 p-4 min-h-96 relative overflow-auto"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg className="w-full h-96 absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
              </marker>
            </defs>
            {connections.map((conn) => {
              const coords = getLineCoordinates(conn.source, conn.target)
              if (!coords) return null
              return (
                <line
                  key={conn.id}
                  x1={`${coords.x1}%`}
                  y1={`${coords.y1}%`}
                  x2={`${coords.x2}%`}
                  y2={`${coords.y2}%`}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  opacity="0.6"
                />
              )
            })}
          </svg>

          <div className="relative z-10 space-y-2">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute bg-blue-100 border-2 rounded-lg px-3 py-2 text-sm text-blue-900 transition-all group ${
                  selectedForConnection === node.id
                    ? "border-green-500 bg-green-100 shadow-lg"
                    : "border-blue-400 hover:bg-blue-200 hover:shadow-md"
                } ${draggedNode === node.id ? "cursor-grabbing shadow-lg border-blue-600 bg-blue-200" : "cursor-grab"}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
              >
                <input
                  type="text"
                  value={node.label}
                  onChange={(e) => updateNodeLabel(node.id, e.target.value)}
                  className="bg-transparent text-blue-900 text-xs w-20 outline-none font-medium"
                  onMouseDown={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => deleteNode(node.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 border-2 border-red-600 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addNode()}
              placeholder="Add new node..."
              className="flex-1 px-3 py-2 rounded-lg bg-white border-2 border-blue-200 text-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={addNode}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition-all text-sm font-semibold"
            >
              Add Node
            </button>
          </div>

          <button
            onClick={() => {
              setConnectionMode(!connectionMode)
              setSelectedForConnection(null)
            }}
            className={`w-full px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all ${
              connectionMode ? "bg-green-600 hover:bg-green-700 shadow-md" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {connectionMode ? "✓ Connection Mode Active" : "Connect Nodes"}
          </button>

          {connections.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">Connections ({connections.length})</p>
              <div className="space-y-1">
                {connections.map((conn) => {
                  const source = nodes.find((n) => n.id === conn.source)
                  const target = nodes.find((n) => n.id === conn.target)
                  return (
                    <div
                      key={conn.id}
                      className="flex items-center justify-between text-xs text-blue-800 bg-white p-2 rounded border border-blue-100"
                    >
                      <span>
                        {source?.label} → {target?.label}
                      </span>
                      <button
                        onClick={() => deleteConnection(conn.id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
