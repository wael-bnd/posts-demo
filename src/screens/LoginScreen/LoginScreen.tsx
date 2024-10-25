import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TextInput, Button, Title, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './LoginScreen.styles';
import {loginUser} from '../../services/authService';
import {useDispatch} from 'react-redux';
import {setAuthData} from '../../redux/reducers';
import {IUser} from '../../types';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: {value: '', error: ''},
    password: {value: '', error: ''},
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onLoginPress = async () => {
    setForm({
      username: {...form.username, error: ''},
      password: {...form.password, error: ''},
    });

    let hasError = false;

    if (!form.username.value) {
      setForm(prev => ({
        ...prev,
        username: {...prev.username, error: 'Username is required'},
      }));
      hasError = true;
    }
    if (!form.password.value) {
      setForm(prev => ({
        ...prev,
        password: {...prev.password, error: 'Password is required'},
      }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    const response = await loginUser({
      username: form.username.value,
      password: form.password.value,
    });
    setLoading(false);

    if (response.success) {
      let userData: IUser = {
        id: response.authData.id,
        username: response.authData.username,
        email: response.authData.email,
        firstName: response.authData.firstName,
        lastName: response.authData.lastName,
        gender: response.authData.gender,
        image: response.authData.image,
      };
      dispatch(
        setAuthData({
          accessToken: response.authData.accessToken,
          refreshToken: response.authData.refreshToken,
          user: userData,
        }),
      );
    } else {
      setSnackbarMessage(response.message);
      setSnackbarVisible(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleUsernameChange = (text: string) => {
    setForm(prev => ({
      ...prev,
      username: {value: text, error: ''},
    }));
  };

  const handlePasswordChange = (text: string) => {
    setForm(prev => ({
      ...prev,
      password: {value: text, error: ''},
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Login</Title>
      </View>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            label="Username"
            value={form.username.value}
            onChangeText={handleUsernameChange}
            style={[styles.input, form.username.error ? styles.inputError : {}]}
            error={!!form.username.error}
          />
          {form.username.error ? (
            <Text style={styles.errorText}>{form.username.error}</Text>
          ) : null}
        </View>
        <View>
          <TextInput
            label="Password"
            value={form.password.value}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            style={[styles.input, form.password.error ? styles.inputError : {}]}
            error={!!form.password.error}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={'grey'}
                  />
                )}
                onPress={togglePasswordVisibility}
              />
            }
          />
          {form.password.error ? (
            <Text style={styles.errorText}>{form.password.error}</Text>
          ) : null}
        </View>
        <Button
          mode="contained"
          onPress={onLoginPress}
          style={styles.button}
          loading={loading}
          disabled={loading}>
          Login
        </Button>
      </View>

      <View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={hideSnackbar}
          duration={3000}
          style={styles.snackbar}>
          {snackbarMessage}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
