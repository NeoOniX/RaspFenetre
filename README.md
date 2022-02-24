# RaspFenêtre
### Qu'est-ce que c'est ?

`RaspFenêtre` est un système de domotique IOT, basé sur des microcontrôleurs Wemos D1 Mini et une Raspberry Pi 4.  
Ce git contient essentiellement les fichiers du serveur web NodeJS hébergé sur la Raspberry Pi 4, utilisée à titre de concentrateur au sein de l'architecture.

# Table of Contents
- [Installation](#Installation)
- [Utilisation](#Utilisation)
- [Informations Additionnelles](#Informations-Additionnelles)
- [Crédits](#Crédits)

# Installation
- Cloner ce git ou en télécharger les fichiers
- Installer [NodeJS](https://nodejs.org/en/) : [Plus d'infos](#Informations-Additionnelles)
- Installer les paquets : `npm i` (dans un terminal à la racine de RaspFenêtre)

# Utilisation

### ⚠️ Bientôt 📆

Dans le fichier `config.js`, vous devez indiquer le réseau et le port sur lequel le scan du réseau sera effectué (pour la reconnaissance des appareils compatibles).  
Dans ce même fichier, vous pouvez changer le nom et le secret du cookie de session.

# Informations Additionnelles

### NodeJS

Pour permettre le fonctionnement de RaspFenêtre, [NodeJS](https://nodejs.org/en/) doit être installé dans sa version 16 LTS (ou supérieure).  
📰 - À l'heure de l'écriture de cette documentation, la version recommandée est donc 16.14.0 LTS.  

### Données

RaspFenêtre stocke localement les données des salles, des utilisateurs et des capteurs IOT, sous forme de fichier JSON. RaspFenêtre a été conçu autour de ces fichiers pour être portable, mais cela vient avec son lot d'inconvénients, notamment sa fragibilité.  
🔐 - Les mots de passe des utilisateurs sont encryptés dans le stockage.  
📆 - D'autres systèmes de stockage pourraient être proposés à l'avenir.

# Crédits
Ce git vous est proposé par :
- <img width="25px" src="docs/img/onix.png"> [@NeoOniX](https://github.com/NeoOniX)
- <img width="25px" src="docs/img/assa.jpg"> [@AssADev](https://github.com/AssADev)
