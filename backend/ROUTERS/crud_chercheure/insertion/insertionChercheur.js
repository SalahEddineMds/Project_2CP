const mongoose = require('mongoose')

//importing Chercheur schema from schema/Chercheur.js
const Chercheur = require('../../../schema/Chercheur')
const User = require('../../../schema/User')

//import generPassword function from tools/generpassword.js
const generPassword = require('../../tools/generPassword')

//import sendMailCherch function from tools/sendMailCherch.js
const sendMailCherch = require('../../tools/sendMailCherch')
const creatToken = require('../../tools/generToken')

//import getOrcid and getLienDblp 
const getOrcidFromName = require("../getInfo/getOrcid");
const getLienDblp = require("../getInfo/getLienDblp");

const updateHindex = require('../../../màj/upDateHindex')

const insertionChercheur = async (req, res) => {
    const { email,Equipe ,Diplome,nom , Qualité,EtablissementOrigine,prenom, contact, Matricule ,  GradeRecherche, GradeEnsegnement } = req.body
    const nomComplet = prenom+ " " + nom
    try {
        console.log(`email ${email}|| !nom  ${nom} || !prenom  ${prenom} || !Qualité ${Qualité} || !Matricule ${Matricule} || !EtablissementOrigine ${EtablissementOrigine} || !Diplome ${Diplome}|| !GradeRecherche ${GradeRecherche}|| !GradeEnsegnement ${GradeEnsegnement}`)
        if(!email || !nom || !prenom || !Qualité ||!Matricule  || !EtablissementOrigine  || !Diplome || !GradeRecherche || !GradeEnsegnement){
            throw new Error("Tous les champs sont obligatoires")
        }
        
        //check if the chercheur already exist
        const chercheur = await Chercheur.findById(email)

        //if the chercheur exist throw an error
        if (chercheur) {
            throw new Error("Chercheur deja exister")
        }
        else{

            //recuperer orcid       
    const orcid = await getOrcidFromName(nomComplet);

    //recuperer lien du compte sur dblp
    const lien = await getLienDblp(nomComplet);

    //recuperer h index
    const H_index = await updateHindex(nomComplet)
    console.log(H_index)
       const cherch = new Chercheur({
            _id: email,
            nomComplet,
            contact,
            Qualité,
            Matricule , 
            EtablissementOrigine,
            Equipe,
            Diplome,
            GradeRecherche,
            GradeEnsegnement,
            H_index,
            orcid,
             lien: {
                 DBLP: lien 
             }
           
        })
        const password = await generPassword() 
     //   await User.collection.dropIndex('username_1')
        const user = new User({
            _id: email,
            password,
           
        })

        await cherch.save()
        await user.save()
        //send email to the chercheur
        const token = creatToken( email)
        
        await sendMailCherch(email , nomComplet ,token)


        return res.status(200).json({ message: "Chercheur ajouter avec succes" })

        }
}

catch (error) {
    return res.status(500).json({ message: error.message })
}
}

module.exports = insertionChercheur
