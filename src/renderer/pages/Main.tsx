import { Grid, GridItem } from '@chakra-ui/react';
import GiftList from 'renderer/components/GiftList';

const Main = () => {
  return (
    <Grid h="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem rowSpan={2} colSpan={2} overflowY="scroll">
        <GiftList />
      </GridItem>
      <GridItem colSpan={3} bg="papayawhip">
        some charts here
      </GridItem>
      <GridItem colSpan={3} bg="papayawhip">
        some charts here
      </GridItem>
    </Grid>
  );
};

export default Main;
