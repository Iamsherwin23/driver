import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Constants } from '../constants/constants';
import { fonts } from '../utils/fonts';

const CustomDropdown = ({
    items = [],           // dropdown options
    value,                // selected value
    setValue,             // setter function from parent
    placeholder = 'Select an option',
    style,
    textStyle = {},
    ...props              // other props like disabled, searchable, etc.
}) => {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    const [open, setOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState(items);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={dropdownItems}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setDropdownItems}
            placeholder={placeholder}
            style={[style, { borderColor: 'transparent', elevation: 1, shadowOpacity: 1 }]}
            textStyle={{
                fontSize: Constants.SIZE.REGULAR,
                textAlign: 'center',
                fontFamily: 'Montserrat-Bold',
                ...textStyle
            }}
            dropDownContainerStyle={{
                borderRadius: 10
            }}
            zIndex={3000}
            {...props}
        />
    );
}

export { CustomDropdown };