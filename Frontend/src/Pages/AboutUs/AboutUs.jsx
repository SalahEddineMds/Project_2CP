import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Rectangle from './image/Rectangle.svg';
import Subtract from './image/Subtract.svg';
import Group from './image/Group.svg';
import local from './image/local.svg';
import esi_white from './image/esi_white.png';

export default function AboutUs() {
  return (
    <>
      <div className="relative w-full">
        <img src={Subtract} alt="Subtract" className="w-full" />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-6xl font-bold">
          À propos de nous
        </h1>
        <h3 className="translate-y-1/8 absolute left-1/2 top-3/4 -translate-x-1/2 font-title font-semibold">
          Chercheurs, enseignants, ingénieurs et visiteurs sont les bienvenus sur notre site !
        </h3>
      </div>
      <div className="mx-14 my-14 flex items-center justify-center rounded-lg bg-white px-8">
        <div className="flex w-full flex-col items-center">
          <p className="mx-2 my-2 text-justify">
            Le laboratoire LMCS (Méthodes de Conception de Systèmes) affilié à l’Ecole nationale Supérieure d’Informatique est opérationnel depuis 2001. Il regroupe 38 enseignants-chercheurs et 102 doctorants D-LMD répartis sur 06 équipes activant dans la sécurité informatique, les systèmes embarqués, l’hyper-média, le traitement d’images, l’ingénierie des systèmes d’information et des systèmes de connaissances, l’aide à la décision stratégique, les méthodes de résolution de problème d’optimisation combinatoire... . Le laboratoire participe activement à la formation doctorale, à la formation des étudiants en master et à celle des ingénieurs.
          </p>
        </div>
      </div>
      <div className="mx-14 my-14 flex items-center justify-center rounded-lg bg-white px-8">
        <div className="flex w-full flex-col items-center">
          <h2 className="font-bold text-2xl my-4">Coopération Internationale</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Partenaire</th>
                <th className="border border-gray-300 p-2">Pays</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Aalto University</td>
                <td className="border border-gray-300 p-2">Finlande</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Massachusetts Institute of Technology</td>
                <td className="border border-gray-300 p-2">USA</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Ecole Polytechnique</td>
                <td className="border border-gray-300 p-2">Tunisie</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Institut National des Sciences Appliquées de Lyon</td>
                <td className="border border-gray-300 p-2">France</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mx-14 my-14 flex items-center justify-center rounded-lg bg-white px-8">
        <div className="flex w-full flex-col items-center">
          <h2 className="font-bold text-2xl my-4">Coopération Nationale</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Partenaire</th>
                <th className="border border-gray-300 p-2">Période</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">SUMT (Service Universitaire Médecine de Travail), Hopital Rouiba , Alger</td>
                <td className="border border-gray-300 p-2">2006 - 2009</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">	SMT (Sonelgaz Médecine du Travail) (Filiale du Groupe Sonelgaz)</td>
                <td className="border border-gray-300 p-2">2018 - 2020</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">CDTA (Centre Des Technologies Avancées), Baba Hacen, Alger</td>
                <td className="border border-gray-300 p-2"> 2013 à ce jour </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">CERIST (Centre d’Etudes et de Recherches en Information scientifique et Technique) Alger</td>
                <td className="border border-gray-300 p-2"> 2010 à ce jour </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 flex w-full p-10 justify-around">
        <div className="flex w-1/3 flex-col items-center justify-center text-center">
          <img src={Group} alt="Nos sponsors" />
          <div>
            <h1 className="text-2xl font-bold">Nos sponsors</h1>
            <p className="mx-auto max-w-xs">
              ESI–Ecole nationale Supérieure d'Informatique.
            </p>
          </div>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center text-center">
          <img src={esi_white} alt="Ecole nationale Supérieure d'Informatique" width="170" height="94" />
          <h1 className="text-2xl font-bold">
            Ecole nationale Supérieure d'Informatique
          </h1>
          <div>
            <p>Contactez-nous:</p>
            <p>+213 23 93 91 32</p>
            <p>contact@esi.dz</p>
          </div>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center text-center">
          <img src={local} alt="Localisation" />
          <h1 className="text-2xl font-bold">Localisation</h1>
          <p className="mx-auto max-w-xs">
            Ecole nationale Supérieure d’Informatique ESI, BP M68, Oued Smar Alger, 16309.
          </p>
        </div>
      </div>
    </>
  );
}
