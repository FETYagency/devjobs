import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Root() {
  return (
    <main className="min-h-screen bg-[#F2F2F2] dark:bg-[#121721]">
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
}
