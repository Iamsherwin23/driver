
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RegularSection } from './RegularSection.js';
import { TaripaSection } from '../TaripaSection.js';
import { MapSection } from '../MapSection.js';

const StackNav = createNativeStackNavigator();
export function RegularPage() {
    return (
            <StackNav.Navigator initialRouteName='RegularSection'>

                <StackNav.Screen name='RegularSection' options={{ headerShown: false }}>
                    {(props) => <RegularSection {...props} />}
                </StackNav.Screen>

                <StackNav.Screen name='TaripaSection' options={{ headerShown: false, animation: 'slide_from_bottom' }}>
                    {(props) => <TaripaSection {...props} routeName={'RegularSection'} />}
                </StackNav.Screen>

                <StackNav.Screen name='MapSection' options={{ headerShown: false, animation: 'slide_from_bottom' }}>
                    {(props) => <MapSection {...props} backRoute={'RegularSection'} isSpecialPage={false}/>}
                </StackNav.Screen>

            </StackNav.Navigator>
    )
}
