# Guide d'Utilisation - Système Dynamique

## 🎯 Fonctionnalités principales

### 1. Ajouter un voyage (Admin)

1. Connectez-vous à l'Admin (`/admin`)
2. Cliquez sur "Gérer les Voyages" dans la sidebar
3. Cliquez sur "Ajouter un Voyage"
4. Remplissez le formulaire :
   - **Titre** : Nom du voyage (ex: "Omrah Ramadan 2025")
   - **Catégorie** : Omrah, Voyage Organisé, ou Voyage à la Carte
   - **Prix** : Montant en DA (sera automatiquement formaté avec "DA")
   - **Dates** : Sélectionnez la date de départ et de retour
     - La durée sera calculée automatiquement
   - **Image** : URL de l'image (optionnel)
   - **Description** : Détails du voyage
5. Cliquez sur "Enregistrer"
6. ✅ Le voyage apparaît immédiatement sur la page d'accueil et dans sa catégorie

### 2. Modifier un voyage (Admin)

1. Dans "Gérer les Voyages", cliquez sur l'icône crayon (✏️) à côté du voyage
2. Modifiez les informations souhaitées
3. Cliquez sur "Enregistrer les modifications"
4. ✅ Les changements sont visibles immédiatement partout sur le site

### 3. Supprimer un voyage (Admin)

1. Dans "Gérer les Voyages", cliquez sur l'icône poubelle (🗑️)
2. ✅ Le voyage disparaît immédiatement du site

### 4. Recevoir les demandes de devis

Quand un utilisateur remplit le formulaire "Devis Gratuit" :

1. Le message arrive automatiquement dans "Boîte de Réception"
2. Les messages non lus ont une pastille bleue 🔵
3. Cliquez sur un message pour le lire
4. Toutes les informations sont disponibles :
   - Nom et coordonnées du client
   - Sujet de la demande
   - Message détaillé
   - Date de réception

### 5. Recevoir les demandes de billetterie

Quand un utilisateur remplit le formulaire "Billetterie" :

1. Le message arrive dans "Boîte de Réception" avec le type "BILLETTERIE"
2. Contient tous les détails :
   - Ville de départ et destination
   - Date souhaitée
   - Nombre de passagers
   - Classe (Économique, Affaires, Première)
   - Informations complémentaires

## 🔄 Synchronisation en temps réel

### Ce qui se synchronise automatiquement :

- ✅ Ajout d'un voyage → Apparaît sur la page d'accueil
- ✅ Modification d'un voyage → Mise à jour partout
- ✅ Suppression d'un voyage → Disparaît partout
- ✅ Nouveau message → Apparaît dans la boîte de réception
- ✅ Filtres par catégorie → Fonctionnent avec les nouveaux voyages

### Pages concernées :

- **Page d'accueil** (`/`) : Affiche les 3 derniers voyages
- **Nos Omrah** (`/omrah`) : Tous les voyages de type "Omrah"
- **Voyages Organisés** (`/voyage-organise`) : Tous les voyages organisés
- **Voyages à la Carte** (`/voyage-a-la-carte`) : Tous les voyages personnalisés

## 💾 Persistance des données

Les données sont sauvegardées automatiquement dans le navigateur :

- Les voyages ajoutés restent même après fermeture du navigateur
- Les messages reçus sont conservés
- Pour réinitialiser : Ouvrir la console du navigateur et taper :
  ```javascript
  localStorage.clear()
  ```

## 🎨 Formatage automatique

### Prix
- Entrée : `1500`
- Affichage : `1 500 DA`

### Durée
- Sélection : 1 Mars → 14 Mars
- Calcul automatique : `14 jours`

### Dates
- Format : `01/03/2025 - 14/03/2025`

## 📱 Notifications

Vous recevrez des notifications toast pour :

- ✅ Voyage ajouté avec succès
- ✅ Voyage modifié avec succès
- ✅ Voyage supprimé
- ✅ Demande de devis envoyée
- ✅ Demande de billetterie envoyée

## 🚀 Prochaines étapes (Migration Supabase)

Le système est prêt pour être connecté à une vraie base de données :

1. Créer un compte Supabase
2. Créer les tables `voyages` et `messages`
3. Remplacer les fonctions du Context par des appels API
4. Activer les subscriptions en temps réel

Voir `SYSTEME_DYNAMIQUE.md` pour plus de détails techniques.

## ❓ Dépannage

### Les voyages n'apparaissent pas
- Vérifiez que vous êtes bien connecté à l'Admin
- Actualisez la page (F5)
- Vérifiez la console du navigateur pour les erreurs

### Les messages ne s'affichent pas
- Vérifiez que le formulaire a bien été soumis (notification toast)
- Allez dans "Boîte de Réception" dans l'Admin
- Les nouveaux messages ont une pastille bleue

### Réinitialiser les données
```javascript
// Dans la console du navigateur (F12)
localStorage.clear()
location.reload()
```
