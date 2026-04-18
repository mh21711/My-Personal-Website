"use client"

import { createContext, useContext } from "react"

interface LocaleContextType {
  locale: "en" | "ar"
  isRTL: boolean
  setLocale: (locale: "en" | "ar") => void
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  isRTL: false,
  setLocale: () => {},
})

export const useLocale = () => useContext(LocaleContext)