import featuredImage from "@/assets/placeholder.webp";

const RecipeHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-5xl my-6">Seafood Noodles</h1>
      <img className="aspect-21/9 object-cover rounded-3xl" src={featuredImage} alt="Featured" />
    </div>
  );
};

export default RecipeHeader;
