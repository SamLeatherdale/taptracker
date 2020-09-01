import React, { FormEvent } from "react";
import moment from "moment";
import { styled } from "baseui";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { TransactionType } from "./types";

type PropsType = {
  transaction?: TransactionType;
  isOpen: boolean;
  index: number;
  onUpdate: (transaction: TransactionType) => void;
  onDone: (transaction?: TransactionType, remove?: boolean) => void;
};
export default function TransactionModal({
  transaction: currentTransaction,
  isOpen,
  onDone,
  onUpdate,
  index
}: PropsType) {
  const transaction: TransactionType = {
    date: new Date().toISOString(),
    index,
    completed: false,
    ...currentTransaction
  };
  const { name = "", amount = "", date, completed } = transaction;

  const doClose = () => onDone();
  const doSave = (e: FormEvent) => {
    // Don't submit the form
    e.preventDefault();

    onDone({
      ...transaction,
      completed: true
    });
  };
  const doDelete = () => {
    onDone(transaction, true);
  };
  return (
    <Modal isOpen={isOpen} closeable onClose={doClose}>
      <form onSubmit={doSave}>
        <ModalHeader>Transaction #{index + 1}</ModalHeader>
        <ModalBody>
          <FormRow>
            <FormControl label="name">
              <Input
                value={name}
                onChange={(e) =>
                  onUpdate({
                    ...transaction,
                    name: (e.target as HTMLInputElement).value
                  })
                }
              />
            </FormControl>
            <FormControl label="$">
              <Input
                value={amount}
                type="number"
                onChange={(e) =>
                  onUpdate({
                    ...transaction,
                    amount: (e.target as HTMLInputElement).value
                  })
                }
              />
            </FormControl>
          </FormRow>
          <FormControl label="date">
            <Input
              value={moment(date).format("YYYY-MM-DD")}
              type="date"
              onChange={(e) =>
                onUpdate({
                  ...transaction,
                  date: moment(
                    (e.target as HTMLInputElement).value
                  ).toISOString()
                })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {completed && (
            <ModalButton kind={ButtonKind.secondary} onClick={doDelete}>
              Delete
            </ModalButton>
          )}
          <ModalButton kind={ButtonKind.tertiary} onClick={doClose}>
            Cancel
          </ModalButton>
          <ModalButton type="submit">Save</ModalButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
TransactionModal.defaultProps = {
  transaction: {}
};
const FormRow = styled("div", {
  //display: "flex",
  //alignItems: "center"
});
