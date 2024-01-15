import styled, { keyframes } from "styled-components";

// Définition de l'animation bounce
const bounce = keyframes`
0%, 100% {
  transform: scale(0);
  -webkit-transform: scale(0);
}
50% {
  transform: scale(1);
  -webkit-transform: scale(1);
}
`;

// Styled Components

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
`;

const Spinner = styled.div`
  height: 50px;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
  position: relative;
  top: 50%;
  width: 50px;
`;

const DoubleBounce = styled.div`
  width: 120%;
  height: 120%;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  -o-border-radius: 50%;
  background-color: #f97247;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 1s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

export default function Preloader() {
  return (
    <PreloaderContainer>
      <Spinner>
        <DoubleBounce />
        <DoubleBounce />
      </Spinner>
    </PreloaderContainer>
  );
}
