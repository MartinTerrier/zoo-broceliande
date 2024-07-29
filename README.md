
#  API du zoo Brocéliande

## Avertissement

À ce stade, l'application ne possède pas de front-end. Pour interagir avec elle, en local comme dans sa version déployée, il est donc nécessaire d'utiliser une application de test d'API, comme par exemple Postman ou Insomnia. Un jeu de requêtes écrites pour Postman est disponible dans le dossier .\"Elements de rendu". Son utilisation sera détaillée plus bas.

## Description

Ce dépôt GitHub contient le code d'une API gérant la partie back-end du site du zoo de Brocéliande. Elle permet notamment d'effectuer des opérations de CRUD sur différents éléments importants pour l'activité du zoo, et de gérer les autorisations afin qu'une fonctionnalité ne soit accessible qu'aux utilisateurs qui en ont besoin.

## Clonage du dépôt en local

Pour créer une copie de ce dépôt sur votre ordinateur, cliquez sur le bouton **<> Code** de la page principale du dépôt, puis sur **Ouvrir avec GitHub Desktop**. Sélectionnez le répertoire local où vous voulez placer le dépôt, puis cliquez sur **Cloner**.

## Installation

Cette application a été dévelopéee avec NodeJs v21.7.1. Vérifiez que cette version de la plateforme est installée sur votre ordinateur. Si ce n'est pas le cas, vous pouvez la télécharger [dans la section Téléchargements du site Node Js](https://nodejs.org/en/download/).

Pour installer l'application, exécutez la commande suivante dans un terminal :

```bash
$ npm install
```

Le gestionnaire de paquets npm installera automatiquement toutes les dépendances nécessaires au bon fonctionnement de l'application.

## Base de données

La base de données associée à cette application a été créée avec le SGBD PostgreSQL. Vérifiez que celui-ci est installé sur votre poste, puis créez une base de données en notant soigneusement le nom d'utilisateur, le mot de passe, le port et le nom de base de données que vous avez choisis.
Exécutez ensuite le script bddZoo.sql qui se trouve dans le dossier .\"Elements de rendu".
Pour associer la base de données à l'application, vous devrez ensuite créer un fichier .env (sans extension) à la racine de votre projet et y indiquer l'URL à utiliser pour la base de données, sous la forme suivante :

DATABASE_URL=postgres://<nom-d-utilisateur>:<mot-de-passe>@localhost:<port>/<nom-de-la-base-de-données>

Par exemple, voici l'url de mon environnement local de développement, où le nom d'utilisateur est 'postgres', la base de données s'appelle 'zoo-broceliande', le port utilisé est le port 5432 et le mot de passe est 'projetbroceliande'.

DATABASE_URL=postgres://postgres:projetbroceliande@localhost:5432/zoo-broceliande

## Lancer l'application

Pour lancer l'application en mode développement, exécutez la commande suivante dans un terminal :

```bash
$ npm run start:dev
```

Et pour la lancer en mode production, exécutez la commande suivante :

```bash
$ npm run start:prod
```

## Tester l'application

Comme indiqué en préambule, faute d'un front end développé, il n'est pour l'instant possible d'interagir avec l'application qu'à l'aide d'une application de test d'API. Le dossier .\"Elements de rendu" contient un jeu de requêtes écrites pour l'application Postman, dans le sous-dossier nommé 'Export requetes Postman'.
Pour l'utiliser, vérifiez que l'application Postman est installée sur votre poste ou, si ce n'est pas le cas, installez-la depuis [la section Téléchargements du site dédié](https://www.postman.com/downloads/).

Une fois Postman lancé, cliquez sur le bouton 'Import' situé en haut à gauche de l'interface et sélectionnez le dossier 'Export requetes Postman'. Trois éléments seront importés : une collection de requêtes permettant de tester les différentes fonctionnalités de l'application, et deux environnements de travail correspondant respectivement à l'application installée en local sur votre poste, et à l'application déployée sur Heroku.

La plupart des fonctionnalités étant réservées à un type précis d'utilisateur, pensez à utiliser l'une ou l'autre des requêtes de connexion avant de tester chaque fonctionnalité. Celle-ci générera un token d'authentification qui sera conservé une heure ou jusqu'à ce que vous vous connectiez avec une autre requête.