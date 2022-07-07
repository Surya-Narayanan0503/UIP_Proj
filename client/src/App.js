import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UsersPage from './components/UsersPage';

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"
          element={
            <LoginPage
              onSignInComplete={(user) => setCurrentUser(user)}
            />}
        />
        <Route exact path="/signup" element={<SignUpPage />} />
        {currentUser && <Route exact path="/profile"
          element={<HomePage currentUser={currentUser} />}
        />}
        {currentUser && <Route exact path="/users" element={<UsersPage currentUser={currentUser} />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App;