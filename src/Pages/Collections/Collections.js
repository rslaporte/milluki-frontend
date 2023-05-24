import { React } from 'react'
import List from '../../Components/List/List'
import { useParams } from 'react-router-dom'

export default function Collections() {    
    const { id } = useParams()

    return (
        <List url='collections' id={id}/>
    )
}
