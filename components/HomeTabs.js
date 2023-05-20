import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./Customer";
import ListCustomer from "./ListCustomer";

const Tab = createBottomTabNavigator();

export default function HomeTabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen name='Customer' component={Customer}/>
            <Tab.Screen name='ListCustomer' component={ListCustomer}/>
        </Tab.Navigator>
    )
}