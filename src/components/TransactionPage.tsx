import {HeadingSmall} from "baseui/typography/index";
import {Moment} from "moment";
import React, { useState } from "react";
import { styled } from "baseui";
import Transaction from "./Transaction";
import { TransactionType } from "../types";
import {contentPrimary, media} from "../theme";
import TransactionModal from "./TransactionModal";

type PropsType = {
  items: TransactionType[];
  updateItems: (t: TransactionType[]) => unknown;
  startDate: Moment;
};

const tapSound = new Audio(`${process.env.PUBLIC_URL}/pay-sound.mp3`);

export default function TransactionPage({ items, updateItems, startDate }: PropsType) {
  const [editItem, updateEditItem] = useState(-1);
  const [isEditing, updateIsEditing] = useState(false);
  const [editTransaction, updateEditTransaction] = useState<TransactionType>();

  const onClickItem = (i: number) => {
    updateIsEditing(true);
    updateEditItem(i);
    updateEditTransaction(items[i]);
  };
  const onUpdate = (t: TransactionType) => {
    updateEditTransaction(t);
  };
  const onSave = (t?: TransactionType, remove: boolean = false) => {
    updateIsEditing(false);
    if (!t) {
      return;
    }
    const newItems = [...items];
    newItems[t.index] = remove ? { index: t.index, completed: false } : t;
    updateItems(newItems);

    if (!remove) {
      paySoundVibrate();
    }
  };
  return (
    <Root>
      <StyledHeadingSmall>Transactions since {startDate.format("MMMM")}</StyledHeadingSmall>
      <List>
        {items.map((transaction, i) => (
          <Transaction
            key={i}
            transaction={transaction}
            onClick={() => onClickItem(i)}
          />
        ))}
      </List>
      <TransactionModal
        transaction={editTransaction}
        isOpen={isEditing}
        onDone={onSave}
        onUpdate={onUpdate}
        index={editItem}
      />
    </Root>
  );
}

function paySoundVibrate() {
  tapSound.play();
  window.navigator.vibrate(300);
}

const StyledHeadingSmall = styled(HeadingSmall, ({ $theme }) => {
  return {
    ...contentPrimary({ $theme }),
    textAlign: "center"
  }
})
const Root = styled("div", {
  width: "100%"
});
const List = styled("ol", {
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  width: "100%",
  maxWidth: "60%",
  padding: 0,
  listStyle: "none",
  gap: "16px",
  [media.max.tablet]: {
    maxWidth: "80%"
  }
});
