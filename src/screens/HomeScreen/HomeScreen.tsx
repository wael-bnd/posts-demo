import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, View, Text} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Snackbar,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {fetchPosts} from '../../services/postsService';
import {useDispatch, useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {
  INavigation,
  IPost,
  IPostItem,
  IPostResponse,
  RootState,
} from '../../types';
import {styles} from './HomeScreen.styles';
import {logUserAction, resetAuthData} from '../../redux/reducers';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {EPrivateScreen} from '../../enum';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [snackVisible, setSnackVisible] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const navigation = useNavigation<INavigation>();
  useFocusEffect(
    useCallback(() => {
      dispatch(logUserAction('post-list-screen'));
    }, [dispatch]),
  );
  const loadPosts = async () => {
    if (!hasMore || searching) return;

    setLoading(true);
    try {
      const newPosts = await fetchPosts(page);
      const postsWithUsernames = await Promise.all(
        newPosts.map(async post => {
          const user = await fetchUserById(post.userId);
          return {...post, username: user.username};
        }),
      );

      const uniquePosts = postsWithUsernames.map(post => ({
        ...post,
        uniqueKey: `${post.id}-${page}`,
      }));

      setPosts(prevPosts => [...prevPosts, ...uniquePosts]);
      setFilteredPosts(prevFilteredPosts => [
        ...prevFilteredPosts,
        ...uniquePosts,
      ]);
      setPage(prevPage => prevPage + 1);
      setHasMore(newPosts.length > 0);
    } catch (err) {
      setError('Failed to load posts');
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (userId: number) => {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearching(true);
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/posts/search?q=${query}`,
        );
        const {posts: searchResults} = (await response.json()) as IPostResponse;
        const postsWithUsernames = await Promise.all(
          searchResults.map(async (post: IPost) => {
            const user = await fetchUserById(post.userId);
            return {...post, username: user.username};
          }),
        );

        setFilteredPosts(postsWithUsernames);
        setSearching(false);
      } catch (err) {
        setError('Failed to search posts');
        setSnackVisible(true);
        setSearching(false);
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredPosts(posts);
      setSearching(false);
    }
  };

  const renderPost = ({item}: {item: IPostItem}) => (
    <Card style={styles.card}>
      <Card.Content>
        <Image
          source={{uri: `https://picsum.photos/seed/${item.id}/400/200`}}
          style={styles.image}
          resizeMode="cover"
        />
        <Title style={styles.title}>{item.title}</Title>
        <Paragraph style={styles.username}>By: {item.username}</Paragraph>
        <Paragraph style={styles.body}>{item.body}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            handleViewDetails(item);
          }}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );
  const handleLogout = () => {
    dispatch(logUserAction('logout'));
    dispatch(resetAuthData());
  };
  const handleViewDetails = async (item: IPostItem) => {
    dispatch(logUserAction('post-click'));
    const user = await fetchUserById(item.userId);

    navigation.navigate(EPrivateScreen.PostDetailsScreen, {
      post: item,
      user: {
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        username: user.username,
        gender: user.gender,
        dob: user.birthDate,
        profileImage: user.image,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Title style={styles.welcomeText}>
          Welcome {user?.firstName} {user?.lastName}
        </Title>
        <Button
          icon="logout"
          mode="text"
          onPress={handleLogout}
          compact
          style={styles.logoutButton}>
          Logout
        </Button>
      </View>
      <TextInput
        label="Search Posts"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
        mode="outlined"
        theme={{colors: {primary: '#6200ee'}}}
      />
      {loading && (filteredPosts.length == 0 || searchQuery.length > 0) ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      ) : !loading && searchQuery && filteredPosts.length === 0 ? (
        <Text style={styles.noDataText}>No results found</Text>
      ) : (
        <FlashList
          data={filteredPosts}
          renderItem={renderPost}
          keyExtractor={(item, index) => item.uniqueKey || index.toString()}
          onEndReached={!searchQuery ? loadPosts : null}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.flashListContent}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color="#6200ee"
                style={styles.loader}
              />
            ) : null
          }
          estimatedItemSize={500}
        />
      )}
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {error}
      </Snackbar>
    </View>
  );
};

export default HomeScreen;
