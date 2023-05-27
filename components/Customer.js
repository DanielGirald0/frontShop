import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles';
import axios from 'axios';
import { useState } from 'react';

export default function Customer() {
  const [isError, setIserror] = useState(false);
  const [message, setMessage] = useState('');
  const [idSearch, setIdsearch] = useState('')
  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSave = async (data) => {
    let nombre = data.firstName;
    let apellidos = data.lastName;
    const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
      nombre,
      apellidos
    });
    setIserror(false)
    setMessage("Cliente agregado correctamente ... ")
    setTimeout(() => {
      setMessage('')
    }, 2000)
    reset();
  };

  const onSearch = async() => {
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`);
    if (!response.data.error){ //encuentra idSearch
      setValue("firstName",response.data.nombre);
      setValue("lastName",response.data.apellidos);
      setMessage("");
      setIserror(false);
    }else{
      setIserror(true)
      setMessage("El id del cliente no existe, intente con otro...")
    }
  }

  const onUpdate = async (data) => {
    const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`, {
      nombre:data.firstName,
      apellidos:data.lastName,
    });
    setIserror(false)
    setMessage("Cliente actualizo correctamente ... ")
    setTimeout(() => {
      setMessage("")
    }, 2000)
    reset();
  };

  const onDelete = async(data) => {
    if (confirm(`Estas seguro de eliminar el cliente ${data.firstName} ${data.lastName}?`)){
      const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
      setIserror(false)
      setMessage("Cliente eliminado con exito")
      setTimeout(() => {
        setMessage("")
      }, 2000)
      reset()
    }
  }

  return (
    <View style={styles.container}>
      <Text>Actualización de Clientes</Text>
      <TextInput 
        label='Id cliente a buscar'
        mode='outlined'
        value={idSearch}
        onChangeText={idSearch => setIdsearch(idSearch) }
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            style={{ backgroundColor: 'powderblue' }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}
      <Text style={{ color: isError ? 'red' : 'green' }}>{message}</Text>
      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <Button
          icon="content-save"
          mode="contained" onPress={handleSubmit(onSave)}>
          Guardar
        </Button>
        <Button
          style={{ backgroundColor: 'orange', marginLeft: 10 }}
          icon="card-search-outline"
          mode="contained" 
          onPress={onSearch}
          >
          Buscar
        </Button>
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <Button
          icon="pencil-outline"
          mode="contained" 
          onPress={handleSubmit(onUpdate)}
          >
          Actualizar
        </Button>
        <Button
          style={{ backgroundColor: 'red', marginLeft: 10 }}
          icon="delete-outline"
          mode="contained" 
          onPress={handleSubmit(onDelete)}
          >
          Eliminar
        </Button>
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <Button
          icon="view-list"
          mode="contained" onPress={() => console.log('Pressed')}>
          Listar
        </Button>

      </View>
    </View>
  );
}