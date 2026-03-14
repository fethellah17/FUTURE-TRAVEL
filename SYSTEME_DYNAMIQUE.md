# Système de Données Dynamique - ZAHRAT AL HOUDA

## Vue d'ensemble

Le site utilise maintenant un système de gestion d'état global avec React Context API qui permet une synchronisation en temps réel entre toutes les pages.

## Architecture

### 1. Context Global (`src/contexts/DataContext.tsx`)

Le `DataContext` gère l'état global de l'application :

- **Voyages** : Liste de tous les voyages disponibles
- **Messages** : Liste de tous les messages reçus via les formulaires

#### Fonctions disponibles :

```typescript
// Gestion des voyages
addVoyage(voyage: Voyage)          // Ajouter un nouveau voyage
updateVoyage(id, updates)          // Modifier un voyage existant
deleteVoyage(id)                   // Supprimer un voyage

// Gestion des messages
addMessage(message)                // Ajouter un nouveau message
markMessageAsRead(id)              // Marquer un message comme lu
deleteMessage(id)                  // Supprimer un message
```

### 2. Persistance des données

Les données sont automatiquement sauvegardées dans le `localStorage` du navigateur pour persister entre les sessions.

## Flux de données

### Ajout d'un voyage (Admin → Front-end)

1. L'admin remplit le formulaire "Ajouter un voyage"
2. Le voyage est ajouté via `addVoyage()`
3. Le Context met à jour l'état global
4. Toutes les pages abonnées (Index, VoyageListPage) se mettent à jour automatiquement
5. Le voyage apparaît immédiatement dans sa catégorie

### Envoi d'un formulaire (Front-end → Admin)

1. Un utilisateur remplit un formulaire (Billetterie ou Devis)
2. Le message est envoyé via `addMessage()`
3. Le Context met à jour l'état global
4. Le message apparaît instantanément dans la Boîte de Réception de l'Admin
5. Une notification toast confirme l'envoi

## Fonctionnalités implémentées

### ✅ Gestion Dynamique des Voyages

- Ajout de voyages depuis l'Admin
- Modification de voyages existants
- Suppression de voyages
- Synchronisation automatique avec la page d'accueil
- Filtrage par catégorie en temps réel

### ✅ Flux des Formulaires

- **Billetterie** : Envoie les demandes de billets à la boîte de réception
- **Devis Gratuit** : Envoie les demandes de devis à la boîte de réception
- Tous les détails sont capturés (nom, email, téléphone, sujet, contenu)
- Les messages non lus sont marqués avec une pastille bleue

### ✅ Automatisation des Dates et Calculs

- Calcul automatique de la durée basé sur les dates de départ/retour
- Formatage automatique des dates (format français)
- Affichage en temps réel de la durée calculée
- Formatage des prix avec l'unité "DA" partout sur le site

### ✅ Notifications Toast

- Confirmation d'envoi de formulaire
- Confirmation d'ajout/modification/suppression de voyage
- Messages d'erreur si nécessaire

## Utilisation

### Dans un composant React

```typescript
import { useData } from "@/contexts/DataContext";

function MonComposant() {
  const { voyages, messages, addVoyage, addMessage } = useData();
  
  // Utiliser les données et fonctions
  return (
    <div>
      {voyages.map(v => <div key={v.id}>{v.title}</div>)}
    </div>
  );
}
```

### Formatage des prix

```typescript
import { formatPrice } from "@/lib/formatters";

const prix = formatPrice(1500); // "1 500 DA"
```

## Migration vers Supabase (Future)

Le code est structuré pour faciliter la migration vers Supabase :

1. Remplacer `addVoyage()` par un appel API Supabase
2. Remplacer `addMessage()` par un appel API Supabase
3. Utiliser les subscriptions Supabase pour les mises à jour en temps réel
4. Supprimer le localStorage et utiliser la base de données

Exemple de migration :

```typescript
// Avant (Mock)
const addVoyage = (voyage: Voyage) => {
  setVoyages(prev => [voyage, ...prev]);
};

// Après (Supabase)
const addVoyage = async (voyage: Voyage) => {
  const { data, error } = await supabase
    .from('voyages')
    .insert([voyage]);
  
  if (!error) {
    setVoyages(prev => [data[0], ...prev]);
  }
};
```

## Composants réutilisables

- `DateRangePicker` : Sélecteur de plage de dates
- `TripCard` : Carte de voyage avec formatage automatique
- Formulaires avec validation et gestion d'état

## Avantages du système

1. **Synchronisation en temps réel** : Toutes les pages voient les mêmes données
2. **Code maintenable** : Logique centralisée dans le Context
3. **Prêt pour la production** : Structure adaptée pour une vraie API
4. **Expérience utilisateur fluide** : Notifications et feedback instantané
5. **Persistance locale** : Les données survivent aux rechargements de page
