import { Beef, BicepsFlexed, MilkOff, Shrimp } from "lucide-react";

const HealthInfo: React.FC = () => {
  return (
    <div className="col-span-2">
      <h2 className="mb-3 text-2xl">Health Info</h2>
      <div className="flex gap-8">
        <div className="flex items-center">
          <MilkOff className="mr-2 inline" />
          <span className="text-xl">Dairy-free</span>
        </div>
        <div className="flex items-center">
          <BicepsFlexed className="mr-2 inline" />
          <span className="text-xl">High Protein</span>
        </div>
        <div className="flex items-center">
          <Shrimp className="mr-2 inline" />
          <span className="text-xl">Contains Shellfish</span>
        </div>
        <div className="flex items-center">
          <Beef className="mr-2 inline" />
          <span className="text-xl">Non Vegan</span>
        </div>
      </div>
    </div>
  );
};

export default HealthInfo;
