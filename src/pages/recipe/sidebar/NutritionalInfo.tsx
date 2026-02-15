const NutritionalInfo: React.FC = () => {
  return (
    <div className="p-6 rounded-xl bg-neutral-50" >
      <h2 className="mb-6 text-3xl">Nutritional Info</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Calories</span>
          <span className="text-xl font-semibold">219.9 kcal</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Total Fat</span>
          <span className="text-xl font-semibold">12.5 g</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Saturated Fat</span>
          <span className="text-xl font-semibold">2.5 g</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Cholesterol</span>
          <span className="text-xl font-semibold">37.4 mg</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Sodium</span>
          <span className="text-xl font-semibold">120.3 mg</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Potassium</span>
          <span className="text-xl font-semibold">32.8 mg</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Total Carbohydrate</span>
          <span className="text-xl font-semibold">22.3 g</span>
        </div>
        <div className="flex justify-between border-b-neutral-100 border-b-2 pb-3">
          <span className="text-xl">Sugars</span>
          <span className="text-xl font-semibold">8.4 g</span>
        </div>
        <div className="flex justify-between ">
          <span className="text-xl">Protein</span>
          <span className="text-xl font-semibold">7.9 g</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionalInfo;
