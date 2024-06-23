import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../assets/styles/globals.css";
import Hotjar from "@/components/Hotjar";
import StoreProvider from "../redux/StoreProvider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});
const urwGeometric = localFont({
  src: [
    {
      path: "../../public/fonts/urw-geometric/URWGeometricThin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricExtraLight.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricLight.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricRegular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricMedium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricSemiBold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricExtraBold.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/urw-geometric/URWGeometricBlack.otf",
      weight: "900",
    },
  ],
  variable: "--font-urw-geometric",
});

const APP_NAME = "Foodswip";
const APP_DEFAULT_TITLE = "Foodswip";
const APP_TITLE_TEMPLATE = "%s - Foodswip";
const APP_DESCRIPTION = "Commandes de repas en ligne";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${(urwGeometric.variable, publicSans.variable)}`}
    >
      <body className={`body ${urwGeometric.className}`}>
        <Hotjar>
          <StoreProvider>{children}</StoreProvider>
        </Hotjar>
      </body>
    </html>
  );
}
