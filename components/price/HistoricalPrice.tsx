// const res = await sendRequest("/v1/bpi/historical/close.json");

import { View } from "react-native"
import { Calendar } from "../Calendar"
import { useState } from "react"


export const HistoricalPrice = () => {
    const [selectDate, setSelectDate] = useState(new Date());

    const chooseDate = (date: Date) => {
        setSelectDate(date)
        // console.log(date)
    }

    return (
        <View>
            <View>
                <Calendar onDateChange={chooseDate}/>
            </View>
        </View>
    )
}