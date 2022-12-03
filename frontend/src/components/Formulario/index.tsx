import React, { useState } from 'react';
import { Form, FormGroup, Button, ButtonGroup, Label } from 'reactstrap';
import { MainContainer } from './styles';

const Formulario: React.FC = () => {
  const [radioPart1, setRadioPart1] = useState<number>(1);
  const [radioPart2, setRadioPart2] = useState<number>(1);

  return (
    <MainContainer>
      <Form>
        <FormGroup className="form-group" check>
          <p> Selecione para qual será feito o cálculo:</p>
          <ButtonGroup>
            <Button
              outline
              onClick={() => setRadioPart1(1)}
              active={radioPart1 === 1}
            >
              Não lembro
            </Button>
            <Button
              outline
              onClick={() => setRadioPart1(2)}
              active={radioPart1 === 2}
            >
              Laje
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup check>
          <p> Selecione para qual será feito o cálculo:</p>
          <ButtonGroup>
            <Button
              outline
              onClick={() => setRadioPart2(1)}
              active={radioPart2 === 1}
            >
              Sei lá 1
            </Button>
            <Button
              outline
              onClick={() => setRadioPart2(2)}
              active={radioPart2 === 2}
            >
              Sei lá 2
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Form>
      </MainContainer>
  );
}

export default Formulario;