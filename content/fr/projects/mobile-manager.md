---
title: 'Mobile Manager'
type: "Projet professionnel"
description: "Plugin Wordpress permettant de gérer le menu mobile d'un site web, fonctionne en multilingue."
link: [ "Repository GitHub","https://github.com/Theo-Rige/Mobile-manager" ]
stack: [
  "PHP",
  "Wordpress",
  "Tailwind"
]
---

## CONTEXTE

Chez Kelcible, nous utilisions le plugin TapTap pour gérer les menus mobiles de nos sites web. Cependant, ce plugin nous
apportait plus de problèmes que de solutions. On m'a donc demandé de créer un plugin WordPress qui permettrait de gérer
le menu mobile d'un site web, compatible multilingue.

## OBJECTIFS

L'objectif était de créer un plugin WordPress qui permettrait de gérer le menu mobile d'un site web.

Le plugin doit répondre à plusieurs critères :

- Il doit être compatible avec le plugin Polylang que l'on utilise à l'agence pour le multilingue de nos sites.
- Il doit comporter une page d'administration pour gérer le menu et toutes les options de style.
- Être le plus personnalisable possible.

## LE DESIGN

Le plugin est essentiellement fonctionnel, mais la partie administration est essentielle et se doit d'être le plus
clair et ergonomique possible.

J'ai donc réalisé une maquette sur Figma pour pouvoir visualiser le rendu final et accélérer le développement.

:image{src="/images/projects/mobile-manager/admin.webp" alt="Maquette de la page d'administration du plugin Mobile
Manager"}

Le plus compliqué a été de correctement labelliser chaque partie du plugin pour que l'utilisateur puisse facilement s'y
retrouver et comprendre qu'elle partie il est en train de modifier. C'est pourquoi j'ai placé chaque partie dans
des blocs distincts.

Toujours dans l'optique de rendre le plugin le plus clair possible, j'ai décidé d'ajouter une zone au début de la page
où l'on peut visualiser nos changements en temps réel.