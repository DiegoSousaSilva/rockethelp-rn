import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {VStack} from 'native-base';
import {Header} from '../components/Header';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';

export function Register() {
  const [isloading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'RocketHelp Diego',
      body: 'Teste de notificação',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      Alert.alert('Registrar', 'Preencha todos os campos');
    }
    setIsLoading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso!');
        onDisplayNotification();
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          'Solicitação',
          'Não foi possível registrar o pedido',
        );
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        onChangeText={setDescription}
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />
      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isloading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
