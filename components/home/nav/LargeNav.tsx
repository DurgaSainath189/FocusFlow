import { LocaleSwitcher } from "@/components/switchers/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { Focus } from "lucide-react";
import Link from "next/link";

export const LargeNav = () => {
  return (
    <div className="container md:flex py-4 max-w-screen-2xl items-center justify-between hidden">
      <div className="flex items-center">
        <Link className="group" href={"/"}>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <Focus className="w-10 h-10" />
            <p className="text-2xl font-semibold">
              Focus<span className="text-primary"> Flow</span>
            </p>
          </div>
        </Link>
        <div className="ml-10 flex gap-2 items-center">
          <p>lorem</p>
          <p>lorem</p>
          <p>lorem</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            className="border-b inline-block border-transparent hover:border-primary duration-200 transition-colors"
            href={"/sign-in"}
          >
            Log in
          </Link>
          <Link
            className={`${buttonVariants({ variant: "default" })}`}
            href={"/sign-up"}
          >
            Sign up
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
          <ThemeSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
        </div>
      </div>
    </div>
  );
};
