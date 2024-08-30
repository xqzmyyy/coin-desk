import React from "react";
import { Image, ImageSourcePropType, StyleProp, ImageStyle } from "react-native";

interface TabBarIconProps {
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ source, style }) => {
    return (
        <Image 
            source={source} 
            style={[{ width: 25, height: 25 }, style]} 
        />
    );
};
