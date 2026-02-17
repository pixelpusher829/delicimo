const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="m-auto max-w-360 border-t border-neutral-100 py-8">
      <div className="flex justify-between gap-3 px-6 flex-row">
        <span>© {year} Delicimo</span>
        <span className="hidden text-center text-sm text-neutral-500 md:block">
          Hey Medavie! We’d work well together. Just saying. 😉
        </span>
        <span>Powered by Spoonacular API</span>
      </div>
    </footer>
  );
};

export default Footer;
