import styled from "styled-components";

export const Container =  styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
min-width: 600px;
max-width: 750px;
border-radius: 8px;
border: 1px solid #af40ff;
padding: 1rem;

.full-width{
    width: 100% !important;
}
`

export const Input  =  styled.input`
width: 100%;
height: 44px;
background-color:transparent;
outline:none;
border: 1.2px solid;
border-radius:4px;
color:black;
padding-left:10px;
font-size:14px;
font-weight:bold;
`

export const Row = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`
export const Col = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`