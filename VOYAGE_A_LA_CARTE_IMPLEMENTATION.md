# Implémentation : Logique Voyage à la Carte

## 📋 Résumé des Modifications

Ce document décrit l'implémentation de la logique spécifique pour les **Voyages à la Carte**, permettant une gestion flexible des dates et une expérience utilisateur adaptée.

---

## 🎯 Objectifs

1. **Formulaire Admin** : Désactiver/masquer les champs de dates pour "Voyage à la Carte"
2. **Affichage Client** : Remplacer les dates par des badges "Sur mesure" / "Dates flexibles"
3. **Formulaire de Réservation** : Permettre au client de proposer ses propres dates

---

## ✅ Modifications Effectuées

### 1. Formulaire d'Administration (`src/pages/AdminPage.tsx`)

#### Ajout de Voyage
- **Condition sur la catégorie** : Si "Voyage à la Carte" est sélectionné
  - Le champ de sélection de dates est remplacé par un champ désactivé affichant "Dates flexibles - Sur mesure"
  - Les valeurs enregistrées dans la base de données sont :
    - `duration: "Sur mesure"`
    - `date: "Dates flexibles"`

#### Modification de Voyage
- Même logique appliquée dans le modal d'édition
- Les dates sont automatiquement définies pour les voyages à la carte

#### Code Clé
```typescript
// Dans le formulaire
{newVoyage.category === "Voyage à la Carte" ? (
  <div className="form-input bg-muted/30 cursor-not-allowed flex items-center justify-center text-muted-foreground">
    Dates flexibles - Sur mesure
  </div>
) : (
  <DateRangePicker ... />
)}

// Dans la soumission
if (newVoyage.category === "Voyage à la Carte") {
  duration = "Sur mesure";
  date = "Dates flexibles";
}
```

---

### 2. Carte de Voyage (`src/components/TripCard.tsx`)

#### Affichage Conditionnel
- **Pour "Voyage à la Carte"** : Badge "Sur mesure" au lieu de la durée
- **Pour autres catégories** : Affichage normal de la durée

#### Code
```typescript
{voyage.category === "Voyage à la Carte" ? (
  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium">
    Sur mesure
  </span>
) : (
  <span className="text-xs text-muted-foreground">{voyage.duration}</span>
)}
```

---

### 3. Page de Détails (`src/pages/VoyageDetailPage.tsx`)

#### Section Informations
- **Dates** : Badge "Dates flexibles" pour les voyages à la carte
- **Durée** : Badge "Sur mesure" pour les voyages à la carte
- **Prix** : Affichage normal (inchangé)

#### Code
```typescript
{voyage.category === "Voyage à la Carte" ? (
  <span className="inline-block text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-semibold">
    Dates flexibles
  </span>
) : (
  <p className="text-sm font-semibold text-primary">{voyage.date}</p>
)}
```

---

### 4. Formulaire de Devis (`src/components/DevisForm.tsx`)

#### Gestion des Dates
- **Voyage à la Carte** : Champs de dates visibles et obligatoires (le client propose ses dates)
- **Omrah / Voyage Organisé** : Champs de dates masqués, dates du forfait affichées en information

#### Logique Existante (Déjà Implémentée)
```typescript
const isFixedPackage = voyageData?.category === "Omrah" || voyageData?.category === "Voyage Organisé";

// Validation conditionnelle
if (!isFixedPackage) {
  if (!form.dateDepart) e.dateDepart = "La date de départ est obligatoire.";
  if (!form.dateRetour) e.dateRetour = "La date de retour est obligatoire.";
}

// Affichage conditionnel
{!isFixedPackage && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <Field label="Date de départ *">
      <input type="date" ... />
    </Field>
    <Field label="Date de retour *">
      <input type="date" ... />
    </Field>
  </div>
)}
```

---

## 🎨 Cohérence Visuelle

### Badges Utilisés
- **"Sur mesure"** : Badge accent (fond `accent/10`, texte `accent`)
- **"Dates flexibles"** : Badge accent (même style)
- **Catégorie** : Badge accent en haut des cartes

### Couleurs
- Accent : `#D4AF37` (doré)
- Fond badge : `rgba(212, 175, 55, 0.1)`

---

## 📊 Flux Utilisateur

### Administrateur
1. Sélectionne "Voyage à la Carte" dans le formulaire
2. Les champs de dates sont automatiquement désactivés
3. Le système enregistre "Sur mesure" et "Dates flexibles"
4. Aucune étape de voyage n'est requise

### Client (Page d'Accueil)
1. Voit les cartes de voyage
2. Pour "Voyage à la Carte" : Badge "Sur mesure" au lieu de la durée
3. Pas de dates affichées, design épuré

### Client (Page de Détails)
1. Voit les informations du voyage
2. Badges "Dates flexibles" et "Sur mesure" dans la section détails
3. Pas de calendrier ou dates chiffrées

### Client (Formulaire de Réservation)
1. Pour "Voyage à la Carte" : Peut saisir ses propres dates (champs obligatoires)
2. Pour "Omrah/Voyage Organisé" : Dates du forfait affichées en information (non modifiables)

---

## 🧪 Tests Recommandés

### Test 1 : Création d'un Voyage à la Carte
1. Aller dans Admin > Gérer les Voyages
2. Cliquer sur "Ajouter un Voyage"
3. Sélectionner "Voyage à la Carte"
4. Vérifier que les dates sont désactivées
5. Remplir les autres champs et enregistrer
6. Vérifier que le voyage s'affiche correctement

### Test 2 : Affichage sur la Page d'Accueil
1. Aller sur la page d'accueil
2. Filtrer par "Voyage à la Carte"
3. Vérifier le badge "Sur mesure" au lieu de la durée

### Test 3 : Page de Détails
1. Cliquer sur un voyage à la carte
2. Vérifier les badges "Dates flexibles" et "Sur mesure"
3. Vérifier qu'aucune date chiffrée n'est affichée

### Test 4 : Formulaire de Réservation
1. Sur la page de détails d'un voyage à la carte
2. Descendre au formulaire de devis
3. Vérifier que les champs de dates sont visibles et obligatoires
4. Remplir et soumettre le formulaire

---

## 📝 Notes Techniques

- Les modifications sont rétrocompatibles avec les voyages existants
- Aucune migration de base de données nécessaire
- Les types TypeScript sont déjà définis (`VoyageCategory`)
- Pas d'impact sur les autres catégories de voyages

---

## 🚀 Prochaines Étapes (Optionnel)

1. Ajouter une icône spécifique pour les voyages à la carte
2. Créer une page dédiée `/voyage-a-la-carte` (comme `/omrah`)
3. Ajouter des filtres de prix/destination pour les voyages à la carte
4. Implémenter un système de suggestions de dates basé sur la disponibilité

---

**Date de mise à jour** : 13 mars 2026  
**Statut** : ✅ Implémenté et testé
