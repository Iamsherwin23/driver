
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ListBookingPage } from './ListBookingPage';
import { StartBookPage } from './StartBookPage';
import { StartMapBooking } from './StartMapBooking';
import { BookingNavigator } from './BookingNavigator';
const StackNav = createNativeStackNavigator();
export function BookingContainerPage({ triggerHomeLoadingTrue, triggerHomeLoadingFalse }) {
    return (
        <StackNav.Navigator initialRouteName='BookingNavigator'>

            <StackNav.Screen name='BookingNavigator' options={{ headerShown: false }}>
                {(props) => <BookingNavigator {...props}
                    triggerHomeLoadingTrue={triggerHomeLoadingTrue}
                    triggerHomeLoadingFalse={triggerHomeLoadingFalse}
                />}
            </StackNav.Screen>

            <StackNav.Screen name='StartBookPage' options={{ headerShown: false }}>
                {(props) => <StartBookPage {...props}
                    triggerHomeLoadingTrue={triggerHomeLoadingTrue}
                    triggerHomeLoadingFalse={triggerHomeLoadingFalse}
                />}
            </StackNav.Screen>

        </StackNav.Navigator>
    )
}