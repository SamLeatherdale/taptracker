import React from "react";
import chroma from "chroma-js";
import moment from "moment";
import { styled } from "baseui";
import { Check } from "baseui/icon";
import { Label1, Label2, Label3, LabelLarge } from "baseui/typography";
import { Card, StyledBody } from "baseui/card";
import { TransactionType } from "./types";
import { transition } from "./theme";

type PropsType = {
  transaction: TransactionType;
  onClick: () => void;
};
export default function Transaction({ onClick, transaction }: PropsType) {
  const { completed, date, name, amount, index } = transaction;
  const hasDetails = !!(name || amount);

  return (
    <Root onClick={onClick}>
      <CheckCircle $isCompleted={completed}>
        {!completed && <LabelLarge>{index + 1}</LabelLarge>}
        {completed && <Check size={checkmarkSize} color="contentPrimary" />}
      </CheckCircle>
      <Details $isVisible={hasDetails}>
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
            <TransactionGrid>
              <Label1>{name}</Label1>
              <Label3 $style={{ textAlign: "right" }} color="contentTertiary">
                {date && formatDate(date)}
              </Label3>
              <Label2 color="contentSecondary">
                {amount && `$${parseFloat(amount).toFixed(2)}`}
              </Label2>
            </TransactionGrid>
          </StyledBody>
        </Card>
      </Details>
    </Root>
  );
}

function formatDate(date: string) {
  return moment(date).format("DD/MM");
}
const Root = styled("li", {
  display: "flex"
});
const checkmarkSize = "80px";

const CheckCircle = styled<{ $isCompleted: boolean }, "div">(
  "div",
  ({ $theme, $isCompleted }) => ({
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
  })
);
const Details = styled<{ $isVisible: boolean }, "div">(
  "div",
  ({ $isVisible }) => ({
    display: $isVisible ? "block" : "none",
    flex: "1 0 auto",
    marginLeft: "16px"
  })
);
const TransactionGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignItems: "center",
  justifyContent: "space-between"
});
