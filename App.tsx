import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from './src/services/api';
import axios from 'axios';

export default function buscadorCEP() {

  const [CEP, setCEP] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [UF, setUF] = useState('')
  const [hora, setHora] = useState('')


  async function buscarCEP() {
    if (CEP === '') {
      Alert.alert('CEP inválido!')
      setCEP('')
    }
    else {
      try {
        const response = await api.get(`/${CEP}/json/`)
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setLocalidade(response.data.localidade)
        setUF(response.data.uf)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  const inserirEndereco = async () => {
    console.log("AAAAAAAAAAAAAAAAAAA")
    try {
      const response = await fetch("http://10.0.2.2:3001/enderecos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logradouro: logradouro,
          bairro: bairro,
          localidade: localidade,
          UF: UF,
        }),
      });
      const data = await response.json();
      Alert.alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(); // Obtém a hora atual no formato desejado
      setHora(timeString);
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
        <Text style={styles.timeText}>{hora}</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput value={CEP} onChangeText={(txt) => setCEP(txt)} placeholder='Digite seu CEP' onBlur={buscarCEP}
          style={{
            borderColor: 'black', borderWidth: 2, width: 200,
            fontSize: 18,
            marginTop: 20,
            marginEnd: 20,
            borderRadius: 10

          }}
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={inserirEndereco}>
          <Text style={styles.textoBotao}>GRAVAR</Text>
        </TouchableOpacity>
      </View>


      <TextInput value={logradouro} onChangeText={(txt) => setLogradouro(txt)} placeholder='Logradouro'
        style={styles.campos}
      />
      <TextInput value={bairro} onChangeText={(txt) => setBairro(txt)} placeholder='Bairro'
        style={styles.campos}
      />
      <TextInput value={localidade} onChangeText={(txt) => setLocalidade(txt)} placeholder='Cidade'
        style={styles.campos}
      />
      <TextInput value={UF} onChangeText={(txt) => setUF(txt)} placeholder='Estado'
        style={styles.campos}
      />

    </View>
  );
}



const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column'
  },
  topBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#006ba8'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },
  containerCep: {
    flexDirection: 'row',
    height: 90,
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: '#006ba8',
    width: 120,
    height: 70,
    marginTop: 20,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  campos: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white'
  },
})
