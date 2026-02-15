const Instructions: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4 text-3xl">Instructions</h2>
      <ul className="flex flex-col gap-6">
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            1
          </span>
          <p className="leading-8">
            Begin by cooking the rice noodles according to the package
            directions. Bring a pot of water to a boil, add the noodles, and
            cook until they are just tender. Drain them well and set them aside
            while you prepare the rest of the dish.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            2
          </span>
          <p className="leading-8">
            Heat a large pan or wok over medium‑high heat and add a small amount
            of oil. Once the oil is hot, add the minced garlic and grated
            ginger. Cook for about 30 seconds, stirring constantly, until the
            mixture becomes fragrant but not browned.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            3
          </span>
          <p className="leading-8">
            Add the shrimp, mussels, and squid rings to the pan. Sauté the
            seafood for a few minutes, stirring occasionally, until the shrimp
            turn pink and the mussels begin to open. Discard any mussels that
            remain closed.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            4
          </span>
          <p className="leading-8">
            Pour in the vegetable broth, soy sauce, and fish sauce. Stir
            everything together and let the mixture simmer gently for 2–3
            minutes so the flavors can blend and the seafood can finish cooking.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            5
          </span>
          <p className="leading-8">
            Add the cooked noodles to the pan and toss them thoroughly to coat
            them in the broth and seasonings. Make sure the noodles are evenly
            mixed with the seafood.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            6
          </span>
          <p className="leading-8">
            Stir in the lime juice, chili flakes, and sesame oil. Taste and
            adjust the seasoning if needed. Once everything is well combined and
            heated through, remove the pan from the heat.
          </p>
        </li>
        <li className="flex gap-4 text-xl">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-[Lora] text-white">
            7
          </span>
          <p className="leading-8">
            Garnish the dish with sliced green onions and serve immediately
            while the noodles are warm and the seafood is tender.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
