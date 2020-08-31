import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
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
    date: new Date(),
    index,
    ...currentTransaction,
    completed: true
  };
  const { name = "", amount = 0 } = transaction;

  const doClose = () => onDone();
  const doSave = () => {
    onDone(transaction);
  };
  const doDelete = () => {
    onDone(transaction, true);
  };
  return (
    <Modal isOpen={isOpen} closeable onClose={doClose}>
      <ModalHeader>Transaction #{index + 1}</ModalHeader>
      <ModalBody>
        <FormControl label="name (optional)">
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
        <FormControl label="amount (optional)">
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
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={doClose}>
          Cancel
        </ModalButton>
        <ModalButton kind={ButtonKind.secondary} onClick={doDelete}>
          Delete
        </ModalButton>
        <ModalButton onClick={doSave}>Save</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
TransactionModal.defaultProps = {
  transaction: {}
};
