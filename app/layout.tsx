import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Flow",
  description:
    "Streamline your ideas, tasks, and collaboration for effortless productivity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
