import { mapValues } from 'lodash';

const sizes = {
	tablet: 768,
	phoneL: 600,
	phoneS: 400,
};
const min = mapValues(sizes, (size) => `@media screen and (min-width: ${size}px)`);
const max = mapValues(sizes, (size) => `@media screen and (max-width: ${size - 1}px)`);

export const media = {
	min,
	max,
	sizes,
};
export const transition = {
	fast: '0.4s',
};

export const contentPrimary = ({ $theme }: { $theme?: any }) => ({
	color: `${$theme.colors.contentPrimary} !important`,
});
