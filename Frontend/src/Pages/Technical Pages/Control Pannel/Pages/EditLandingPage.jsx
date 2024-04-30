import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import leftArrow from './assets/left arrow.svg';
import rightArrow from './assets/right arrow.svg';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
export default function EditLandingPage() {
  const LandingPage = {
    // fetching
    news: [
      {
        title: 'title',
        paragraphe:
          'import React, { useState } from react \n import { NavLink, Outlet } from "react-router-dom" \n import Menu from ./Menu/Menu.jsx',
        img: 'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
        Subject: 'Best Publication',
      },
      {
        title: 'Not a title',
        paragraphe:
          'imrgregt, { useState } from react \n ietghtyrthgLink, Outlet } from "react-router-dom" \n irgergegpojoj*zolmajn,vjaerkhga',
        img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        Subject: 'Best Chercheur',
      },
    ],
  };

  const schema = yup.object().shape({
    title: yup.string().max(20),
    paragraphe: yup.string(),
    img: yup.string(),
    Subject: yup.string(),
  });

  const [boxes, setBoxes] = useState(LandingPage.news); //title, paragraphe, Consept
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const form = useForm({
    defaultValues: LandingPage.news[index],
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    data.forEach((value, key) => {
      LandingPage.news[index][key] = value;
    });
    console.log(form.getValues() + ' ');
  };
  const paginationButtons = [];
  for (let i = 0; i < boxes.length; i++) {
    paginationButtons[i] = (
      <button
        onClick={() => {
          setIndex(i);
        }}
        className={`mx-2 px-[0.6vw] py-[0.3vw] text-lg ${index == i ? 'bg-black' : 'bg-gray-400'} rounded-md transition-colors hover:text-black`}
      ></button>
    );
  }
  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le Titre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paragraphe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez la description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien de l'image</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le lien de l'image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>L'acroche</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez l'acroche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Appliquer les changements</Button>
          </form>
        </Form>
        <Button
          onClick={() => {
            if (boxes.length <= 5) {
              setBoxes((old) => {
                let newboxes = old;
                const max = boxes.length;
                console.log(max);
                newboxes.push({
                  Subject: '',
                  img: '',
                  title: '',
                  paragraphe: '',
                });
                return newboxes;
              });
            }
            console.log(boxes);
          }}
        >
          add
        </Button>
      </div>

      <div className="bg-whitep-1  flex min-w-[64vw] flex-col place-items-center ">
        <div className="flex min-w-[64vw] flex-row items-center justify-around px-2 py-2">
          <button
            className="bg-buttonDarkshadow-sm mr-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw] md:w-[2.5vw] "
            onClick={async () => {
              setShow(false);
              await timeout(100);
              setIndex(index == 0 ? boxes.length - 1 : index - 1);
              await timeout(100);
              setShow(true);
            }}
          >
            <img
              src={leftArrow}
              alt="background"
              className="mr-[0.1vw] h-[2vw]   active:opacity-70  md:h-[1vw] "
            />
          </button>

          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className="flex h-[140px] w-[65vw] flex-row items-start justify-around rounded-2xl bg-white px-4 py-[2vw] shadow-md md:h-auto md:w-[54vw] md:min-w-[54vw] lg:p-5 "
              >
                <div className="flex h-[15vw]  w-[22vw] flex-col items-start gap-[1.1vw]">
                  <h2 className="m-0 rounded-xl bg-buttonLight px-[0.9vw] py-[0.6vw] text-center font-sans text-[1.2vw] font-[500] text-textLight lg:px-[0.7vw] lg:py-[0.4vw] lg:text-[0.8vw]">
                    {boxes[index].Subject}
                  </h2>
                  <div className="flex h-[17vw]  w-[23vw] flex-col items-start ">
                    <h1 className="m-0  text-center font-title text-[2.5vw] lg:text-[1.5vw]">
                      {boxes[index].title}
                    </h1>
                    <p className="m-0 font-sans text-[1.8vw] font-normal text-textDark md:text-[1.2vw] lg:text-[0.8vw]">
                      {boxes[index].paragraphe}
                    </p>
                  </div>
                </div>
                <img
                  src={boxes[index].img}
                  alt="background"
                  className=" mr-2 h-[17vw] w-[23vw] rounded-lg object-cover object-center md:h-[15vw] md:w-[27vw]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="ml-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark shadow-sm transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw]  md:w-[2.5vw] "
            onClick={async () => {
              setShow(false);
              await timeout(100);
              setIndex(index == boxes.length - 1 ? 0 : index + 1);
              await timeout(100);
              setShow(true);
            }}
          >
            <img
              src={rightArrow}
              alt="background"
              className="ml-[0.1vw] h-[2vw] active:opacity-70  md:h-[1vw]"
            />
          </button>
        </div>
        <div className="my-5 flex flex-row items-center justify-center">
          {paginationButtons}
        </div>
      </div>
    </div>
  );
}
