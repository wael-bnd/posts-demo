import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6000ee',
  },
  searchInput: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  username: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  body: {
    fontSize: 15,
    color: '#333',
  },
  flashListContent: {
    paddingBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
    fontSize: 16,
  },
  snackbar: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutButton: {
    marginLeft: 10,
  },
});
export {styles};
