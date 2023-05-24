import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Button, Link, Menu, MenuItem, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    menu: {
        textDecoration: 'none',
        color: 'black'
    }
})

export default function TopMenu() {
    const history = useHistory()
    const classes = useStyles()
    
    //States
    const [isLogged, setLogged] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('x-auth-token')) {
            setLogged(true)
        }    
    }, [isLogged])

    //Handle Functions
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('x-auth-token')
        setLogged(false)
        
        history.push('/login')
    }

    return (
        <>
            {isLogged === true ?
                <div>
                    <IconButton onClick={handleClick}>
                        <Avatar
                            style={{backgroundColor: 'rgb(63, 81, 181)'}}
                            aria-haspopup="true"
                            aria-controls='basic-menu'
                            aria-expanded={Boolean(anchorEl)}
                        >
                            <PersonIcon fontSize='large' className='loginImage'/>   
                        </Avatar>
                    </IconButton>    
                    <Menu
                        className={classes.menu}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link onClick={() => {history.push('/mycollections')}}>My collections</Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <Link onClick={handleLogout}>Logout</Link>
                        </MenuItem>
                    </Menu>
                </div>
            
                
              :
                <Button 
                    variant='contained'
                    color='primary'
                    size='medium'
                    onClick={() => {history.push('/login')}}
                >
                    Login
                </Button>       
            }    
            </>                           
    )
}