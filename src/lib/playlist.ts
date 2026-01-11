/**
 * Calm Mind Playlist Configuration
 * Tracks for the iPod-style music player
 */

export interface Track {
  src: string;
  title: string;
  artist?: string;
}

// Helper function to generate title from filename
function getTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.mp3$/i, "")
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const calmMindPlaylist: Track[] = [
  {
    src: "/music/peaceful-mind.mp3",
    title: "Peaceful Mind",
    artist: "Lo-fi • Chill",
  },
  {
    src: "/music/calm-waters.mp3",
    title: "Calm Waters",
    artist: "Lo-fi • Chill",
  },
  {
    src: "/music/serene-thoughts.mp3",
    title: "Serene Thoughts",
    artist: "Lo-fi • Chill",
  },
  {
    src: "/music/quiet-moments.mp3",
    title: "Quiet Moments",
    artist: "Lo-fi • Chill",
  },
];

// Export helper for dynamic playlist generation
export function createPlaylistFromFiles(filenames: string[]): Track[] {
  return filenames.map((filename) => ({
    src: `/music/${filename}`,
    title: getTitleFromFilename(filename),
    artist: "Lo-fi • Chill",
  }));
}
