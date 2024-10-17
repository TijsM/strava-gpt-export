import { useDarkModeStore } from "@/stores/darkModeStore";
import { styled } from "styled-components";

interface StatProps {
  label: string;
  value: string;
}

export const Stat = ({ label, value }: StatProps) => {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <StContainer>
      <StLabel>{label}</StLabel>
      <StValue selectedTextColor={isDark ? "white" : "black"}>{value}</StValue>
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
