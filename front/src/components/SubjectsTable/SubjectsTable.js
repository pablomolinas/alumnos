import React from 'react';
import DataTable from '../common/DataTable/DataTable';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { removeSecondsFromTimeString } from '../../helpers/time';

const SubjectsTable = ({subjects, isLoading, editSubject, deleteSubject}) => {
  
    
  const columns = [
    { field: 'id', headerName: '#', maxWidth: 150, minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Nombre', minWidth: 250, flex: 1 },
    { field: 'maxStudents', headerName: 'Cupo maximo', minWidth: 100, flex: 1 },
    { field: 'totalStudents', headerName: 'Inscriptos', minWidth: 100, flex: 1 },
    { field: 'start', headerName: 'Inicio', minWidth: 100, flex: 1, valueFormatter: (params) => removeSecondsFromTimeString(params.value) },
    { field: 'end', headerName: 'Final', minWidth: 100, flex: 1, valueFormatter: (params) => removeSecondsFromTimeString(params.value) },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      flex: 1,
      maxWidth: 150,
      minWidth: 100,
      cellClassName: 'actions',
      getActions: (data) => {
        
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => editSubject(data.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteSubject(data.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  return (
    <DataTable
          rows={subjects}
          columns={columns}
          loading={isLoading}
    />          
  )
}

export default SubjectsTable
