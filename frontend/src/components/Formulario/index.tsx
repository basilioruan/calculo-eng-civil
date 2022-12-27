import React, { useState } from 'react';
import { Form, FormGroup, Button, ButtonGroup, Input } from 'reactstrap';
import { MainContainer } from './styles';
import { GiBroom } from 'react-icons/gi';
import { TbMathFunction } from 'react-icons/tb';

const Formulario: React.FC = () => {
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [errorLabel, setErrorLabel] = useState<string>();

  // VARIABLES
  const [isViga, setIsViga] = useState<boolean>(true);
  const [isDimensionamento, setIsDimensionamento] = useState<boolean>(true);
  const [classeConcreto, setClasseConcreto] = useState<number>(2);
  const [classeAco, setClasseAco] = useState<number>(50);
  const [momentoFletor, setMomentoFletor] = useState<string>('');
  const [momentoFletorValidation, setMomentoFletorValidation] = useState<boolean>(false);
  const [areaAco, setAreaAco] = useState<string>('');
  const [areaAcoValidation, setAreaAcoValidation] = useState<boolean>(false);
  const [base, setBase] = useState<string>('');
  const [baseValidation, setBaseValidation] = useState<boolean>(false);
  const [alturaUtil, setAlturaUtil] = useState<string>('');
  const [alturaUtilValidation, setAlturaUtilValidation] = useState<boolean>(false);
  const [altura, setAltura] = useState<string>('');
  const [alturaValidation, setAlturaValidation] = useState<boolean>(false);

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

  const handleStructure = () => {
    setBase('1');
    setIsViga(false);
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
    const b = parseFloat(base);
    const altUtil = parseFloat(alturaUtil);
    const areaAco = (0.68 * (classeConcreto / 1.4) * b * altUtil * bx) / (classeAco / 1.15);

    return areaAco;
  }

  const validaFormulario = () => {
    if (isViga) {
      const validationMomentoFletor = !momentoFletor;
      setMomentoFletorValidation(validationMomentoFletor);

      const validationBase = !base;
      setBaseValidation(validationBase);

      const validationAltura = !altura;
      setAlturaValidation(validationAltura);

      const validationAlturaUtil = !alturaUtil;
      setAlturaUtilValidation(validationAlturaUtil);

      const validationError = validationMomentoFletor || validationBase || validationAltura || validationAlturaUtil;

      if (validationError) {
        setErrorLabel('Campos obrigatórios não preenchidos')
      }

      setError(validationError);
      return validationError;
    }
  }

  const calcularResultado = () => {
    if (validaFormulario()) {
      return;
    }

    let C = 0;
    const mf = parseFloat(momentoFletor);
    const b = parseFloat(base);
    const altUtil = parseFloat((alturaUtil));

    C = mf / (0.68 * (classeConcreto / 1.4) * b * Math.pow(altUtil, 2));
    const baskhara = calcularBhaskara(-0.4, 1, -C);

    if (baskhara > 0 && baskhara < 0.1667) {
      console.log('condição 1');
    }
    else if (baskhara >= 0.1667 && baskhara < 0.45) {
      console.log('condição 2');
      const resultado = calcularAreaAco(baskhara) || 0;
      setResult(resultado.toFixed(4).replace('.', ','));
    }
    else if (baskhara >= 0.45 && baskhara < 1) {
      console.log('condição 3');
    }
    else {
      console.log('error');
      setError(true);
      setErrorLabel('Erro ao cálcular: valores resultam raizes inválidas');
    }
  }

  const limparCampos = () => {
    setIsViga(true);
    setIsDimensionamento(true);
    setClasseConcreto(2);
    setClasseAco(50);
    setMomentoFletor('');
    setMomentoFletorValidation(false);
    setBase('');
    setBaseValidation(false);
    setAltura('');
    setAlturaValidation(false);
    setAlturaUtil('');
    setAlturaUtilValidation(false);
    setResult('');
    setError(false);
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
              onClick={handleStructure}
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
              value={classeConcreto}
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
              value={classeAco}
            >
              {steelOptions.map(opt => <option key={opt.id} value={opt.valor}> {opt.label} </option>)}
            </Input>
          </FormGroup>
        </div>
        <FormGroup className="variables">
          {isDimensionamento && (
            <div className="number-input">
              <p>Momento fletor <span className="unidades">(cm)</span></p>
              <Input invalid={momentoFletorValidation} value={momentoFletor} className="md" type="number" onChange={(event) => {setMomentoFletor(event.target.value)}} />
            </div>  
          )}
          {!isDimensionamento &&(
            <div className="number-input">
              <p>Área de aço <span className="unidades">(cm)</span></p>
              <Input invalid={areaAcoValidation} value={areaAco} className="md" type="number" onChange={(event) => {setAreaAco(event.target.value)}} />
            </div>  
          )}
          {isViga && (
            <div className="number-input">
              <p>Base <span className="unidades">(cm)</span></p>
              <Input invalid={baseValidation} value={base} className="md" type="number" onChange={(event) => {setBase(event.target.value)}} />
            </div>
          )}
          <div className="number-input">
            <p>Altura <span className="unidades">(cm)</span></p>
            <Input invalid={alturaValidation} value={altura} className="md" type="number" onChange={(event) => {setAltura(event.target.value)}} />
          </div>  
          <div className="number-input">
            <p>Altura útil <span className="unidades">(cm)</span></p>
            <Input invalid={alturaUtilValidation} value={alturaUtil} className="md" type="number" onChange={(event) => {setAlturaUtil(event.target.value)}} />
          </div>  
        </FormGroup>
        <div className="result">
            {result && <p>Resultado: <span className="result-number">{result}</span><span className="unidades"> cm²</span></p> }
            {error && <p className="error">*{errorLabel}</p> }
        </div>
        <div className="btn-footer">
          <Button className="btn-calcular" onClick={limparCampos}>
            <GiBroom className="icon" size={20} />
            Limpar
          </Button>
          <Button className="btn-calcular" onClick={calcularResultado}>
            <TbMathFunction className="icon" size={20} />
            Calcular
          </Button>
        </div>
      </Form>
    </MainContainer>
  );
}

export default Formulario;