import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function AddChercheur() {
  const schema = yup.object().shape({
    nom: yup.string().required('le nom est requis'),
    prenom: yup.string().required('le prenom est requis'),
    email: yup
      .string()
      .email('email format is not valid')
      .required(" l'email est requis"),
    diplome: yup.string().required('le diplome est requis'),
    etablissementdorigine: yup
      .string()
      .required(" l'etabliisement d'origine est requis "),
    gradeenseignement: yup
      .string()
      .required(' le  grade-enseignement est requis '),
    graderecherche: yup.string().required(' le grade-recherche est requis '),
    qualitee: yup.string().required(' la qualitee est requise '),
    Matricule: yup.string().required('le Matricule est requise'),
    equipe: yup.string(),
    lien: yup.string(),
    projet: yup.string(),
  });
const [isSubmitted, setIsSubmitted] = useState(false);
  const handleButtonClick = () => {
    form.handleSubmit(onSubmit)();
  };
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const info = {
        email: data.email,
        nom: data.nom,
        Qualité: data.qualitee,
        EtablissementOrigine: data.etablissementdorigine,
        Equipe: data.equipe,
        Diplome: data.diplome,
        GradeRecherche: data.graderecherche,
        GradeEnsegnement: data.gradeenseignement,
        H_index: data.hIndex,
        contact: data.lien,
        prenom: data.prenom,
        Matricule: data.Matricule,
      };

      console.log(info);
      console.log('clicked');
      setIsSubmitted(true);

      const res = await axios.post(
        'http://localhost:3000/chercheur/insertionChercheur ',
        info,
      );
      console.log(res.data.message);
    } catch (err) {
      if (err.response) console.log(err.response.data.message); //this error is for displaying the error message from the server
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div
            className={` block  select-none space-y-1  rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent  focus:text-accent-foreground `}
          >
            <div
              className={`flex items-center justify-center text-sm font-medium leading-none`}
            >
              Ajouter un Chercheur
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" h-[95%]">
          <ScrollArea className="h-[99%] w-[99%] pr-5">
            {' '}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="p-5 text-center ">
                  <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Ajouter un nouveau chercheur
                  </h1>
                </div>
                <h2 className="text-1xl text-center font-bold dark:text-white">
                  les informations personnelles
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                <FormField
                  control={form.control}
                  name="Matricule"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Matricule :</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              className=" w-300 h-7 rounded-full"
                              placeholder="entrez la matricule "
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  ">
                          <div className="px-5  ">
                            <FormLabel>Nom :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-11">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le nom "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>prénom :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-6">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le prénom "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  ">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Email :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-6">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez l'email "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <h2 className="text-1xl text-center font-bold dark:text-white">
                  les informations professionnelles
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                <FormField
                  control={form.control}
                  name="gradeenseignement"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>grade enseignement :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-6">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <div className="pl-6">
                                  <SelectTrigger className="h-7 w-[190px] rounded-full pl-6">
                                    <SelectValue placeholder="choisissez" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="professeur">
                                      Professeur
                                    </SelectItem>
                                    <SelectItem value="mca">MCA</SelectItem>
                                    <SelectItem value="mcb">MCB</SelectItem>
                                    <SelectItem value="maa">MAA</SelectItem>
                                    <SelectItem value="mab">MAB</SelectItem>
                                    <SelectItem value="null">NULL</SelectItem>
                                  </SelectContent>
                                </div>
                              </Select>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graderecherche"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>grade recherche :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-14">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <div className="pl-6">
                                  <SelectTrigger className="h-7 w-[190px] rounded-full pl-6">
                                    <SelectValue placeholder="choisissez" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="directeur de recherche">
                                      Directeur de recherche
                                    </SelectItem>
                                    <SelectItem value="maitre de recherche">
                                      Maitre de recherche
                                    </SelectItem>
                                    <SelectItem value="charge de recherche">
                                      Charge de recherche
                                    </SelectItem>
                                    <SelectItem value="attache de recherche">
                                      Attache de recherche
                                    </SelectItem>
                                    <SelectItem value="null">NULL</SelectItem>
                                  </SelectContent>
                                </div>
                              </Select>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diplome"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>diplome :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-32">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le diplome"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="etablissementdorigine"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>établissement d origine :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-6">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez l'établissement "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualitee"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>qualitée :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-24">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <div className="pl-6">
                                  <SelectTrigger className="h-7 w-[190px] rounded-full pl-6">
                                    <SelectValue placeholder="choisissez" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="enseignant-chercheur">
                                      Enseignant-chercheur
                                    </SelectItem>
                                    <SelectItem value="chercheur">
                                      Chercheur
                                    </SelectItem>
                                    <SelectItem value="doctorant">
                                      Doctorant
                                    </SelectItem>
                                  </SelectContent>
                                </div>
                              </Select>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="equipe"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>équipe :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-32">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez l'équipe"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lien"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>lien :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-36">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le lien "
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projet"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>projet :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-32">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le projet"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <div className="flex gap-3 p-5">
                  <div className="text-green-600 font-bold text-center">
        {isSubmitted && <p> ajouté avec succès</p>}
      </div>
                  <Button
                    className="mb-2 h-[35px] rounded-lg bg-buttonDark p-5 py-2.5 text-sm font-medium  text-textLight  hover:bg-slate-700 hover:text-textLight focus:outline  "
                    type="submit"
                    onClick={handleButtonClick}
                  >
                    Ajouter
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <DevTool control={form.control} />
    </>
  );
}
