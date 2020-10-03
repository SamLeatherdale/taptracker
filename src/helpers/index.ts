export function genericCompare<T>(a: T, b: T, reverse: boolean = false): number {
	if (a === b) {
		return 0;
	}
	const res = a > b ? 1 : -1;
	if (reverse) {
		return res * -1;
	}
	return res;
}
export function formatDateBrowser(m: moment.Moment) {
	return m.format('YYYY-MM-DD');
}
