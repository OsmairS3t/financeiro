import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@screens/Home';
import { SignIn } from '@screens/SignIn';
import { Balance } from '@screens/Balance';
import { ListBalance } from '@screens/ListBalance';
import { DetailCategory } from '@components/DetailCategory';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} />
            <Screen name='balance' component={Balance} />
            <Screen name='listbalance' component={ListBalance} />
            <Screen name='detailcategory' component={DetailCategory} />
            <Screen name='signin' component={SignIn} />
        </Navigator>
    )
}
