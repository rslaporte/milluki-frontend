import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    form: {
        backgroundColor: '',
        display: 'flex',
        justifyContent: 'space-around',           
        flexWrap: 'wrap',
        maxWidth: '100%',
        width: '60vh',
        margin: '0 auto',
        marginTop: '10%',
        '& .MuiFormControl-root': {
            display: 'flex',
            minWidth: '80px',
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

    //Years from 1990
    let years = []
    for(let i = 1900; i <= (new Date()).getFullYear(); i++) years.push(i.toString())
    
    const [book, setBook] = useState({
        title: '',
        author: '',
        publisher: '',
        year: '',
        genre: '',
        volume: 0,
        pageNumber: 0
    })    

    const [error, setError] = useState({
        title: '',
        author: '',
        publisher: '',
        year: '',
        genre: '',
        volume: '',
        pageNumber: ''
    })

    const history = useHistory()

    useEffect(() => {
        // if(params.id) {
        //     setTitle('Editar Cliente')
        //     getData(params.id)
        // }
        
    }, [])

    async function handleInputChange(event, property) {
        const bookTemp = {...book}
         
        if(event.target.id) property = event.target.id
        bookTemp[property] = event.target.value

        setBook(bookTemp)
        validate(bookTemp)
    }

    //Validates each field of the form.
    function validate(data) {
        let isValid = true

        const errorTemp = {
            title: '',
            author: '',
            publisher: '',
            year: '',
            genre: '',
            volume: '',
            pageNumber: ''
        }
        
        if(data.title.trim() !== '' && (data.title.length > 100 || data.title.length < 2)) {
            errorTemp.title = 'The title must have more than 2 and less than 100 characters'
            isValid = false
        }

        if(data.author.trim() !== '' && (data.author.length > 100 || data.author.length < 2)) {
            errorTemp.author = "The author's name must have more than 2 and less than 100 characters"
            isValid = false
        }

        if(data.publisher.trim() !== '' && (data.publisher.length > 100 || data.publisher.length < 2)) {
            errorTemp.publisher = "The publisher's name must have more than 2 and less than 100 characters"
            isValid = false
        }

        if(data.year === 0) {
            errorTemp.year = 'Select a year'
            isValid = false
        }

        if(data.genre.trim() !== '' && (data.genre.length > 100 || data.genre.length < 2)) {
            errorTemp.genre = "The genre must have more than 2 and less than 100 characters"
            isValid = false
        }

        if(data.volume === 0) {
            errorTemp.volume = `Enter with your book's volume number`
            isValid = false
        }

        setError(errorTemp)
        return isValid
    }

    async function postBook() {
        try{
            await axios.post(`http://localhost:8000/milluki/books`, book)
            history.goBack()
        }
        catch(error) {
            console.log('fudeu')
        }        
    }

    function handleSubmit(event) {
        event.preventDefault()     
        if(validate(book)) postBook()
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
                    id="title" 
                    label="Title" 
                    variant="filled"
                    value={book.title} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Title"
                    fullWidth
                    error={error.title != ''}
                    helperText={error.title}
                />              
                <TextField 
                    id="author" 
                    label="Author" 
                    variant="filled"
                    value={book.author} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="author"
                    fullWidth
                    size='big'
                    error={error.author != ''}
                    helperText={error.author}
                />  

                <TextField 
                    id="publisher" 
                    label="Publisher" 
                    variant="filled"
                    value={book.publisher} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="publisher"
                    fullWidth
                    error={error.publisher != ''}
                    helperText={error.publisher}
                />  

                <TextField 
                    id="genre" 
                    label="Genre" 
                    variant="filled"
                    value={book.genre} 
                    onChange={handleInputChange}
                    required 
                    fullWidth
                    placeHolder="Genre"
                    error={error.genre != ''}
                    helperText={error.genre}
                />  

                <TextField 
                    id="year" 
                    label="Year" 
                    variant="filled"
                    value={book.year} 
                    required 
                    onChange={event => handleInputChange(event, 'year')}
                    placeHolder="Book's year"
                    select
                >      
                    { years.map(year => <MenuItem value={year}>{year}</MenuItem> )}
                </TextField> 

                <TextField 
                    id="volume" 
                    label="Volume" 
                    variant="filled"
                    value={book.volume} 
                    onChange={handleInputChange}
                    onFocus={event => event.target.select()}
                    required 
                    placeHolder="volume"
                    error={error.volume != ''}
                    helperText={error.volume}
                />

                <TextField 
                    id="pageNumber" 
                    label="Number of Pages" 
                    variant="filled"
                    value={book.pageNumber} 
                    onChange={handleInputChange}
                    onFocus={event => event.target.select()}
                    required 
                    placeHolder="pageNumber"
                    error={error.pageNumber != ''}
                    helperText={error.pageNumber}
                />      
                
                <Toolbar className={classes.toolbar}>
                    <Button type="submit" variant="contained" color="primary" disabled={false}>
                        Add Book
                    </Button>
                    <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
                </Toolbar>
            </form>
        </>        
    )
}