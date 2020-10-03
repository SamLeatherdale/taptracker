import React from 'react';
import { useSpring, animated } from 'react-spring/web';
import moment from 'moment';
import { styled } from 'baseui';
import { Check } from 'baseui/icon';
import { Label1, Label2, LabelLarge } from 'baseui/typography';
import { TransactionType } from '../types';
import { transition } from '../theme';

type PropsType = {
	transaction?: TransactionType;
	onClick: () => void;
	index: number;
};
export default function Transaction({ onClick, transaction, index }: PropsType) {
	const { completed = false, date, name, amount } = transaction || {};
	const props = useSpring({
		width: completed ? checkmarkSize : '0px',
		height: completed ? checkmarkSize : '0px',
		transform: completed ? 'rotate(0deg)' : 'rotate(180deg)',
	});
	const check = (
		<CheckCircle $isCompleted={completed} $isAnimating={true}>
			{!completed && <LabelLarge>{index + 1}</LabelLarge>}
			{completed && <Check size={checkmarkSize} color="contentPrimary" />}
		</CheckCircle>
	);
	let useCheck;
	if (completed) {
		useCheck = <animated.div style={completed ? props : {}}>{check}</animated.div>;
	} else {
		useCheck = check;
	}

	let title = '';
	if (name) {
		title = name;
	} else if (completed) {
		title = `Transaction #${index + 1}`;
	}

	return (
		<Root onClick={onClick}>
			<Details>
				<CheckWrap>{useCheck}</CheckWrap>
				<TransactionGrid>
					<Label1 $style={{ gridColumn: '1 / span 2' }}>{title}</Label1>
					<Label2 color="contentSecondary">{date && formatDate(date)}</Label2>
					<Label2 $style={{ textAlign: 'right' }} color="contentSecondary">
						{amount && `$${parseFloat(amount).toFixed(2)}`}
					</Label2>
				</TransactionGrid>
			</Details>
		</Root>
	);
}

function formatDate(date: string) {
	return moment(date).format('DD/MM');
}
const Root = styled('li', {
	display: 'flex',
});
const checkmarkSize = '60px';

const CheckWrap = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: checkmarkSize,
	height: checkmarkSize,
	marginRight: '16px',
	flexShrink: 0,
});
const CheckCircle = styled<{ $isCompleted: boolean; $isAnimating: boolean }, 'div'>(
	'div',
	({ $theme, $isCompleted, $isAnimating }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: $isAnimating ? '100%' : '80px',
		height: $isAnimating ? '100%' : '80px',
		flexShrink: 0,
		border: !$isCompleted ? `1px solid ${$theme.colors.contentPrimary}` : '',
		borderRadius: '50%',
		backgroundColor: $isCompleted ? $theme.colors.accent : $theme.colors.backgroundSecondary,
		transition: `background-color ${transition.fast}`,
		animationIterationCount: 'infinite',
		':hover': {
			backgroundColor: $isCompleted ? $theme.colors.accent300 : $theme.colors.backgroundTertiary,
		},
	})
);
const Details = styled('div', ({ $theme }) => ({
	display: 'flex',
	alignItems: 'stretch',
	flex: '1 0 auto',
	backgroundColor: $theme.colors.backgroundSecondary,
	padding: '16px',
	borderRadius: '8px',
}));
const TransactionGrid = styled('div', {
	display: 'grid',
	width: '100%',
	gridTemplateColumns: 'repeat(2, min-content)',
	alignItems: 'center',
	justifyContent: 'space-between',
});
