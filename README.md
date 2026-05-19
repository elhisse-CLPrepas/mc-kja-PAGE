# mc-kja-PAGE

Page professionnelle responsive pour Master Coach Khadija Jaouane-Adel, Naturo Coaching Academy et Health Consulting & Training.

La page est conçue pour être publiée sur GitHub Pages et fonctionner directement en local sans framework ni dépendance externe.

## 1. Présentation du projet

Objectif du projet :

- présenter l'identité professionnelle de Khadija Jaouane-Adel ;
- mettre en avant Naturo Coaching Academy ;
- présenter les offres, compétences, formations et modalités ;
- centraliser les liens officiels et QR codes ;
- fournir une page publique élégante, lisible et responsive.

Mention responsable :

Les accompagnements proposés relèvent du bien-être, de l'éducation, de l'hygiène de vie et du développement humain. Ils ne remplacent pas un avis médical lorsque celui-ci est nécessaire.

## 2. Structure du dossier

```text
mc-kja-PAGE/
  index.html
  README.md
  assets/
    css/
      style.css
    js/
      app.js
    img/
      logo-nc-academy.png
      logo-nc-academy-rond.png
      khadija-portrait.jpg
      qr-site.png
      qr-nc-academy.png
      qr-whatsapp.png
      qr-email.png
      qr-youtube.png
      qr-instagram.png
      qr-facebook.png
      qr-linkedin.png
      qr-tiktok.png
```

## 3. Comment ouvrir en local

Ouvrir directement le fichier suivant dans un navigateur :

```text
index.html
```

Aucun serveur local n'est obligatoire.

## 4. Comment déposer les images dans assets/img

Les images doivent être placées ici :

```text
assets/img/
```

Noms attendus :

- `logo-nc-academy.png`
- `logo-nc-academy-rond.png`
- `khadija-portrait.jpg`
- `qr-site.png`
- `qr-nc-academy.png`
- `qr-whatsapp.png`
- `qr-email.png`
- `qr-youtube.png`
- `qr-instagram.png`
- `qr-facebook.png`
- `qr-linkedin.png`
- `qr-tiktok.png`

Si une image QR manque, la page reste fonctionnelle et affiche une zone prévue pour le QR.

## 5. Comment initialiser Git

Depuis le dossier `mc-kja-PAGE`, exécuter :

```bash
git init
git branch -M main
git add .
git commit -m "Initialise la page MC-KJA pour GitHub Pages"
git remote add origin https://github.com/elhisse-CLPrepas/mc-kja-PAGE.git
git push -u origin main
```

## 6. Comment publier sur GitHub Pages

1. Créer un dépôt public nommé `mc-kja-PAGE`.
2. Envoyer le dossier local vers GitHub.
3. Aller dans `Settings`.
4. Aller dans `Pages`.
5. Source : `Deploy from a branch`.
6. Branch : `main`.
7. Folder : `/root`.
8. Enregistrer.
9. Attendre la génération du lien public.

Le lien attendu sera de forme :

```text
https://elhisse-CLPrepas.github.io/mc-kja-PAGE/
```

## Contrôles avant publication

- Vérifier le rendu mobile, tablette et desktop.
- Tester tous les boutons de navigation.
- Tester chaque lien officiel.
- Scanner chaque QR code avec un smartphone.
- Relire les textes pour confirmer l'absence de promesse médicale.
- Vérifier que l'image Open Graph est bien `assets/img/khadija-portrait.jpg`.

# mc-kja-PAGE
