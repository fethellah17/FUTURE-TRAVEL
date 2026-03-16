import { Voyage } from "@/types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VoyageStatusBadge from "./VoyageStatusBadge";

// Composant SVG pour le drapeau algérien
const AlgerianFlagIcon = () => (
  <svg
    viewBox="0 0 900 600"
    className="w-6 h-6 drop-shadow-md"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bande verte */}
    <rect width="450" height="600" fill="#007A5E" />
    {/* Bande blanche */}
    <rect x="450" width="450" height="600" fill="#FFFFFF" />
    {/* Croissant rouge */}
    <g transform="translate(450, 300)">
      {/* Croissant */}
      <circle cx="0" cy="0" r="120" fill="#EF2B2D" />
      <circle cx="30" cy="0" r="120" fill="#FFFFFF" />
      {/* Étoile rouge à 5 branches */}
      <g fill="#EF2B2D">
        <polygon points="0,-80 20,-30 75,-30 35,15 55,65 0,20 -55,65 -35,15 -75,-30 -20,-30" />
      </g>
    </g>
  </svg>
);


interface TripCardProps {
  voyage: Voyage;
  index?: number;
}

const getStageIcon = (stageName: string) => {
  const lowerName = stageName.toLowerCase();
  if (lowerName.includes("mecque") || lowerName.includes("makkah") || lowerName.includes("mecca")) {
    return "🕋";
  }
  if (lowerName.includes("medine") || lowerName.includes("madinah") || lowerName.includes("medina")) {
    return "🕌";
  }
  return null;
};

// Fonction pour parser et formater la date pour Voyage National
const formatNationalVoyageDate = (dateStr: string): string => {
  if (!dateStr || dateStr === "Dates flexibles") return "Dates flexibles";
  
  try {
    // Format attendu: "DD/MM/YYYY - DD/MM/YYYY"
    const dateParts = dateStr.split(" - ");
    if (dateParts.length === 2) {
      const startStr = dateParts[0];
      const [day, month, year] = startStr.split("/").map(Number);
      
      if (day && month && year) {
        const date = new Date(year, month - 1, day);
        const options: Intl.DateTimeFormatOptions = { 
          weekday: "long", 
          day: "numeric", 
          month: "long", 
          year: "numeric" 
        };
        return `Le ${date.toLocaleDateString("fr-FR", options)}`;
      }
    }
  } catch (error) {
    console.error("Erreur lors du parsing de la date:", error);
  }
  
  return dateStr;
};

const TripCard = ({ voyage, index = 0 }: TripCardProps) => {
  const isNationalVoyage = voyage.category === "Voyage National";
  const hasSchedule = isNationalVoyage && voyage.departureTime && voyage.returnTime;
  const formattedDate = isNationalVoyage ? formatNationalVoyageDate(voyage.date) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 25,
        delay: index * 0.08,
      }}
    >
      <Link to={`/voyage/${voyage.id}`}>
        <div className="group rounded-2xl bg-white overflow-hidden shadow-card hover:shadow-elegant border border-transparent hover:border-accent hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div className="aspect-[4/3] overflow-hidden relative">
            <img
              src={voyage.imageUrl}
              alt={voyage.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 text-upperspace bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md text-primary text-xs font-semibold">
              {voyage.category}
            </span>
            {isNationalVoyage && (
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-md" title="Algérie">
                <AlgerianFlagIcon />
              </div>
            )}
            <VoyageStatusBadge status={voyage.status} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{voyage.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{voyage.description}</p>

            {/* Affichage des étapes si disponibles */}
            {voyage.stages && voyage.stages.length > 0 && (
              <div className="mb-4 space-y-2 pb-4 border-b border-gray-200">
                {voyage.stages.slice(0, 2).map((stage) => {
                  const icon = getStageIcon(stage.name);
                  return (
                    <div key={stage.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                      {icon && <span>{icon}</span>}
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-gray-400">•</span>
                      <span>{stage.days}j</span>
                    </div>
                  );
                })}
                {voyage.stages.length > 2 && (
                  <p className="text-xs text-accent font-medium">
                    +{voyage.stages.length - 2} étape{voyage.stages.length - 2 > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}

            {/* Affichage dynamique pour Voyage National */}
            {isNationalVoyage && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                {/* Affichage de la date */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Date</p>
                  <p className="text-sm font-medium text-primary">{formattedDate}</p>
                </div>
                
                {/* Affichage des horaires si disponibles */}
                {hasSchedule && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Horaires</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span>🕒</span>
                      <span className="text-muted-foreground">
                        Départ: <span className="font-semibold text-primary">{voyage.departureTime}</span>
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-muted-foreground">
                        Retour: <span className="font-semibold text-primary">{voyage.returnTime}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Section Tarifs */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Tarifs</p>
              <div className="space-y-1.5">
                {voyage.priceAdult && voyage.priceAdult > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Adulte :</span>
                    <span className="text-sm font-semibold" style={{ color: "#D4AF37" }}>
                      {voyage.priceAdult.toLocaleString("fr-FR")} DA
                    </span>
                  </div>
                ) : null}
                {voyage.priceChild && voyage.priceChild > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Enfant :</span>
                    <span className="text-sm font-semibold text-accent">
                      {voyage.priceChild.toLocaleString("fr-FR")} DA
                    </span>
                  </div>
                ) : null}
                {(!voyage.priceAdult || voyage.priceAdult === 0) && (!voyage.priceChild || voyage.priceChild === 0) ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix :</span>
                    <span className="text-sm font-semibold text-accent">Sur devis</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between">
              {voyage.category === "Voyage à la Carte" ? (
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium">
                  Sur mesure
                </span>
              ) : isNationalVoyage ? (
                <span className="text-xs text-muted-foreground">{voyage.duration}</span>
              ) : (
                <span className="text-xs text-muted-foreground">{voyage.duration}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TripCard;
