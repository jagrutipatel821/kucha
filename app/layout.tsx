import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "Kucha Enterprise",
  description:
    "Kucha Enterprise is a trusted supplier of industrial hardware, hydraulic fittings, power tools, fasteners, and equipment in Ankleshwar, Gujarat.",
  
  icons: {
    icon: "/favicon.png",           // ✅ Main favicon
    shortcut: "/favicon.png",       // ✅ Shortcut for browsers
    apple: "/favicon.png",          // ✅ For Apple devices
  },
  keywords: [
    "industrial hardware",
    "hydraulic fittings",
    "power tools",
    "fasteners",
    "industrial supplier",
    "Ankleshwar",
    "Gujarat",
    "Kucha Enterprise",
  ],


  openGraph: {
    title: "Kucha Enterprise – Industrial Hardware Supplier",
    description:
      "Premium industrial tools & hydraulic fittings in Ankleshwar, Gujarat.",
    url: "https://kuchaenterprise.com",
    siteName: "Kucha Enterprise",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kucha Enterprise",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kucha Enterprise",
    description:
      "Trusted industrial hardware supplier in Ankleshwar, Gujarat.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-gray-50`}>
        <ConditionalNavbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
