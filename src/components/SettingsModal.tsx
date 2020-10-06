import { styled } from 'baseui';
import { Button, KIND as ButtonKind } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal';
import React, { FormEvent, useState } from 'react';
import { SettingsType } from '../types';

type PropsType = {
	settings: SettingsType;
	isOpen: boolean;
	onSave: (settings: SettingsType) => void;
	onCancel: () => void;
	onClearTransactions: () => void;
};
export default function SettingsModal({
	settings,
	isOpen,
	onSave,
	onCancel,
	onClearTransactions,
}: PropsType) {
	const [rolloverDay, setRolloverDay] = useState(settings.rolloverDay.toString());
	const [transactionCount, setTransactionCount] = useState(settings.transactionCount.toString());
	const doClose = () => onCancel();
	const doSave = (e: FormEvent) => {
		// Don't submit the form
		e.preventDefault();

		const iRolloverDay = parseInt(rolloverDay);
		const iTransactionCount = parseInt(transactionCount);

		const checkNan = [iRolloverDay, iTransactionCount];
		if (checkNan.some((n) => isNaN(n))) {
			return false;
		}

		onSave({
			rolloverDay: iRolloverDay,
			transactionCount: iTransactionCount,
		});
	};

	return (
		<Modal isOpen={isOpen} closeable onClose={doClose} autoFocus={false}>
			<form onSubmit={doSave}>
				<ModalHeader>Settings</ModalHeader>
				<ModalBody>
					<FormRow>
						<div>
							<FormControl label="Rollover day (1-31)">
								<Input
									type="number"
									value={rolloverDay}
									onChange={(e) => setRolloverDay((e.target as HTMLInputElement).value)}
									min={1}
									max={31}
								/>
							</FormControl>
						</div>
						<div>
							<FormControl label="Transaction count">
								<Input
									type="number"
									value={transactionCount}
									onChange={(e) => setTransactionCount((e.target as HTMLInputElement).value)}
									min={1}
									max={100}
								/>
							</FormControl>
						</div>
					</FormRow>
					<Button
						onClick={onClearTransactions}
						overrides={{
							BaseButton: {
								style: ({ $theme }) => {
									return {
										outline: `${$theme.colors.negative} solid`,
										backgroundColor: $theme.colors.negative,
										color: $theme.colors.contentPrimary,
										width: '100%',
										':hover': {
											color: $theme.colors.negative,
										},
									};
								},
							},
						}}
					>
						Clear Transactions
					</Button>
				</ModalBody>
				<ModalFooter>
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
