import React, { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { sendRequest } from "../../helpers/api";
import { ErrorBanner } from "../ErrorBanner";

interface PriceData {
  time: { updated: string };
  bpi: { [key: string]: { code: string; rate: string; description: string } };
}

type RateColor = "#6D8C00" | "#AA1803";

interface RateColors {
  [key: string]: RateColor;
}

const arrowTop = require('../../assets/icons/arrow-top.png');
const arrowBot = require('../../assets/icons/arrow-bot.png');

export const CurrentPrice = () => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [rateColors, setRateColors] = useState<RateColors>({});
  const [arrowImages, setArrowImages] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<string | null>(null);
  const previousRates = useRef<{ [key: string]: number }>({});
  const isInitialLoad = useRef(true);

  const getPriceData = async () => {
    const res = await sendRequest("/v1/bpi/currentprice.json");

    if (res.error) return setError(res.message || "Something went wrong. Please try again later.");

    const newPriceData = res as PriceData;

    setRateColors((prevColors) => {
      const newColors: RateColors = { ...prevColors };
      const newArrows = { ...arrowImages };

      Object.keys(newPriceData.bpi).forEach((currency) => {
        const currentRate = parseFloat(newPriceData.bpi[currency].rate.replace(',', ''));
        const prevRate = previousRates.current[currency];

        newColors[currency] = isInitialLoad.current
          ? "#6D8C00"
          : prevRate === undefined
          ? "#6D8C00"
          : currentRate > prevRate
          ? "#6D8C00"
          : currentRate < prevRate
          ? "#AA1803"
          : prevColors[currency];

        if (!isInitialLoad.current && prevRate !== undefined && currentRate !== prevRate) {
          newArrows[currency] = currentRate > prevRate ? arrowTop : arrowBot;
        }

        previousRates.current[currency] = currentRate;
      });

      setArrowImages(newArrows);
      return newColors;
    });

    setPriceData(newPriceData);
    isInitialLoad.current = false;
  };

  useEffect(() => {
    getPriceData();

    const interval = setInterval(getPriceData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.outerCont}>
      {priceData ? (
        <View style={{display: 'flex', flexDirection: 'column', gap: 15}}>
          <View style={styles.container}>
          <Image source={require('../../assets/images/bitcoin.png')} style={{height: 50, width: 50}}/>
          <View style={styles.priceCont}>
            {Object.keys(priceData.bpi).map((currency) => (
              <View key={currency} style={styles.priceString}>
                <Text style={styles.priceCurrency}>{currency}: </Text>
                <Text style={[styles.priceValue, { color: rateColors[currency] }]}>
                  {priceData.bpi[currency].rate}
                </Text>
                {arrowImages[currency] && (
                  <Image source={arrowImages[currency]} style={styles.arrowIcon} />
                )}
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.updateTime}>Last Updated: {priceData.time.updated}</Text>
        </View>
      ) : (
        <ErrorBanner text={error}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },

  priceCont: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  priceString: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3
  },

  priceCurrency: {
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    color: '#312528'
  },

  priceValue: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },

  arrowIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },

  updateTime: {
    color: '#58545B',
    fontSize: 12,
  },

  error: {
    color: '#AA1803'
  }
});
