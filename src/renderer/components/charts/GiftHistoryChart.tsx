/* eslint-disable react/jsx-props-no-spreading */
import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, BarChart, Bar, Cell } from 'recharts';
import { Button, ButtonGroup, useTheme } from '@chakra-ui/react';
import { GiftChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import { useState } from 'react';
import Result from '../Result';
import HeaderCard from '../HeaderCard';

interface ChartData {
  index: number;
  timestamp: number;
  value: number;
  name: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload[0] && payload[0].value) {
    return (
      <div>
        <p>
          <b>{new Date(payload[0].payload?.timestamp).toLocaleString()}</b>
        </p>
        <p>{formatPayout(payload[0].value)}</p>
        <p>{payload[0].payload?.name}</p>
      </div>
    );
  }

  return null;
};

enum DateRange {
  Day,
  Week,
  Max,
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onRangeChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ dateRange, onRangeChange }: DateRangePickerProps) => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button onClick={() => onRangeChange(DateRange.Day)} isActive={dateRange === DateRange.Day}>
        1D
      </Button>
      <Button onClick={() => onRangeChange(DateRange.Week)} isActive={dateRange === DateRange.Week}>
        7D
      </Button>
      <Button onClick={() => onRangeChange(DateRange.Max)} isActive={dateRange === DateRange.Max}>
        Max
      </Button>
    </ButtonGroup>
  );
};

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

const getMaxIndexForRange = (data: Array<ChartData>, dateRange: DateRange) => {
  const now = new Date();
  let giftsAfter;

  switch (dateRange) {
    case DateRange.Day:
      giftsAfter = now.getTime() - 1 * DAY_IN_MILLIS;
      break;
    case DateRange.Week:
      giftsAfter = now.getTime() - 7 * DAY_IN_MILLIS;
      break;
    case DateRange.Max:
    default:
      giftsAfter = null;
  }

  if (!giftsAfter) {
    return data.length;
  }

  for (let i = 0; i < data.length; i += 1) {
    // bonuses is in descending order, so stop at first date that is not in range
    if (data[i].timestamp < giftsAfter) {
      return i - 1;
    }
  }

  // ascending order
  return data.length;
};

const getHistoricalData = (bonuses: Array<Referralv2>): Array<ChartData> => {
  const data = [];

  for (let i = 0; i < bonuses.length; i += 1) {
    const bonus = bonuses[i];

    if (bonus.category === 'payment_gift') {
      data.push({
        index: i,
        timestamp: new Date(bonus.payoutTriggeredAt).getTime(),
        value: bonus.payoutAmount,
        name: bonus.opposingUserProfile?.handle ?? 'unknown',
      });
    }
  }

  return data;
};

const GiftHistoryChart = ({ data, error, isLoading, isRefetching }: GiftChartProps) => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState(DateRange.Day);

  const gifts = getHistoricalData(data);
  const maxIndex = getMaxIndexForRange(gifts, dateRange);

  const getBarColor = (entry: ChartData) => {
    switch (entry.value) {
      case 10:
        return theme.colors.red[400];
      case 25:
        return theme.colors.yellow[400];
      case 50:
        return theme.colors.orange[400];
      case 100:
        return theme.colors.teal[400];
      case 200:
        return theme.colors.green[400];
      case 300:
        return theme.colors.blue[200];
      case 500:
        return theme.colors.purple[400];
      case 1000:
        return theme.colors.blue[400];
      default:
        return theme.colors.black;
    }
  };

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (maxIndex === -1) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <HeaderCard
      isLoading={isLoading || isRefetching}
      header="Gift Payout History"
      alignedRight={<DateRangePicker dateRange={dateRange} onRangeChange={setDateRange} />}
    >
      <ResponsiveContainer>
        <BarChart
          data={gifts}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis hide reversed dataKey="index" type="number" domain={[0, maxIndex]} allowDataOverflow />
          <YAxis hide dataKey="value" />

          <Bar dataKey="value" isAnimationActive={false}>
            {gifts.map((entry) => (
              <Cell key={entry.index} fill={getBarColor(entry)} />
            ))}
          </Bar>
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </HeaderCard>
  );
};

export default GiftHistoryChart;
