import React from "react";
import { useState } from "react";


const Table = ({guests, orders, currencyEx})=>{

    const orderPriceBYN = (orders, currencyEx) => {
        return orders.price.endsWith("USD") == orders.price.slice(-3) && 
        orders.price.endsWith("EUR") == orders.price.slice(-3) ? parseInt(orders.price) * currencyEx.orders.price.slice(-3)
        : parseInt(orders.price)
    }

    let allOrders = orderPriceBYN(orders, currencyEx)
    let oneOrder = Number.parseFloat(orderPriceBYN(orders, currencyEx) / guests.length)

    const [cllectedMoney, setCollectedMoney] = useState(0)
    const [moneyToCollect, setMoneyToCollect] = useState(allOrders)

    function pay(){
       if(cllectedMoney >= allOrders) return
        setCollectedMoney(cllectedMoney + oneOrder)
        setMoneyToCollect(moneyToCollect  - oneOrder)
    }    
   
    
    return(
        
        <table className="total-table_wrapper">
        <tbody>
            <tr>
                <td>Name</td>
                <td>Share to pay</td>
                <td>Pay</td>
            </tr>
            {guests.map((item,index) =>{
                 
                return( 
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{oneOrder} BYN</td>
                        <td><button className='pay-btn' onClick={pay}>Pay</button></td>
                    </tr>
                )
            })}
        
            
            <tr>
                <td>Total order</td>
                <td colSpan="2">{allOrders}</td>
            </tr>
            <tr>
                <td>Money to collect</td>
                <td colSpan="2">
                    {moneyToCollect}
                </td>
            </tr>
            <tr>
                <td>Money collected</td>
                <td colSpan="2">
                    {cllectedMoney}
                </td>
            </tr>
        </tbody>
    </table>

    )
}
export default Table

