
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SpecialSectionPage from './SpecialSection.js';
import { MapSection } from '../MapSection.js';
import { TaripaSection } from '../TaripaSection.js';

const StackNav = createNativeStackNavigator();
export function SpecialPage() {
    return (
            <StackNav.Navigator initialRouteName='SpecialSection'>

                <StackNav.Screen name='SpecialSection' options={{ headerShown: false }}>
                    {(props) => <SpecialSectionPage {...props} />}
                </StackNav.Screen>

                <StackNav.Screen name='MapSection' options={{ headerShown: false }}>
                    {(props) => <MapSection {...props} backRoute={'SpecialSection'} isSpecialPage={true}/>}
                </StackNav.Screen>

                <StackNav.Screen name='TaripaSection' options={{ headerShown: false }}>
                    {(props) => <TaripaSection {...props} routeName={'SpecialSection'} />}
                </StackNav.Screen>

            </StackNav.Navigator>
    )
}