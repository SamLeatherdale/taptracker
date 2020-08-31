import React from "react";
import colors from "material-colors";
import chroma from "chroma-js";
import { styled } from "baseui";
import { Check } from "baseui/icon";
import { Label1, Label2, LabelLarge } from "baseui/typography";
import { Card, StyledBody } from "baseui/card";
import { TransactionType } from "./types";
import { transition } from "./theme";

type PropsType = {
  transaction: TransactionType;
  onClick: () => void;
};
export default function Transaction({ onClick, transaction }: PropsType) {
  const { completed, name, amount, index } = transaction;
  const hasDetails = !!(name || amount);

  return (
    <Root onClick={onClick}>
      <CheckCircle $isCompleted={completed}>
        {!completed && <LabelLarge>{index + 1}</LabelLarge>}
        {completed && <Check size={checkmarkSize} color="contentPrimary" />}
      </CheckCircle>
      <Details>
        {hasDetails && (
          <Card
            overrides={{
              Root: {
                style: {
                  height: "100%"
                }
              }
            }}
          >
            <StyledBody>
              <Label1>{name}</Label1>
              {amount && (
                <Label2 color="contentSecondary">
                  ${parseFloat(amount).toFixed(2)}
                </Label2>
              )}
            </StyledBody>
          </Card>
        )}
      </Details>
    </Root>
  );
}
const Root = styled("li", {
  display: "flex"
});
const checkmarkSize = "80px";

const CheckCircle = styled("div", ({ $theme, $isCompleted }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: checkmarkSize,
  height: checkmarkSize,
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: $isCompleted
    ? $theme.colors.positive
    : $theme.colors.backgroundSecondary,
  transition: `background-color ${transition.fast}`,
  ":hover": {
    backgroundColor: $isCompleted
      ? chroma($theme.colors.positive).brighten(1).hex()
      : $theme.colors.backgroundTertiary
  }
}));
const Details = styled("div", {
  flex: "1 0 auto",
  marginLeft: "16px"
});
