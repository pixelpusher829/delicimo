const Banner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-blue-50 p-8 text-center">
      <div className="flex max-w-65 flex-col items-center justify-center gap-6">
        <span className="text-3xl font-semibold text-[#2889cf]">
          Hey Medavie, we’d work well together.
        </span>
        <span className="text-xl text-[#6cacda]">
          A tasteful nudge from your future teammate. 😉
        </span>
      </div>
    </div>
  );
};

export default Banner;
