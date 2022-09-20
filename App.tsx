import {NativeBaseProvider, StatusBar} from 'native-base';
//import {Loading} from './src/components/Loading';
import {THEME} from './src/styles/theme';
import {Routes} from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}
