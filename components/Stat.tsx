import { styled } from "styled-components";

interface StatProps {
  label: string;
  value: string;
}

export const Stat = ({ label, value }: StatProps) => {
  return (
    <StContainer>
      <StLabel>{label}</StLabel>
      <StValue>{value}</StValue>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StValue = styled.div`
  font-size: 24px;
`;
