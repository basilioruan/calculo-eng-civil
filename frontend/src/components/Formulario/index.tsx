import React, { useState } from 'react';
import { Form, FormGroup, Button, ButtonGroup, Label, Input } from 'reactstrap';
import { MainContainer } from './styles';

const Formulario: React.FC = () => {
  const [isViga, setIsViga] = useState<boolean>(true);
  const [isDimensionamento, setIsDimensionamento] = useState<boolean>(true);

  const concreteOptions = [
    {id: 0, label: 'C20', valor: 20},
    {id: 1, label: 'C25', valor: 25},
    {id: 2, label: 'C30', valor: 30},
    {id: 3, label: 'C50', valor: 50}
  ];
  
  const steelOptions = [
    {id: 0, label: 'CA50', valor: 50},
    {id: 1, label: 'CA60', valor: 60}
  ];

  const handleClasse = (event: any) => {
    console.log(event.target.value);
  }

  return (
    <MainContainer>
      <Form>
        <FormGroup className="form-group" check>
          <p> Selecione para qual estrutura será feito o cálculo:</p>
          <ButtonGroup>
            <Button
              outline
              onClick={() => setIsViga(true)}
              active={isViga}
            >
              Viga
            </Button>
            <Button
              outline
              onClick={() => setIsViga(false)}
              active={!isViga}
            >
              Laje
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup check>
          <p> Escolha o tipo de cálculo:</p>
          <ButtonGroup>
            <Button
              outline
              onClick={() => setIsDimensionamento(true)}
              active={isDimensionamento}
            >
              Dimensionamento
            </Button>
            <Button
              outline
              onClick={() => setIsDimensionamento(false)}
              active={!isDimensionamento}
            >
              Análise
            </Button>
          </ButtonGroup>
        </FormGroup>
        <div className="classes">
          <FormGroup className="select-options">
            <p> Selecione a classe do concreto: </p>
            <Input
              className="mb-3"
              type="select"
              onChange={(event) => handleClasse(event)}
            >
              {concreteOptions.map(opt => <option key={opt.id} value={opt.valor}> {opt.label} </option>)}
            </Input>
          </FormGroup>
          <FormGroup className="select-options">
            <p> Selecione a classe do aço: </p>
            <Input
              className="mb-3"
              type="select"
              onChange={(event) => handleClasse(event)}
            >
              {steelOptions.map(opt => <option key={opt.id} value={opt.valor}> {opt.label} </option>)}
            </Input>
          </FormGroup>
        </div>
        <FormGroup className="variables">
          {isDimensionamento && (
            <div className="number-input">
              <p>Momento fletor</p>
              <Input className="md" type="text" />
            </div>  
          )}
          {!isDimensionamento &&(
            <div className="number-input">
              <p>Área de aço</p>
              <Input className="md" type="text" />
            </div>  
          )}
          {isViga && (
            <div className="number-input">
              <p>Base</p>
              <Input className="md" type="text" />
            </div>
          )}
          <div className="number-input">
            <p>Altura</p>
            <Input className="md" type="text" />
          </div>  
          <div className="number-input">
            <p>Altura útil</p>
            <Input className="md" type="text" />
          </div>  
        </FormGroup>
      </Form>
      </MainContainer>
  );
}

export default Formulario;