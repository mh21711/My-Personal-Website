"use client"

import { useState, useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import Header from "@/components/layout/Header"
import { LocaleContext } from "./context"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"en" | "ar">("en")
  const isRTL = locale === "ar"

  useEffect(() => {
    const stored = window.localStorage.getItem("locale");
    if (stored === "en" || stored === "ar") {
      // Use a timeout to avoid calling setState synchronously
      setTimeout(() => {
        setLocale(stored);
      }, 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    window.localStorage.setItem("locale", locale)
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, isRTL, setLocale }}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header locale={locale} onLocaleChange={setLocale} />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </SessionProvider>
    </LocaleContext.Provider>
  )
}