/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {FinalResult} from '../../../App';

export type QuoteProps = {
  finalResult: FinalResult;
};

const Quote: FC<QuoteProps> = ({finalResult}) => {
  return (
    <View style={styles.result}>
      <Text style={[styles.text, styles.price]}>
        Current Price
      </Text>
      <Text style={[styles.text, styles.price]}>
        <Text style={styles.span}>{finalResult.PRICE}</Text>
      </Text>
      <Text style={styles.text}>
        Highest price of the day:{' '}
        <Text style={styles.span}>{finalResult.HIGHDAY}</Text>
      </Text>
      <Text style={styles.text}>
        Lowest price of the day:{' '}
        <Text style={styles.span}>{finalResult.LOWDAY}</Text>
      </Text>
      <Text style={styles.text}>
        Variation last 24 hours:{' '}
        <Text style={styles.span}>
          {finalResult.CHANGEPCT24HOUR} %
        </Text>
      </Text>
      <Text style={styles.text}>
        Last update:{' '}
        <Text style={styles.span}>
          {finalResult && finalResult.LASTUPDATE}
        </Text>
      </Text>
    </View>
  );
};

export default Quote;
