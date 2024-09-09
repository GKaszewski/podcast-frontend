import { create } from 'zustand';
import { Podcast } from './types';

interface Store {
  audioElement: HTMLAudioElement | null;
  podcasts: Podcast[];
  currentPodcast: Podcast | null;
  currentTimestamp: number | null;
  endTimestamp: number | null;
  status: 'playing' | 'paused' | 'stopped';
  isOverlayVisible: boolean;
  view: 'home' | 'podcast-detail';

  setPodcasts(podcasts: Podcast[]): void;
  setCurrentPodcast(podcast: Podcast | null): void;
  setCurrentTimestamp(timestamp: number | null): void;
  setEndTimestamp(timestamp: number | null): void;
  setStatus(status: 'playing' | 'paused' | 'stopped'): void;
  setAudioElement(audioElement: HTMLAudioElement | null): void;
  setIsOverlayVisible(isOverlayVisible: boolean): void;
  setView(view: 'home' | 'podcast-detail'): void;

  play: () => void;
  pause: () => void;
  stop: () => void;
  seekTo: (timestamp: number) => void;
  togglePlayPause: () => void;
}

const useAppStore = create<Store>((set, get) => ({
  podcasts: [],
  currentPodcast: null,
  currentTimestamp: null,
  endTimestamp: null,
  status: 'stopped',
  audioElement: null,
  isOverlayVisible: false,
  view: 'home',

  setPodcasts: (podcasts) => set({ podcasts }),
  setCurrentPodcast: (currentPodcast) => set({ currentPodcast }),
  setCurrentTimestamp: (currentTimestamp) => set({ currentTimestamp }),
  setEndTimestamp: (endTimestamp) => set({ endTimestamp }),
  setStatus: (status) => set({ status }),
  setAudioElement: (audioElement) => set({ audioElement }),
  setIsOverlayVisible: (isOverlayVisible) => set({ isOverlayVisible }),
  setView: (view) => set({ view }),

  play: () => {
    const { audioElement, currentPodcast, status } = get();
    if (!audioElement || !currentPodcast) return;

    if (status === 'paused') {
      audioElement.play();
      set({ status: 'playing' });
    } else {
      audioElement.src = currentPodcast.audioUrl;
      audioElement.play();
      set({ status: 'playing' });
    }
  },
  pause: () => {
    const { audioElement, status } = get();
    if (!audioElement) return;

    if (status === 'playing') {
      audioElement.pause();
      set({ status: 'paused' });
    }
  },
  stop: () => {
    const { audioElement } = get();
    if (!audioElement) return;

    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.src = '';
    set({
      status: 'stopped',
      currentTimestamp: null,
      endTimestamp: null,
      currentPodcast: null,
    });
  },
  seekTo: (timestamp) => {
    const { audioElement } = get();
    if (!audioElement) return;

    audioElement.currentTime = timestamp;
  },
  togglePlayPause: () => {
    const { status } = get();
    if (status === 'playing') {
      get().pause();
    } else {
      get().play();
    }
  },
}));

export default useAppStore;
