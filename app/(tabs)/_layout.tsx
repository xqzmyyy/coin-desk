import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: () => {
            return <TabBarIcon source={require('../../assets/icons/chart.png')}/>
          }
        }}
      />
      <Tabs.Screen
          name='price'
          options={{
            title: 'Price',
            tabBarIcon: () => {
              return <TabBarIcon source={require('../../assets/icons/price.png')}/>
            }
          }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: () => {
            return <TabBarIcon source={require('../../assets/icons/account.png')}/>
          }
        }}
      />
    </Tabs>
  )
}
