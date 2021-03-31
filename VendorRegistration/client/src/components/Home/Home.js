import React, {useState} from 'react'
import SideBarDashboard from '../Sidebar/SideBar';
import MainNavBar from '../MainNav/MainNav';
import Dashboard from '../Dashboard/Dashboard';

export default function Home() {

    
    return (
        <>
            <MainNavBar />
            <SideBarDashboard />
            <Dashboard />
        </>
    )
}
