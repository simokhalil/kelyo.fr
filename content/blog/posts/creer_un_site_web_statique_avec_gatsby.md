---
title: Créer un site web statique avec Gatsby
date: 2019-07-18T10:04:41.883Z
categories:
  - JAMStack
  - Tutos
  - React
tags:
  - React
  - JAMStack
  - Gatsby
keywords:
  - tuto
  - tutoriel
  - gatsby
  - site
  - web
  - statique
  - static
  - jamstack
image: /images/uploads/blog1.jpg
---
Pour ce deuxième article de mon blog, je vais rentrer un peu plus dans le vif du sujet de la JAMStack et des sites web statiques, avec [Gatsby](https://www.gatsbyjs.org).

[Gatsby](https://www.gatsbyjs.org) est un générateur de sites web statiques, basé sur [React](https://fr.reactjs.org) qui monte avec une puissance phénoménale. Je l'ai essayé et comme la majorité des développeurs l'ayant essayé, je l'ai trouvé impressionnant et je l'ai adopté.

Gatsby compile votre projet en assets statiques, mais utilise les capacités dynamiques de React au besoin.

Quelques points forts de Gatsby:

* Très rapide 🚀(Server Side Rendering, Code splitting, prefetching, optimisation des images, etc...). Tout ce qui se fait de mieux dans le dév web moderne
* Une documentation très complète et accessible
* Une communauté grandissante et passionnée
* Une expérience dévelopeur très agréable : C'est un système puissant et assez complexe mais pensé de manière à nous simplifier et nous abstraire au maximum cette complexité en couvrant la majorité des besoin et use-cases classiques.
* La liberté d'utiliser n'importe quelle source de données (fichiers locaux, API, CMS, bases de données...)

## Les starters

Une des choses vraiment cool de Gatsby est l'abondance des [projets starters](https://www.gatsbyjs.org/starters). Ce sont des projets "modèles" que la communauté met à disposition, pour aider les développeurs à démarrer rapidement selon le cas d'usage ou les outils souhaités. De plus, une attention particulière est donnée aux best practices sur ces projets, ce qui contribue à notre amélioration.

Utiliser un starter est aussi le choix d'avoir ces outils préférés déjà embarqués (linter, pretifier, etc...). Ainsi, vous avez, par défaut, accès à certaines commandes utiles, que l'on retrouver dans la section `scripts` du fichier `package.json`, comme ici, par exemple, avec le starter par défaut de Gatsby :

```Json
"scripts": {
  "build": "gatsby build",
  "develop": "gatsby develop",
  "format": "prettier --write src/**/*.{js,jsx}",
  "start": "npm run develop",
  "serve": "gatsby serve",
  "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\""
}
```

Vous pouvez filtrer les starters par technos, outils, etc... Mais comme au début ma liste de pré-requis était plutôt simple (`prettier` pour le formatage du code, optimisation des images, [react-helmet](https://github.com/nfl/react-helmet) pour la gestion du SEO) et que j'avais envie d'implémenter le reste moi-même pour me familiariser avec ce système, je suis parti avec le plus basic des starters, à savoir [gatsby-starter-default](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-default).

## L'outillage pour démarrer

**Node.js et NPM:** 

Si vous êtes ici, c'est que vous connaissez un minimum cet environnement permettant de faire tourner du code Javascript en dehors du contexte navigateur

> Note: La version minimale de Node.js supportée par Gatsby est la 8, libre à vous d'utiliser une version plus récente

Un simple node -- version et un npm --version permettent de connaître les versions actuellement installées

**Yarn**

Dans la communauté de développeurs front, il y a ceux qui aiment utiliser `npm` pour gérer les dépendances de leurs projets, et les autres. Je fais partie des autres, ayant déjà eu plusieurs soucis avec `npm` dans le passé, j'ai fait le choix de `yarn`.

Pour installer `yarn` de manière globale sur votre système, rien de plus simple :

```Bash
npm i -g yarn
```

**Git:** 

Quand vous démarrez un projet Gatsby, ce dernier télécharge le starter sélectionné (ou à défaut, celui par défaut) depuis un repo Git. Il est donc essentiel d'avoir l'outil Git en ligne de commande installé sur votre machine.

**Gatsby CLI**

Le CLI (Command Line Interface) de Gatsby est un package NPM publié sur `npmjs`, il permet de démarrer un projet mais propose aussi les outils nécessaires pour visualiser votre projet en cours de développement.

Pour l'installer :

```Bash
npm i -g gatsby-cli
```

ou, si vous avez fait le choix d'utiliser yarn :

```Bash
yarn global add gatsby-cli
```

Une fois l'installation terminée, vous pouvez créer votre projet avec la commande

```Bash
gatsby new <nom_projet> <url_starter>
```

## Allons-y !

Ouvrez votre terminal et tapez les commandes suivantes :

```Bash
gatsby new hello-gatsby # crée un dossier hello-gatsby et installe le starter (par défaut, ici) dedans
cd hello-gatsby # naviguer vers le dossier du projet
yarn install # installer les dépendances (peut être simplifié en tapant juste "yarn"
yarn start # exécute le script "start" du package.json (on peut aussi lancer directement avec "gatsby develop")
```

Le projet compile bien, et vous pouvez visualiser le résultat en allant sur <http://localhost:8000> sur votre navigateur. Bravo !

### Architecture du projet

Prenons quelques minutes pour regarder comment est disposé notre projet. Dans notre dossier hello-gatsby. Selon le starter que vous avez sélectionné, vous aurez tout ou partie de l'arborescence suivante :

```
├── .cache/
├── plugins/
├── public/
├── src/
    ├── components/
    ├── images/
    ├── pages/
    └── html.js
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── package.json
```

#### Dossiers

* `/.cache` Généré automatiquement. Ce dossier est un dossier de cache interne créé automatiquement par Gatsby. Les fichiers qu'il contient ne doivent pas être modifiés. Il doit être ajouté à votre fichier `.gitignore` si ce n'est pas déjà le cas.
* `/public` Généré automatiquement au moment du build. C'est ce dossier qui contiendra les fichiers et assets compilés de votre projet. Doit être ajouté à votre fichier `.gitignore` si ce n'est pas déjà le cas.
* `/plugins` Ce dossier comporte les plugins spécifiques qui ne sont pas publiés comme package npm (locaux donc).
* `/src` C'est votre dossier de "travail". Il contiendra tout votre code qui conditionne ce qui est affiché sur votre site web, comme votre header/footer, vos templates de pages. Vu que Gatsby est basé sur `React.js`, le contenu de ce dossier, dépendra certes de votre projet, mais ressemblera forcément à un projet `React.js` classique.
  * `pages` Chaque composant que vous créez dans ce dossier devient une page de votre site, avec un chemin (URL path) basé sur son nom.
  * `/templates` Contient les gabarits qui serviront à générer des pages dynamiquement.
  * `html.js` Il nous servira à surcharger la configuration par défaut du fichier `index.html` généré.
* `static` Tout fichier que vous mettrez ici ne va pas être traité par Webpack. Il sera copié tel quel dans le dossier `public`. Il servira notamment pour des assets à embarquer dans notre site (fichiers téléchargeables par exemple).

#### Fichiers

* `gatsby-browser.js` Ce fichier vous servira à définir un usage spécifique des API du navigateur. Certains plugins vous demanderont de rajouter du code dedans.
* `gatsby-config.js` Ce fichier est le moteur même de votre projet Gatsby. Dans ce fichier, vous pouvez définir les méta-data de votre site comme son titre et sa description, les plugins que vous souhaitez activer ainsi que la définition de leurs options...
* `gatsby-node.js` Ce fichier vous servira à définir un usage spécifique des API Node.js. C'est dans ce fichiers que vous pourrez générer des pages dynamiquement.
* `gatsby-ssr.js` Ce fichier vous servira à définir un usage spécifique des API du Server Side Rendering. 

## Analyse du projet

Ouvrez le projet avec votre IDE préféré (Perso, j'utilise [VS Code](https://code.visualstudio.com)), démarrez le serveur (`gatsby develop` ou `yarn start`) et commençons à tester.

Comme vous pouvez le remarquer, vous avez 3 composants dans votre dossier `pages` : `404.js`, `index.js` et `page-2.js`.

Si vous faites pointer votre navigateur sur [http://localhost:8000](http:localhost:8000) vous verrez s'afficher le contenu du composant `index.js`. 

A partir de là, modifier votre site est très simple, ouvrez le fichier `index.js` dans votre IDE et faites des modifications sur le composants, puis sauvegarder pour voir les modifications s'appliquer instantanément.

De la même manière, vous pouvez modifier le fichier `page-2.js` qui est accessible à l'adresse <http://localhost:8000/page-2>

### Navigation entre les pages

Il est possible de créer des liens entre les pages grâce à un composant React fourni par Gatsby, appelé Link.

Pour illustrer cet aspect, on va ajouter une nouvelle page `src/pages/page-3.js`, et on va créer un lien sur la `page-2`. Pour ce faire, importez le composant Link dans composant `page-2`:

```Javascript
import { Link } from 'gatsby';
```

et utilisez-le dans votre code JSX:

```Javascript
<Link to="/page-3/">Page 3</Link>
```

Testez le fonctionnement sur votre navigateur.

### Ajouter du style

Dans vos composants, il est possible d'importer n'importe quel fichier CSS :

```Javascript
import './index.css';
```

et appliquer les classes adéquates sur les éléments que vous souhaitez styliser : 

```JSX
<p className="my-class">...</p>
```

Autrement, vous pouvez également définir des styles "in-line" directement dans votre code JSX, bien que je ne saurais vous recommander cette pratique, du fait qu'elle impacte la lisibilité et la maintenabilité de votre code :

```JSX
<p 
  style={{
    margin: '0 auto',
    padding: '20px'
  }}
>
  Hello world
</p>
```

### Utiliser les plugins Gatsby

Gatsby propose toute une panoplie de fonctionnalités embarquées. Mais il peut être agrémenté par d'autres fonctionnalités fournies par les [plugins](https://www.gatsbyjs.org/plugins/). Et il y en un bon nombre.

Il y a 3 types de plugins dans l'écosystème Gatsby:

* **_Source plugins_** : Ces plugins requêtent les données à partir d'une source donnée et créent des noeuds (nodes) qui peuvent ensuite être filtrées par les _transformer plugins_.
* **_Transformer plugins_** : Il transforment les données fournies par les _source plugins_ en données utilisables par Gatsby.
* **_Functional plugins_** : Ces plugins ajoutent de nouvelles fonctionnalités à Gatsby, comme la génération d'un sitemap ou autre.

L'installation d'un plugin passe par 2 étapes simples :
* Installer le plugin avec `npm`/`yarn`
* Déclarer le plugin dans le fichier de configuration de Gatsby `gatsby-config.js`

Par exemple, pour installer le plugin permettant de générer un sitemap :

```bash
yarn add gatsby-plugin-sitemap
```

Et dans le fichier `gatsby-config.js` (vous pouvez le créer s'il n'est pas déjà fourni par votre starter), ajouter le plugin au tableau exporté :

```Javascript
module.exports = {
  plugins: ['gatsby-plugin-sitemap']
}
```
C'est tout, votre plugin fait désormais son travail.

## Construction le site statique (Build)
Quand avez fini de personnaliser votre site Gatsby et que vous voulez construire un package de production, vous aurez besoin de lancer la commande suivante :

```bash
gatsby build
```
ou si cela a été configuré dans les scripts `package.json` :
```bash
yarn build
```

Une fois l'opération réussi, le "bundle" de votre site sera présent dans le dossier `public`.

Vous pouvez visualiser le résultat du build en lançant la commande :
```bash
gatsby serve
```
ou si cela a été configuré dans les scripts `package.json` :
```bash
yarn serve
```

qui lancera un serveur local présentant le contenu du dossier `public`, avec donc un résultat très similaire à ce que vous auriez en production.


## Déploiement
Dès que vous êtes content(e) du résultat, tout ce dont vous avez besoin pour voir votre site en ligne est de déployer le contenu du dossier `public`.

Dépendant de la solution de déploiement choisie, il y aurait plusieurs étapes ici. Je ferai prochainement des posts pour les plus connues. En attendant, je vous renvoie vers [la très bonne documentation](https://www.gatsbyjs.org/docs/deploying-and-hosting/) du sujet sur le site de Gatsby.



