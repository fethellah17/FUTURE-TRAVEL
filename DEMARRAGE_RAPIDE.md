# 🚀 Démarrage Rapide - Système Dynamique

## Installation et Lancement

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:5173
```

## 🎯 Test Rapide en 5 Minutes

### 1️⃣ Ajouter un Voyage (2 min)

1. Aller sur `http://localhost:5173/admin`
2. Se connecter avec n'importe quel email/mot de passe
3. Cliquer sur **"Gérer les Voyages"** dans la sidebar
4. Cliquer sur **"Ajouter un Voyage"**
5. Remplir :
   - Titre : "Test Omrah 2025"
   - Catégorie : "Omrah"
   - Prix : 2000
   - Dates : Sélectionner une plage (ex: 1-14 Mars)
   - Description : "Voyage test"
6. Cliquer sur **"Enregistrer"**
7. ✅ Notification : "Voyage ajouté avec succès"

### 2️⃣ Vérifier la Synchronisation (30 sec)

1. Aller sur la page d'accueil : `http://localhost:5173/`
2. ✅ Le voyage "Test Omrah 2025" apparaît !
3. Cliquer sur le filtre **"Omrah"**
4. ✅ Le voyage est toujours visible
5. Cliquer sur **"Voyage Organisé"**
6. ✅ Le voyage disparaît (car il est dans "Omrah")

### 3️⃣ Tester un Formulaire (1 min)

1. Aller sur `http://localhost:5173/devis`
2. Remplir le formulaire :
   - Nom : "Test User"
   - Email : "test@example.com"
   - Sujet : "Test Devis"
   - Message : "Ceci est un test"
3. Cliquer sur **"Envoyer la demande"**
4. ✅ Notification : "Votre demande de devis a été envoyée avec succès !"

### 4️⃣ Vérifier la Boîte de Réception (30 sec)

1. Retourner sur `/admin`
2. Cliquer sur **"Boîte de Réception"**
3. ✅ Le message "Test Devis" apparaît avec une pastille bleue 🔵
4. Cliquer sur le message pour le lire
5. ✅ La pastille bleue disparaît (message marqué comme lu)

### 5️⃣ Modifier un Voyage (1 min)

1. Dans l'Admin, aller sur **"Gérer les Voyages"**
2. Cliquer sur l'icône **crayon** (✏️) à côté du voyage "Test Omrah 2025"
3. Modifier le prix : 2500
4. Cliquer sur **"Enregistrer les modifications"**
5. ✅ Notification : "Voyage modifié avec succès"
6. Retourner sur `/` → Le prix est mis à jour !

---

## 🎨 Fonctionnalités à Explorer

### Filtres de Catégories
- Page d'accueil : Cliquer sur "Tous", "Omrah", "Voyage Organisé", "Voyage à la Carte"
- Les voyages se filtrent instantanément

### Formatage Automatique
- Les prix s'affichent avec "DA" : `2 000 DA`
- Les durées sont calculées automatiquement : `14 jours`
- Les dates sont formatées : `01/03/2025 - 14/03/2025`

### Formulaires
- **Billetterie** (`/billetterie`) : Demande de billets d'avion
- **Devis** (`/devis`) : Demande de devis personnalisé
- Tous les formulaires envoient vers la Boîte de Réception Admin

### Admin
- **Boîte de Réception** : Voir tous les messages reçus
- **Gérer les Voyages** : Ajouter, modifier, supprimer des voyages
- Compteur de messages non lus dans la sidebar

---

## 🔄 Persistance des Données

Les données sont sauvegardées automatiquement dans le navigateur :

- Fermez le navigateur
- Rouvrez `http://localhost:5173`
- ✅ Vos voyages et messages sont toujours là !

### Réinitialiser les Données

Si vous voulez repartir de zéro :

1. Ouvrir la console du navigateur (F12)
2. Taper :
```javascript
localStorage.clear()
location.reload()
```
3. ✅ Retour aux données initiales

---

## 📱 Test Responsive

Le site est entièrement responsive :

1. Ouvrir les DevTools (F12)
2. Activer le mode mobile (Ctrl+Shift+M)
3. Tester sur différentes tailles d'écran
4. ✅ L'Admin a un menu burger sur mobile
5. ✅ Les formulaires s'adaptent
6. ✅ Les cartes de voyage sont empilées

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
npm run dev
```

### Les voyages n'apparaissent pas
1. Vérifier la console du navigateur (F12)
2. Actualiser la page (F5)
3. Vérifier que vous êtes bien connecté à l'Admin

### Les messages ne s'affichent pas
1. Vérifier que le formulaire a bien été soumis (notification toast)
2. Aller dans "Boîte de Réception" dans l'Admin
3. Actualiser la page si nécessaire

---

## 📚 Documentation Complète

- **Guide Utilisateur** : `GUIDE_UTILISATION.md`
- **Documentation Technique** : `SYSTEME_DYNAMIQUE.md`
- **Liste des Changements** : `CHANGELOG_SYSTEME_DYNAMIQUE.md`
- **Résumé** : `RESUME_IMPLEMENTATION.md`

---

## 🎉 C'est Tout !

Vous avez maintenant un système complet de gestion de données dynamique fonctionnel.

**Prochaines étapes recommandées** :
1. Personnaliser les voyages avec vos vraies données
2. Tester tous les formulaires
3. Explorer les différentes catégories
4. Préparer la migration vers Supabase (voir `SYSTEME_DYNAMIQUE.md`)

**Bon développement ! 🚀**
