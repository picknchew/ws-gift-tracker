import { XAxis, YAxis, Tooltip, Area, Line, ResponsiveContainer, ComposedChart, TooltipProps } from 'recharts';
import { useTheme, useColorModeValue } from '@chakra-ui/react';
import { GiftChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import Result from '../Result';
import HeaderCard from '../HeaderCard';

interface ChartData {
  timestamp: Date;
  amount: number;
}

const getRollingSumData = (bonuses: Array<Referralv2>) => {
  const newData: Array<ChartData> = [];
  let rollingSum = 0;

  // iterate backwards because bonuses is sorted from newest to oldest
  for (let i = bonuses.length - 1; i >= 0; i -= 1) {
    const bonus = bonuses[i];
    if (bonus.category === 'payment_gift') {
      rollingSum += bonus.payoutAmount;

      newData.push({
        timestamp: new Date(bonus.payoutTriggeredAt),
        amount: rollingSum,
      });
    }
  }

  return newData;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload[0] && payload[0].value) {
    return (
      <div>
        <p>
          <b>{label.toLocaleString()}</b>
        </p>
        <p>{formatPayout(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const GiftCumulativeChart = ({ data, error, isLoading, isRefetching }: GiftChartProps) => {
  const theme = useTheme();
  const gradient1Color = useColorModeValue(theme.colors.green[500], theme.colors.green[400]);
  const gradient2Color = useColorModeValue('white', 'transparent');
  const rollingSumData = getRollingSumData(data);

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (!rollingSumData) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <HeaderCard isLoading={isLoading || isRefetching} header="Cumulative Sum of Gift Earnings">
      <ResponsiveContainer>
        <ComposedChart
          data={rollingSumData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor={gradient1Color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradient2Color} stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <XAxis hide dataKey="timestamp" />
          <YAxis hide dataKey="amount" />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            strokeLinecap="round"
            strokeWidth={2}
            dataKey="amount"
            stroke={theme.colors.green[500]}
            dot={false}
            legendType="none"
            tooltipType="none"
          />
          <Area type="monotone" dataKey="amount" strokeWidth={0} fillOpacity={1} fill="url(#gradient)" />
        </ComposedChart>
      </ResponsiveContainer>
    </HeaderCard>
  );
};

export default GiftCumulativeChart;
