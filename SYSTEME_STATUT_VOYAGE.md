# Système de Statut de Voyage (Urgency Marketing)

## Vue d'ensemble

Le système de statut de voyage permet d'afficher des badges dynamiques sur les voyages pour créer un sentiment d'urgence et encourager les réservations. Cette fonctionnalité implémente des techniques d'urgency marketing pour améliorer les conversions.

## Fonctionnalités

### 1. Types de Statuts

Quatre statuts sont disponibles pour chaque voyage :

- **Normal** (par défaut) : Aucun badge affiché
- **Bientôt complet** : Badge orange avec texte "باقي أماكن قليلة"
- **Complet** : Badge rouge avec texte "الرحلة كاملة"
- **Offre limitée** : Badge doré/jaune avec texte "عرض محدود"

### 2. Interface Admin

Dans le panneau d'administration, un nouveau champ de sélection "Statut du voyage" a été ajouté aux formulaires d'ajout et de modification de voyage.

**Emplacement** : Entre le champ "Prix" et les "Dates du voyage"

**Options disponibles** :
- Normal
- Bientôt complet (باقي أماكن قليلة)
- Complet (الرحلة كاملة)
- Offre limitée (عرض محدود)

### 3. Affichage des Badges

#### Sur la page d'accueil et les résultats de recherche

Les badges sont affichés sur les cartes de voyage (TripCard) :
- Position : En haut à droite de l'image
- Style : Coins arrondis, ombre portée, texte en gras avec icône
- Couleurs et icônes :
  - **Bientôt complet** : Fond orange (#f97316), texte blanc, icône d'alerte (⚠️)
  - **Complet** : Fond rouge (#dc2626), texte blanc, icône de cercle barré (⊗)
  - **Offre limitée** : Dégradé jaune-ambre (#fbbf24 → #f59e0b), texte gris foncé, icône d'étoile (⭐)

#### Sur la page de détails du voyage

Le badge est affiché de deux manières :
1. **Sur l'image principale** : Badge identique à celui des cartes (en haut à droite)
2. **À côté du prix** : Badge plus grand et proéminent dans la carte de réservation, positionné entre le prix et le bouton de réservation pour maximiser la visibilité et l'urgence

### 4. Logique de Réservation

Lorsqu'un voyage a le statut "Complet" :

- Le bouton de réservation change de texte : "Complet / Liste d'attente"
- Le bouton est désactivé (grisé)
- Le curseur indique que l'action n'est pas disponible
- L'utilisateur ne peut pas accéder au formulaire de réservation

## Implémentation Technique

### Fichiers modifiés

1. **src/types.ts**
   - Ajout du type `VoyageStatus`
   - Ajout du champ optionnel `status` dans l'interface `Voyage`

2. **src/components/VoyageStatusBadge.tsx** (nouveau)
   - Composant réutilisable pour afficher les badges de statut
   - Gestion des couleurs, textes et icônes selon le statut
   - Support de deux variantes : 'card' (pour les cartes) et 'detail' (pour la page de détails)
   - Intégration des icônes Lucide React (AlertTriangle, XCircle, Star)

3. **src/components/TripCard.tsx**
   - Intégration du badge de statut sur les cartes de voyage

4. **src/pages/AdminPage.tsx**
   - Ajout du champ de sélection dans les formulaires d'ajout/modification
   - Gestion de la valeur par défaut "normal"
   - Sauvegarde du statut lors de la création/modification

5. **src/pages/VoyageDetailPage.tsx**
   - Affichage du badge sur l'image principale
   - Affichage proéminent du badge à côté du prix dans la carte de réservation
   - Logique de désactivation du bouton de réservation si statut "Complet"

6. **src/data/mockData.ts**
   - Ajout de statuts aux voyages de démonstration
   - Exemples : "almost-full", "limited-offer", "full"

### Structure du code

```typescript
// Type de statut
export type VoyageStatus = 'normal' | 'almost-full' | 'full' | 'limited-offer';

// Interface Voyage mise à jour
export interface Voyage {
  // ... autres champs
  status?: VoyageStatus;
}

// Composant Badge avec variantes
<VoyageStatusBadge status={voyage.status} variant="card" />
<VoyageStatusBadge status={voyage.status} variant="detail" />
```

### Icônes utilisées

- **Bientôt complet** : `AlertTriangle` (Lucide React)
- **Complet** : `XCircle` (Lucide React)
- **Offre limitée** : `Star` (Lucide React)

## Utilisation

### Pour l'administrateur

1. Accéder au panneau d'administration
2. Créer ou modifier un voyage
3. Sélectionner le statut approprié dans le menu déroulant
4. Enregistrer le voyage

### Pour l'utilisateur

Les badges s'affichent automatiquement sur :
- La page d'accueil (avec icône)
- Les résultats de recherche (avec icône)
- La page de détails du voyage (sur l'image ET à côté du prix)

Si un voyage est marqué comme "Complet", le bouton de réservation sera désactivé et affichera "Complet / Liste d'attente".

## Design et UX

### Principes de design

- **Non-intrusif** : Les badges sont placés de manière élégante sans masquer le contenu important
- **Visibilité maximale** : Double affichage sur la page de détails (image + carte de prix)
- **Icônes expressives** : Chaque statut a une icône distinctive pour une reconnaissance rapide
- **Couleurs vives** : Contrastes élevés pour attirer l'attention
- **Cohérence** : Style uniforme sur toutes les pages
- **Accessibilité** : Texte lisible avec bon contraste et icônes significatives

### Psychologie de l'urgence

- **Bientôt complet** : Crée un sentiment de rareté
- **Complet** : Indique clairement l'indisponibilité
- **Offre limitée** : Encourage l'action rapide

## Améliorations futures possibles

1. **Compteur de places** : Afficher le nombre de places restantes
2. **Notification par email** : Alerter quand un voyage complet a des places disponibles
3. **Liste d'attente** : Permettre aux utilisateurs de s'inscrire sur une liste d'attente
4. **Historique des statuts** : Suivre les changements de statut dans le temps
5. **Automatisation** : Changer automatiquement le statut selon le nombre de réservations

## Notes de maintenance

- Le statut par défaut est "normal" (pas de badge)
- Le champ `status` est optionnel dans l'interface `Voyage`
- Les voyages existants sans statut défini seront traités comme "normal"
- Les badges utilisent Tailwind CSS pour le styling

## Date de mise en œuvre

Mars 2026
