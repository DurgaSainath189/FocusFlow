import { Header } from "./header/Header";
import { Nav } from "./nav/Nav";
import { Section } from "./section/Section";
import { TextSection } from "./section/TextSection";

export const HomePage = () => {
  return (
    <>
      <Nav />
      <div className="w-full mx-auto max-w-screen-xl px-2 sm:px-6">
        <Header />
        <main>
          <TextSection
            title="your new best buddy"
            desc="lorem......................"
          />
          <Section />
          <Section reverse />
          <Section />
          <Section reverse />
          <TextSection
            title="your new best buddy"
            desc="lorem......................"
          />
        </main>
      </div>
    </>
  );
};
