const getLienDblp = async (name) => {
    try {
        const url = `https://dblp.org/search/author/api?q=${name}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.result.hits.hit != null) {
        const lien = data.result.hits.hit[0].info.url;
        return lien;
     } else {return "null"}
    } catch (error) {
        console.error("Erreur lors de la récupération du lien DBLP :", error);
        throw error;
    }
};
//
module.exports = getLienDblp;
