import { DonoughtDetails } from "./DonoughtDetails/DonoughtDetails";

export const gradientStops = DonoughtDetails.map((item, index) => {
  const start = DonoughtDetails.slice(0, index).reduce(
    (acc, cur) => acc + cur.percentage,
    0
  );
  const end = start + item.percentage;
  return `${item.color} ${start}% ${end}%`;
});
