import { styled } from "styled-components";

interface StatProps {
  label: string;
  value: string;
  selectedTextColor: string;
}

export const Stat = ({ label, value, selectedTextColor }: StatProps) => {
  return (
    <StContainer>
      <StLabel>{label}</StLabel>
      <StValue selectedTextColor={selectedTextColor}>{value}</StValue>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const StLabel = styled.div`
  font-size: 8px;
  font-weight: normal;
  color: #3d3d3d;
  margin-bottom: 4px;
`;

const StValue = styled.div<{ selectedTextColor: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.selectedTextColor};
`;
