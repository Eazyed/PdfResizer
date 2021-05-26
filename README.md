# PdfResizer

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