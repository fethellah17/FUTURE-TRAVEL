import { Link } from "react-router-dom";
import { Settings, MapPin, Smartphone, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={logo} alt="AZ VOYAGES" className="h-16 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre partenaire de confiance pour les pèlerinages et voyages organisés. Nous vous accompagnons à chaque étape.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/omrah" className="hover:text-primary transition-colors">Omrah</Link></li>
              <li><Link to="/voyage-organise" className="hover:text-primary transition-colors">Voyage Organisé</Link></li>
              <li><Link to="/voyage-a-la-carte" className="hover:text-primary transition-colors">Voyage à la Carte</Link></li>
              <li><Link to="/billetterie" className="hover:text-primary transition-colors">Billetterie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[#FFD700] flex-shrink-0" />
                <span className="text-muted-foreground">Tizi Ouzou - Algérie</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone size={16} className="text-[#FFD700] flex-shrink-0" />
                <a 
                  href="tel:0662901937" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  0662 90 19 37
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#FFD700] flex-shrink-0" />
                <a 
                  href="mailto:Egosandiavoyages@gmail.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Egosandiavoyages@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 AZ VOYAGES. Tous droits réservés.
          </p>
          <Link
            to="/admin"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Administration"
          >
            <Settings size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
