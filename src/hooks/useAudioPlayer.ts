"use client";

/**
 * useAudioPlayer - Custom hook for managing HTML5 audio playback
 * Handles play/pause, track navigation, seeking, and time tracking
 */

import { useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/playlist";

interface UseAudioPlayerProps {
  playlist: Track[];
}

interface UseAudioPlayerReturn {
  // State
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrackIndex: number;
  currentTrack: Track | null;

  // Controls
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setTrack: (index: number) => void;
}

export function useAudioPlayer({
  playlist,
}: UseAudioPlayerProps): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Initialize audio element (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Load track when index changes
  useEffect(() => {
    if (!audioRef.current || !playlist[currentTrackIndex]) return;

    const audio = audioRef.current;
    const wasPlaying = !audio.paused;

    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    // Resume playback if it was playing before
    if (wasPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, playlist]);

  // Set up event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Auto-advance to next track
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [playlist.length]);

  // Control functions
  const play = () => {
    audioRef.current?.play().catch(() => {
      setIsPlaying(false);
    });
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const next = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prev = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    );
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setTrack = (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    currentTrackIndex,
    currentTrack: playlist[currentTrackIndex] || null,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setTrack,
  };
}
