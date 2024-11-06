# POWERFISH

Jeu basique d'entrainement JS

Se base sur une partie HTML qui se compose de conteneurs pour accueillir des éléments controlés et générés en JavaScript.

Pour controler le jeu une variable d'etat global est utilisée (`assets/src/state.mjs`)

Dans un premier temps on ajoute des ecouteur d'evenements

on demarre ensuite la "boucle de jeu" qui contient la logique pour deplacer le joueur, faire spawn les ennemies et gerer les tirs

## `assets/main.mjs`

```javascript
// import des modules

// ajout des ecouteurs d'event

// -- DEBUT BOUCLE

// mouvement du joueur

// gestion des ennemies

// gestion des projectiles

// -- FIN BOUCLE
```

## `assets/src/`

contient les modules

- `createBackground.mjs` - permet de creer des bulles en arriere plan
- `enemy.mjs` - permet de creer et gerer les ennemies
- `fish.mjs` - permet de controller le joueur et verifier son etat
- `projectile.mjs` - permet de creer des projectiles
- `state.mjs` - etat global du jeu partagé entre les modules et directement muté
- `utils.mjs` - fonctions utilitaires
