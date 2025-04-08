export const formatBalance = (balance: number): string => {
	return `$${balance.toLocaleString()}`;
};

export const formatDate = (date: Date): string => {
	const toISODate = date.toISOString();
	return `${toISODate.slice(0, 10)}`;
};

export const formatTitleDate = (date: Date): string => {
	return `${date.toLocaleString()}`;
};
