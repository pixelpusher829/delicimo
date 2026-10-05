import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Root = () => {
  const navigation = useNavigation();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      {/* Thin progress bar while a lazy route chunk loads. */}
      {navigation.state === "loading" && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-brand" />
      )}
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Root;
