import { View, Text } from 'react-native'
import { styles } from '../assets/styles/styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { FlatList } from 'react-native-web'


export default function ListCustomer() {
    const [data, setData] = useState([]);

    const getCustomers = async () => {
        const response = await axios.get(`http://127.0.0.1:3000/api/clientes`)
        setData(response.data)
        console.log(data)
    }

    useEffect(() => {

    })


    return (
        <View style={styles.container}>
            <Button
                style={{ backgroundColor: 'red', marginLeft: 10, marginBottom: 10 }}
                icon="view-list"
                mode="contained"
                onPress={getCustomers}
            >
                Listar Clientes
            </Button>
            <Text>Listado de clientes</Text>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Text style={{
                        backgroundColor: 'gray',
                        borderRadius: 10,
                        padding: 10,
                        textAlign: 'center',
                        marginTop: 5
                    }}
                    >
                        {item.nombre} {item.apellido}
                    </Text>

                }
            >

            </FlatList>
        </View>
    )
}