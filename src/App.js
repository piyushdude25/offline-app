// import React from "react";
// import "./App.css";
// import { Navbar, Nav } from "react-bootstrap";

// import firebase from "./firebase";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Users from "./pages/Users";
// import About from "./pages/About";
// function App() {
//   React.useEffect(() => {
//     const msg = firebase.messaging();
//     msg
//       .requestPermission()
//       .then(() => {
//         return msg.getToken();
//       })
//       .then((data) => {
//         console.warn("token", data);
//       });
//   });

//   return (
//     <div className="App">
//       <Router>
//         <Navbar bg="primary" variant="dark">
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link>
//               <Link to="/">Home</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to="/about">About</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to="/users">Users</Link>
//             </Nav.Link>
//           </Nav>
//         </Navbar>
//         <Routes>
//           <Route path="/about" element={<About />}></Route>
//           <Route path="/users" element={<Users />}></Route>
//           <Route path="/" element={<Home />}></Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";
import { messaging, getToken, onMessage } from "./firebase";

function App() {
  React.useEffect(() => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        getToken(messaging, {
          vapidKey: "AIzaSyDksEjSxJrjPJKlxP-bzWpxIE_7vQUaJhQ",
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.warn("token", currentToken);
            } else {
              console.warn(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.warn("An error occurred while retrieving token. ", err);
          });

        // Listen for messages
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          // Customize your notification handling here
        });
      })
      .catch((err) => {
        console.warn("ServiceWorker registration failed: ", err);
      });
  }, []);

  ///////////////////////////////////
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          return true;
        } else {
          throw new Error("Notification permission denied");
        }
      } catch (error) {
        setErrorMessage(
          "Notification permission is required for messaging. Please allow it in your browser settings."
        );
        return false;
      }
    };

    const getMessagingToken = async () => {
      if (await requestNotificationPermission()) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            return getToken(messaging, {
              vapidKey: "AIzaSyDksEjSxJrjPJKlxP-bzWpxIE_7vQUaJhQ",
              serviceWorkerRegistration: registration,
            });
          })
          .then((currentToken) => {
            setToken(currentToken);
            console.log("Token:", currentToken);
          })
          .catch((err) => {
            setErrorMessage("An error occurred while retrieving token:", err);
          });
      }
    };

    getMessagingToken();
  }, []);


  return (
    <div className="App">
      <Router>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
