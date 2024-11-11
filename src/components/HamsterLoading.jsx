const HamsterLoading = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 z-30">
      <svg viewBox="25 25 50 50" className="loading">
        <circle r="20" cy="50" cx="50" className="loading"></circle>
      </svg>
    </section>
  );
};

export default HamsterLoading;
