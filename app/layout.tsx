import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-jp";
import "@/app/globals.css";

import type { LayoutProps } from "@/lib/types";

const title = "Next Hook Laboratory";
const description = "";
export const metadata: Metadata = {
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description,
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="ja">
      <body className="tracking-wider">{children}</body>
    </html>
  );
};

export default RootLayout;
