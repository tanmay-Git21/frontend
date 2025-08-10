// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // all registered users
  const [user, setUser] = useState(null); // logged-in user

  // ✅ Load from localStorage on first load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("app_users") || "[]");
    const storedUser = JSON.parse(localStorage.getItem("logged_in_user") || "null");
    setUsers(storedUsers);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ Keep users list synced
  useEffect(() => {
    localStorage.setItem("app_users", JSON.stringify(users));
  }, [users]);

  // Register new user
  const registerUser = (role, data) => {
    if (users.some((u) => u.email === data.email && u.role === role)) {
      return { success: false, message: "Email already registered for this role." };
    }

    const newUser = { ...data, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Save the role of the registered user (optional)
    localStorage.setItem("last_registered_role", role);

    return { success: true };
  };

  // Login user
  const loginUser = (role, email, password) => {
    const found = users.find(
      (u) => u.role === role && u.email === email && u.password === password
    );
    if (found) {
      setUser(found);

      // Save user & role for persistence across tabs/reloads
      localStorage.setItem("logged_in_user", JSON.stringify(found));
      localStorage.setItem("logged_in_role", role);

      return { success: true, user: found };
    }
    return { success: false, message: "Invalid email or password." };
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("logged_in_user");
    localStorage.removeItem("logged_in_role");
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
