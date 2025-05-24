import { colors } from "@/lib/theme/theme";
import { styled } from "styled-components";

export const H1 = styled.h1<{ white?: boolean }>`
  font-size: 64px;
  font: varsity;
  color: ${(props) => (props.white ? colors.white : colors.secondary)};
`;

export const H2 = styled.h2`
  font-size: 48px;
  font: varsity;
  color: ${colors.secondary};
`;

export const H3 = styled.h3`
  font-size: 32px;
  font: roboto;
  color: ${colors.secondary};
`;
