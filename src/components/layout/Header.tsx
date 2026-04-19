"use client";

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { useState, useRef, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  Edit,
  Save,
  LogOut,
  User,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

interface HeaderProps {
  locale: "en" | "ar";
  onLocaleChange: (locale: "en" | "ar") => void;
}

// ============================================
// HEADER COMPONENT
// ============================================

export default function Header({ locale, onLocaleChange }: HeaderProps) {
  const { data: session, status, update } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const t = locale === "en" ? en.header : ar.header;  
  const isRTL = locale === "ar";
  const isAdmin = session?.user?.role === "admin";

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch unread email count for admins
  useEffect(() => {
    if (isAdmin) {
      const fetchUnreadCount = async () => {
        try {
          const res = await fetch("/api/emails/unread");
          if (res.ok) {
            const data = await res.json();
            setUnreadEmailCount(data.count || 0);
          }
        } catch (error) {
          console.error("Failed to fetch unread emails:", error);
        }
      };
      
      // Fetch immediately
      fetchUnreadCount();
      
      // Poll every 5 seconds
      const interval = setInterval(fetchUnreadCount, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize edit name from session
  useEffect(() => {
    if (session?.user?.name) {
      setEditName(session.user.name);
    }
  }, [session?.user?.name]);

  const handleThemeToggle = useCallback(() => {
    // 1. Create a style element to disable all transitions
    const disableTransitions = document.createElement("style");
    disableTransitions.innerHTML = `
      * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -ms-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(disableTransitions);

    // 2. Perform the actual theme swap
    setTheme(theme === "dark" ? "light" : "dark");

    // 3. Remove the style element after a tiny delay
    // This allows the theme to swap instantly without blinking,
    // then restores transitions so your scroll animations still work.
    setTimeout(() => {
      document.head.removeChild(disableTransitions);
    }, 0);
  }, [theme, setTheme]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // check size — 3MB limit
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxSize) {
      setError(true);
      setErrorMessage(t.error.imageTooLarge);
      e.target.value = ""; // reset the input
      return;
    }

    // convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImage(reader.result as string); // this is the base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(false);
    if (editName === "") {
      setError(true);
      setErrorMessage(t.error.nameRequired);
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          imageBase64: editImage, // base64 string or null
        }),
      });

      if (res.ok) {
        await update(); // refresh session without page reload
        setIsEditing(false);
        setEditImage(null);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to determine if a link is active
  const isActiveLink = (href: string) => {
    if (href === "#services") {
      return pathname === "/";
    }
    return pathname === href;
  };

  // Function to handle smooth scroll for services
  const handleServicesScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredNavLinks = [
    { href: "/", label: t.nav.homepage },
    { href: "#services", label: t.nav.services, onClick: handleServicesScroll, homepageOnly: true },
    { href: "/social", label: t.nav.socialMedia },
    { href: "/books", label: t.nav.books },
    { href: "/blogs", label: t.nav.blogs },
    { href: "/dashboard", label: t.nav.dashboard, adminOnly: true },
  ].filter((link) => {
    if (link.homepageOnly && pathname !== "/") return false;
    if (link.adminOnly && !isAdmin) return false;
    return true;
  });

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-header-border">
        <div className="container mx-auto h-full px-4" />
      </header>
    );
  }

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed top-0 left-0 right-0 z-50 border-b border-header-border transition-all duration-3000 animate"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
      <div className="container mx-auto h-16 px-4 md:px-4 lg:px-16 flex items-center justify-between">
        {/* LEFT SIDE - Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tight text-primary hover:text-primary-hover transition-colors"
        >
          {t.logo}
        </Link>

        {/* MIDDLE - Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {filteredNavLinks.map((link) => (
            link.href === "#services" ? (
              <button
                key={link.href}
                onClick={link.onClick}
                className="cursor-pointer text-sm font-medium transition-all duration-300 relative text-text-secondary hover:text-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative",
                  isActiveLink(link.href)
                    ? "hover:opacity-75 text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                    : "text-text-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* RIGHT SIDE - Controls */}
        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLocaleChange(locale === "en" ? "ar" : "en")}
            className="text-xs font-semibold px-3 mr-2"
          >
            {locale === "en" ? t.lang.ar : t.lang.en}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="mr-2"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Admin Email Icon */}
          {isAdmin && (
            <Link href="/dashboard/emails" className="relative">
              <Button variant="ghost" size="icon" aria-label="Emails">
                <Mail className="h-5 w-5" />
                {unreadEmailCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadEmailCount > 9 ? "9+" : unreadEmailCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* Auth Section */}
          {status === "loading" ? (
            <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
          ) : status === "authenticated" ? (
            <div className="relative">
              {/* Profile Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  "h-9 w-9 rounded-full overflow-hidden border-2 transition-colors cursor-pointer hover:border-primary",
                  dropdownOpen
                    ? "outline-none ring-2 ring-ring ring-offset-2"
                    : "",
                )}
                aria-label="Profile menu"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div
                  className={cn(
                    "absolute top-full mt-2 w-72 rounded-lg border border-border bg-popover p-4 shadow-lg z-60",
                    isRTL ? "left-0" : "right-0",
                  )}
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-border">
                        {editImage || session?.user?.image ? (
                          <Image
                            src={editImage || session?.user?.image || ""}
                            alt={session?.user?.name || "Profile"}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <User className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="cursor-pointer mt-2 text-xs text-primary hover:text-primary-hover flex items-center gap-1 justify-center w-full"
                          >
                            <Upload className="h-3 w-3" />
                            {t.profile.uploadImage}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Name & Email */}
                    <div className="text-center w-full">
                      {isEditing ? (
                        <div className="flex items-center gap-2 justify-center">
                          <Input
                            value={editName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setEditName(e.target.value)
                            }
                            className="h-8 text-center text-sm"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium text-foreground">
                            {session?.user?.name}
                          </span>
                          {isAdmin && (
                            <span>
                              {theme === "dark" ? (
                                <Image src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1774687957/verified_sk1kio.png" alt="Admin" className="h-4 w-4 text-blue-500 fill-white" width={20} height={20} />
                              ) : (
                                <Image src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1774687957/verify_yo234s.png" alt="Admin" className="h-4 w-4 text-blue-500 fill-white" width={20} height={20} />
                              )}
                            </span>
                          )}
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label={t.profile.edit}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {session?.user?.email}
                      </p>
                    </div>

                    {isEditing && error && (
                      <p className="text-xs text-red-500 flex items-center gap-1 justify-center w-full">
                        {errorMessage}
                      </p>
                    )}

                    {isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setEditName(session?.user?.name || "");
                          setEditImage(null);
                        }}
                        disabled={isSaving}
                        className="w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t.profile.cancel}
                      </Button>
                    )}

                    {/* Save Button (when editing) */}
                    {isEditing && (
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {t.profile.save}
                      </Button>
                    )}

                    {/* Sign Out */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.profile.signOut}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button size="sm" onClick={() => signIn("google")}>
              {t.auth.signIn}
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden z-70"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden border-t border-header-border bg-popover"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {filteredNavLinks.map((link) => (
              link.href === "#services" ? (
                <button
                  key={link.href}
                  onClick={(e) => {
                    link.onClick?.(e);
                    setMobileMenuOpen(false);
                  }}
                  className="text-text-secondary hover:text-foreground py-2 text-sm font-medium transition-all duration-300 text-left relative"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "py-2 text-sm font-medium transition-all duration-300 relative",
                    isActiveLink(link.href)
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                      : "text-text-secondary hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
