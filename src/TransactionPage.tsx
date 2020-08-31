import React, { useState } from "react";
import { styled } from "styletron-react";
import colors from "material-colors";
import Transaction from "./Transaction";
import { TransactionType } from "./types";
import { media } from "./theme";
import TransactionModal from "./TransactionModal";

type PropsType = {
  items: TransactionType[];
  updateItems: (t: TransactionType[]) => unknown;
};
export default function TransactionPage({ items, updateItems }: PropsType) {
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
  };
  return (
    <Root>
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
