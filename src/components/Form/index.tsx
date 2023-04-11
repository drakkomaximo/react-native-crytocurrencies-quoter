/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import styles from './style';
import {Picker} from '@react-native-picker/picker';
import {nationalCurrenciesOptionsPicker} from './contants';
import axios from 'axios';
import {Optionstypes} from '../../../App';

export type Criptocurrencies = {
  CoinInfo: {
    FullName: string;
    Id: string;
    Name: string;
  };
};

export type FormProps = {
  money: string;
  criptocurrency: string;
  handleValue: ({value, type}: {value: string; type: Optionstypes}) => void;
};

const Form: FC<FormProps> = ({criptocurrency, handleValue, money}) => {
  const [criptocurrencies, setCriptocurrencies] = useState<Criptocurrencies[]>(
    [],
  );

  const handleQuotePrice = () => {
    if (money === '' || criptocurrency === '') {
      Alert.alert('Error...', 'All fields are required');
      return;
    }

    handleValue({value: 'true', type: 'apiFlag'});
  };

  useEffect(() => {
    const apiConsult = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);
      console.log(result.data.Data);
      setCriptocurrencies(result.data.Data);
    };
    apiConsult();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Money</Text>
      <Picker
        selectedValue={money}
        onValueChange={value => handleValue({value, type: 'money'})}>
        {nationalCurrenciesOptionsPicker.map(option => (
          <Picker.Item
            key={option.id}
            label={option.label}
            value={option.currency}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Criptocurrency</Text>
      <Picker
        selectedValue={criptocurrency}
        onValueChange={value => handleValue({value, type: 'currency'})}>
        <Picker.Item label={'- Seleccione -'} value={''} />
        {criptocurrencies.map(criptocurrencyOption => (
          <Picker.Item
            key={criptocurrencyOption.CoinInfo.Id}
            label={criptocurrencyOption.CoinInfo.FullName}
            value={criptocurrencyOption.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight style={styles.btnQuote} onPress={handleQuotePrice}>
        <Text style={styles.btnQuoteText}>Quote</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Form;
