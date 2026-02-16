const year = new Date().getFullYear();

const Footer = () => {
	return (
    <footer className="m-auto max-w-360 border-t border-neutral-100 py-8">
      <div className="flex justify-between px-6">
        <span>© {year} Delicimo</span>
        <span className="text-neutral-500">
          Hey Medavie! we’d work well together. A tasteful nudge from your
          future teammate. 😉
        </span>
        <span>Powered by Spoonacular API</span>
      </div>
    </footer>
  );
};

export default Footer;
