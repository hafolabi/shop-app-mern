import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { tablet } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
    flex: 1;
    margin:7px;
    height: 70vh;
    border:1px solid lightgray;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height:'30vh', objectPosition: 'top'})}
    ${tablet({height:'60vh', })}
`

const Info = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    margin-bottom: 20px;
    background-color: white;
    color: gray;
    ${mobile({fontSize:'15px'})}
    ${tablet({fontSize:'30px'})}
`

const Button = styled.button`
    border: 1px solid lightgray;
    padding: 10px;
    background-color: white;
    color: gray;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    ${mobile({padding:'5px', fontSize:'10px'})}
    ${tablet({padding:'10px', fontSize:'15px'})}
`

const CategoryItem = ({item}) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
            <Image src={item.img} />
            <Info>
                <Title> {item.title}</Title>
                <Button> SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
