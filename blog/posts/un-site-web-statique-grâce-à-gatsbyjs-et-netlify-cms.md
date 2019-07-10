---
title: Un site web statique grâce à GatsbyJS et Netlify CMS
path: un-site-web-statique-grace-a-gatsbyjs-et-netlify-cms
date: 2019-07-09T23:19:21.834Z
categories:
  - JAMStack
tags:
  - JAMStack
  - Tech
  - React
  - Infos
  - Gatsby
keywords:
  - dev
  - tuto
  - tutoriel
  - gatsby
  - netlify
  - cms
  - netlifyCMS
  - jamstack
  - statique
  - headless
image: /images/uploads/blog1.jpg
---
Hello World !

A l'occasion de la refonte de mon site web perso, j'ai décidé de m'offrir un blog pour vous parler de (et vous partager) ce que je fais.

Alors allons-y et commençons par parler de ce site. Ce sera l'occasion de parler de comment il a été fait de manière général, et de définir les prochains sujets que je traiterai dans ce blog.

Quand j'ai décidé de refaire mon site perso, j'avais l'embarras du choix en termes de technos à utiliser : ReactJS (que je connais très bien), Angular (que j'ai connu par le passé), VueJS...

Mais m'intéressant de plus en plus à la JAMStack, et amoureux de React, j'ai cherché un framework qui allie ces deux merveilleux mondes. Et c'est c'est là où je suis tombé sur GatsbyJS.

> Attends, Attends ! C'est bien tout ça mais de quoi tu parles ?

Je ferai des posts pour détailler chacune de ces notions, mais voici brièvement de quoi il est question.

## JAMStack

Dans le monde du développement Web, après la stack LAMP (pour Linux Apache MySQL Php) largement utilisées dans les années 2000, puis la stack MEAN (pour MongoDB, Express, Angular, NodeJS) qui a trouvé sa popularité dans les années 2010, nous venons d'assister à la naissance de la nouvelle "hype" du dév web : La stack JAM (pour Javascript, Api, Markup) ou plus simplement "le retour aux sites statiques".

Le principe est simple: 

* Les fonctionnalités dynamiques du site sont gérées par Javascript.
* Les fonctionnalités côté backend sont interfacées via des APIs réutilisables, accessibles en HTTPS, par le code JS.
* Le tout est servi par des pages HTML (Markup) statiques

Sur cette page web par exemple (oui, celle que vous êtes en train lire ^), les fonctionnalités dynamiques (navigation, chargement différé des images, etc...) sont gérées en JS. Cet article est écrit en markdown et est stocké côté serveur. Et enfin, toutes les pages sont calculées et construites à partir du contenu au moment du build, ce qui en fait un site complètement statique.

> Ok, ok, mais en quoi c'est bien ?

Les avantages sont nombreux:

* **La performance :** Le site, ainsi que ses assets étant des fichiers statiques, il peuvent être servi depuis un CDN.
* **La sécurité :** Plus besoin de de soucier des failles du côté du serveur ou de la base de données.
* **Le coût :** L'hébergement des fichiers statiques coûte très peu cher, voire est complètement gratuit.
* **La scalabilité :** Votre site web ne peut pratiquement pas être victime de son succès, grâce aux CDN.
* **L'expérience développeur :** Les architectures monolithiques laissent place à des architectures découplées. Ce qui permet aux développeurs front d'aller plus vite et de manière plus ciblée.

> Ouais ok, c'est pas mal ton truc. Mais ça a l'air bien compliqué à mettre en place. Comment on fait du coup ?

Alors oui, on peut toujours écrire toutes ses pages directement en HTML à la main, mais on est d'accord que passées des pages web super simples, ça se corse très vite, et là on oublie tout de suite l'approche composants, la réutilisabilité du code, et tout ce qui fait le développement moderne...

Non, pour ça, on s'appuie sur des générateurs de sites statiques, et il y en a plusieurs : Jeykill (l'un des premiers sortis, en 2015), Gatsby, NextJS, Hugo, etc... chacun vient avec son lot de fonctionnalités embarquées, son framework frontend (React, Vue, Preact,...) et son système de plugins qui va nous faciliter la vie sur bien des aspects.

Pour ce site, mon choix s'est porté sur Gatsby.

## GatsbyJS

Gatsby est un générateur de sites web statiques, basé sur React et GraphQL.

Dans ce qui m'a séduit, il y a les généralités : 

