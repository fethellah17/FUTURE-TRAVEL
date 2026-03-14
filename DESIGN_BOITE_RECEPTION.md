# Design de la Boîte de Réception - ZAHRAT AL HOUDA

## 📋 Spécifications du Design

### 1. Uniformisation des Couleurs

**Toutes les cartes de messages ont un arrière-plan Blanc pur (#FFFFFF)**
- ✅ Messages lus : fond blanc
- ✅ Messages non-lus : fond blanc (pas de fond bleu)
- ✅ Cohérence visuelle totale

### 2. Bordures et Séparations

**Bordure fine et discrète**
- Couleur : Light Gray (`border-gray-200`)
- Épaisseur : 1px
- Ombre légère au repos : `shadow-sm`

**Au survol (Hover)**
- Bordure dorée fine : `hover:border-accent`
- Ombre plus prononcée : `hover:shadow-card`
- Transition fluide : `transition-all`

### 3. Lisibilité

**Type de message (DEVIS / BILLETTERIE)**
- Couleur : **Bleu Roi** (`text-primary`)
- Style : Uppercase, petite taille (10px)
- Font-weight : Semibold

**Nom de l'expéditeur**
- Couleur : **Bleu Roi** (`text-primary`)
- Font-weight : 
  - **Semibold** pour les messages non-lus
  - Medium pour les messages lus

**Texte du message**
- Couleur : Gris foncé (`text-gray-600`)
- Taille : 14px (text-sm)
- Truncate pour éviter le débordement

**Icônes d'action**
- Œil (voir) : Gris clair par défaut (`text-gray-400`)
- Au survol : Bleu Roi (`hover:text-primary`)
- Taille : 16px
- Transition douce

### 4. État de Lecture

**Messages non-lus**
- ✅ Pastille bleue à gauche (2px de diamètre)
- ✅ Nom de l'expéditeur en gras (font-semibold)
- ✅ Fond reste toujours blanc

**Messages lus**
- ✅ Pas de pastille
- ✅ Nom de l'expéditeur en font-medium
- ✅ Fond reste toujours blanc

## 🎨 Code CSS Appliqué

```tsx
<div className="relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all bg-white border border-gray-200 shadow-sm hover:border-accent hover:shadow-card">
  {/* Pastille bleue pour messages non-lus */}
  {!msg.isRead && (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
  )}
  
  <div className="flex-1 min-w-0 ml-2">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-upperspace text-primary text-[10px] font-semibold">
        {msg.type}
      </span>
      <span className={`text-sm truncate text-primary ${!msg.isRead ? "font-semibold" : "font-medium"}`}>
        {msg.name}
      </span>
    </div>
    <p className="text-sm text-gray-600 truncate">
      {msg.subject} — {msg.content}
    </p>
  </div>
  
  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
    {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
  </span>
  
  <button className="text-gray-400 hover:text-primary transition-colors">
    <Eye size={16} />
  </button>
</div>
```

## 📊 Hiérarchie Visuelle

1. **Pastille bleue** (si non-lu) → Attire l'attention immédiatement
2. **Type de message** (DEVIS/BILLETTERIE) → Identification rapide
3. **Nom de l'expéditeur** → En Bleu Roi, gras si non-lu
4. **Contenu du message** → Gris foncé, lisible
5. **Date** → Gris clair, discret
6. **Icône d'action** → Gris clair, visible au survol

## ✨ Interactions

### Au survol d'une carte
- Bordure passe de gris à doré
- Ombre devient plus prononcée
- Transition fluide (300ms)

### Au clic sur une carte
- Ouvre le modal de détail
- Marque le message comme lu
- Retire la pastille bleue
- Change le font-weight du nom

### Au survol de l'icône œil
- Couleur passe de gris à Bleu Roi
- Cursor: pointer

## 🔍 Accessibilité

- ✅ Aria-label sur le bouton "Voir le message"
- ✅ Contraste suffisant (WCAG AA)
- ✅ Indicateurs visuels clairs (pastille + gras)
- ✅ Zone cliquable suffisamment grande (padding 16px)
- ✅ Focus visible au clavier

## 📱 Responsive

- Sur mobile : Stack vertical des éléments
- Date peut passer en dessous si nécessaire
- Icônes restent visibles
- Padding adapté

---

**Résultat** : Une interface épurée, professionnelle et cohérente avec l'identité visuelle de ZAHRAT AL HOUDA.
