import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Toolbar, Button} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox'
import axios from 'axios'
import listData from './listData.json'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '80vw',
  },
  overflow: 'hidden',
  container: {
    maxHeight: 440,
  },
  toolbar: {
    justifyContent: 'flex-end',
    paddingRight: 0,
  }
});

export default function List(props) {
  const history = useHistory()
  const classes = useStyles()

  //Variables
  const {url, columns, type} = listData[props.url]
  const token = localStorage.getItem('x-auth-token')

  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token && JSON.parse(token)
  }

  //States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, []) 

  //Making request to the milluki api to Get Info
  async function getData() {
    try {
      const hasId = props.id
      const uri = props.id ? `${url}/${props.id}`: url
      const res = await axios.get(uri, { headers })
      if (res.data) setData(hasId? res.data.book : res.data)
    }

    catch(e) {
      console.log('A requisição falhou', e)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // async function handleNewBook() {
  //   try {
  //     const res = await axios.get('http://localhost:8000/milluki/users', { headers })
  //     if(res.data) {

  //     }
  //   }
  //   catch(e) {
  //     console.log('A requisição falhou', e)
  //   }
  // }

  return (
    <Paper className={classes.root}>
      {props.url !== 'publicCollections' ?
        <Toolbar className={classes.toolbar}>
            <Button color='primary' variant='contained' size='large' startIcon={<AddBoxIcon />} onClick={() =>  history.push(`/new/${type}`) }>
                {type === 'collection' ? (props.url === 'mycollections' ? 'New Collection' : 'New Book') : "New Book"}           
            </Button>
        </Toolbar>
        :
        <Toolbar className={classes.toolbar} />
      }
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.code} 
                  onClick={() => {if(type === 'collection') {history.push(`/collections/${row._id}`)}}}               
                >
                  {columns.map((column) => {
                    const value = column.id === 'book'? row[column.id].length : row[column.id]
                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : 
                          JSON.stringify(value) === 'true' ? 'Yes' :
                          JSON.stringify(value) === 'false' ? 'No' :
                          JSON.stringify(value)
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}