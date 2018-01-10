TEA-2575
========

Utilitaire permettant de parser les logs des statistiques liées à la story TEA-2575.

## Installation

```bash
npm install
```

## Utilisation

En admettant que le fichier de logs soit à l'emplacement `data/onix_dilicom_prices_converter.log`.

```bash
cat data/onix_dilicom_prices_converter.log \
    |sed -s 's/^.*INFO -- : //' \
    |grep -v '"deduplicated":0' \
    |node main.js
```

- Le `sed` permet de retirer les préfixes de chaque ligne de log (date, log level…).
- Le `grep` retire les livres pour lesquels il n'y a pas eu de déduplication de prix. Le retirer de la commande permet de traiter tous les livres.
- Enfin notre script JS parse et formate chaque ligne de log restante.

Le résultat peut ensuite être redirigé ailleurs, par exemple dans un fichier.

La sortie est formatée de la façon suivante :

```
       EAN 13 BATCHS DEDUP
0000000000000     11    11
0000000000000     11    11
0000000000000     11    11
0000000000000     11    11
0000000000000     11    11
0000000000000     11    11
```
