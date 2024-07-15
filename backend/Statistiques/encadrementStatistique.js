const Encadrement = require("../schema/Encadrement");



const encadrementsParAnneeSansT = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.body;

        // if (dateDebut.localeCompare(dateFin) === 1) {
        //     throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        // }
        const encadrements = await Encadrement.find({
            AnneeD: {
                $gte: Number(dateDebut),
                $lte: Number(dateFin)
            }
        }).sort({ AnneeD: 1 });

        // Créer un tableau d'années entre dateDebut et dateFin
        const yearsInRange = Array.from({ length: Number(dateFin) - Number(dateDebut) + 1 }, (_, index) => Number(dateDebut) + index);

        // Compter le nombre d'encadrements par année
        const encadrementsCountByYear = encadrements.reduce((acc, encadrement) => {
            const year = encadrement.AnneeD;
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Créer un tableau avec le nombre d'encadrements par année
        const encadrementsParAnnee = yearsInRange.map(year => ({
            year,
            count: encadrementsCountByYear[year] || 0 // Utiliser 0 si aucune valeur trouvée pour cette année
        }));

        res.json({ 
            encadrementsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
   
  
    
};

const encadrementsParAnnee = async (req, res, type) => {
  
    try {
        const { dateDebut, dateFin } = req.body;

        // if (dateDebut.localeCompare(dateFin) === 1) {
        //     throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        // }
        const encadrements = await Encadrement.find({
            AnneeD: {
                $gte: Number(dateDebut),
                $lte: Number(dateFin)
            },
            Type: type
        }).sort({ AnneeD: 1 });

        // Créer un tableau d'années entre dateDebut et dateFin
        const yearsInRange = Array.from({ length: Number(dateFin) - Number(dateDebut) + 1 }, (_, index) => Number(dateDebut) + index);

        // Compter le nombre d'encadrements par année
        const encadrementsCountByYear = encadrements.reduce((acc, encadrement) => {
            const year = encadrement.AnneeD;
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Créer un tableau avec le nombre d'encadrements par année
        const encadrementsParAnnee = yearsInRange.map(year => ({
            year,
            count: encadrementsCountByYear[year] || 0 // Utiliser 0 si aucune valeur trouvée pour cette année
        }));

        res.json({ 
            encadrementsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
  };
  
  const pfeParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "PFE");
  };
  const master2ParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "Master2");
  };
  const doctoratParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "Doctorat");
  };















module.exports = { encadrementsParAnneeSansT,master2ParAnnee , pfeParAnnee, doctoratParAnnee }
