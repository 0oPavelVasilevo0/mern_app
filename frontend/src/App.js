import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
// import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import { useAuthContext } from '../hooks/useAuthContext'
import man from '../src/img/man.gif'

function App() {

  const { user } = useAuthContext()

  const Home = lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../src/pages/Home'));
      }, 3000)
    })
  })

  // const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // useEffect(() => {
  //   fetchData();
  //   postData({ someData: 'example' });
  // });

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/api/data`);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const postData = async (bodyData) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/api/data`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(bodyData),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error posting data:', error);
  //   }
  // };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? (
                <Suspense fallback={<img src={man} alt='' />}>
                  <Home />
                </ Suspense >
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
