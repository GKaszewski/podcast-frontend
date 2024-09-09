import useAppStore from '../lib/store';

const PodcastDetailView = () => {
  const { status, togglePlayPause } = useAppStore();

  const discStyle = `object-cover object-center rounded-full h-60 w-60 md:w-[calc(100vw/3)] md:h-[calc(100vw/3)] ${
    status === 'playing' ? 'animate-spin drop-shadow-glow' : ''
  }`;

  return (
    <section className="absolute flex flex-col items-center justify-center w-full h-full">
      <img
        className={discStyle}
        src="/avatar.png"
        alt="podcast cover"
        onClick={togglePlayPause}
        role="button"
      />
    </section>
  );
};

export default PodcastDetailView;
