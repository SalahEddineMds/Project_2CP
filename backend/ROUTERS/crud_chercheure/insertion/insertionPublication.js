

const Publication = require('../../../schema/Publication')
const confJournal = require('../../../schema/ConfJournal')

const insertionPublication = async (req, res ) => {
  
    const { Date ,idCherch ,confJourn , volume, MaisonEdistion , pages, rang, Titre, Lien, Membres, Classement } = req.body
    //const Chercheur = req.params.id
    if (!Date || !idCherch || !confJourn || !volume || !pages || !rang || !Titre   ){
      throw new Error("Veuillez remplir tous les champs");
    }
    ///
    try{
   //recuperer le nom de la conference ou du journal
       // const conf = await confJournal.findone({'nom':confJourn})
      
       
    //enregistrer la publication dans la base de donnees en attendant la validation par le directeur
   const publication = new Publication({
        Date,
        idCherch,
        confJourn, //conf._id,
        volume,
        pages,
        rang,
        Titre,
        Lien,
        Membres,
        Classement,
        MaisonEdistion
   })
   
   const result = await publication.save()
  
    //envoyer un message de succes avec un code 200 si la publication a ete enregistree avec succes
    res.status(200).json({message:'Votre publication a été ajouter avec succès'});
    
     
  }
    catch(err){

      //envoyer un message d'erreur avec un code 500 si une erreur s'est produite
        res.status(500).json({error : err.message})
    }



}

module.exports = insertionPublication
