import Reactotron from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';

Reactotron.configure()
  .useReactNative()
  .use(
    apisaucePlugin({
      // ignoreContentTypes: /^(image)\/.\*$/i // <--- a way to skip printing the body of some requests (default is any image)
    }),
  )
  .connect();
