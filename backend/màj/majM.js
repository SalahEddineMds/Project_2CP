const Chercheur = require('../schema/Chercheur');
const Publication = require('../schema/Publication');
const conf = require('../schema/ConfJournal');


function comparerSansCasse(chaine1, chaine2) {
    // Supprimer les espaces et les tirets et convertir en minuscules
    const chaineSansEspacesTirets1 = chaine1.toLowerCase().replace(/[\s-]/g, '');
    const chaineSansEspacesTirets2 = chaine2.toLowerCase().replace(/[\s-]/g, '');

    // Fractionner les chaînes en mots individuels
    const mots1 = chaineSansEspacesTirets1.split('');
    const mots2 = chaineSansEspacesTirets2.split('');

    // Trier les mots
    mots1.sort();
    mots2.sort();

    // Comparer les chaînes résultantes en ignorant la casse
    return mots1.join('') === mots2.join('');
}


function fetchWithRetry(url, maxRetries, delayBeforeFetch, delay) {
    return new Promise((resolve, reject) => {
        let retries = 0;

        function fetchData() {
            setTimeout(() => {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            resolve(response.json()); // Renvoie les données JSON récupérées
                        } else {
                            retries++;
                            if (retries < maxRetries) {
                                setTimeout(fetchData, delay);
                            } else {
                                reject(new Error('Max retries exceeded'));
                            }
                        }
                    })
                    .catch(error => {
                        retries++;
                        if (retries < maxRetries) {
                            setTimeout(fetchData, delay);
                        } else {
                            reject(error);
                        }
                    });
            }, delayBeforeFetch);
        }

        fetchData();
    });
}



const maj = async () => {
    try {

        const maxRetries = 3;
        const delay = 10000;
const delayBeforeFetch = 10000;
        // Récupérer tous les documents
 const docs = await Chercheur.find({}).exec();

        // Parcourir les documents pour extraire les données
for (let doc of docs) {

            const cherch = doc.nomComplet;
console.log("chercheur", cherch)

            const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
         
            const data = await fetchWithRetry(lien, maxRetries,delayBeforeFetch, delay);//response.json();
            const tabPublie = data.result.hits.hit;
if(tabPublie) {
            let donneesAInserer = [];


            for (let i = 0; i < tabPublie.length; i++) {

                let tabA = [];
                const auteurs = tabPublie[i].info.authors.author;
                let rang = -1;
                for (let j = 0; j < auteurs.length; j++) { //la liste des membres
                    tabA[j] = auteurs[j].text;
                    if ((comparerSansCasse(tabA[j],cherch )) === true)
                    {
                        rang = j + 1;
                    }
                }

                if (typeof tabPublie[i].info.volume === "undefined") { //si le volume est indefini

                    tabPublie[i].info.volume = "indefini";

                };
                if (typeof tabPublie[i].info.pages === "undefined") { //si le nombre de page est indefini
                    tabPublie[i].info.pages = "indefini";
                };
                if (rang !== -1) {
                    const confJ = extraireParametreDblp(tabPublie[i].info.url)
                   // console.log(confJ)
                    const publie = {

                        Date: tabPublie[i].info.year,
                        idCherch: doc._id,
                        volume: tabPublie[i].info.volume,
                        confJourn: confJ,
                        pages: tabPublie[i].info.pages,
                        rang: rang,

                        Titre: tabPublie[i].info.title,
                        Lien: tabPublie[i].info.ee,
                        Membres: tabA,
                    };
                    donneesAInserer.push(publie);
                    cooo = await conf.findById(confJ)
                    if (!cooo) {
                    const lienn = "https://dblp.org/search/venue/api?q=" + confJ + "&format=json";
                    //console.log("link", lienn)
            //const respon = await fetch(lienn);
            
            const datat = await fetchWithRetry(lienn, maxRetries,delayBeforeFetch, delay);//respon.json();
        
            const titt = datat.result.hits.hit[0].info.venue
                    const link = "https://dblp.org/db/" + extraireChaineApresRec(tabPublie[i].info.url) + "/"
                   /* const confjourn = await conf.findOneAndUpdate(
                        { _id: confJ },
                        { _id: confJ, type: tabPublie[i].info.type, nom: titt , lien: link },
                        { upsert: true, new: true }
                    );*/
                    const nouveauDocument = new conf({
                        _id: confJ ,
                        type: tabPublie[i].info.type,
                        lien: link,
                        nom: titt
                    });
        
                    // Enregistrer le nouveau document dans la base de données
                    await nouveauDocument.save();
                }
                }
            }

            const t = donneesAInserer.length; //nombre de publication dans DBLP
            const v = await Publication.countDocuments({ 'idCherch': doc._id }); //nombre de publication d'un chercheur dans la bdd
            const s = t - v;

            if (s > 0) {
                let ins = [];
                for (let z = 0; z < s; z++) {
                    ins[z] = donneesAInserer[z];

                }
                const result = await Publication.insertMany(ins);
                console.log('Données insérées avec succès');
            }
        }
        }




        console.log('Traitement terminé avec succès');
        //return res.status(200).json({ message: "Chercheur ajouter avec succes" })
    } catch (error) {
        //return res.status(500).json({ message: error.message })
        console.log(error)
    }
};



function extraireParametreDblp(chaine) {
    const regexp = /\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)/; // Expression régulière pour capturer le deuxième paramètre après le troisième slash
    const match = regexp.exec(chaine);

    if (match && match.length >= 4) {
        return match[4].toUpperCase(); // Le deuxième paramètre après le troisième slash
    } else {
        return null; // Retourne null si aucune correspondance n'est trouvée
    }
}


function extraireChaineApresRec(chaine) {
    const regexp = /\/rec\/([^/]+\/[^/]+)\//; // Expression régulière pour capturer la partie après "/rec/"
    const match = regexp.exec(chaine);

    if (match && match.length >= 2) {
        return match[1]; // La partie extraite de la chaîne
    } else {
        return null; // Retourne null si aucune correspondance n'est trouvée
    }
}

module.exports = { maj };
