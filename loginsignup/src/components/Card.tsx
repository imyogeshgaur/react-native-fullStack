import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {deleteUserApi} from '../constants/CONSTANTS';

const Card = (props: any) => {
  const navigator:any = useNavigation();

  const deleteUser = async () => {
    try {
      const userIdToDelete = props.userId;
      const token = props.tokenOfAdmin;
      const response = await axios.delete(deleteUserApi + userIdToDelete, {
        headers: {
          Authorization: token as string,
        },
      });
      const data = await response.data;
      if (data.message) {
        ToastAndroid.show(data.message, 5000);
      }
    } catch (error) {
      console.log('Card Error : ' + error);
    }
  };
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>{props.userName}</Text>
        <Text style={styles.description}>{props.userEmail}</Text>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={{color: 'white'}} onPress={deleteUser}>
            Delete User
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: '50%',
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginTop: 10,
  },
});
