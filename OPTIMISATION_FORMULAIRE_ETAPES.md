# Optimisation Dynamique du Formulaire d'Ajout de Voyage

## Vue d'ensemble

Cette optimisation ajoute une logique dynamique au formulaire de devis pour les catégories **Omrah** et **Voyage Organisé**, permettant de gérer plusieurs étapes de voyage avec hébergement et localisation.

## Fonctionnalités Implémentées

### 1. Affichage Conditionnel des Étapes

- **Déclencheur** : Lorsque l'utilisateur sélectionne "Omrah" ou "Voyage Organisé" dans le champ "Catégorie"
- **Comportement** : Une nouvelle section "Étapes du Voyage" apparaît avec animation fluide
- **Masquage** : La section disparaît si l'utilisateur change de catégorie

### 2. Détails par Étape

Chaque étape contient les champs suivants :

- **Nom de la ville/étape** : Texte libre (ex: مكة المكرمة, المدينة المنورة)
- **Nombre de jours** : Champ numérique (ex: 7 jours)
- **Nom de l'hôtel** : Texte libre (ex: Hilton Makkah)
- **Lien Google Maps** : URL pour la localisation de l'hôtel

### 3. Logique de Calcul des Jours

- **Calcul automatique** : La durée totale est calculée à partir des dates de départ et retour
- **Validation** : Un message d'alerte s'affiche si la somme des jours des étapes ne correspond pas à la durée totale
- **Validation du formulaire** : Le formulaire ne peut pas être soumis si les jours ne correspondent pas

### 4. Gestion des Étapes

- **Ajouter une étape** : Bouton "Ajouter une étape" pour créer de nouvelles étapes
- **Supprimer une étape** : Icône poubelle pour supprimer une étape (si plus d'une étape existe)
- **Minimum requis** : Au moins une étape doit être ajoutée pour les catégories Omrah/Voyage Organisé

### 5. Affichage sur la Page d'Accueil (TripCard)

Les cartes de voyage affichent maintenant :

- **Aperçu des étapes** : Les 2 premières étapes avec icônes représentatives
- **Icônes Omrah** :
  - 🕋 Kaaba pour La Mecque (makkah, mecca)
  - 🕌 Dôme pour Médine (madinah, medina)
- **Durée par étape** : Nombre de jours pour chaque étape
- **Indicateur** : "+X étapes" si plus de 2 étapes

### 6. Affichage sur la Page de Détails

La page de détails du voyage affiche :

- **Section "Étapes du Voyage"** : Liste complète des étapes avec design élégant
- **Icônes représentatives** : Kaaba et Dôme pour les voyages Omrah
- **Bouton "Voir l'emplacement"** : Ouvre le lien Google Maps dans un nouvel onglet
- **Informations complètes** : Nom de l'hôtel, nombre de jours, localisation

## Structure des Données

### Type `Stage`

```typescript
interface Stage {
  id: string;
  name: string;
  hotelName: string;
  googleMapsUrl: string;
  days: number;
  icon?: 'kaaba' | 'dome' | 'default';
}
```

### Extension du Type `Voyage`

```typescript
interface Voyage {
  // ... champs existants
  stages?: Stage[];
}
```

### Extension de `devisDetails`

```typescript
devisDetails?: {
  // ... champs existants
  stages?: Array<{
    name: string;
    hotelName: string;
    googleMapsUrl: string;
    days: number;
  }>;
}
```

## Composants Créés

### 1. `StageSection.tsx`

Composant de gestion des étapes dans le formulaire :

- Affichage des étapes avec animation
- Champs d'édition pour chaque étape
- Validation des jours
- Bouton de suppression d'étape
- Alerte de non-correspondance des jours

### 2. `StageDisplay.tsx`

Composant d'affichage des étapes :

- Affichage élégant des étapes
- Icônes représentatives (Kaaba, Dôme)
- Bouton "Voir l'emplacement" avec lien Google Maps
- Animation d'entrée progressive

## Modifications des Fichiers Existants

### `src/types.ts`

- Ajout du type `Stage`
- Extension de `Voyage` avec propriété `stages`
- Extension de `devisDetails` avec propriété `stages`

### `src/components/DevisForm.tsx`

- Ajout du champ "Catégorie"
- Intégration du composant `StageSection`
- Calcul automatique de la durée totale
- Validation des étapes et des jours
- Transmission des étapes dans `devisDetails`

### `src/pages/VoyageDetailPage.tsx`

- Intégration du composant `StageDisplay`
- Affichage conditionnel de la section "Étapes du Voyage"

### `src/components/TripCard.tsx`

- Affichage d'un aperçu des étapes
- Icônes représentatives
- Indicateur du nombre d'étapes supplémentaires

## Design et Styling

### Couleurs

- **Bleu Roi** : Couleur primaire pour les titres et éléments importants
- **Blanc** : Fond principal
- **Accent** : Couleur secondaire pour les boutons et accents

### Animations

- **Entrée des étapes** : Animation fluide avec `framer-motion`
- **Apparition/Disparition** : Transition douce lors du changement de catégorie
- **Hover** : Effets de survol sur les cartes et boutons

## Utilisation

### Pour les Administrateurs

1. Lors de la création d'un voyage Omrah ou Voyage Organisé
2. Sélectionner la catégorie appropriée
3. Ajouter les étapes avec les détails d'hébergement
4. Vérifier que la somme des jours correspond à la durée totale
5. Soumettre le formulaire

### Pour les Utilisateurs

1. Consulter les cartes de voyage pour voir les étapes
2. Cliquer sur "Voir l'emplacement" pour localiser l'hôtel
3. Remplir le formulaire de devis avec les étapes pré-remplies
4. Modifier les étapes selon leurs besoins

## Validation et Erreurs

- ✅ Au moins une étape requise pour Omrah/Voyage Organisé
- ✅ Tous les champs d'étape sont obligatoires
- ✅ La somme des jours doit correspondre à la durée totale
- ✅ Les URLs Google Maps doivent être valides
- ✅ Les nombres de jours doivent être positifs

## Améliorations Futures

- Ajouter des templates d'étapes pré-configurées pour les destinations populaires
- Intégrer une API Google Maps pour la validation des URLs
- Ajouter des photos pour chaque étape
- Permettre la réorganisation des étapes (drag & drop)
- Ajouter des notes/commentaires pour chaque étape
