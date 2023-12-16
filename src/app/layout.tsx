import type { Metadata } from "next";
import { ReactQueryProvider } from "./util/reactQueryProvider";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Search your favrite city weather",
  icons: "/assets/sun-fill.svg"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
