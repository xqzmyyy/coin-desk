import { Colors } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, useColorScheme } from 'react-native';

interface CalendarProps {
  onDateChange: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  onDateChange,
  initialStartDate = new Date(),
  initialEndDate = new Date()
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(
    initialEndDate > initialStartDate ? initialEndDate : new Date(initialStartDate.getTime() + 86400000)
  );

  const colorScheme = useColorScheme() || 'light'

  useEffect(() => {
    onDateChange(startDate, endDate);
  }, [startDate, endDate]);

  const chooseStartDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    
    const nextDay = new Date(currentDate.getTime() + 86400000);
    setEndDate(nextDay);
  };

  const chooseEndDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    
    if (currentDate >= startDate) return setEndDate(currentDate);

    const nextDay = new Date(startDate.getTime() + 86400000);
    setEndDate(nextDay);
    
  };

  return (
    <View style={styles.calendar}>
        <View style={styles.dateString}>
            <Text style={[styles.dateStringText, {color: Colors[colorScheme].text}]}>From:</Text>
            <Image 
                source={require('../assets/icons/calendar.png')} 
                style={{width: 24, height: 24}}
            />
            <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={chooseStartDate}
            />
        </View>
        <View style={styles.dateString}>
            <Text style={[styles.dateStringText, {color: Colors[colorScheme].text}]}>To:</Text>
            <Image 
                source={require('../assets/icons/calendar.png')} 
                style={{width: 24, height: 24}}
            />
            <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={chooseEndDate}
                minimumDate={new Date(startDate.getTime() + 86400000)}
            />
        </View> 
    </View>
  );
};

const styles = StyleSheet.create({
    calendar: {
        flexDirection: 'column',
        gap: 8,
        width: '100%',
    },
 
    dateString: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    dateStringText: {
        fontSize: 18,
        marginRight: 8
    }
});