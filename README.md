# PdfResizer

## Mode d'emploi
Récupération du dossier : npm install

Base de données : nous avons utilisé l'instance par défaut de wamp
Exécuter le script .\db\createDB.sql dans l'instance MySQL de votre choix
Indiquer les informations de connexion dans les fichiers 
* index.js (ligne 11)
* .\workers\fileExplorerWorker.js (ligne 10)

Config.json :
* fileExtensions : tous les types d'images à cibler dans les workers
* foldersToExplore : liste des dossiers qui seront lus par un worker
* pathToTrash : le dossier où seront déplacés les fichiers sans la bonne extension
* pathToResult : le dossier où seront déplacées les images redimensionnées
* widthResized : largeur des images redimensionées
* heightResized : hauteur des images redimensionées

Lancer les workers : `node launchWorkers.js`

Lancer le shell de recherche : `node index.js`

## Notes sujet :
fichier de configuration
liste des dossiers ciblés
Liste des extensions d'images a trouver

dossier : image.png + image_metadata.txt

worker
redimensionne l'image et la stocke dans un autre dossier
stocke les informations de metadata et le chemin vers la nouvelle image redimensionnée en database
supprime les fichiers originels
si autres fichiers les déplace vers dossier trash

shell
récupère toutes les images stockées dont la metadata contient le mot clé
restitue toutes les adresses des images
