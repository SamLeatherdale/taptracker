import {HeadingMedium} from "baseui/typography/index";
import React from "react";
import { useSpring, animated } from "react-spring/web";
import moment from "moment";
import { styled } from "baseui";
import { Check } from "baseui/icon";
import { Label1, Label2, LabelLarge } from "baseui/typography";
import { TransactionType } from "../types";
import { transition } from "../theme";

type PropsType = {
  transaction: TransactionType;
  onClick: () => void;
};
export default function Transaction({ onClick, transaction }: PropsType) {
    const { completed, date, name, amount, index } = transaction;
    const props = useSpring({
        width: completed ? checkmarkSize : '0px',
        height: completed ? checkmarkSize : '0px',
        transform: completed ?  'rotate(0deg)' : 'rotate(180deg)',
    });
  const hasDetails = !!(name || amount);
    const check = (
        <CheckCircle $isCompleted={completed} $isAnimating={true}>
        {!completed && <LabelLarge>{index + 1}</LabelLarge>}
        {completed && <Check size={checkmarkSize} color="contentPrimary" />}
    </CheckCircle>
    );
  let useCheck;
  if (completed) {
     useCheck = (<animated.div style={completed ? props : {}}>
         {check}
      </animated.div>)
  } else {
      useCheck = check;
  }

  return (
    <Root onClick={onClick}>
        <CheckWrap>
            {useCheck}
        </CheckWrap>
      <Details $isVisible={hasDetails}>
            <TransactionGrid>
                <HeadingMedium $style={{ margin: 0, gridRow: "1 / span 2" }} color="contentTertiary">
                    {date && formatDate(date)}
                </HeadingMedium>
              <Label1 $style={{ textAlign: "right"}}>{name}</Label1>
              <Label2 $style={{ textAlign: "right"}} color="contentSecondary">
                {amount && `$${parseFloat(amount).toFixed(2)}`}
              </Label2>
            </TransactionGrid>
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

const CheckWrap = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: checkmarkSize,
    height: checkmarkSize
})
const CheckCircle = styled<{ $isCompleted: boolean; $isAnimating: boolean }, "div">(
  "div",
  ({ $theme, $isCompleted, $isAnimating }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: $isAnimating ? '100%' : '80px',
    height: $isAnimating ? '100%' : '80px',
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: $isCompleted
      ? $theme.colors.accent
      : $theme.colors.backgroundSecondary,
    transition: `background-color ${transition.fast}`,
      // animationDuration: "2s",
      // animationName: $isAnimating ? ({
      //     from: {
      //         width: 0,
      //         height: 0
      //     },
      //     to: {
      //         width: checkmarkSize,
      //         height: checkmarkSize,
      //     },
      // } as unknown as string) : undefined, // csstype is incorrect here
      // animationFillMode: "both",
      // animationPlayState: $isAnimating ? 'running' : 'paused',
      animationIterationCount: 'infinite',
    ":hover": {
      backgroundColor: $isCompleted
        ? $theme.colors.accent300
        : $theme.colors.backgroundTertiary
    }
  })
);
const Details = styled<{ $isVisible: boolean }, "div">(
  "div",
  ({ $isVisible, $theme }) => ({
    // display: $isVisible ? "block" : "none",
      display: "flex",
      alignItems: "stretch",
    flex: "1 0 auto",
    marginLeft: "16px",
      backgroundColor: $theme.colors.backgroundSecondary,
      padding: "16px",
      borderRadius: "8px",
  })
);
const TransactionGrid = styled("div", {
  display: "grid",
    width: "100%",
  gridTemplateColumns: "repeat(2, min-content)",
  alignItems: "center",
  justifyContent: "space-between"
});
