import { useState } from 'react'
import type { Design } from '../types/design'
import type { Device, Section } from '../types/site'

/**
 * Editor UI state, deliberately separate from the document.
 * The document (`design.document`) is the persisted source of truth;
 * this hook only holds ephemeral view state. Future additions (undo/redo
 * history, drag state, zoom) belong here or in a reducer alongside it.
 */
export function useEditorState(design: Design) {
  const [device, setDevice] = useState<Device>('desktop')
  const [pageIndex, setPageIndex] = useState(0)
  const page = design.document.pages[pageIndex] ?? design.document.pages[0]
  const [selectedId, setSelectedId] = useState<string | null>(page?.sections[1]?.id ?? null)
  const selected: Section | undefined = page?.sections.find((s) => s.id === selectedId)

  return { device, setDevice, pageIndex, setPageIndex, page, selectedId, setSelectedId, selected }
}
