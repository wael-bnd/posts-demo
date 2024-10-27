import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {IPostDetailsScreenProps} from '../../types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './PostDetailsScreen.styles';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {logUserAction} from '../../redux/reducers';

const PostDetailsScreen = (props: Readonly<IPostDetailsScreenProps>) => {
  const {post, user} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(logUserAction('post-detail-screen'));
    }, [dispatch]),
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{uri: `https://picsum.photos/seed/${post.id}/400/200`}}
          style={styles.image}
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>User Info</Text>
          <View style={styles.userInfo}>
            <Image
              source={{uri: user.profileImage}}
              style={styles.profileImage}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Full Name:</Text> {user.fullName}
              </Text>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Email:</Text> {user.email}
              </Text>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Phone:</Text> {user.phone}
              </Text>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Username:</Text> {user.username}
              </Text>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Gender:</Text> {user.gender}
              </Text>
              <Text style={styles.userInfoText}>
                <Text style={styles.label}>Date of Birth:</Text> {user.dob}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetailsScreen;
