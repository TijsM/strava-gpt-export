import { useDarkModeStore } from "@/stores/darkModeStore";
import { FaCheck } from "react-icons/fa";
import { styled } from "styled-components";

type SettingsCardProps = {
  title: string;
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
};

export const SettingsCard = ({
  title,
  selected,
  onSelect,
  icon,
}: SettingsCardProps) => {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <StButton onClick={onSelect} selectedTextColor={isDark ? "white" : "black"}>
      <StText selectedTextColor={isDark ? "white" : "black"}>{title}</StText>
      {icon && <StIcon>{icon}</StIcon>}

      {selected && (
        <StSelectedIconContainer>
          <FaCheck size={8} color="white" />
        </StSelectedIconContainer>
      )}
    </StButton>
  );
};

const StButton = styled.button<{ selectedTextColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: transparent;
  border: none;

  height: 75px;
  width: 100px;
  border: 1px solid
    ${(props) =>
      props.selectedTextColor === "black" ? "#dfdfdf;" : "#393939;"};

  &:hover {
    background-color: #a5a5a5;
  }
`;

const StIcon = styled.div`
  padding-top: 8px;
`;

const StText = styled.span<{ selectedTextColor: string }>`
  font-size: 12px;
  font-weight: normal;
  color: #3d3d3d;
  color: ${(props) => props.selectedTextColor};
`;

const StSelectedIconContainer = styled.div`
  position: absolute;
  right: -4px;
  top: -4px;
  padding: 4px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #fc4c02;
  display: flex;
  justify-content: center;
  align-items: center;
`;
