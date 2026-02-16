interface InstructionsProps {
  instructions: any[];
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
  const steps = instructions?.[0]?.steps || [];

  return (
    <div>
      <h2 className="mb-4 text-3xl">Instructions</h2>
      <ul className="flex flex-col gap-6">
        {steps.map((step: any) => (
          <li key={step.number} className="flex gap-4 text-xl">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
              {step.number}
            </span>
            <p className="leading-8">{step.step}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions;
