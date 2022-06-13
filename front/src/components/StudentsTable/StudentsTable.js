import React from 'react'
import DataTable from '../common/DataTable/DataTable';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const StudentsTable = ({students, editStudent, deleteStudent}) => {
    
  const columns = [
    { field: 'id', headerName: '#', maxWidth: 150, minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Nombre', minWidth: 300, flex: 1 },
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
            onClick={() => editStudent(data.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStudent(data.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  
  return (
    <DataTable
      rows={students}
      columns={columns}
      loading={!students.length}
    />
  )
}

export default StudentsTable
