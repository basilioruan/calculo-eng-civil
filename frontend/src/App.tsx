import React from 'react';
import Formulario from './components/Formulario';
import Titulo from './components/Titulo';
import { MainContainer } from './styles';

function App() {
  return (
    <MainContainer>
      <Titulo titulo='TCC Matheusa' />
      <Formulario />
    </MainContainer>
  );
}

export default App;
