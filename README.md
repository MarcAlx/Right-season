# Right season

A simple react app that's mean't to answer only one question : is it the right season to buy this fruit/vegetable ?

The app use the following source for month : 
1. [https://www.greenpeace.fr/calendrier-fruits-legumes-de-saisons/](https://www.greenpeace.fr/calendrier-fruits-legumes-de-saisons/)

App is based on data for France.

:tractor: Currently under devlopment

## Get started

First of all you need `Node.js` and optionnaly `yarn`. 

*NB if you didn't get `yarn` replace all following `yarn` occurences by `npm`*

To setup the project (retrieve dependencies) run `yarn install` (or `npm install`)

## Generate data

For convenience data are provided as an xls file. 

To generate json what you have to do is go to `data` folder an run with python 3 `generate.py` this will create/update `data.json` by reading `dataset.csv` that has been generated with excel/google drive from `dataset.xlsx`

## Scripts

There are some ready to use scripts define in `package.json`

To build the with uncompressed sources

    yarn run build

To build the app ready for release with minified and compressed sources

    yarn run release

To lint your code

    yarn run lint

To run your code locally with uncompressed sources (on port 3000) :

    yarn run-dev

To run your code locally like in relase with minified and compressed sources (on port 3001) :

    yarn run-prod

## Usefull links
https://material-ui-next.com/
https://appdividend.com/2017/08/23/redux-tutorial-example-scratch/

## Based on 

[This toolkit](https://github.com/MarcAlx/simple-react-starterkit)

## License

License: MIT license
