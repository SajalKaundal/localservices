import {UserContext ,useState} from './UserContext'

export const UserProvider = ({children}) => {

  const [user,setUser] = useState({
    id:"",
    name:"",
    profileImage:"",
    phoneNo:null,
    email:"",
    address:[]
  })

  return (
    <UserProvider value={{user,setUser}}>
      {children}
    </UserProvider>
  )
} 