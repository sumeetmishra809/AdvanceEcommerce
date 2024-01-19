import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from "../assets/images/shop/del.png";
import CheckOutPage from './CheckOutPage';

const CartPage = () => {

    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        //fetch CartItem from local storage
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setcartItems(storedCartItems);
    }, [])

    //calculate price
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    }

    //handle quantity increase
    const handleIncrease = (item) => {
        item.quantity += 1;
        setcartItems([...cartItems]);

        //update local storage with new cart item
        localStorage.setItem("cart", JSON.stringify(cartItems));
    };


    ///handle quantity decrease
    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setcartItems([...cartItems]);

            //update local storage with new cart item
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }

    };

    //handle item remove
    const handleRemoveItem = (item) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

        //update newCart
        setcartItems(updatedCart);

        updateLocalStorage(updatedCart);
    };

    const updateLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }


    //cart subtotal
    const cartSubtotal = cartItems.reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0);


    //order Total
    const orderTotal = cartSubtotal;

    return (
        <div>
            <PageHeader title={"title"} curPage={"curPage"} />

            <div className='shop-cart padding-tb'>
                <div className='container'>
                    <div className='section-wrapper'>
                        {/* cart-top */}
                        <div className='cart-top'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='cat-product'>Product</th>
                                        <th className='cat-price'>Price</th>
                                        <th className='cat-quantity'>Quantity</th>
                                        <th className='cat-toprice'>Total</th>
                                        <th className='cat-edit'>Edit</th>
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody>
                                    {
                                        cartItems.map((item, indx) => (
                                            <tr key={indx}>
                                                <td className='product-item cat-product'>
                                                    <div className='p-thumb'>
                                                        <Link to="/shop"><img src={item.img} alt="" /></Link>
                                                    </div>
                                                    <div className='p-content'>
                                                        <Link to="/shop">{item.name}</Link>
                                                    </div>
                                                </td>
                                                <td className='cat-price'>${item.price}</td>
                                                <td className='cat-quantity'>
                                                    <div className='cart-plus-minus'>
                                                        <div className='dec qtybutton' onClick={() => handleDecrease(item)}>-</div>
                                                        <input type='text' className='cart-plus-minus-box' name='qtybutton'
                                                            value={item.quantity} />
                                                        <div className='inc qtybutton' onClick={() => handleIncrease(item)}>+</div>
                                                    </div>
                                                </td>

                                                <td className='cat-toprice'>${calculateTotalPrice(item)}</td>
                                                <td className='cat-edit'>
                                                    <a href='#' onClick={() => handleRemoveItem(item)}>
                                                        <img src={delImgUrl} alt="" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>


                            </table>
                        </div>

                        {/* cart top ends */}

                        {/* cart bottom */}

                        <div className='cart-bottom'>
                            {/* checkout box */}
                            <div className='cart-checkout-box'>
                                <form className='coupon'>
                                    <input className='cart-page-input-text' type='text' name='coupon' id='coupon'
                                        placeholder='Coupon Code....' />
                                    <input type='submit' value="Apply Coupon" />
                                </form>

                                <form className='cart-checkout'>
                                    <input type='submit' value="Update Cart"></input>
                                    <div>
                                        <CheckOutPage/>
                                    </div>
                                </form>
                            </div>
                            {/* checout box end */}

                            {/* shopping box */}

                            <div className='shiping-box'>
                                <div className='row'>
                                    <div className='col-md-6 col-12'>
                                        <div className='calculate-shiping'>
                                            <h3>Calculate Shipping</h3>
                                            <div className='outline-select'>
                                                <select>
                                                    <option value="uk">United Kingdom (UK)</option>
                                                    <option value="bg">Bangladesh</option>
                                                    <option value="ind">India (IN)</option>
                                                    <option value="np">Nepal</option>
                                                    <option value="jp">Japan</option>
                                                </select>
                                                <span className='select-icon'>
                                                    <i className='icofont-rounded-down'></i>
                                                </span>
                                            </div>

                                            <div className='outline-select shipping-select'>
                                                <select>
                                                    <option value="uk">London</option>
                                                    <option value="bg">Dhaka</option>
                                                    <option value="ind">New Delhi</option>
                                                    <option value="np">Kathmandu</option>
                                                    <option value="jp">Tokyo</option>
                                                </select>
                                                <span className='select-icon'>
                                                    <i className='icofont-rounded-down'></i>
                                                </span>
                                            </div>

                                            <input type='text' name='patalCode' id='patalCode' placeholder='Postal / ZIP-Code *' 
                                            className='cart-page-input-text'/>
                                            <button type='submit'>Update Address</button>

                                        </div>
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <div className='cart-overview'>
                                            <h3>Cart Total</h3>
                                                <ul className='lab-ul'>
                                                    <li>    
                                                        <span className='pull-left'>Cart Subtotal</span>
                                                        <p className='pull-right'>${cartSubtotal}</p>
                                                    </li>
                                                    <li>    
                                                        <span className='pull-left'>Shiping & handling</span>
                                                        <p className='pull-right'>Free Shiping</p>
                                                    </li>
                                                    <li>    
                                                        <span className='pull-left'>Order Total</span>
                                                        <p className='pull-right'>$ {orderTotal.toFixed(2)}</p>
                                                    </li>
                                                </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartPage;