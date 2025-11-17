import { months } from "./GraphChartData";

export const data = months.map((month) => month.value);
export const maxValue = Math.max(...data);
export const chartHeight = 300;
export const barWidth = 20;
export const barSpacing = 60;
export const chartWidth = data.length * barSpacing;
