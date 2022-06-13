import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <PeopleIcon />,
        label: "Alumnos",
        route: "alumnos"
    },
    {
        id: 1,
        icon: <LibraryBooksIcon />,
        label: "Materias",
        route: "materias"
    }
]