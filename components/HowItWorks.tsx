import { styled } from "styled-components";
import { LinkIcon } from "./icons/LinkIcon";
import { FileIcon } from "./icons/FileIcon";
import { ClockIcon } from "./icons/ClockIcon";
import { PdfIcon } from "./icons/PdfIcon";
import { colors } from "@/lib/theme/theme";
import { H3 } from "./Text";

export const HowItWorks = () => {
  return (
    <StContainer>
      <StStepsGrid>
        <StIconColumn $first>
          <StIconWrapper>
            <LinkIcon />
          </StIconWrapper>
          <StConnector $grow />
        </StIconColumn>
        <StContentColumn>
          <StStepTitle>Connect Strava</StStepTitle>
          <StStepDescription>Analyze your athlete profile</StStepDescription>
        </StContentColumn>

        <StIconColumn>
          <StConnector $height="8px" />
          <StIconWrapper>
            <FileIcon />
          </StIconWrapper>
          <StConnector $grow />
        </StIconColumn>
        <StContentColumn>
          <StStepTitle>Fill Questionnaire</StStepTitle>
          <StStepDescription>
            Share availability, preferences, and goals
          </StStepDescription>
        </StContentColumn>

        <StIconColumn>
          <StConnector $height="8px" />
          <StIconWrapper>
            <ClockIcon />
          </StIconWrapper>
          <StConnector $grow />
        </StIconColumn>
        <StContentColumn>
          <StStepTitle>Wait</StStepTitle>
          <StStepDescription>
            Our AI generates your personalized 2-week plan
          </StStepDescription>
        </StContentColumn>

        <StIconColumn $last>
          <StConnector $height="8px" />
          <StIconWrapper>
            <PdfIcon />
          </StIconWrapper>
        </StIconColumn>
        <StContentColumn>
          <StStepTitle>Enjoy Your Schema</StStepTitle>
          <StStepDescription>
            Receive your PDF training schema via email
          </StStepDescription>
        </StContentColumn>
      </StStepsGrid>
    </StContainer>
  );
};

interface StIconColumnProps {
  $first?: boolean;
  $last?: boolean;
}

interface StConnectorProps {
  $height?: string;
  $grow?: boolean;
}

const StContainer = styled.div`
  padding: 0;
`;

const StStepsGrid = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 0 8px;
  padding: 0 16px;
`;

const StIconColumn = styled.div<StIconColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: ${(props) => (props.$first ? "12px" : "0")};
  padding-bottom: ${(props) => (props.$last ? "12px" : "0")};
`;

const StIconWrapper = styled.div`
  color: ${colors.primary};
`;

const StConnector = styled.div<StConnectorProps>`
  width: 1.5px;
  height: ${(props) => props.$height || "8px"};
  flex-grow: ${(props) => (props.$grow ? 1 : 0)};
`;

const StContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const StStepTitle = styled(H3)`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;

const StStepDescription = styled.p`
  color: ${colors.text};
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  margin: 0;
`;
