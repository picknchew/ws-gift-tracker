/* eslint-disable react/jsx-props-no-spreading */
import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, BarChart, Bar, Cell } from 'recharts';
import { Button, ButtonGroup, useTheme } from '@chakra-ui/react';
import { GiftChartProps, Referralv2, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import { useState, useEffect, useRef } from 'react';
import Result from '../Result';
import LoadingIndicator from '../LoadingIndicator';
import HeaderCard from '../HeaderCard';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload[0] && payload[0].value) {
    return (
      <div>
        <p>
          <b>{new Date(label).toLocaleString()}</b>
        </p>
        <p>{formatPayout(payload[0].value)}</p>
        <p>{payload[0].payload?.opposingUserProfile?.handle}</p>
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
    <ButtonGroup pr={2} pt={2} pb={2} size="sm" isAttached variant="outline">
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

const filterGiftsForRange = (bonuses: Array<Referralv2>, dateRange: DateRange) => {
  const now = new Date();
  let giftsAfter;

  switch (dateRange) {
    case DateRange.Day:
      giftsAfter = new Date(now.getTime() - 1 * DAY_IN_MILLIS);
      break;
    case DateRange.Week:
      giftsAfter = new Date(now.getTime() - 7 * DAY_IN_MILLIS);
      break;
    case DateRange.Max:
    default:
      giftsAfter = null;
  }

  if (!giftsAfter) {
    return bonuses.filter((bonus) => bonus.category === 'payment_gift').reverse();
  }

  const gifts = [];

  for (let i = 0; i < bonuses.length; i += 1) {
    const bonus = bonuses[i];

    // bonuses is in descending order, so stop at first date that is not in range
    if (new Date(bonus.payoutTriggeredAt) < giftsAfter) {
      return gifts.reverse();
    }

    if (bonus.category === 'payment_gift') {
      gifts.push(bonus);
    }
  }

  // ascending order
  return gifts.reverse();
};

const GiftHistoryChart = ({ data, error, isLoading, isRefetching }: GiftChartProps) => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState(DateRange.Day);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hack, setHack] = useState<boolean>(false); // to force re render
  const cachedDateRanges = useRef<Array<Array<Referralv2>>>([[], [], []]);

  // cache date range data
  useEffect(() => {
    if (data?.length > 0) {
      if (cachedDateRanges.current[dateRange].length === 0) {
        cachedDateRanges.current[dateRange] = filterGiftsForRange(data, dateRange);
        // force a re-render whenever cachedDateRanges changes
        setHack((state) => !state);
      }
    }
  }, [data, dateRange]);

  const getBarColor = (entry: Referralv2) => {
    switch (entry.payoutAmount) {
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

  if (isLoading || isRefetching) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (cachedDateRanges.current[DateRange.Day]?.length === 0) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <HeaderCard header="Gift Payout History" alignedRight={<DateRangePicker dateRange={dateRange} onRangeChange={setDateRange} />}>
      <ResponsiveContainer>
        <BarChart
          data={cachedDateRanges.current[dateRange]}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis hide dataKey="payoutTriggeredAt" />
          <YAxis hide dataKey="payoutAmount" />

          <Bar dataKey="payoutAmount" isAnimationActive={false}>
            {cachedDateRanges.current[dateRange]?.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </HeaderCard>
  );
};

export default GiftHistoryChart;
