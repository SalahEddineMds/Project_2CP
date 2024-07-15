import React, { useState } from 'react';
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Informations() {
  const { data } = useOutletContext();
  const { id } = useParams();

  return (
    <>
      <div className="bg-white p-8">
        <div className="m-6 grid grid-cols-2 gap-x-12 gap-y-6 p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">Nom complet:</h2>
            {/* {console.log("id"+_id)} */}
            <span>{data ? data.nomComplet : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Qualité:</h2>
            <span>{data ? data['Qualité'] : null}</span>
          </div>
          <div className="flex flex-col">
          <h2 className="font-bold">Etablissement d'origine:</h2>
            <span>{data ? data.EtablissementOrigine : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Diplôme:</h2>
            <span>{data ? data.Diplome : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Grade de recherche:</h2>
            <span>{data ? data.GradeRecherche : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Email:</h2>
            <span>{data ? data._id : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Grade enseignement:</h2>
            <span>{data ? data.GradeEnsegnement : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">H_index:</h2>
            <span>{data ? data.H_index : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Equipe:</h2>
            <span>{data ? data.Equipe : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Téléphone:</h2>
            <span>{data ? data.tel : null}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">ORCID:</h2>
            <span>{data ? data.orcid : null}</span>
          </div>
        </div>
      </div>
    </>
  );
}
