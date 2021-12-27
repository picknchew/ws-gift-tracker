import { XAxis, YAxis, Tooltip, Area, AreaChart, Line, ResponsiveContainer, ComposedChart, PieChart, Sector, Cell, Pie } from 'recharts';
import { GiftChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import { useState } from 'react';
import { useTheme } from '@chakra-ui/react';
import Result from '../Result';
import LoadingIndicator from '../LoadingIndicator';
import HeaderCard from '../HeaderCard';

interface ChartData {
  amount: number;
  occurrences: number;
}

const getDistributionData = (bonuses: Array<Referralv2>) => {
  const newData: Array<ChartData> = [];
  const amounts = new Map<number, number>();

  bonuses.forEach((bonus) => {
    const occurrences = amounts.get(bonus.payoutAmount) ?? 0;

    if (bonus.category === 'payment_gift') {
      amounts.set(bonus.payoutAmount, occurrences + 1);
    }
  });

  amounts.forEach((occurrences, amount) => {
    newData.push({ amount, occurrences });
  });

  return newData.sort((e1, e2) => e1.amount - e2.amount);
};

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: any;
  percent: number;
  value: any;
}) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${formatPayout(payload.amount)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${value} (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const GiftPieChart = ({ data, error, isLoading, isRefetching }: GiftChartProps) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const colors = [
    theme.colors.yellow[300],
    theme.colors.green[300],
    theme.colors.teal[300],
    theme.colors.blue[300],
    theme.colors.cyan[300],
    theme.colors.purple[300],
    theme.colors.pink[300],
  ];
  const distributionData = getDistributionData(data);

  if (isLoading || isRefetching) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (!data) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <HeaderCard header="Rolling Sum of Total Gift Earnings">
      <ResponsiveContainer>
        <PieChart
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={distributionData}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="60%"
            dataKey="occurrences"
            onMouseEnter={(_, index: number) => setActiveIndex(index)}
          >
            {distributionData.map((entry, index) => (
              <Cell key={`pie-chart-cell-${entry.amount}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </HeaderCard>
  );
};

export default GiftPieChart;
