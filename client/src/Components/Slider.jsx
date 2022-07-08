import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState }  from 'react'
import styled from 'styled-components'
import {sliderItems} from '../data'
import '../app.css'
import {mobile} from '../responsive'
import {tablet} from '../responsive'
import { Link } from 'react-router-dom'


const Container = styled.div`
    width:100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({height: '40vh'})}
    ${tablet({height: '700px'})}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    top:0;
    left: ${props=>props.direction ==="left" && "10px"};
    right: ${props=>props.direction ==="right" && "10px"};
    bottom:0;
    margin:auto;
    cursor: pointer;
    opacity: 0.9;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 2.5s ease-in-out;
    transform:translateX(${props => props.slideIndex * -100}vw);
`
const Slide = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props=>props.bg};
    ${mobile({width: '100vw', height: '40vh'})}
    ${tablet({width: '100vw', height: '700px'})}
`
const ImageContainer = styled.div`
    height:100%;
    flex: 1;
`
const Image = styled.img`
    height: 100%;
    ${mobile({width: '60vw', objectFit:'cover'})}
    ${tablet({width: '45vw', objectFit:'cover'})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    margin-right: 50px;
    ${mobile({flex: 2, padding: '5px', marginRight:'5px'})}
    ${tablet({flex: 3, padding: '5px', marginRight:'10px'})}
`
const Title= styled.h1`
    font-size: 70px;
    ${mobile({fontSize: '17px'})}
    ${tablet({fontSize: '47px'})}
`
const Desc= styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight: 500;
    letter-spacing: 3px;
    ${mobile({fontSize: '7px', margin:'10px 0px', letterSpacing:'1px'})}
    ${tablet({fontSize: '17px', lineHeight:'30px'})}
`
const Button= styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid lightgray;
    ${mobile({fontSize: '9px', padding:'5px'})}
    ${tablet({fontSize: '16px'})}
`


const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0)
    
    const handleClick = (direction) =>{
        if(direction==="left" &&  "right"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2)
        }
            else{
                setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0)
            }
        
    }

    return (
        <Container >
            <Arrow direction="left" onClick={()=>handleClick()}>
                <ArrowLeftOutlined />
            </Arrow>

            <Wrapper  slideIndex={slideIndex}>
                  
                {sliderItems.map(item => (

                    <Slide bg={item.bg} key={item.id}>
                        <ImageContainer className="fadeIn" >
                            <Image src={item.img} />
                        </ImageContainer>

                        <InfoContainer>
                            <Title >{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button> <Link to='#' style={{color:'black'}}>SHOP NOW</Link></Button>
                        </InfoContainer>
                    </Slide>
                     ))}
                
            </Wrapper>

            <Arrow direction="right" onClick={()=>handleClick()}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
