import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AddProject() {
  const schema = yup.object().shape({
    Num: yup.number().required('le numero est requis'),
    Titre: yup.string().required('le titre est requis'),
    DateDebut: yup.string().required('la date de debut est requise'),
    chefProjet: yup.string().required(' le chef de projet est requis  '),
    DateFin: yup.string(),
    Theme: yup.string().required(' le theme est requis '),
    liste_members: yup.string().required(' la liste des membres est requise '),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleButtonClick = () => {
    form.handleSubmit(onSubmit)();
  };

  const form = useForm({
    defaultValues: {
      /* Num: '',
      Titre: '',
      DateDebut: '',
      chefProjet: '',
      DateFin: '',
      Theme: '',
      liste_members: '',*/
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log('data :', data);

    try {
      const inf = {
        Num: data.Num,
        Titre: data.Titre,
        DateDebut: data.DateDebut,
        chefProjet: data.chefProjet,
        DateFin: data.DateFin,
        Theme: data.Theme,
      };
      console.log(inf);
      console.log('clicked');
      setIsSubmitted(true);
      const resutlt = await axios.post(
        'http://localhost:3000/insertions/projet',
        data,
      );
      console.log(resutlt.data.message);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  /* const onSubmit = (data) => {
    
    console.log('Filtres : ', data);
  }; */

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
              Ajouter un Projet
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" h-[95%]">
          <ScrollArea className="h-[99%] w-[99%] pr-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="p-5 text-center ">
                  <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Ajouter un nouveau projet{' '}
                  </h1>
                </div>
                <h2 className="text-1xl text-center font-bold dark:text-white">
                  veuillez remplir ce formulaire{' '}
                </h2>
                <hr className="my-8 h-px border-0  bg-black bg-opacity-50 "></hr>
                <FormField
                  control={form.control}
                  name="Num"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  pt-5">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Numero :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-14">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le numero "
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
                  name="Titre"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>titre :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-24">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez le titre "
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
                  name="DateDebut"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start  ">
                          <div className="pl-5 pr-9 ">
                            <FormLabel>Date de debut :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-4">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder="entrez la date de debut "
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
                  name="chefProjet"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Chef de Projet :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-8">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le chef de Projet"
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
                  name="DateFin"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>date de fin :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-14">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez la date de fin "
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
                  name="Theme"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>Theme :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-20">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez le theme"
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
                  name="liste_members"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="flex flex-row items-center justify-start   ">
                          <div className="px-5">
                            <FormLabel>liste des membres :</FormLabel>
                          </div>
                          <FormControl>
                            <div className="ml-2">
                              <Input
                                className=" w-300 h-7 rounded-full"
                                placeholder=" entrez la liste  "
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
                <div className="flex gap-4 p-5">
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
