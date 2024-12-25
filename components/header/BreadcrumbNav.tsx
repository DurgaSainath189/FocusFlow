"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next/link";

const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "security",
  "theme",
];

interface Props {
  addManualRoutes?: string[];
}

export const BreadcrumbNav = ({ addManualRoutes }: Props) => {
  const paths = usePathname();
  const pathNames = addManualRoutes
    ? addManualRoutes
    : paths
        .split("/")
        .filter(
          (path) => path !== "te" && path !== "workspace" && path.trim() !== ""
        );
  const t = useTranslations("ROUTES");
  if (pathNames.length > 1) {
    return (
      <div className="flex gap-0.5 items-center">
        {pathNames.map((link, i) => {
          const href = `/${pathNames.slice(0, i + 1).join("/")}`;
          return (
            <div className="flex flex-wrap items-center gap-0.5" key={i}>
              {i + 1 < pathNames.length ? (
                <>
                  <Link
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md sm:px-2 px-1 py-1 transition-colors duration-200 hover:bg-accent"
                    // href={
                    //   workspaceHref && pathNames.length - 1
                    //     ? workspaceHref
                    //     : href
                    // }
                    href={href}
                  >
                    {/* {availableRoutesWithTranslation.includes(link)
                          ? t(link.toUpperCase())
                          : link} */}
                    {t(link.toUpperCase())}
                  </Link>
                  <ChevronRight className="text-primary" />
                </>
              ) : (
                <p className="font-bold text-primary sm:px-2 px-1">
                  {availableRoutesWithTranslation.includes(link)
                    ? t(link.toUpperCase())
                    : link}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};
