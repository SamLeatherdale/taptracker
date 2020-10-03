import {HeadingSmall} from "baseui/typography/index";
import {Moment} from "moment";
import React, { useState } from "react";
import { styled } from "baseui";
import moment from "moment";
import { pickBy } from "lodash";
import {genericCompare} from "../helpers";
import TimeLeft from "./TimeLeft";
import Transaction from "./Transaction";
import {TransactionList, TransactionType} from "../types";
import {contentPrimary, media} from "../theme";
import TransactionModal from "./TransactionModal";

type PropsType = {
  numItems: number;
  items: TransactionList;
  updateItems: (t: TransactionList) => unknown;
  startDate: Moment;
};

const tapSound = new Audio(`${process.env.PUBLIC_URL}/pay-sound.mp3`);

export default function TransactionPage({ numItems, items, updateItems, startDate }: PropsType) {
  const [editItem, updateEditItem] = useState(-1);
  const [isEditing, updateIsEditing] = useState(false);
  const [editTransaction, updateEditTransaction] = useState<TransactionType>();
  const itemList = Array.from(Object.values(items));

  const onClickItem = (i: number) => {
    const item = renderItems[i] || undefined;
    updateIsEditing(true);
    updateEditItem(itemList.length);
    updateEditTransaction(item);
  };
  const onUpdate = (txn: TransactionType) => {
    updateEditTransaction(txn);
  };
  const onSave = (txn?: TransactionType, remove: boolean = false) => {
    updateIsEditing(false);
    if (!txn) {
      return;
    }

    let newItems: TransactionList;
    if (remove) {
      newItems = pickBy(items, t => txn.id !== t.id)
    } else {
      newItems = {
        ...items,
        [txn.id]: txn
      }
    }
    updateItems(newItems);

    if (!remove) {
      paySoundVibrate();
    }
  };
  const renderItems: Array<TransactionType | undefined> = [];
  const sortedItems = [...itemList].sort((a, b) => genericCompare(a.date, b.date));
  for (let i = 0; i < numItems; i++) {
    renderItems[i] = sortedItems[i] || undefined;
  }

  return (
    <Root>
      <TimeLeft finishDate={moment(startDate).add(1, 'month')} isCompleted={itemList.length === numItems} />
      <List>
        {renderItems.map((transaction, i) => (
          <Transaction
            key={i}
            index={i}
            transaction={transaction}
            onClick={() => onClickItem(i)}
          />
        ))}
      </List>
      <TransactionModal
          startDate={startDate}
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
