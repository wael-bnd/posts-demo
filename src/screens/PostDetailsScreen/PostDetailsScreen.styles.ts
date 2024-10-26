import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007bff',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  userInfoContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
    color: '#e74c3c',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userInfoText: {
    color: '#34495e',
    marginBottom: 4,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});
export {styles};
