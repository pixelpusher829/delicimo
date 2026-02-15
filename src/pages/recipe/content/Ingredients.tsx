import { Circle } from "lucide-react";

const Ingredients: React.FC = () => {
  return (
    <div className="border-b border-neutral-100 pb-10">
      <h2 className="mb-4 text-3xl">Ingredients</h2>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">200g</span>&nbsp;rice noodles
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">150g</span>&nbsp;shrimp (peeled)
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">8-10</span>&nbsp;mussels
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">100g</span>&nbsp;squid rings
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">2 cloves</span>&nbsp;garlic (minced)
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1 tsp</span>&nbsp;ginger (grated)
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">2 tbsp</span>&nbsp;soy sauce
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1 tbsp</span>&nbsp;fish sauce
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1 tbsp</span>&nbsp;lime juice
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1/2 tsp</span>&nbsp;chilli flakes
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">2</span>&nbsp;green onions (sliced)
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1 tsp</span>&nbsp;sesame oil
          </span>
        </li>
        <li className="flex items-center gap-4 text-xl">
          <Circle />
          <span>
            <span className="font-bold">1 cup</span>&nbsp;vegetable oil
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Ingredients;
