import {styled} from "baseui";
import {Tag} from "baseui/tag";
import {Label2} from "baseui/typography";
import React from "react";
import moment from "moment";

type PropsType = {
    finishDate: moment.Moment;
    isCompleted: boolean;
}
export default function TimeLeft({ finishDate, isCompleted }: PropsType) {
    const today = moment();
    const daysLeft = finishDate.diff(today, "days");

    return (
        <Root>
            <Tag closeable={false} kind={getLabelKind(daysLeft, isCompleted)}>{daysLeft} days left</Tag>
            <Label2>- resets {finishDate.format("MMM Do")}</Label2>
        </Root>
    )
}
function getLabelKind(daysLeft: number, isCompleted: boolean) {
    if (isCompleted) {
        return "accent";
    }
    if (daysLeft >= 15) {
        return "positive";
    }
    if (daysLeft >= 7) {
        return "warning";
    }
    return "negative";
}
const Root = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "16px 0"
});