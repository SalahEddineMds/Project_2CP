const mongoose = require('mongoose')

// Load the model 
const Publication = mongoose.model(process.env.NOM_COLLECTION_PUBLICATION)


const queryPublication = async(req , res)=>{

    //ramene les publications qui ont le titre, la date, la conference et le chercheur voulu
    const subtitre = req.body.titre
    const subdate = req.body.date
    const subconf = req.body.conference
    const subchercheur = req.body.chercheur

    let query = {}
    if(subtitre){
        query.titre = {$regex: new RegExp('^'+subtitre, 'i')}
    }
    if(subdate){
        query.date = {$regex: new RegExp('^'+subdate, 'i')}
    }
    if(subconf){
        query.conference = {$regex: new RegExp('^'+subconf, 'i')}
    }
    if(subchercheur){
        query.chercheur = {$regex: new RegExp('^'+subchercheur, 'i')}
    }
    try {
        //trouve les publications qui respectent les conditions
        const docs = await Publication.find(query).exec()

        console.log(docs)
        res.status(200).json({Publications: docs})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}

module.exports = queryPublication //export the function to be used 