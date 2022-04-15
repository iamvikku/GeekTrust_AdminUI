import axios from 'axios'

const getUsers = (setUsers) => {
  const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  axios.get(URL)
    .then((res) => {
      let users = res.data.map((user) => {
        user.selected = false;
        return user;
      })
      setUsers(users);
    })
    .catch((err) => console.log(err));
}

export default getUsers
