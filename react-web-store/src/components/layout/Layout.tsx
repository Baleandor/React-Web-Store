import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import NavBar from "../navbar/NavBar";
import Toasts from "../ui/Toasts";

export default function Layout() {
  const isNavigating = useNavigation().state === "loading";

  return (
    <div className="flex min-h-dvh flex-col">
      {isNavigating && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-lime-400" />
      )}

      <NavBar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-lime-900 py-6 text-center text-sm text-lime-200/60">
        Dok Scrap Krumpa's Emporium · Product data from{" "}
        <a
          href="https://fakestoreapi.com"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          Fake Store API
        </a>
      </footer>

      <Toasts />
      <ScrollRestoration />
    </div>
  );
}
