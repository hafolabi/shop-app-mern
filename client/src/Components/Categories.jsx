import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import CategoryItem from './CategoryItem'
import { mobile } from '../responsive'
import { tablet } from '../responsive'

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding:'0px', flexDirection:'column'})};
    ${tablet({padding:'0px', flexDirection:'column'})}
`
const Title =styled.h1`
    font-weight: 700;
    font-size: 26px;
    margin-top: 25px;
    color:gray;
    justify-content: center;
    display: flex;
    align-items: center;
    ${mobile({fontSize:'22px', margin:'20px 0px'})};
    ${tablet({fontSize:'30px', margin:'20px 0px'})}
`

const Categories = () => {
    return (
        <>
        <Title>CATEGORIES OF PRODUCTS</Title>
        <Container>
            {categories.map(item=>(
                    <CategoryItem key={item.id} item={item}/>

            ))}
        </Container>
        </>
    )
}

export default Categories
