
import './App.css';
import SignIn from './pages/signIn/page';
import SingUpPage from './pages/signUp/page';
import Landingpage from './components/LandingPage'
import Settings from './components/settings';
import NewTask from './components/NewTask';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

import CalendarView from './components/Calender';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SingUpPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/newTask" element={<NewTask />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
