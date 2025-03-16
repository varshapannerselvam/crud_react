import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeTable from './EmployeeTable';
import CreateEmployees from './CreateEmployees';
import EditEmployees from './EditEmployees';
import ViewDetails from './ViewDetails';
import { SnackbarProvider } from 'notistack';
import "./App.css"
import { useState } from 'react';
function App() {
  const [id, setId] =useState('')
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeTable  setId={setId}/>}></Route>
          <Route path='/employee/create/' element={<CreateEmployees id={id}/>}></Route>
          <Route path='/employee/edit/:Employee_id' element={<EditEmployees />}></Route>
          <Route path='/employee/view/:Employee_id' element={<ViewDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
