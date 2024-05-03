import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar";
import FiltersProvider from "@/core/context/filters";

// const inter = Inter({ subsets: ["latin"] });

// Metadata is key for SEO
export const metadata: Metadata = {
  title: "Mi app de finanzas",
  description: "Esta es la pagina de inicio de mi app de finanzas",
  keywords: "Next.js, TypeScript, Tailwind CSS, Finanzas personales",
  icons: {
    icon: "/myfiper.ico", // /public path
  },
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Thin, Regular, Medium, Bold
  style: ["normal", "italic"], // Normal, Italic
  subsets: ["latin"], // Latin
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* Nabvar for all pages */}
        <FiltersProvider>
          <Navbar />
          <div>{children}</div>
        </FiltersProvider>
      </body>
    </html>
  );
}
