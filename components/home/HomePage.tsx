import { Header } from "./header/Header";
import { Nav } from "./nav/Nav";

export const HomePage = () => {
  return (
    <>
      <Nav />
      <div className="w-full mx-auto max-w-screen-xl px-2 sm:px-6">
        <Header />
      </div>
    </>
  );
};
