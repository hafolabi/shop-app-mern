import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Newsletter from '../Components/Newsletter'
import { mobile, tablet } from '../responsive'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding:'20px', flexDirection:'column' })}
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 90%;
    height: 90vh;
    object-fit: cover;
    ${mobile({height:'40vh', })}
    ${tablet({height:'70vh', width: '100%', objectFit:'contain',})}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding:'20px', })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
    text-align: justify;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-top:30px;
    margin-bottom:5px;
    ${mobile({width:'100%', })}
`

const Error = styled.div`
    width: 50%;
    color: red; 
    font-size: 12px;
    margin-bottom: 30px;
    text-align: center;
    ${mobile({width:'100%', })}
    ${tablet({width:'70%', })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    ${tablet({marginLeft:'10px', })}
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 5px;
    background-color: ${props=>props.color};
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width:50%;
    justify-content: space-between;
    ${mobile({width:'100%', })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius:10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center; 
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border:1px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    ${tablet({marginLeft:'20px', })}

    &:hover{
        background-color: #eeecec;
    }
`

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState("")
    const [errorColorSize, setErrorColorSize] = useState('')
    const dispatch= useDispatch()

    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const res= await publicRequest.get("products/find/"+id)
                setProduct(res.data)
            }
            catch{}       
        }
        getProduct();
    },[id])

    const handleQuantity=(type)=>{
        if(type === "desc"){
           quantity>1 && setQuantity( quantity -1)
        }else{
        setQuantity( quantity +1)
        }
    }

    const handleClick= ()=>{
        setErrorColorSize('')
        if(color.length && size.length !== 0){
            dispatch(addProduct({...product, quantity, color, size}))   
        }else{
            setErrorColorSize('color & size required')
        }
           
    }
    
    return (
        <Container>
            
            <Navbar />
            <Announcement />
            <div style={{ marginTop: "20px", marginLeft:'20px' }}>
                <Link to='/products/wears'>
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid teal",
                        cursor: "pointer",
                        color: "teal",
                        padding: 10,
                      }}
                      >
                      Continue Shopping
                    </button>
                    </Link>
                  </div>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}
                    </Desc>
                    <Price>${product.price}</Price> 
                      
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color </FilterTitle>
                        {product.color?.map((c)=>(
                        <FilterColor color={c} key={c} onClick={()=> setColor(c)}/>
                        ))}
                    </Filter>

                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=> setSize(e.target.value)} > 

                            <FilterSizeOption>-</FilterSizeOption>
                            {product.size?.map((s)=>(
                            <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                
                <Error >{errorColorSize}</Error>

                <AddContainer>

                    <AmountContainer>
                        <Remove onClick={()=> handleQuantity("desc")} />
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=> handleQuantity("inc")} />
                    </AmountContainer>

                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>

                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
            
        </Container>
    )
}

export default Product
