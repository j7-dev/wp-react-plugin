import type { TMonthlyDataType, TYearlyDataType } from './Table/types'

export const monthlyDataSource: TMonthlyDataType[] = new Array(12)
	.fill(0)
	.map((_, i) => ({
		// equipment: '工廠1',
		key: i + 1,
		month: i + 1,
		GreenhouseGasesTonsPerYear: Math.round(Math.random() * 1000),
		gpt: Math.round(Math.random() * 100) / 100,
		co2e: Math.round(Math.random() * 1000),
		CarbonTonsPerYear: Math.round(Math.random() * 1000),
	}))

export const defaultMonthlyData: TMonthlyDataType[] = new Array(12)
	.fill(0)
	.map((_, i) => ({
		key: i + 1,
		month: i + 1,
		GreenhouseGasesTonsPerYear: 0,
		gpt: 0,
		co2e: 0,
		CarbonTonsPerYear: 0,
	}))

export const yearlyDataSource: TYearlyDataType[] = [
	// {
	//   key: '0',
	//   equipment: '鍋爐(CO2)',
	//   gwp: 'co2',
	//   yearlyAmount: 1000,
	//   ar5: 1,
	//   co2e: 1000,
	//   carbonTonsPerYear: 1000,
	//   period: 'yearly',
	//   unit: 'kg'
	// },
	// {
	//   key: '1',
	//   equipment: '瓦斯爐(CO2)',
	//   gwp: 'ch4',
	//   yearlyAmount: 2000,
	//   ar5: 28,
	//   co2e: 56000,
	//   carbonTonsPerYear: 56000,
	//   period: 'yearly',
	//   unit: 'kg'
	// },
]
