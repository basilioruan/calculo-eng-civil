import React, { useState } from 'react';
import { Form, FormGroup, Button, ButtonGroup, Label, Input } from 'reactstrap';
import { MainContainer } from './styles';

const Formulario: React.FC = () => {
  const [isViga, setIsViga] = useState<boolean>(true);
  const [isDimensionamento, setIsDimensionamento] = useState<boolean>(true);
  const [result, setResult] = useState<string>();

  // VARIABLES
  const [momentoFletor, setMomentoFletor] = useState<number>();
  const [areaAco, setAreaAco] = useState<number>();
  const [base, setBase] = useState<number>();
  const [alturaUtil, setAlturaUtil] = useState<number>();
  const [altura, setAltura] = useState<number>();
  const [classeConcreto, setClasseConcreto] = useState<number>(2);
  const [classeAco, setClasseAco] = useState<number>(50);

  const concreteOptions = [
    {id: 0, label: 'C20', valor: 2},
    {id: 1, label: 'C25', valor: 2.5},
    {id: 2, label: 'C30', valor: 3},
    {id: 3, label: 'C50', valor: 5}
  ];
  
  const steelOptions = [
    {id: 0, label: 'CA50', valor: 50},
    {id: 1, label: 'CA60', valor: 60}
  ];

  const handleClasseConcreto = (event: any) => {
    setClasseConcreto(event.target.value);
  }
  
  const handleClasseAco = (event: any) => {
    setClasseAco(event.target.value);
  }

  const calcularBhaskara = (A: number, B: number, C: number) => {
    const delta = Math.sqrt(Math.pow(B, 2) - (4 * A * C));

    const x1 = (-B + delta) / (2 * A);
    const x2 = (-B - delta) / (2 * A);

    if (x1 > 0 && x1 < 1) {
      return x1;
    } 
    else if (x2 > 0 && x2 < 1) {
      return x1;
    }
    else {
      return -1;
    }
  }

  const calcularAreaAco = (bx: number) => {
    console.log(bx);
    if (base && alturaUtil && classeAco){
      const areaAco = (0.68 * (classeConcreto / 1.4) * base * alturaUtil * bx) / (classeAco / 1.15);
      return areaAco;
    }
  }

  const calcularResultado = () => {
    let C = 0;
    if (momentoFletor && classeConcreto && base && alturaUtil) {
      C = momentoFletor / (0.68 * (classeConcreto / 1.4) * base * Math.pow(alturaUtil, 2));
    }
    const baskhara = calcularBhaskara(-0.4, 1, -C);

    if (baskhara > 0 && baskhara < 0.1667) {
      console.log('condição 1');
    }
    else if (baskhara >= 0.1667 && baskhara < 0.45) {
      const resultado = calcularAreaAco(baskhara) || 0;
      setResult(resultado.toFixed(4).replace('.', ','));
    }
    else if (baskhara >= 0.45 && baskhara < 1) {
      console.log('condição 3');
    }
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
              onChange={(event) => handleClasseConcreto(event)}
            >
              {concreteOptions.map(opt => <option key={opt.id} value={opt.valor}> {opt.label} </option>)}
            </Input>
          </FormGroup>
          <FormGroup className="select-options">
            <p> Selecione a classe do aço: </p>
            <Input
              className="mb-3"
              type="select"
              onChange={(event) => handleClasseAco(event)}
            >
              {steelOptions.map(opt => <option key={opt.id} value={opt.valor}> {opt.label} </option>)}
            </Input>
          </FormGroup>
        </div>
        <FormGroup className="variables">
          {isDimensionamento && (
            <div className="number-input">
              <p>Momento fletor <span className="unidades">(cm)</span></p>
              <Input className="md" type="number" onChange={(event) => {setMomentoFletor(parseFloat(event.target.value))}} />
            </div>  
          )}
          {!isDimensionamento &&(
            <div className="number-input">
              <p>Área de aço <span className="unidades">(cm)</span></p>
              <Input className="md" type="number" onChange={(event) => {setAreaAco(parseFloat(event.target.value))}} />
            </div>  
          )}
          {isViga && (
            <div className="number-input">
              <p>Base <span className="unidades">(cm)</span></p>
              <Input className="md" type="number" onChange={(event) => {setBase(parseFloat(event.target.value))}} />
            </div>
          )}
          <div className="number-input">
            <p>Altura <span className="unidades">(cm)</span></p>
            <Input className="md" type="number" onChange={(event) => {setAltura(parseFloat(event.target.value))}} />
          </div>  
          <div className="number-input">
            <p>Altura útil <span className="unidades">(cm)</span></p>
            <Input className="md" type="number" onChange={(event) => {setAlturaUtil(parseFloat(event.target.value))}} />
          </div>  
        </FormGroup>
        <div className="result">
            <p>Resultado: <span className="result-number">{result}</span><span className="unidades"> cm²</span></p>
        </div>
        <div className="btn-footer">
          <Button className="btn-calcular">Limpar</Button>
          <Button className="btn-calcular" onClick={calcularResultado}>Calcular</Button>
        </div>
      </Form>
    </MainContainer>
  );
}

export default Formulario;