# Instructions pour le Logo ZAHRAT AL HOUDA

## Emplacement du Logo
Le logo actuel se trouve dans : `src/assets/logo.png`

## Où le Logo est Utilisé

1. **Navbar** (Navigation principale) - `src/components/Navbar.tsx`
   - Ligne 23 : `<img src={logo} alt="ZAHRAT AL HOUDA" className="h-12 w-auto" />`
   - Taille : hauteur de 48px (h-12)

2. **Footer** (Pied de page) - `src/components/Footer.tsx`
   - Ligne 11 : `<img src={logo} alt="ZAHRAT AL HOUDA" className="h-16 w-auto" />`
   - Taille : hauteur de 64px (h-16)

3. **Page Admin (Login)** - `src/pages/AdminPage.tsx`
   - Ligne 145 : Texte "ZAHRAT AL HOUDA" (pas d'image actuellement)
   - Pour ajouter le logo ici, remplacer le texte par :
     ```tsx
     <img src={logo} alt="ZAHRAT AL HOUDA" className="h-16 w-auto mx-auto mb-4" />
     ```
   - N'oubliez pas d'importer : `import logo from "@/assets/logo.png";`

4. **Sidebar Admin** - `src/pages/AdminPage.tsx`
   - Ligne 62 : Texte "ZAHRAT AL HOUDA" (pas d'image actuellement)
   - Pour ajouter le logo ici, remplacer le texte par :
     ```tsx
     <img src={logo} alt="ZAHRAT AL HOUDA" className="h-12 w-auto mx-auto" />
     ```
   - N'oubliez pas d'importer : `import logo from "@/assets/logo.png";`

## Comment Remplacer le Logo

1. Préparez votre nouveau logo au format PNG avec fond transparent
2. Dimensions recommandées : 
   - Largeur : 200-400px
   - Hauteur : 80-120px
   - Format : PNG avec transparence
3. Remplacez le fichier `src/assets/logo.png` par votre nouveau logo
4. Le logo s'adaptera automatiquement grâce aux classes `w-auto`

## Couleurs du Logo
Selon la charte graphique :
- **Bleu Roi** : #003D82 (HSL: 210 100% 25%)
- **Doré** : #D4A017 (HSL: 43 74% 49%)
- **Blanc** : #FFFFFF

## Notes
- Le logo doit être lisible sur fond blanc
- Privilégiez un logo horizontal pour une meilleure intégration
- Le logo doit inclure les couleurs Bleu Roi et Doré pour la cohérence visuelle
