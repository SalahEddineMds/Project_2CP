import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RechercheTable } from './RechercheTable';

export default function RechercheLayout({ searchby }) {
  const navigate = useNavigate();
  const { userInfo, isLogged } = useOutletContext();
  console.log('userInfo : ', userInfo);
  return (
    <div className="min-h-screen bg-gray-100 pb-5 pl-[4vw] pt-16">
      <div className="mx-auto  max-w-[1400px] px-4 sm:px-6 lg:px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Recherche {searchby}
          </h1>
        </header>
        <main>
          <div className="rounded-lg bg-white p-6 shadow">
            <RechercheTable
              searchby={searchby}
              navigate={navigate}
              userInfo={userInfo}
              isLogged={isLogged}
            />
          </div>
        </main>
      </div>
      </div>
  );
}
