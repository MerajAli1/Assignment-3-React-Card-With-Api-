import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';
import "../App.css"
const Card = () => {
    const [showData, setShowData] = useState([])
    const [addToCart, setAddToCart] = useState(0)
    const [loading, setloading] = useState(true)

    //FOR ADD TO CART
    const cart = () => {
        setAddToCart((prev) => prev + 1)
        console.log(addToCart)
    }
    //FOR ADD TO CART

    //FETCHING DATA FROM API
    const getData = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products/")
            setShowData(response.data)
            console.log(response.data);
            setloading(false)
        } catch (error) {
            console.log("ERROR: " + error)
        }
    }
    useEffect(() => {
        setloading(true)
        getData()

    }, [])
    //FETCHING DATA FROM API
    return (
        <>
            {loading && <LoadingScreen />}
            <div>
                <nav>
                    <ul>
                        <li>FAKE API STORE</li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <span className='cart-counter'>{addToCart}</span><img className='cart-img' width="2%" src='https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png' />
                    </ul>
                </nav>
                <div className="mainContainer" >
                    {
                        showData.map((e, i) => {
                            return (
                                <div className="parentCard" key={i}>
                                    <section className="card" >
                                        <img className='productImg' width="50%" src="https://clipart-library.com/images_k/shoe-transparent-background/shoe-transparent-background-12.png" alt="Not Found" />
                                        <h3>{e.title}</h3>
                                        <p>{e.description}</p>
                                        <h5>Rating: {e.rating.rate}</h5>
                                        <h1>${e.price}</h1>
                                        <button onClick={cart} className="btn">Add to cart</button>
                                    </section>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
                    <Footer/>
        </>
    )
}

export default Card