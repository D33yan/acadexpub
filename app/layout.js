import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AcadExpub — Academic Journal & Manuscript Publishing Platform",
  description: "A professional academic publishing platform for peer-reviewed journals, manuscript submissions, and scholarly communication.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-accent/10 selection:text-accent">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
