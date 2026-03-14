import Layout from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";

const BilletteriePage = () => {
  const { addMessage } = useData();
  const [form, setForm] = useState({
    // Infos Personnelles
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    // Détails du Vol
    destination: "",
    besoinVisa: "",
    compagnie: "",
    // Passagers
    nombreAdultes: "",
    nombreEnfants: "",
    ageEnfants: "",
    // Dates
    dateDepart: "",
    dateRetour: "",
    // Message
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
    if (!form.dateDepart) e.dateDepart = "La date de départ est obligatoire.";
    if (!form.dateRetour) e.dateRetour = "La date de retour est obligatoire.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    setTimeout(() => {
      // Ajouter le message à la boîte de réception avec le tag BILLETTERIE
      addMessage({
        type: "Billetterie",
        name: form.nom || "Non spécifié",
        email: form.email || "Non spécifié",
        phone: form.telephone || "Non spécifié",
        subject: `BILLETTERIE - ${form.destination || "Destination non spécifiée"}`,
        content: form.message || "Aucun message supplémentaire",
        billeterieDetails: {
          prenom: form.prenom || "Non spécifié",
          destination: form.destination || "Non spécifié",
          besoinVisa: form.besoinVisa || "Non spécifié",
          compagnie: form.compagnie || "Non précisé",
          nombreAdultes: form.nombreAdultes || "Non spécifié",
          nombreEnfants: form.nombreEnfants || "0",
          ageEnfants: form.ageEnfants || "Non applicable",
          dateDepart: form.dateDepart || "Non spécifié",
          dateRetour: form.dateRetour || "Non spécifié",
        },
      });
      
      setStatus("success");
      toast.success("Votre demande de billetterie a été envoyée avec succès à Zahrat Al Houda !");
      
      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        setForm({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          destination: "",
          besoinVisa: "",
          compagnie: "",
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

  return (
    <Layout>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-primary mb-2">Billetterie</p>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Faites une demande de billetterie</h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous et notre équipe vous proposera les meilleures options de vol.
            </p>
          </div>

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
                        placeholder="EX : fethellahhadjbouziane@gmail.com"
                      />
                    </Field>
                    <Field label="Téléphone portable *" error={errors.telephone}>
                      <input
                        type="tel"
                        value={form.telephone}
                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        className="devis-input"
                        placeholder="EX : 0661206019"
                      />
                    </Field>
                  </div>
                </div>

                {/* Section 2: Détails du Vol */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
                    Détails du Vol
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Destination *" error={errors.destination}>
                      <input
                        type="text"
                        value={form.destination}
                        onChange={(e) => setForm({ ...form, destination: e.target.value })}
                        className="devis-input"
                        placeholder="Ex: Istanbul"
                      />
                    </Field>
                    <Field label="Besoin d'un VISA">
                      <select
                        value={form.besoinVisa}
                        onChange={(e) => setForm({ ...form, besoinVisa: e.target.value })}
                        className="devis-input"
                      >
                        <option value="">Sélectionner</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </Field>
                    <Field label="Compagnie Aérienne">
                      <select
                        value={form.compagnie}
                        onChange={(e) => setForm({ ...form, compagnie: e.target.value })}
                        className="devis-input"
                      >
                        <option value="">Sélectionner</option>
                        <option value="AIR ALGERIE">AIR ALGERIE</option>
                        <option value="AIR FRANCE">AIR FRANCE</option>
                        <option value="ROYAL AIR MAROC">ROYAL AIR MAROC</option>
                        <option value="TUNIS AIR">TUNIS AIR</option>
                        <option value="EMIRATS">EMIRATS</option>
                        <option value="QATAR">QATAR</option>
                        <option value="TURKISH AIRLINES">TURKISH AIRLINES</option>
                        <option value="ALITALIA">ALITALIA</option>
                        <option value="VUELING">VUELING</option>
                        <option value="Aigle azur">Aigle azur</option>
                      </select>
                    </Field>
                  </div>
                </div>

                {/* Section 3: Passagers */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
                    Passagers
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Field label="Adultes">
                      <input
                        type="number"
                        min="0"
                        value={form.nombreAdultes}
                        onChange={(e) => setForm({ ...form, nombreAdultes: e.target.value })}
                        className="devis-input"
                        placeholder="0"
                      />
                    </Field>
                    <Field label="Enfants">
                      <input
                        type="number"
                        min="0"
                        value={form.nombreEnfants}
                        onChange={(e) => setForm({ ...form, nombreEnfants: e.target.value })}
                        className="devis-input"
                        placeholder="0"
                      />
                    </Field>
                    <Field label="Âge des enfants (si applicable)">
                      <input
                        type="text"
                        value={form.ageEnfants}
                        onChange={(e) => setForm({ ...form, ageEnfants: e.target.value })}
                        className="devis-input"
                        placeholder="Ex: 5 ans, 8 ans"
                      />
                    </Field>
                  </div>
                </div>

                {/* Section 4: Dates */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
                    Dates
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                {/* Section 5: Message */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">
                    Message
                  </h2>
                  <Field label="Détails supplémentaires">
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
        </div>
      </section>
    </Layout>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default BilletteriePage;
