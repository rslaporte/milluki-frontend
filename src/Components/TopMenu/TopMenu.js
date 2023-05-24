import { React, useState, useEffect } from 'react'
import './TopMenu.css'
import { Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import UserButton from '../UserButton/UserButton'

export default function TopMenu() {
    const history = useHistory()

    return (
        <Toolbar className='header'>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Wellfleet&display=swap" rel="stylesheet"/>
            <button className='header-button' onClick={() => {history.push('/')}}>Home</button>
            <button className='header-button' onClick={() => {history.push('/collections')}}>Collections</button>
            <button className='header-button' onClick={() => {history.push('/books')}}>Books</button>            
            <UserButton />
        </Toolbar>

    )
}