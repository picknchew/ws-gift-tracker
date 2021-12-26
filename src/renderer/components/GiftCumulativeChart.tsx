import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Line, ResponsiveContainer, ComposedChart } from 'recharts';
import { GiftCumulativeChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import { Container, Heading } from '@chakra-ui/react';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

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

const GiftCumulativeChart = ({ data, error, isLoading, isRefetching }: GiftCumulativeChartProps) => {
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
    <>
      <Container p={1} centerContent>
        <Heading color="blue.50" size="sm">
          Rolling Sum of Total Gift Earnings
        </Heading>
      </Container>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={getRollingSumData(data)}
          margin={{
            top: 10,
            right: 0,
            left: 35,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(100, 244, 244)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="rgb(28, 31, 70)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis stroke="#EBF8FF" tick={false} dataKey="timestamp" />
          <YAxis stroke="#EBF8FF" tickFormatter={formatPayout} />
          <Tooltip formatter={formatPayout} />

          <Line type="monotone" strokeLinecap="round" strokeWidth={2} dataKey="amount" stroke="#006991" dot={false} legendType="none" tooltipType="none" />
          <Area type="monotone" dataKey="amount" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default GiftCumulativeChart;
