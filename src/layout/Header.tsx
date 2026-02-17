import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="fixed z-10 w-full bg-white/90 backdrop-blur-lg">
      <div className="m-auto max-w-360 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* Note: Unfortunately, the API recipe images are low resolution, so there isn’t much I can do about that. If this were a production-ready application, we would use higher-resolution assets. */}
          <img src="/delicimo.svg" alt="Delicimo logo" className="w-9" />
          <span className="text-2xl font-semibold">Delicimo</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
