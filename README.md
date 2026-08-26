# GTA 6 Spoiler Blocker

Extension Chrome qui floute automatiquement les leaks et spoilers GTA 6 sur X/Twitter.

## Démonstration

https://github.com/Zxldrok/gta6-spoiler-blocker/raw/main/demo.mp4

## Fonctionnalités

- Flou automatique des tweets contenant des spoilers GTA 6
- Badge "WARNING LEAK" au centre de chaque tweet filtré
- 24 mots-clés prédéfinis (gta 6 leak, gameplay, footage, etc.)
- 11 hashtags prédéfinis (#GTA6Leak, #GTASpoiler, etc.)
- Détection des médias (vidéos, images, alt-text)
- Ajout/suppression de mots-clés et hashtags personnalisés
- Toggle ON/OFF rapide depuis le popup
- Compteur de tweets filtrés
- Protection contre les re-renders React de Twitter
- 100% local, aucune donnée envoyée

## Installation

### Depuis GitHub

1. Télécharge le repository
2. Ouvre Chrome → `chrome://extensions`
3. Active **Mode développeur**
4. Clique **"Charger l'extension non empaquetée"**
5. Sélectionne le dossier `gta6-spoiler-blocker`
6. Va sur x.com

### Depuis le zip

1. Télécharge le zip depuis les [Releases](https://github.com/Zxldrok/gta6-spoiler-blocker/releases)
2. Décompresse le fichier
3. Suis les étapes 2 à 6 ci-dessus

## Utilisation

- L'extension active filtre automatiquement les tweets au scroll
- Clique sur l'icône de l'extension pour accéder aux paramètres
- Ajoute ou supprime des mots-clés et hashtags dans le popup
- Utilise le toggle pour activer/désactiver la protection

## Structure du projet

```
gta6-spoiler-blocker/
├── manifest.json      # Configuration MV3
├── content.js         # Script de filtrage (MutationObserver)
├── content.css        # Styles de flou et badge
├── popup.html         # Interface de configuration
├── popup.css          # Styles du popup
├://popup.js           # Logique du popup
├── background.js      # Service worker (badge)
└── icons/             # Icônes de l'extension
```

## Technologies

- JavaScript vanilla (aucun framework)
- Chrome Extension Manifest V3
- MutationObserver pour le filtrage en temps réel
- chrome.storage.sync pour la persistance des paramètres

## License

MIT
