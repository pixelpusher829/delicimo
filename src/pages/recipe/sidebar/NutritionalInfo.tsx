import type { Nutrition } from "@/types";

interface NutritionalInfoProps {
  nutrition?: Nutrition;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ nutrition }) => {
  if (!nutrition) return null;

  const allowedNutrients = [
    "Calories",
    "Fat",
    "Saturated Fat",
    "Carbohydrates",
    "Net Carbohydrates",
    "Sugar",
    "Cholesterol",
    "Sodium",
    "Protein",
  ];

  const filteredNutrients =
    nutrition.nutrients?.filter((nutrient) =>
      allowedNutrients.includes(nutrient.name),
    ) || [];

  return (
    <div className="rounded-xl bg-neutral-50 p-6">
      <h2 className="mb-6 text-3xl">Nutritional Info</h2>
      <div className="flex flex-col gap-2">
        {filteredNutrients.map((nutrient, index) => (
          <div
            key={nutrient.name}
            className={`flex justify-between pb-3 ${
              index !== filteredNutrients.length - 1
                ? "border-b-2 border-b-neutral-100"
                : ""
            }`}
          >
            <span className="text-lg md:text-xl">{nutrient.name}</span>
            <span className="text-lg font-semibold md:text-xl">
              {Math.round(nutrient.amount)} {nutrient.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionalInfo;
