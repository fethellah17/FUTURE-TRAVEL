import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";

import { Voyage } from "@/types";

interface DevisFormProps {
  prefilledDestination?: string;
  showLayout?: boolean;
  voyageData?: Voyage; // Nouvelles données du voyage pour auto-remplissage
}

const DevisForm = ({ prefilledDestination = "", showLayout = false, voyageData }: DevisFormProps) => {
  const { addMessage } = useData();

  // Extraire les noms d'hôtels des étapes
  const getHotelNames = () => {
    if (!voyageData?.stages || voyageData.stages.length === 0) return "";
    return voyageData.stages.map(stage => stage.hotelName).join(" + ");
  };

  // Déterminer si c'est un forfait fixe (Omrah ou Voyage Organisé)
  const isFixedPackage = voyageData?.category === "Omrah" || voyageData?.category === "Voyage Organisé";

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    destination: voyageData?.title || prefilledDestination,
    category: voyageData?.category || "",
    besoinVisa: voyageData?.visaRequired || "",
    volAvecSans: voyageData?.flightType || "",
    nomHotel: voyageData?.category === "Voyage National" && voyageData?.hotelName ? voyageData.hotelName : getHotelNames(),
    nombreEtoiles: voyageData?.category === "Voyage National" && voyageData?.starRating ? voyageData.starRating : "",
    nombreChambres: "",
    typeChambre: voyageData?.roomType || "",
    pension: voyageData?.mealPlan || "",
    nombreAdultes: "",
    nombreEnfants: "",
    ageEnfants: "",
    dateDepart: "",
    dateRetour: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Le nom est obligatoire.";
    if (!form.prenom.trim()) e.prenom = "Le prénom est obligatoire.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Veuillez entrer un email valide.";
    if (!form.telephone.trim()) e.telephone = "Le téléphone est obligatoire.";
    if (!form.destination.trim()) e.destination = "La destination est obligatoire.";
    
    // Validation conditionnelle des dates (uniquement pour Voyage à la Carte)
    if (!isFixedPackage) {
      if (!form.dateDepart) e.dateDepart = "La date de départ est obligatoire.";
      if (!form.dateRetour) e.dateRetour = "La date de retour est obligatoire.";
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    setTimeout(() => {
      addMessage({
        type: "Devis",
        name: form.nom || "Non spécifié",
        email: form.email || "Non spécifié",
        phone: form.telephone || "Non spécifié",
        subject: `DEVIS GRATUIT - ${form.destination || "Destination non spécifiée"}`,
        content: form.message || "Aucun message supplémentaire",
        devisDetails: {
          prenom: form.prenom || "Non spécifié",
          destination: form.destination || "Non spécifié",
          besoinVisa: form.besoinVisa || "Non spécifié",
          volAvecSans: form.volAvecSans || "Non spécifié",
          nomHotel: form.nomHotel || "Non spécifié",
          nombreEtoiles: form.nombreEtoiles || "Non spécifié",
          nombreChambres: form.nombreChambres || "Non spécifié",
          typeChambre: form.typeChambre || "Non spécifié",
          pension: form.pension || "Non spécifié",
          nombreAdultes: form.nombreAdultes || "Non spécifié",
          nombreEnfants: form.nombreEnfants || "0",
          ageEnfants: form.ageEnfants || "Non applicable",
          dateDepart: form.dateDepart || (isFixedPackage && voyageData?.date ? voyageData.date.split(" - ")[0] : "Non spécifié"),
          dateRetour: form.dateRetour || (isFixedPackage && voyageData?.date ? voyageData.date.split(" - ")[1] : "Non spécifié"),
        },
      });

      setStatus("success");
      toast.success("Votre demande de devis a été envoyée avec succès à EGOSANDIA VOYAGE !");

      setTimeout(() => {
        setForm({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          destination: voyageData?.title || prefilledDestination,
          category: voyageData?.category || "",
          besoinVisa: voyageData?.visaRequired || "",
          volAvecSans: voyageData?.flightType || "",
          nomHotel: voyageData?.category === "Voyage National" && voyageData?.hotelName ? voyageData.hotelName : getHotelNames(),
          nombreEtoiles: voyageData?.category === "Voyage National" && voyageData?.starRating ? voyageData.starRating : "",
          nombreChambres: "",
          typeChambre: voyageData?.roomType || "",
          pension: voyageData?.mealPlan || "",
          nombreAdultes: "",
          nombreEnfants: "",
          ageEnfants: "",
          dateDepart: "",
          dateRetour: "",
          message: "",
        });
        setStatus("idle");
      }, 2000);
    }, 1500);
  };

  const formContent = (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <CheckCircle size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Votre demande a bien été envoyée !</h2>
          <p className="text-muted-foreground">Notre équipe vous répondra dans les plus brefs délais.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Section 1: Infos Personnelles */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
              Informations Personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Nom *" error={errors.nom}>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="devis-input"
                  placeholder="Votre nom"
                />
              </Field>
              <Field label="Prénom *" error={errors.prenom}>
                <input
                  type="text"
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  className="devis-input"
                  placeholder="Votre prénom"
                />
              </Field>
              <Field label="Email *" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="devis-input"
                  placeholder="EX : Egosandiavoyages@gmail.com"
                />
              </Field>
              <Field label="Téléphone *" error={errors.telephone}>
                <input
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="devis-input"
                  placeholder="EX : 0558737855"
                />
              </Field>
            </div>
          </div>

          {/* Section 2: Détails du Voyage */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
              Détails du Voyage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Destination *" error={errors.destination}>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className={`devis-input ${voyageData ? "bg-blue-50 border-blue-200 cursor-not-allowed" : ""}`}
                  placeholder="Ex: La Mecque"
                  disabled={!!voyageData}
                  readOnly={!!voyageData}
                  title={voyageData ? "Ce champ est rempli automatiquement depuis le voyage sélectionné" : ""}
                />
              </Field>
              <Field label="Catégorie">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`devis-input ${voyageData ? "bg-blue-50 border-blue-200 cursor-not-allowed" : ""}`}
                  disabled={!!voyageData}
                  title={voyageData ? "Ce champ est rempli automatiquement depuis le voyage sélectionné" : ""}
                >
                  <option value="">Sélectionner</option>
                  <option value="Omrah">Omrah</option>
                  <option value="Voyage Organisé">Voyage Organisé</option>
                  <option value="Voyage à la Carte">Voyage à la Carte</option>
                </select>
              </Field>
              
              {/* Besoin VISA - Verrouillé ou Modifiable */}
              <Field label="Besoin d'un VISA">
                <div className="relative">
                  <select
                    value={voyageData?.visaRequired ? voyageData.visaRequired : form.besoinVisa}
                    onChange={(e) => setForm({ ...form, besoinVisa: e.target.value })}
                    className={`devis-input ${voyageData?.visaRequired ? "bg-amber-50 border-amber-200 cursor-not-allowed" : ""}`}
                    disabled={!!voyageData?.visaRequired}
                    title={voyageData?.visaRequired ? "Inclus dans le forfait" : ""}
                  >
                    {!voyageData?.visaRequired && <option value="">Sélectionner</option>}
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {voyageData?.visaRequired && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  )}
                </div>
              </Field>
              
              {/* Type de Vol - Verrouillé ou Modifiable */}
              <Field label="Vol">
                <div className="relative">
                  <select
                    value={voyageData?.flightType ? voyageData.flightType : form.volAvecSans}
                    onChange={(e) => setForm({ ...form, volAvecSans: e.target.value })}
                    className={`devis-input ${voyageData?.flightType ? "bg-amber-50 border-amber-200 cursor-not-allowed" : ""}`}
                    disabled={!!voyageData?.flightType}
                    title={voyageData?.flightType ? "Inclus dans le forfait" : ""}
                  >
                    {!voyageData?.flightType && <option value="">Sélectionner</option>}
                    <option value="Avec vol">Avec vol</option>
                    <option value="Sans vol">Sans vol</option>
                  </select>
                  {voyageData?.flightType && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  )}
                </div>
              </Field>
            </div>
          </div>

          {/* Section 3: Hébergement */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
              Hébergement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label={voyageData?.stages && voyageData.stages.length > 0 ? "Hôtel(s) du forfait" : voyageData?.category === "Voyage National" ? "Hôtel 🏨" : "Nom de l'hôtel"}>
                <div className="relative">
                  <input
                    type="text"
                    value={form.nomHotel}
                    onChange={(e) => setForm({ ...form, nomHotel: e.target.value })}
                    className={`devis-input ${
                      voyageData?.stages && voyageData.stages.length > 0 
                        ? "bg-blue-50 border-blue-200 cursor-not-allowed" 
                        : voyageData?.category === "Voyage National" && voyageData?.hotelName
                        ? "bg-amber-50 border-amber-200 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder="Nom de l'hôtel souhaité"
                    disabled={!!(voyageData?.stages && voyageData.stages.length > 0) || (voyageData?.category === "Voyage National" && !!voyageData?.hotelName)}
                    readOnly={!!(voyageData?.stages && voyageData.stages.length > 0) || (voyageData?.category === "Voyage National" && !!voyageData?.hotelName)}
                    title={voyageData?.stages && voyageData.stages.length > 0 ? "Hôtels définis par l'agence pour ce forfait" : voyageData?.category === "Voyage National" && voyageData?.hotelName ? "Hôtel défini pour ce voyage national" : ""}
                  />
                  {(voyageData?.stages && voyageData.stages.length > 0) || (voyageData?.category === "Voyage National" && voyageData?.hotelName) ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  ) : null}
                </div>
              </Field>
              
              {/* Nombre d'étoiles - Affichage dynamique pour Voyage National */}
              {voyageData?.category === "Voyage National" && voyageData?.starRating ? (
                <Field label="Classification ⭐">
                  <div className="relative">
                    <input
                      type="text"
                      value={voyageData.starRating}
                      className="devis-input bg-amber-50 border-amber-200 cursor-not-allowed"
                      disabled
                      readOnly
                      title="Classification définie pour ce voyage national"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  </div>
                </Field>
              ) : !(isFixedPackage && voyageData?.stages && voyageData.stages.length > 0) ? (
                <Field label="Nombre d'étoiles">
                  <select
                    value={form.nombreEtoiles}
                    onChange={(e) => setForm({ ...form, nombreEtoiles: e.target.value })}
                    className="devis-input"
                  >
                    <option value="">Sélectionner</option>
                    <option value="3 étoiles">3 étoiles</option>
                    <option value="4 étoiles">4 étoiles</option>
                    <option value="5 étoiles">5 étoiles</option>
                  </select>
                </Field>
              ) : null}
              
              <Field label="Nombre de chambres">
                <input
                  type="number"
                  min="1"
                  value={form.nombreChambres}
                  onChange={(e) => setForm({ ...form, nombreChambres: e.target.value })}
                  className="devis-input"
                  placeholder="1"
                />
              </Field>
              
              {/* Type de chambre - Verrouillé ou Modifiable */}
              <Field label="Type de chambre">
                <div className="relative">
                  <select
                    value={voyageData?.roomType ? voyageData.roomType : form.typeChambre}
                    onChange={(e) => setForm({ ...form, typeChambre: e.target.value })}
                    className={`devis-input ${voyageData?.roomType ? "bg-amber-50 border-amber-200 cursor-not-allowed" : ""}`}
                    disabled={!!voyageData?.roomType}
                    title={voyageData?.roomType ? "Inclus dans le forfait" : ""}
                  >
                    {!voyageData?.roomType && <option value="">Sélectionner</option>}
                    <option value="Simple">Simple</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="Quadruple">Quadruple</option>
                  </select>
                  {voyageData?.roomType && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  )}
                </div>
              </Field>
            </div>
          </div>

          {/* Section 4: Passagers */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
              Passagers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pension - Verrouillée ou Modifiable */}
              <Field label="Pension">
                <div className="relative">
                  <select
                    value={voyageData?.mealPlan ? voyageData.mealPlan : form.pension}
                    onChange={(e) => setForm({ ...form, pension: e.target.value })}
                    className={`devis-input ${voyageData?.mealPlan ? "bg-amber-50 border-amber-200 cursor-not-allowed" : ""}`}
                    disabled={!!voyageData?.mealPlan}
                    title={voyageData?.mealPlan ? "Inclus dans le forfait" : ""}
                  >
                    {!voyageData?.mealPlan && <option value="">Sélectionner</option>}
                    <option value="Petit-déjeuner">Petit-déjeuner</option>
                    <option value="Demi-pension">Demi-pension</option>
                    <option value="Pension complète">Pension complète</option>
                    <option value="All inclusive">All inclusive</option>
                  </select>
                  {voyageData?.mealPlan && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-semibold">
                      🔒
                    </div>
                  )}
                </div>
              </Field>
              <Field label="Nombre d'adultes">
                <input
                  type="number"
                  min="1"
                  value={form.nombreAdultes}
                  onChange={(e) => setForm({ ...form, nombreAdultes: e.target.value })}
                  className="devis-input"
                  placeholder="1"
                />
              </Field>
              <Field label="Nombre d'enfants">
                <input
                  type="number"
                  min="0"
                  value={form.nombreEnfants}
                  onChange={(e) => setForm({ ...form, nombreEnfants: e.target.value })}
                  className="devis-input"
                  placeholder="0"
                />
              </Field>
            </div>
            <div className="mt-6">
              <Field label="Âge des enfants (si applicable)">
                <input
                  type="text"
                  value={form.ageEnfants}
                  onChange={(e) => setForm({ ...form, ageEnfants: e.target.value })}
                  className="devis-input"
                  placeholder="Ex: 5 ans, 8 ans, 12 ans"
                />
              </Field>
            </div>
          </div>

          {/* Section 5: Dates & Message */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
              {isFixedPackage ? "Message" : "Dates & Message"}
            </h2>
            
            {/* Afficher les dates uniquement pour Voyage à la Carte */}
            {!isFixedPackage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Field label="Date de départ *" error={errors.dateDepart}>
                  <input
                    type="date"
                    value={form.dateDepart}
                    onChange={(e) => setForm({ ...form, dateDepart: e.target.value })}
                    className="devis-input"
                  />
                </Field>
                <Field label="Date de retour *" error={errors.dateRetour}>
                  <input
                    type="date"
                    value={form.dateRetour}
                    onChange={(e) => setForm({ ...form, dateRetour: e.target.value })}
                    className="devis-input"
                  />
                </Field>
              </div>
            )}
            
            {/* Message d'information pour les forfaits fixes */}
            {isFixedPackage && voyageData && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">📅 Dates du forfait :</span> {voyageData.date}
                  <br />
                  <span className="text-xs text-blue-600 mt-1 inline-block">
                    Les dates sont fixées par l'agence pour ce forfait {voyageData.category}.
                  </span>
                </p>
              </div>
            )}
            
            <Field label="Message / Détails supplémentaires">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="devis-input min-h-[120px] resize-y"
                placeholder="Décrivez vos besoins spécifiques, préférences ou toute autre information utile..."
                maxLength={1000}
              />
            </Field>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:border-2 hover:border-[#D4AF37] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Envoi en cours...
              </>
            ) : (
              "Envoyer la demande"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );

  if (showLayout) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-primary mb-2">Devis Gratuit</p>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Demander un Devis Personnalisé</h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous et recevez une proposition sur mesure sous 24h.
            </p>
          </div>
          {formContent}
        </div>
      </section>
    );
  }

  return formContent;
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default DevisForm;
