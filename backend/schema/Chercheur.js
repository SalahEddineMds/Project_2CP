const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChercheurSchema = new Schema ({
    _id: { //email
        type:String,
        ref: "user"
    },
    Matricule: {
        type: String,
        required: true , 
        unique: true
    },
    nomComplet: { //prenom nom
        type: String,
        required: true
    },
   
    Qualité: {
        type: String,
        required: true
    },
    GradeEnsegnement: {
        type: String,
       // required: true
    },
    GradeRecherche: {
        type: String,
        //required: true
    },
    H_index: {
           type: Number,
           //required: true
    },
   
    contact: {
        type: String,
     },
    projet: [{
        type: Number,
        ref: "projet"
}],

    lien: {
        GoogleScholar: {
            type: String,
            
        },
        DBLP: {
            type: String
        },
        ResearchGate: {
            type: String
        },
        ComptePersonnelle: {
            type: String
        }
    },
    image_path: {
        type: String,
        
    },
    EtablissementOrigine: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: true,
        default: "actif"
    },
    Diplome: {
        type: String,
        required: true
    },
    Equipe: {
        type: String,
        //required: true
    },
  orcid: {
    type: String
}


}, { timestamps: true });

const Chercheur = mongoose.model("chercheur",ChercheurSchema);
module.exports = Chercheur;
