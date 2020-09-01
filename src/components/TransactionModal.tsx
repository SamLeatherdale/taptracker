import {styled} from "baseui";
import {KIND as ButtonKind} from "baseui/button";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import {Label2} from "baseui/typography/index";
import moment from "moment";
import React, {FormEvent} from "react";
import {contentPrimary} from "../theme";
import {TransactionType} from "../types";

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
        <ModalHeader>Transaction #{index + 1}
          <Label2Styled>All fields are optional</Label2Styled>
        </ModalHeader>
        <ModalBody>
          <FormRow>
            <div>
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
            </div>
            <div>
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
            </div>
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
            <ModalButton type="button" kind={ButtonKind.secondary} onClick={doDelete}>
              Delete
            </ModalButton>
          )}
          <ModalButton type="button" kind={ButtonKind.tertiary} onClick={doClose}>
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
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px"
});
const Label2Styled = styled(Label2, contentPrimary)