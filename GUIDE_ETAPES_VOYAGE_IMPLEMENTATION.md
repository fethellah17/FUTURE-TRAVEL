# Guide d'Implémentation - Système d'Étapes Dynamiques pour Voyages

## Vue d'ensemble

Ce système permet d'ajouter des étapes détaillées aux voyages de type **Omrah** et **Voyage Organisé**, avec gestion automatique des hébergements, localisations et durées.

## Fonctionnalités Implémentées

### 1. Affichage Conditionnel des Étapes

Les sections d'étapes apparaissent automatiquement dans le formulaire d'ajout/modification de voyage lorsque la catégorie sélectionnée est :
- **Omrah**
- **Voyage Organisé**

Pour les voyages **à la Carte**, les étapes ne sont pas affichées.

### 2. Détails par Étape

Chaque étape comprend les champs suivants :
- **Nom de la ville/étape** : Ex: مكة المكرمة (La Mecque)
- **Nom de l'hôtel** : Ex: Hilton Makkah
- **Lien Google Maps** : URL de localisation de l'hôtel
- **Nombre de jours** : Durée du séjour dans cette étape

### 3. Validation Automatique des Jours

Le système vérifie automatiquement que :
- La somme des jours de toutes les étapes = Durée totale du voyage
- Affiche une alerte visuelle en cas de non-correspondance
- Bloque la soumission du formulaire si les jours ne correspondent pas

### 4. Affichage sur la Page d'Accueil

Dans les cartes de voyage (TripCard) :
- Affichage des 2 premières étapes avec icônes
- Icône 🕋 pour La Mecque (Kaaba)
- Icône 🕌 pour Médine (Dôme)
- Indication du nombre de jours par étape
- Compteur "+X étapes" si plus de 2 étapes

### 5. Affichage sur la Page de Détails

Dans la page de détails du voyage :
- Section dédiée "Étapes du Voyage"
- Affichage complet de toutes les étapes
- Bouton "Voir l'emplacement" pour chaque étape
- Ouverture du lien Google Maps dans un nouvel onglet
- Design élégant avec icônes contextuelles

## Structure des Données

### Type Stage (src/types.ts)

```typescript
export interface Stage {
  id: string;
  name: string;
  hotelName: string;
  googleMapsUrl: string;
  days: number;
  icon?: 'kaaba' | 'dome' | 'default';
}
```

### Type Voyage (src/types.ts)

```typescript
export interface Voyage {
  id: string;
  title: string;
  imageUrl: string;
  imageUrls?: string[];
  price: number;
  description: string;
  category: VoyageCategory;
  duration: string;
  date: string;
  createdAt: string;
  stages?: Stage[]; // Nouveau champ optionnel
}
```

## Composants Créés/Modifiés

### 1. StageSection.tsx
Composant de formulaire pour gérer les étapes :
- Gestion de l'ajout/suppression d'étapes
- Validation en temps réel
- Alerte visuelle en cas de non-correspondance des jours

### 2. StageDisplay.tsx
Composant d'affichage des étapes :
- Affichage élégant avec icônes
- Bouton "Voir l'emplacement" avec lien Google Maps
- Détection automatique des icônes selon le nom de la ville

### 3. AdminPage.tsx
Page d'administration modifiée :
- Ajout de la logique conditionnelle pour les étapes
- Validation avant soumission
- Gestion des états pour les étapes (ajout et édition)

### 4. TripCard.tsx
Carte de voyage modifiée :
- Affichage des étapes dans la carte
- Icônes contextuelles
- Compteur d'étapes

### 5. VoyageDetailPage.tsx
Page de détails modifiée :
- Section dédiée aux étapes
- Affichage complet avec StageDisplay

## Logique de Validation

### Fonction needsStages()
```typescript
const needsStages = (category: VoyageCategory) => {
  return category === "Omrah" || category === "Voyage Organisé";
};
```

