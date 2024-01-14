import { Inter } from "next/font/google";
import "../assets/styles/globals.css";

import Providers from "../redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodSwip",
  description: "Commande de repas en ligne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"body"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
