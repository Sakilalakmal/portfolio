/**
 * Desktop Store - Zustand state management for windows
 */

import { create } from "zustand";

export interface WindowState {
  id: string;
  type: string;
  title: string;
  isMinimized: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface DesktopStore {
  // State
  windows: WindowState[];
  activeWindowId: string | null;

  // Actions
  openWindow: (window: Omit<WindowState, "isMinimized">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (window) =>
    set((state) => {
      // Check if window already exists
      const exists = state.windows.find((w) => w.id === window.id);
      if (exists) {
        // Focus existing window
        return {
          windows: state.windows.map((w) =>
            w.id === window.id ? { ...w, isMinimized: false } : w
          ),
          activeWindowId: window.id,
        };
      }
      // Add new window with default position if not provided
      const newWindow = {
        ...window,
        isMinimized: false,
        x: window.x ?? 100 + state.windows.length * 20, // Cascade effect
        y: window.y ?? 50 + state.windows.length * 20,
      };

      return {
        windows: [...state.windows, newWindow],
        activeWindowId: window.id,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: false } : w
      ),
      activeWindowId: id,
    })),

  focusWindow: (id) =>
    set((state) => ({
      activeWindowId: id,
      // Move focused window to end of array (top of z-index)
      windows: [
        ...state.windows.filter((w) => w.id !== id),
        ...state.windows.filter((w) => w.id === id),
      ],
    })),

  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    })),
}));
