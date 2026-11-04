# MultiMatch

Dashboard frontend pour afficher plusieurs pages de matchs côte à côte, à la manière d’un mur de moniteurs.

MultiMatch organise et tente d’intégrer les **pages que vous fournissez**. Il ne propose, n’héberge, n’extrait, ne proxifie ni ne redistribue aucun flux vidéo.

L’affichage dans un iframe ne fonctionne **que si le site d’origine l’autorise**. Beaucoup de sites bloquent volontairement l’intégration (`X-Frame-Options`, CSP `frame-ancestors`, DRM, authentification, etc.). Dans ce cas, ouvrez la page dans un nouvel onglet depuis le panneau.

## Prérequis

- Node.js 20+ recommandé
- npm

## Scripts

```bash
npm install
npm run dev
```

Autres commandes :

- `npm run test` — tests unitaires (validation d’URL, LocalStorage, grilles)
- `npm run lint` — Oxlint
- `npm run typecheck` — TypeScript
- `npm run build` — compilation de production
- `npm run preview` — prévisualisation du build

## Utilisation

1. Collez l’URL `http` ou `https` d’une page de match.
2. Ajoutez un libellé optionnel.
3. Choisissez une disposition 1, 2, 4 ou 9 panneaux.
4. Retirez un panneau, passez-le en plein écran, ou ouvrez la page d’origine.

La liste des matchs et la disposition sont enregistrées dans le LocalStorage de **ce navigateur uniquement**. Aucune synchronisation entre appareils.

## Permissions iframe

Les iframes reçoivent uniquement `allow="fullscreen; encrypted-media; picture-in-picture"`. Aucun accès caméra, micro ou géolocalisation n’est accordé. Aucun `sandbox` n’est appliqué par défaut, pour ne pas casser des intégrations légitimes.

## Stack

React, Vite, TypeScript, Tailwind CSS, LocalStorage.
