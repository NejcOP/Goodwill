import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goodwill.example.com"),
  title: {
    default: "GOODWILL — Udobni luksuz",
    template: "%s — GOODWILL",
  },
  description:
    "GOODWILL je premium blagovna znamka oblačil iz naravnih materialov, narejenih za dolgo življenjsko dobo. Brezčasen, minimalen, skandinavsko-avstralski obalni luksuz.",
  keywords: [
    "GOODWILL",
    "premium oblačila",
    "luksuzna moda",
    "minimalistična moda",
    "naravni materiali",
  ],
  openGraph: {
    title: "GOODWILL — Udobni luksuz",
    description:
      "Naravni materiali. Narejeno za dolgo življenjsko dobo. Odkrijte kolekcijo GOODWILL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
