import { createContext,useState,useContext,ReactNode, useEffect } from "react"
import api from "../services/api";
interface AuthContextType {
    isAuthenticated:boolean
    token:string | null;
    user:any;
    login:(userData:any)=> void;
    logout: ()=>void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{children: ReactNode}>=({children})=>{
    const [user,setUser] = useState<any>(null);
    const [token,settoken]=useState<string | null>(null);
    const [isAuthenticated,setisAuthenticated]=useState(false);
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          settoken(storedToken);
          setUser(JSON.parse(storedUser));
          // Set the token in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      }, []);
    const login = (data:{user:any,token:string})=>{
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        settoken(data.token);
        setUser(data.user);
        setisAuthenticated(true);
    };
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        settoken(null);
        setUser(null);
        setisAuthenticated(false);
    };
    return(
        <AuthContext.Provider value={{user,token,login,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}