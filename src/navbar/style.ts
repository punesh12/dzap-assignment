import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8.4px);
  -webkit-backdrop-filter: blur(8.4px);
  z-index: 999;
`;

export const IconImg = styled.img`
  height: 65%;
  margin-left: 20px;
`;
