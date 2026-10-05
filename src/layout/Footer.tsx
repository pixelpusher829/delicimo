const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="border-t border-neutral-100 print:hidden">
      <div className="m-auto flex max-w-360 flex-col justify-between gap-2 px-4 py-8 text-sm text-neutral-600 sm:flex-row sm:px-6">
        <span>© {year} Delicimo</span>
        <span>
          Recipe data from{" "}
          <a
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-neutral-900"
          >
            Spoonacular
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
