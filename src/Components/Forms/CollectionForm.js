import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
//import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    form: {
        backgroundColor: '',
        display: 'flex',
        justifyContent: 'left',           
        flexWrap: 'wrap',
        maxWidth: '100%',
        width: '60vh',
        margin: '0 auto',
        marginTop: '10%',
        '& .MuiFormControl-root': {
            display: 'flex',
            minWidth: '200px',
            // maxWidth: '500px',
            margin: '0% 0% 5% 0'
        }
    },
    toolbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        margin: '5% 10% 0 0',
    }
}))

export default function BookForm() {
    const classes = useStyles()
    const history = useHistory()    
    const isPublicList = ["Yes", "No"]

    const [collection, setCollection] = useState({
        name: '',
        isPublic: ''
    })    

    const [error, setError] = useState({
        name: '',
        isPublic: ''
    })   

    useEffect(() => {
        // if(params.id) {
        //     setTitle('Editar Cliente')
        //     getData(params.id)
        // }
        
    }, [])

    async function handleInputChange(event, property) {
        const collectionTemp = {...collection}       
        
        if(event.target.id) property = event.target.id
        collectionTemp[property] = event.target.value

        if(property === 'isPublic') {
            collectionTemp[property] = event.target.value === 'Yes' ? 'true' : 'false'
        }       

        setCollection(collectionTemp)
        validate(collectionTemp)
    }

    //Validates each field of the form.
    function validate(data) {
        let isValid = true

        const errorTemp = {
            name: '',
            isPublic: ''
        }
        
        if(data.name.trim() !== '' && (data.name.length > 100 || data.name.length < 2)) {
            errorTemp.name = `The collection's name must have more than 2 and less than 100 characters`
            isValid = false
        }

        if(data.isPublic === '') {
            errorTemp.isPublic = `Chose one option`
            isValid = false
        }

        setError(errorTemp)
        return isValid
    }

    async function postCollection() {
        try{
            const token = localStorage.getItem('x-auth-token')
            
            const headers = {
                "Content-Type": "application/json",
                "x-auth-token": token && JSON.parse(token)
            }

            console.log(collection)

            await axios.post(`http://localhost:8000/milluki/collections`, collection, { headers })
            history.goBack()
        }
        catch(e) {
            console.log('fudeu', e)
        }        
    }

    function handleSubmit(event) {
        event.preventDefault()     
        if(validate(collection)) postCollection()
    }

    return(
        <>
            {/* <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Há dados não salvos. Deseja realmente voltar?
            </ConfirmDialog>

            <Snackbar open={sbStatus.open} autoHideDuration={6000} onClose={handleSbClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbStatus.severity} >
                    {sbStatus.message}
                </MuiAlert>
            </Snackbar> */}
            
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField 
                    id="name" 
                    label="Collection's name" 
                    variant="filled"
                    value={collection.name} 
                    onChange={handleInputChange}
                    onFocus={event => event.target.select()}
                    required 
                    placeholder="Name"
                    fullWidth
                    error={error.name != ''}
                    helperText={error.name}
                />             
                <TextField 
                    id="isPublic" 
                    label="Is Public?" 
                    variant="filled"
                    value={collection.isPublic} 
                    required
                    onChange={e => handleInputChange(e, 'isPublic')}
                    placeholder="Book's year"
                    select
                >      
                    { isPublicList.map(value => <MenuItem value={value}>{value}</MenuItem> )}
                </TextField> 
                {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Is Public?</FormLabel>
                    <RadioGroup row aria-label="isPublic" name="row-radio-buttons-group">
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl> */}
                
                <Toolbar className={classes.toolbar}>
                    <Button type="submit" variant="contained" color="primary" disabled={false}>
                        Add Collection
                    </Button>
                    <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
                </Toolbar>
            </form>
        </>        
    )
}