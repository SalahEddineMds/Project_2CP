import { useEffect, useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
//import {  BarChart } from "./Chartss/BarChart";
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Bar } from 'react-chartjs-2';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { UserData } from './Data';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
//import { c } from 'vite/dist/node/types.d-aGj9QkWt';

import incrementHexColor from './Chartss/incrColor';

export default function Statistiques() {
  const [selectValue , setSelectValue] = useState('')
  const [dateDebut, setDateDebut] = useState(2020);
  const [dateFin, setDateFin] = useState(2024);
  const [nombreEncadrement , setnombreEncadrement] = useState()
  const [count , setCount] = useState({})
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'nombre de publication',
        data: UserData.map((data) => data.nbrPub),
        backgroundColor: ['#2536eb', '#3b82f6', '#2E2787', '#002D62'],
      },
    ],
  });
  const handleClick =  async() => {
      try {
        console.log(selectValue)
        console.log(dateDebut)
        console.log(dateFin)
        console.log("select value for feching"+ selectValue)
         const resultat = await axios.post( `http://localhost:3000/statistiques/${selectValue}`, {dateDebut, dateFin})
         console.log(resultat.data)
         let resultatArry = []
         switch(selectValue){
          case 'publication':
            resultatArry = resultat.data.numberOfPubOfYear  
            break
          case 'encadrement' :
          case 'pfe' : 
          case 'master': 
            resultatArry = resultat.data.encadrementsParAnnee 
            console.log(resultatArry)
             break
          case 'projet' : 
              resultatArry = resultat.data.projetsParAnnee
              break
          // case 'pfe':
          //   resultatArry= resultat.data.encadrementsParAnnee
          //   console.log(resultatArry)
          //   break
          // case 'master':

          
         }
         setUserData({
          labels: resultatArry.map((data) => data.year),
          datasets: [
            {
              label: `nombre de ${selectValue}`,
              data: resultatArry.map((data) => data.count),
              backgroundColor: resultatArry.map((data) => incrementHexColor('#2536eb','#030517' )),
            },
          ],
          
         })
      }
      catch (error) {
        console.log(error)
      }


  }
  useEffect(() => {
    const fetch = async () => {
       try {
        const resultat = await axios.get('http://localhost:3000/statistiques/countDocuments')
        console.log(resultat)
        setCount(resultat.data)
       }
       catch (error) {  
        console.log(error)
       }
      
    }
    fetch()

  },[])
  return (
    <>
      <div className=" min-h-screen bg-white">
        <NavLink className="flex items-center">
          <ChevronLeftIcon className="text-black-500 hover:text-black-700 ml-28 mt-10 h-8 w-8" />
          <h1 className="ml-4 mt-10 text-3xl font-bold no-underline">
            Statistiques
          </h1>
        </NavLink>

        <h1 className="    mb-1  px-2 pt-6 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
          Explorez les Statistiques de LMCS selon Votre Thème Préféré
        </h1>
        <p className="px-2  pt-2 text-center">
          Découvrez les tendances fascinantes de LMCS en choisissant votre
          intervalle d'années et un thème qui vous intéresse,
        </p>
        <p className="px-2 pb-6 text-center">
          puis visualisez les graphiques en toute simplicité
        </p>
        <div className="flex justify-center space-x-20 p-4 ">
          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white ">
            <h2 className="px-4 font-extrabold  ">{count.countChercheur}</h2>
            <h2>Chercheurs</h2>
          </div>

          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white">
            <h2 className="px-4 font-extrabold ">{count.countProjet}</h2>
            <h2>Projet</h2>
          </div>

          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white">
            <h2 className="px-4 font-extrabold ">{count.countEncadrement}</h2>
            <h2>Encadrement</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="justify-right flex space-x-20 p-4 ">
            <div className='"w-[300px] p-6'>
              <Tabs defaultValue="annee" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-2 bg-[#EFF3FF]">
                  <TabsTrigger value="annees">Les années</TabsTrigger>
                  <TabsTrigger value="theme"> Le théme</TabsTrigger>
                </TabsList>
                <TabsContent value="annees">
                  <Card>
                    <CardHeader>
                      <CardTitle>Les années</CardTitle>
                      <CardDescription>
                        veuillez choisir un intervalle des années
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="anneeDebut">De:</Label>
                        <Input id="anneeDebut" defaultValue="2020"  onChange={(e)=>{if(e.target.value) setDateDebut(e.target.value) }} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="anneeFin">Jusqu'a :</Label>
                        <Input id="anneeFin" defaultValue="2024"  onChange={(e)=>{if(e.target.value) setDateFin(e.target.value) }} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-buttonDark" onClick={handleClick}>Enregistrer</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="theme">
                  <Card>
                    <CardHeader>
                      <CardTitle>Le théme</CardTitle>
                      <CardDescription>
                        veuillez choisir un théme
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Le thémes:</Label>
                        <Select onValueChange={(value)=> setSelectValue(value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <h3 className="font-bold">nombre de :</h3>
                            <SelectItem value="publication" >
                              publications
                            </SelectItem>
                            <SelectItem value="encadrement">
                              encadrements
                            </SelectItem>
                            <SelectItem value="projet">projets</SelectItem>
                            <h3 className="font-bold"> type encadrement:</h3>
                            <SelectItem value="pfe">PFE</SelectItem>
                            <SelectItem value="master">Master</SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </div>
                      {console.log(selectValue)}
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-buttonDark"  onClick={handleClick}>Enregistrer</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className='"w-[600px] p-6'>
              <Tabs defaultValue="annee" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-4 bg-[#EFF3FF] ">
                  <TabsTrigger value="courbe">Courbe</TabsTrigger>
                  <TabsTrigger value="histogramme">Histogramme</TabsTrigger>
                  <TabsTrigger value="cercle">Diagramme circulaire</TabsTrigger>
                 
                </TabsList>
                <TabsContent value="courbe">
                  <div className="#002D62 h-full w-full">
                    <Line data={userData} />
                  </div>
                </TabsContent>
                <TabsContent value="histogramme">
                  <div className="#002D62">
                    <Bar data={userData} />
                  </div>
                </TabsContent>

                <TabsContent value="cercle">
                  <div className="#002D62">
                    <Pie data={userData} />
                  </div>
                </TabsContent>

              
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
