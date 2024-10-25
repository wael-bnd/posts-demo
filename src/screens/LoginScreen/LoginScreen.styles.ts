import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  formContainer: {flex: 1, gap: 16},
  titleContainer: {
    justifyContent: 'center',
    paddingVertical: 64,
  },
  title: {textAlign: 'center', fontSize: 28, fontFamily: 'Montserrat-SemiBold'},
  input: {marginBottom: 16},
  inputError: {borderColor: 'red', borderWidth: 1},
  button: {marginTop: 16},
  snackbar: {
    backgroundColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'left',
  },
});

export {styles};
