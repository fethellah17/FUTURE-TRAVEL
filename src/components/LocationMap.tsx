import { MapPin } from "lucide-react";

const LocationMap = () => {
  return (
    <section className="w-full bg-gradient-to-b from-background to-background/50 py-12 md:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          Où nous trouver
        </h2>

        {/* Conteneur de la carte avec responsive design */}
        <div className="flex justify-center">
          <div className="w-full md:max-w-2xl overflow-hidden rounded-3xl shadow-lg border-2 border-[#FFD700]/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3522219156743886!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywrAyMScwNy45IkU!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation ZAHRAT AL HOUDA"
              className="w-full block"
            />
          </div>
        </div>

        {/* Bouton Ouvrir dans Google Maps */}
        <div className="text-center mt-6">
          <a
            href="https://maps.app.goo.gl/tiGchNCyyDqKswGY6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <MapPin size={18} className="text-[#FFD700]" />
            <span>Ouvrir dans Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
