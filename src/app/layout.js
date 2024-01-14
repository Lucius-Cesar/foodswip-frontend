import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../assets/styles/globals.css";

import Providers from "../redux/provider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});
const urwGeometric = localFont({
  src: [
    {
      path: "../../public/fonts/urw-geometric/URWGeometricRegular.otf",
    },

    {
      path: "../../public/fonts/urw-geometric/URWGeometricBlack.otf",
    },
    { path: "../../public/fonts/urw-geometric/URWGeometricExtraBold.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricExtraLight.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricHeavy.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricLight.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricHeavy.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricMedium.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricSemiBold.otf" },
    { path: "../../public/fonts/urw-geometric/URWGeometricThin.otf" },
  ],
  variable: "--font-urw-geometric",
});

export const metadata = {
  title: "FoodSwip",
  description: "Commande de repas en ligne",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${(urwGeometric.variable, publicSans.variable)}`}
    >
      <body className={"body"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
