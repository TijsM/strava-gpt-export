import { useDarkModeStore } from "@/stores/darkModeStore";
import { styled } from "styled-components";

type SettingsCardProps = {
  icon: React.ReactNode;
  title: string;
  selected: boolean;
  onSelect: () => void;
};

export const SettingsCard = ({
  icon,
  title,
  selected,
  onSelect,
}: SettingsCardProps) => {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <StButton onClick={onSelect} selectedTextColor={isDark ? "white" : "black"}>
      <StText selectedTextColor={isDark ? "white" : "black"}>{title}</StText>
      {icon}

      {selected && (
        <StText selectedTextColor={isDark ? "white" : "black"}>✓</StText>
      )}
    </StButton>
  );
};

const StButton = styled.button<{ selectedTextColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: transparent;
  border: none;

  height: 100px;
  width: 100px;

  &:hover {
    background-color: #aa3300;
  }
`;

const StText = styled.span<{ selectedTextColor: string }>`
  color: ${(props) => props.selectedTextColor};
`;
