import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { dark } from '@clerk/themes'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillUp AI - NextGen Learning Platform",
  description: "Generate personalized courses with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#06b6d4',
          colorBackground: '#0f172a'
        }
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
        >
          <Provider>
            {children}
          </Provider>

          <Toaster 
            theme="dark"
            position="top-center"
            toastOptions={{
              style: {
                background: "#020617",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 6px rgba(8,145,170,0.2)"
              }
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
