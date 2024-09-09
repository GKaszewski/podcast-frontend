import { useEffect } from 'react';
import useAppStore from '../lib/store';
import { Podcast } from '../lib/types';
import PodcastList from './podcast-list';

const HomeView = () => {
  const { setPodcasts } = useAppStore();
  const initialPodcasts: Podcast[] = [
    {
      id: 1,
      title: 'Episode 1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 2,
      title: 'Episode 2',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 3,
      title: 'Episode 3',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];

  useEffect(() => {
    setPodcasts(initialPodcasts);
  }, []);

  return (
    <>
      <section className="flex items-center gap-2 p-8">
        <img
          className="object-cover object-center w-16 h-16 rounded-full select-none"
          src="/avatar.png"
          alt="avatar"
        />
        <h1 className="text-4xl text-white cursor-default hover:cool-text-gradient">
          Podcast
        </h1>
      </section>
      <section className="flex flex-col gap-2 w-full max-w-[600px] p-4">
        <h2 className="text-2xl text-white cursor-default hover:cool-text-gradient">
          Episodes
        </h2>
        <PodcastList podcasts={initialPodcasts} />
      </section>
    </>
  );
};

export default HomeView;
