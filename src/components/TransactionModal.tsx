import { styled } from 'baseui';
import { KIND as ButtonKind } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal';
import { Label2 } from 'baseui/typography/index';
import moment from 'moment';
import React, { FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { formatDateBrowser } from '../helpers';
import { contentPrimary } from '../theme';
import { TransactionType } from '../types';

type PropsType = {
	startDate: moment.Moment;
	transaction?: Partial<TransactionType>;
	isOpen: boolean;
	index: number;
	onUpdate: (transaction: TransactionType) => void;
	onDone: (transaction?: TransactionType, remove?: boolean) => void;
};
export default function TransactionModal({
	startDate,
	transaction: currentTransaction = {},
	isOpen,
	onDone,
	onUpdate,
	index,
}: PropsType) {
	const transaction: TransactionType = {
		id: uuid(),
		date: new Date().toISOString(),
		completed: false,
		...currentTransaction,
	};
	const { name = '', amount = '', date, completed } = transaction;

	const doClose = () => onDone();
	const doSave = (e: FormEvent) => {
		// Don't submit the form
		e.preventDefault();

		onDone({
			...transaction,
			completed: true,
		});
	};
	const doDelete = () => {
		onDone(transaction, true);
	};
	// @ts-ignore
	return (
		<Modal isOpen={isOpen} closeable onClose={doClose} autoFocus={false}>
			<form onSubmit={doSave}>
				<ModalHeader>
					Transaction #{index + 1}
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
											name: (e.target as HTMLInputElement).value,
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
											amount: (e.target as HTMLInputElement).value,
										})
									}
								/>
							</FormControl>
						</div>
					</FormRow>
					<FormControl label="date">
						{/* @ts-ignore   Uber has wrong definition here*/}
						<Input
							value={formatDateBrowser(moment(date))}
							type="date"
							onChange={(e) =>
								onUpdate({
									...transaction,
									date: moment((e.target as HTMLInputElement).value).toISOString(),
								})
							}
							// @ts-ignore   Uber has wrong definition here
							min={formatDateBrowser(startDate)}
							max={formatDateBrowser(moment(startDate).add(1, 'month').subtract(1, 'day'))}
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
const FormRow = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '16px',
});
const Label2Styled = styled(Label2, contentPrimary);
