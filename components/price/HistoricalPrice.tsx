import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Calendar } from "../Calendar";
import { useState, useEffect, useCallback } from "react";

const subtractDays = (date: any, days: any) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const HistoricalPrice = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(subtractDays(new Date(), 7));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [priceData, setPriceData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme() || 'light'; 
  const styles = createStyles(colorScheme); 

  const toUnixTime = (date: Date) => Math.floor(date.getTime() / 1000);

  const fetchHistoricalData = useCallback(async () => {
    const startTimestamp = toUnixTime(selectedStartDate);
    const endTimestamp = toUnixTime(selectedEndDate);

    const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}`;

    try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();

        setPriceData(data);
        setError(null);

        } catch (err) {
            setError(`Oops.. Error fetching data`);
        }
    }, [selectedStartDate, selectedEndDate]);

    useEffect(() => {
        fetchHistoricalData();
    }, [selectedEndDate, fetchHistoricalData]);

    const handleDateChange = (startDate: Date, endDate: Date) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
    };

    return (
        <View>
        <View style={styles.historicalContCalendar}>
            <Calendar onDateChange={handleDateChange} />
        </View>
        <View style={styles.historicalCont}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {priceData ? (
            <View style={styles.priceDataContainer}>
                <Text style={styles.priceDataTitle}>Price data:</Text>
                {priceData.prices.map(([timestamp, price]: [number, number], index: number) => (
                <View key={index} style={styles.historicalPricePlate}>
                    <Text style={styles.dateText}>{new Date(timestamp).toLocaleDateString()}</Text>
                    <Text style={styles.priceText}>${price.toFixed(2)}</Text>
                </View>
                ))}
            </View>
            ) : (
            <Text>No historical data for these days</Text>
            )}
        </View>
        </View>
    );
};

const createStyles = (colorScheme: string) =>
  StyleSheet.create({
    historicalContCalendar: {
      backgroundColor: colorScheme === 'dark' ? '#453C41' : '#B7A7AE',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      padding: 12,
    },
    
    historicalCont: {
      backgroundColor: colorScheme === 'dark' ? '#343236' : '#E1D5D9',
      padding: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },

    errorText: {
      color: colorScheme === 'dark' ? '#ff6666' : '#AA1803',
    },

    priceDataContainer: {
      width: '100%',
    },

    priceDataTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },

    historicalPricePlate: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 6,
      width: '100%',
      borderBottomWidth: 2,
      borderBottomColor: colorScheme === 'dark' ? '#666' : '#B7A7AE',
    },

    dateText: {
      flex: 1,
      color: colorScheme === 'dark' ? '#ddd' : '#58545B',
      fontSize: 16,
    },
    
    priceText: {
      textAlign: 'right',
      fontSize: 17,
      color: colorScheme === 'dark' ? '#ddd' : '#000',
    },
  });