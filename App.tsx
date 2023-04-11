import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/components/Header';
import Form from './src/components/Form';
import axios from 'axios';
import Quote from './src/components/Quote';

export type Optionstypes = 'money' | 'currency' | 'apiFlag';

export type FinalResult = {
  PRICE: string;
  HIGHDAY: string;
  LOWDAY: string;
  CHANGEPCT24HOUR: string;
  LASTUPDATE: string;
};

function App(): JSX.Element {
  const [money, setMoney] = useState('');
  const [criptocurrency, setCriptocurrency] = useState('');
  const [isApiCorrect, setIsApiCorrect] = useState(false);
  const [finalResult, setFinalResult] = useState<FinalResult>();
  const [isLoading, setIsLoading] = useState(false);

  const handleValue = ({value, type}: {value: string; type: Optionstypes}) => {
    switch (type) {
      case 'money':
        setMoney(value);
        break;
      case 'currency':
        setCriptocurrency(value);
        break;
      case 'apiFlag':
        setIsApiCorrect(Boolean(value));
        break;

      default:
        Alert.alert('Error...', 'Type is invalid');
        break;
    }
  };

  useEffect(() => {
    const QuoteCrytocurrency = async () => {
      if (isApiCorrect) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocurrency}&tsyms=${money}`;
        const result = await axios.get(url);
        setIsLoading(true);

        setTimeout(() => {
          setFinalResult(result.data.DISPLAY[criptocurrency][money]);
          setIsApiCorrect(false);
          setIsLoading(false);
        }, 1000);
      }
    };
    QuoteCrytocurrency();
  }, [isApiCorrect, criptocurrency, money]);

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.container}>
        <Form
          money={money}
          criptocurrency={criptocurrency}
          handleValue={handleValue}
        />
      </View>
      <View style={[isLoading && styles.spinnerContainer]}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'#5E49E2'} />
        ) : (
          finalResult && <Quote finalResult={finalResult} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  container: {
    marginHorizontal: '2.5%',
  },
  spinnerContainer: {
    marginTop: 40,
  },
});

export default App;
