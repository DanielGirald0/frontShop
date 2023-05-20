import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./Customer";
import ListCustomer from "./ListCustomer";
import {MaterialIcons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function HomeTabs(){
    return (
        <Tab.Navigator
            screenListeners={{
                headerShown:false,
                tabBarActiveBackgroudColor:'yellow'
            }}
        >
            <Tab.Screen name='Customer' component={Customer} options={{
                title:'Clientes',
                tabBarIcon: ()=>{<MaterialIcons name='person' color='red' size={25}/>}
                }}/>
            <Tab.Screen name='ListCustomer' component={ListCustomer} options={{
                title:'Listado clientes',
                tabBarIcon: ()=>{<MaterialIcons name='person' color='red' size={25}/>}
            }}/>
        </Tab.Navigator>
    )
}