# Exercice 2

*En typescript*

## Exercice 2.1

- Afficher 2 inputs
    - Taille en cm
    - poids en mètre
- Afficher un bouton "Calculer le BMI"
- Le bouton doit être désactivé si un des champs est vide ou invalide.
- Lors du clic, afficher :
    le BMI (poids / (taille * taille))

## Exercice 2.2

- Afficher 1 input pour une date de naissance
- Afficher un select (annees, jours)
- Afficher un bouton "Calculer" qui devrait être désactiver si la date est incorrecte ou plus grande que la date du jour
- A l'aide d'un watcher afficher la date est trop petite ou la date est requise en dessous de l'input
- Lors du clic, afficher :
    l'age en années ou en mois ou en jours

## Exercice 2.3 Bonus

- Afficher trois inputs :
    - Montant emprunté (en €)
    - Durée (en années)
    - Taux d’intérêt annuel (en %)
- Afficher un bouton "Calculer mensualité" :
- Le bouton doit être désactivé si un des champs est vide ou invalide.
- Lors du clic, afficher :
    - La table d'amortissements (par mois, taux fixe, mensualités constantes) 
        - mensualité = ((montant × taux_mensuel) / (1 - (1 + taux_mensuel)^(-nbDeMois)))
        - Sur chaque ligne afficher le capital remboursé, intérêts, le capital restant. 
    - Le coût total du crédit