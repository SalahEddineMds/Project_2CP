import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
export function GetColumns(searchby, userInfo, isLogged) {
  return searchby === 'chercheur'
    ? () => ColumnsChercheur()
    : searchby === 'publication'
      ? () => ColumnsPublication(userInfo, isLogged)
      : searchby === 'projet'
        ? () => ColumnsProjet(userInfo, isLogged)
        : searchby === 'encadrement'
          ? () => ColumnsEncadrement(userInfo, isLogged)
          : () => ColumnsConfJourn(userInfo, isLogged);
}

export function ColumnsChercheur() {
  return [
    {
      accessorKey: 'nomComplet',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-8"
          >
            Nom Complet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        // console.log(row.original),
        <div className=" flex flex-row items-center gap-3">
          <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
            <Avatar>
              <AvatarImage
                className=" rounded-full"
                src={row.original.image_path}
              />
              <AvatarFallback>
                {row.getValue('nomComplet').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="lowercase">
            {console.log('row is nomComplet', row.getValue('nomComplet'))}
            {row.getValue('nomComplet')}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'GradeRecherche',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Grade Recherche
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('GradeRecherche')}</div>
      ),
    },
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        console.log('look here', Object.keys(row.original)),
        (<div className="lowercase">{row.getValue('_id')}</div>) //here is the change
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink
                //to={`../../chercheur/${row.original.id + '/informations'}`}
                to={`../../chercheur/${row.getValue('_id')}/informations`} // some changes here
              >
                {console.log('email', row.getValue('_id'))}
                <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsPublication(userInfo, isLogged) {
  return [
    {
      accessorKey: 'Titre',
      sortingFn: 'basic',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Titre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className="ml-2">{row.getValue('Titre')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'Date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('Date')}</div>
      ),
    },
    {
      accessorKey: 'Membres',
      header: ({ column }) => {
        return <span className=" ml-4">Membres</span>;
      },
      cell: ({ row }) => (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">View members</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              {row.getValue('Membres').map((M, ind, arr) => (
                <>
                  <h2>{M}</h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../../publication/${row.original._id}`}>
                <DropdownMenuItem>Plus d'info</DropdownMenuItem>
              </NavLink>
              {isLogged && userInfo._id == row.original.idCherch ? (
                <NavLink to={`../../editpublication/${row.original._id}`}>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                </NavLink>
              ) : null}
              <a href={row.original.Lien} target="_blanc">
                <DropdownMenuItem>Lien externe</DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsProjet(userInfo, isLogged) {
  return [
    {
      accessorKey: 'Titre',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-[-5px]"
          >
            Titre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className="ml-3">{row.getValue('Titre')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'Theme',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Theme
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('Theme')}</div>,
    },
    {
      accessorKey: 'liste_members',
      header: ({ column }) => {
        return <span className=" ml-4">Membres</span>;
      },
      cell: ({ row }) => (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">View members</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <span className=" font-bold underline">Chef :</span>{' '}
              {row.original.ChefDeProjet}
              <DropdownMenuSeparator />
              {row.getValue('liste_members').map((M, ind, arr) => (
                <>
                  <h2>{M}</h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },

    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Numero
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('_id')}</div>,
    },
    {
      accessorKey: 'DateDebut',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date Debut
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('DateDebut')}</div>,
    },
    {
      accessorKey: 'DateFin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Date Fin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('DateFin')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../../projet/${row.original._id}`}>
                <DropdownMenuItem>Plus d'info</DropdownMenuItem>
              </NavLink>
                {isLogged &&
              (row.original.ChefDeProjet == userInfo._id  || 
                row.original.liste_members.includes(userInfo._id)) ? (
                <NavLink to={`../../editprojet/${row.original._id}`}>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                </NavLink>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsConfJourn(userInfo, isLogged) {
  return [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-[-5px]"
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" flex flex-row items-center gap-3">
          <div className="ml-3">{row.getValue('_id')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('type')}</div>,
    },

    {
      accessorKey: 'nom',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('nom')}</div>,
    },
    {
      accessorKey: 'periodicite',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=" ml-[-15px]"
          >
            Periodicité
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('periodicite')}</div>,
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {row.original.Lien && (
                <a href={row.original.Lien} target="_blanc">
                  <DropdownMenuItem>Lien externe</DropdownMenuItem>
                </a>
              )}
              {isLogged &&
              (userInfo.type == 'Assistant' || userInfo.type == 'Directeur') ? (
                <NavLink to={`../../editconfjourn/${row.original._id}`}>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                </NavLink>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function ColumnsEncadrement(userInfo, isLogged) {
  return [
    {
      accessorKey: 'Titre',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Titre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('Titre')}</div>
      ),
    },
    {
      accessorKey: 'Type',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('Type')}</div>
      ),
    },
    {
      accessorKey: 'Etudiants',
      header: ({ column }) => {
        return <span className=" ml-4">Etudiants</span>;
      },
      cell: ({ row }) => (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">Voir les etudiants</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              {row.getValue('Etudiants').map((M, ind, arr) => (
                <>
                  <h2>{M}</h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },
    {
      accessorKey: 'Encadrants',
      header: ({ column }) => {
        return <span className=" ml-4">Membres</span>;
      },
      cell: ({ row }) => (
        <div>
          {}
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">Voir les encadrants</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <DropdownMenuSeparator />
              {row.original.Encadrants.map((M, ind, arr) => (
                <>
                  <h2>
                    <span className=" font-bold ">Nom :</span> {M.nomComplet}
                    <br />
                    <span className=" font-bold ">ID : </span>{' '}
                    {M._id == 'Null' ? ' \\ ' : M._id || ' \\ '}
                    <br /> <span className=" font-bold ">Role : </span>
                    {M.role == 'Null' ? ' \\ ' : M.role || ' \\ '}
                  </h2>
                  {ind == arr.length - 1 ? null : <DropdownMenuSeparator />}
                </>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },
    {
      accessorKey: 'AnneeD',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Annee Debut
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('AnneeD')}</div>
      ),
    },
    {
      accessorKey: 'AnneeF',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Annee Fin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('AnneeF')}</div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        console.log;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NavLink to={`../../encadrement/${row.original._id}`}>
                <DropdownMenuItem>Plus d'info</DropdownMenuItem>
              </NavLink>
              {isLogged &&
              row.original.Encadrants.some((e) => e._id == userInfo._id) ? (
                <NavLink to={`../../editencadrement/${row.original._id}`}>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                </NavLink>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
