import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/omrah", label: "Omrah" },
  { to: "/voyage-organise", label: "Voyage Organisé" },
  { to: "/voyage-national", label: "Voyage National" },
  { to: "/voyage-a-la-carte", label: "Voyage à la Carte" },
  { to: "/billetterie", label: "Billetterie" },
  { to: "/devis", label: "Devis Gratuit" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3 py-2">
          <img src={logo} alt="FUTURE TRAVEL" className="h-20 w-auto lg:h-24" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to} className="relative">
              <Link
                to={link.to}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md
                  ${location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                  }
                  ${link.to === "/devis" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground px-5 py-2 rounded-lg ml-2" : ""}`}
              >
                {link.label}
                {location.pathname === link.to && link.to !== "/devis" && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* WhatsApp Contact Button */}
          <motion.a
            href="https://wa.me/213772175766?text=Bonjour%20Agence%20FUTURE%20TRAVEL,%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20vos%20offres."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            title="Contactez-nous sur WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors" />
            <span className="text-sm font-medium text-green-700 group-hover:text-green-800 transition-colors hidden md:inline">
              0772 17 57 66
            </span>
          </motion.a>

          {/* Mobile WhatsApp Icon */}
          <motion.a
            href="https://wa.me/213772175766?text=Bonjour%20Agence%20FUTURE%20TRAVEL,%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20vos%20offres."
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            title="Contactez-nous sur WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-green-600 hover:text-green-700 transition-colors" />
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border bg-background overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${location.pathname === link.to
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                      }
                      ${link.to === "/devis" ? "bg-primary text-primary-foreground hover:text-primary-foreground text-center mt-2" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
