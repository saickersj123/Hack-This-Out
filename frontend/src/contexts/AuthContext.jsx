   import React, { createContext, useState, useEffect } from 'react';
   import { getUserStatus } from '../api/axiosInstance';

   export const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     const fetchUser = async () => {
       try {
         const data = await getUserStatus();
         setUser(data.user);
       } catch (error) {
         setUser(null);
       } finally {
         setLoading(false);
       }
     };

     useEffect(() => {
       fetchUser();
     }, []);

     return (
       <AuthContext.Provider value={{ user, setUser, loading }}>
         {children}
       </AuthContext.Provider>
     );
   };