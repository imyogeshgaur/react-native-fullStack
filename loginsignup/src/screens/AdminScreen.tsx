import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Card from '../components/Card';
import {getAllDetailsApi} from '../constants/CONSTANTS';

const AdminScreen = () => {
  const [Data, setData] = useState<Array<any>>([]);
  const [search, setSearch] = useState('');
  const routes: any = useRoute();
  const token = routes.params.tokenData;
  useEffect(() => {
    axios
      .get(getAllDetailsApi, {
        headers: {
          Authorization: token as string,
        },
      })
      .then(res => setData(res.data.allUsers))
      .catch(err => console.log(err));
  }, []);

  const filteredData = Data.filter(val => {
    if (search === '') return val;
    else if (val.userName.toLowerCase().includes(search.toLowerCase()))
      return val.userName;
    else if (val.userEmail.toLowerCase().includes(search.toLowerCase()))
      return val.userEmail;
  });

  return (
    <>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder={'Search Here'}
      />
      <View>
        <ScrollView>
          <View style={styles.container}>
            {filteredData.map((val: any) => {
              return (
                <Card
                  userName={val.userName}
                  userEmail={val.userEmail}
                  userId={val._id}
                  tokenOfAdmin={token}
                  key={val._id}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgb(219, 219, 219)',
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 70,
  },
});
