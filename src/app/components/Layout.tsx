import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, Github, Linkedin, Mail, Shield, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DhLogo } from "./ui/dh-logo";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden textured-surface">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 70, 
          damping: 28,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 earth-glow human-popup ${
          scrolled ? "bg-stone-800/95 backdrop-blur-lg shadow-lg shadow-sky-500/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center justify-center p-3 group relative isolate rounded-xl transition-all duration-300">
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-400/30 shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] group-hover:border-blue-400/50 -z-10 backdrop-blur-sm" />
              <div className="text-sky-400 group-hover:text-sky-200 transition-colors duration-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
                <DhLogo size="md" animated={true} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-xl transition-all duration-700 group handcrafted-hover organic-appear ${
                      location.pathname === link.path
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        : "text-stone-300 hover:text-cream hover:bg-white/5"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-sky-500/20 rounded-xl border border-sky-500/30"
                        transition={{ 
                          type: "spring", 
                          stiffness: 350, 
                          damping: 40,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.a
                href="https://github.com/dhurghamCreation"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className={`p-2.5 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-700 warm-magnetic human-popup ${
                  scrolled ? "border border-white/20" : "border border-white/10"
                }`}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4 group-hover:text-cream transition-colors" />
              </motion.a>
              <motion.a
                href="https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url"
                target="_blank"
                rel="noopener noreferrer"
                title="Hack The Box Profile"
                className={`p-2.5 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-700 warm-magnetic human-popup ${
                  scrolled ? "border border-white/20" : "border border-white/10"
                }`}
                whileHover={{ scale: 1.05, rotate: -1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Shield className="w-4 h-4 group-hover:text-cream transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.behance.net/dhurghamalsaadi"
                target="_blank"
                rel="noopener noreferrer"
                title="Behance Artwork Portfolio"
                className={`p-2.5 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-700 warm-magnetic human-popup ${
                  scrolled ? "border border-white/20" : "border border-white/10"
                }`}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Palette className="w-4 h-4 group-hover:text-cream transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/dhurgham-a-b1428a253/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-700 warm-magnetic human-popup border border-white/10"
                whileHover={{ scale: 1.05, rotate: -1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin className="w-4 h-4 group-hover:text-cream transition-colors" />
              </motion.a>
              <motion.a
                href="mailto:derg.moha@gmail.com"
                title="Send Email"
                className="p-2.5 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-700 warm-magnetic human-popup border border-white/10"
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4 group-hover:text-cream transition-colors" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1],
                height: { type: "spring", stiffness: 300, damping: 30 }
              }}
              className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      location.pathname === link.path
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-3 pt-4 px-4 border-t border-white/20">
                  <a
                    href="https://github.com/dhurghamCreation"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    className={`p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 ${
                      scrolled ? "border border-white/20" : "border border-white/10"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Hack The Box"
                    className="p-2.5 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    <Shield className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.behance.net/dhurghamalsaadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Behance"
                    className="p-2.5 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    <Palette className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhurgham-a-b1428a253/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="p-2.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:derg.moha@gmail.com"
                    title="Email"
                    className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 bg-stone-900">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-800/50 border-t border-white/20 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div 
              className="text-stone-400 text-sm warm-shimmer human-card p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              2026 Dhurgham Alsaadi. All rights reserved.
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="text-stone-400 text-xs warm-shimmer human-card px-3 py-1">Portfolio v2.6.0</span>
              <div className="flex items-center space-x-2">
                <motion.a
                  href="https://github.com/dhurghamCreation"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  className="text-stone-400 hover:text-sky-300 transition-colors duration-700 clay-hover"
                  whileHover={{ scale: 1.06, rotate: 1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Hack The Box Profile"
                  className="text-stone-400 hover:text-sky-300 transition-colors duration-700 clay-hover"
                  whileHover={{ scale: 1.06, rotate: -1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.behance.net/dhurghamalsaadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Behance Portfolio"
                  className="text-stone-400 hover:text-sky-300 transition-colors duration-700 clay-hover"
                  whileHover={{ scale: 1.06, rotate: 1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Palette className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/dhurgham-a-b1428a253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn Profile"
                  className="text-stone-400 hover:text-blue-300 transition-colors duration-700 clay-hover"
                  whileHover={{ scale: 1.06, rotate: -1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:derg.moha@gmail.com"
                  title="Email"
                  className="text-stone-400 hover:text-cyan-400 transition-colors duration-700 clay-hover"
                  whileHover={{ scale: 1.06, rotate: 1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
