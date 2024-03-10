import styled, { css } from "styled-components";

const buttonStyles = css<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  box-sizing: border-box;
  width: 180px;
  min-height: 50px;
  border-radius: 5px;
  font-size: 1.2rem;
  color: white;
  border: none;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1;
  :hover,
  :focus {
    box-shadow: 3px 1px 3px rgba(0, 0, 0, 0.15);
  }

  &:disabled{
    opacity: 0.5;
    pointer-events: none;

  }


`;

export const StyledButton = styled.button<any>`
  ${buttonStyles};
`;

export const ConnectWalletCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const OutlineButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  min-width: 180px;
  padding: 10px 0;
  margin: 0 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #7b14c4;
  border: 2px solid #af40ff;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;

  &:disabled{
    opacity: 0.5;
    pointer-events: none;
  }
`;


export const ButtonWrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-right:1rem;
gap:1rem;
`