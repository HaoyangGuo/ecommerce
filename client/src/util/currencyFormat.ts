const currencyFormat = (value: number) => {
	return "$" + (value / 100).toFixed(2);
};

export default currencyFormat;
