import React from 'react';
import CardComponent from './components/CardComponent';
import { ImageBackground, MainContainer } from './styles';
// import FundoApp from '../assets/img/FundoApp.png';

function App() {
  return (
    <MainContainer>
      {/* <ImageBackground> */}
        <CardComponent />
      {/* </ImageBackground> */}
    </MainContainer>
  );
}

export default App;
