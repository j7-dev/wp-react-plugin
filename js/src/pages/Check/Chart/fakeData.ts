const fakeData = [
	...new Array(12).fill(0).map((_, i) => ({
		month: `${i + 1}月`,
		value: Math.floor(Math.random() * 1000),
		type: '工廠1',
	})),
	...new Array(12).fill(0).map((_, i) => ({
		month: `${i + 1}月`,
		value: Math.floor(Math.random() * 1000),
		type: '工廠2',
	})),
	...new Array(12).fill(0).map((_, i) => ({
		month: `${i + 1}月`,
		value: Math.floor(Math.random() * 1000),
		type: '電力',
	})),
	...new Array(12).fill(0).map((_, i) => ({
		month: `${i + 1}月`,
		value: Math.floor(Math.random() * 1000),
		type: '瓦斯',
	})),
]

export default fakeData