### Fonction validateStages()
```typescript
const validateStages = (stages: Stage[], totalDays: number, category: VoyageCategory) => {
  if (!needsStages(category)) return true;
  
  // Vérifier que toutes les étapes sont remplies
  const allFilled = stages.every(s => s.name && s.hotelName && s.googleMapsUrl && s.days > 0);
  if (!allFilled) {
    toast.error("Veuillez remplir toutes les informations des étapes");
    return false;
  }
  
  // Vérifier que la somme des jours correspond
  const stageDaysTotal = stages.reduce((sum, s) => sum + s.days, 0);
  if (stageDaysTotal !== totalDays) {
    toast.error(`La somme des jours des étapes (${stageDaysTotal}) ne correspond pas à la durée totale (${totalDays} jours)`);
    return false;
  }
  
  return true;
};
```

## Détection Automatique des Icônes

La fonction `getStageIcon()` détecte automatiquement l'icône appropriée :

```typescript
const getStageIcon = (stageName: string, isOmrah: boolean) => {
  if (!isOmrah) return null;
  
  const lowerName = stageName.toLowerCase();
  if (lowerName.includes("mecque") || lowerName.includes("makkah") || lowerName.includes("mecca")) {
    return "🕋"; // Kaaba
  }
  if (lowerName.includes("medine") || lowerName.includes("madinah") || lowerName.includes("medina")) {
    return "🕌"; // Dome
  }
  return null;
};
```

## Utilisation

### Pour l'Administrateur

1. **Créer un nouveau voyage Omrah/Voyage Organisé** :
   - Sélectionner la catégorie "Omrah" ou "Voyage Organisé"
   - Les sections d'étapes apparaissent automatiquement
   - Remplir les informations pour chaque étape
   - Le système vérifie automatiquement la cohérence des jours

2. **Modifier un voyage existant** :
   - Cliquer sur le bouton "Modifier"
   - Les étapes existantes sont chargées automatiquement
   - Modifier les informations selon les besoins

### Pour les Visiteurs

1. **Page d'accueil** :
   - Les cartes de voyage affichent les 2 premières étapes
   - Icônes contextuelles pour La Mecque et Médine
   - Indication du nombre de jours par étape

2. **Page de détails** :
   - Section complète "Étapes du Voyage"
   - Toutes les étapes sont affichées
   - Bouton "Voir l'emplacement" pour chaque étape
   - Ouverture de Google Maps dans un nouvel onglet

## Design et Style

Le système utilise le thème Bleu Roi et Blanc de l'application :
- Couleur primaire : `#003366` (Bleu Roi)
- Couleur accent : `#0066CC` (Bleu Clair)
- Fond : Blanc avec dégradés subtils
- Bordures : Accent avec opacité réduite
- Animations : Framer Motion pour les transitions fluides

## Améliorations Futures Possibles

1. **Ajout d'étapes dynamiques** : Permettre d'ajouter plus de 2 étapes
2. **Réorganisation des étapes** : Drag & drop pour changer l'ordre
3. **Photos par étape** : Ajouter des images spécifiques à chaque étape
4. **Activités par étape** : Liste d'activités prévues pour chaque étape
5. **Carte interactive** : Afficher toutes les étapes sur une carte Google Maps

## Fichiers Modifiés

- `src/types.ts` : Ajout du type Stage et modification du type Voyage
- `src/components/StageSection.tsx` : Composant de formulaire pour les étapes
- `src/components/StageDisplay.tsx` : Composant d'affichage des étapes
- `src/pages/AdminPage.tsx` : Ajout de la logique conditionnelle et validation
- `src/components/TripCard.tsx` : Affichage des étapes dans les cartes
- `src/pages/VoyageDetailPage.tsx` : Affichage complet des étapes

## Conclusion

Le système d'étapes dynamiques est maintenant pleinement opérationnel et offre une expérience utilisateur fluide et intuitive pour la gestion des voyages Omrah et Voyages Organisés.
