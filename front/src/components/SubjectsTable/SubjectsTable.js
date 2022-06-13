import React from 'react';
import DataTable from '../common/DataTable/DataTable';
import useSubjects from '../../hooks/useSubjects';

const SubjectsTable = () => {
  const [subjects] = useSubjects();
    
  const columns = [
    { field: 'id', headerName: '#', maxWidth: 150, minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Nombre', minWidth: 300, flex: 1 },
  ];


  return (
    <DataTable
      rows={subjects}
      columns={columns}
      loading={!subjects.length}
    />
  )
}

export default SubjectsTable
