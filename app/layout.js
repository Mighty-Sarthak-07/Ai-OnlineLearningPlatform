import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillWorld - AI based learning platform",
  description: "An AI based learning platform to create and manage courses automatically",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
          {children}
          </Provider>
          <Toaster
            position="bottom-right"
            expand={false}
            visibleToasts={4}
            toastOptions={{
              unstyled: false,
              classNames: {
                toast: 'shadow-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
