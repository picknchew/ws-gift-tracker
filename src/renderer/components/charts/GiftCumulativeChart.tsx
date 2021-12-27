import { XAxis, YAxis, Tooltip, Area, Line, ResponsiveContainer, ComposedChart, TooltipProps, Text } from 'recharts';
import { GiftChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import { Box, Heading } from '@chakra-ui/react';
import Result from '../Result';
import LoadingIndicator from '../LoadingIndicator';
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
      <Box>
        <Heading size="xs">{label.toLocaleString()}</Heading>
        <Text fontSize="xs">{formatPayout(payload[0].value)}</Text>
      </Box>
    );
  }

  return null;
};

const GiftCumulativeChart = ({ data, error, isLoading, isRefetching }: GiftChartProps) => {
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
        <ComposedChart
          data={getRollingSumData(data)}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cf7b" />
              <stop offset="100%" stopColor="#cae9c8" />
            </linearGradient>
          </defs>

          <XAxis hide dataKey="timestamp" />
          <YAxis hide dataKey="amount" />
          <Tooltip content={<CustomTooltip />} />

          <Line type="monotone" strokeLinecap="round" strokeWidth={5} dataKey="amount" stroke="#84cf7b" dot={false} legendType="none" tooltipType="none" />
          <Area type="monotone" dataKey="amount" strokeWidth={0} fillOpacity={1} fill="url(#gradient)" />
        </ComposedChart>
      </ResponsiveContainer>
    </HeaderCard>
  );
};

export default GiftCumulativeChart;
