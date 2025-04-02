import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './pages/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar02Page from './components/navbar-02/navbar-02'
import MainPage from './pages/MainPage'
import StoryPage from './pages/StoryPage'
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage'


function App() {

  return (
    <div>
        <Navbar02Page/>
        <div>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/home' element={<MainPage/>}/>
            <Route path='/story' element={<StoryPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
          </Routes>
        </div>
    </div>

  )
}

export default App