* **Gratuit et Open Source** (bon ok, ils le sont tous)
* **React** (et ça, j'adore !)
* **GraphQL** (et ça, c'est vraiment cool)

Et il y a les raisons de fond :

* **La gestion de données :** Gatsby utilise GraphQL pour créer une couche de données (data layer). Il est fait de manière à pouvoir collecter des données de n'importe quelle source, ça peut être du Markdown, JSON, votre CMS préféré, API externes... vraiment n'importe quelle source ! Et au moment du build, il crée un serveur GraphQL interne avec toutes ces données. Donc dans vos composants React, toutes les données sont collectées au moment du build à partir de ce même serveur, sous forme de requêtes GraphQL.
* **La richesse de l'écosystème :** Gatsby existe depuis très peu de temps, mais il affiche déjà une documentation très complète et un bon nombre de "starters" pour vous aider à démarrer rapidement dans des configurations différentes.
* **La performance :** Gatsby met un point d'honneur sur tout ce qui touche la performance et l'accessibilité, et vous le ressentirez vraiment sur votre produit final (vous n'avez qu'à lancer un audit lighthouse de ce site pour en avoir la preuve). De tout les générateurs que j'ai pu tester, c'est celui qui sort vraiment du lot.

Et puis bon, si on ne profite même pas de ces projets perso pour apprendre de nouvelles choses et se faire sa propre idée...

> Attends, mais Gatsby ne gère pas le contenu !

Une fois la structure du site faite, il me fallait en effet un gestionnaire de contenu, un CMS "headless" en somme. Là encore, ce ne sont pas les choix qui manquent, Gatsby permettant de requêter n'importe quelle source. Alors on se retrouve avec :

* Des CMS "classiques" (souples mais peu performants), de type Wordpress (PHP, hébergé ou "On Premise") ou Drupal (PHP),
* Des CMS un peu "moins classiques" (plus rapides), comme Ghost (NodeJS) ou OctoberCMS (Laravel),
* Ou encore avec des CMS carrément "nouvelle génération" et mieux adaptés à la JAMStack, comme Strapi, Contentful, ou Netlify CMS.

## Netlify CMS

C'est un CMS développé par Netlify, le spécialiste de l’hébergement et du déploiement de sites statiques. 

Il est embarqué dans votre site, est très simple à configurer (quelques minutes suffisent pour démarrer) et s'appuie sur Git. En effet, il ne requiert pas de base de données et le contenu que vous rédigerez sera directement stocké dans votre repo Git (Github, Gitlab ou BitBucket) sous forme de fichiers Markdown (donc statiques !).

On ne peut pas faire plus rapide ou plus sécurisé ! Je n'ai rien d'autre à rajouter ^^

> Un site web statique, du contenu dans Git... mais t'héberge ça comment ?

Il n'y a rien de plus simple qu'héberger un site web statique, et les solutions ne manquent pas : Google Firebase, Amazon S3, Netlify, Github Pages, Zeit Now, Surge, un simple serveur Apache ou Nginx perso... et on peut même héberger son site statique sur Dropbox (oui, oui)

## Netlify

Au début, j'étais parti sur Firebase, pour sa gratuité et sa simplicité (et puis oui, je connaissais déjà bien). Il suffisait de `yarn build`er son site puis de le `firebase deploy`er pour voir ses changements appliqués en prod.

Sauf que voilà, avec l'utilisation de Netlify CMS depuis son interface web, qui push directement les modifications dans Git, il fallait à chaque fois rouvrir le projet en local, tirer les changement de Git (`git pull`), démarrer le serveur en local pour vérifier (prévisualiser) les changements (`yarn start`), reconstruire le projet (`yarn build`) et enfin lancer le déploiement (`firebase deploy`). Fastidieux travail donc, que tout bon développeur doit chercher à automatiser. Il faut donc monter un deuxième environnement sur Firebase (on l'appelle preview ou qualif ou recette...), une PIC (Plateforme d'Intégration Continue) grâce à Gitlab CI (vu que mon code est hébergé sur Gitlab) et commencer à scripter ses pipelines... mais cherchant à simplifier au maximum les choses et n'utilisant que la fonctionnalité d'hébergement (Hosting) de Firebase, rien ne justifiait de rester dessus si une solution plus simple se présentait. Et ça tombait bien, puisque Netlify fait tout ce que Firebase ne fait pas.

Netlify s'est spécialité dans l'hébergement de sites statique, il est très jeune aussi mais il monte à vitesse grand V. Il est tout aussi gratuit que Firebase mais propose quelques fonctionnalités très intéressantes :

* Le déploiement : Contrairement à Firebase qui se limite à l'hébergement, Netlify peut "builder" votre site. Il détecte automatiquement  la nature de votre projet (ici Gatsby) et auto-configure le build. 
* Le déploiement continu : Dès que vous poussez une modification sur votre branche principale (disons `master`), Netlify build et déploie automatiquement votre site en prod.
* Le "preview" des Merges Requests : Admettons que votre branche de travail s'appelle `develop`, dès que vous créerez une MR sur `master`, Netlify va la builder et la déployer non pas en prod mais sur un environnement interne, vous permettant ainsi de la prévisualiser. Il fera de même à chaque `commit` sur cette MR. Au moment où vous êtes content du résultat et que vous "mergez" la MR sur `master`, Netlify effectue un build de prod.
* Gestion des formulaires : Un formulaire de contact sur votre site ? Pas besoin de le gérer en JS, pas besoin d'appel API, vous rajouter deux attributs à votre formulaire et Netlify s'en occupe au moment du build. Vous recevrez les envois du formulaire directement dans votre dashboard Netlify et, si vous le souhaitez, par mail.

Tout ceci a fait que j'ai eu envie de tester cette solution, et de finalement l'adopter.

## Conclusion

Voilà, on arrive à la fin de ce premier article. Il y a beaucoup de choses à dire et j'espère qu'il n'a pas été trop long.

Je vous ai présenté les choix principaux que j'ai fait pour construire ce site web. Je tâcherai de détailler chaque solution dans un post à part pour pouvoir entrer un peu plus dans le détail.

En attendant, n'hésitez pas à laisser un commentaire, pour dire ce que vous en pensez ou si vous avez des questions.
