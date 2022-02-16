import React from "react";
import { useState} from "react";
import Header from "./Components/Header";
import ButtonLoad from "./Components/ButtonLoad";
import Loading from './Components/Loading'
import Pizza from './Components/Pizza'
import Table from './Components/Table'
import Footer from "./Components/Footer";


const App = () => {
    const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
    const apiUrlGetCurrency = 'https://gp-js-test.herokuapp.com/pizza/currency';
  
    const [allGuests, setAllGuests]= useState([])
    const [guests, setGuests]=useState([])
    const [vegan, setVegan]=useState([])  
    const [orders,setOrders]=useState([])
    const [currencyEx, setCurrencyEx]=useState([])

    const [buttonLoad, setButtonLoad] = useState(true)
    const [loading, setLoading] = useState(true)

    function loadBtn(){
      setButtonLoad(!buttonLoad)
      setLoading(!loading)
      start()
      setLoadText(!loadText)
    }

    const [loadText, setLoadText] = useState(false)

    function loadTexFunction(){
      setLoadText(loadText)
    }

  const loadGuests = async()=>{
    const response = await fetch(apiUrlGetGuests);
    const data = await response.json()
       if (data) {
        
        const guestFilterData = data.party.filter(({ eatsPizza }) => eatsPizza === true )
        setAllGuests(data.party)
        setGuests(guestFilterData);
        return getGuestLink(guestFilterData);
      }
    }
    
  const getGuestLink = (guestFilterData) => {
    let link = guestFilterData.map(({ name })=> name).toString().replace(/ /ig, '%20')
    return `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`
  }
   
  const loadVegans = async(urlGuest) => {   
    const response = await fetch(urlGuest);
    const data = await response.json()
      if (data) {
        setVegan(data.diet.filter(({ isVegan })=> isVegan === true))
        } 
        
  }
  
  const getPizzaType = () => {
    let value = 12
    let pizzaTypesVegan = ['vegan', 'cheese']
     if(vegan.length >=  value / 2) {
        let randomNum = Math.floor(Math.random() * 2)
         return `https://gp-js-test.herokuapp.com/pizza/order/${pizzaTypesVegan[randomNum]}/${value}`
    }else{
         return `https://gp-js-test.herokuapp.com/pizza/order/meat/${value}`
    }
  }

   const order = async() => {
      let response = await fetch(getPizzaType())
      let json2 = await response.json()
      setOrders(json2)
      loadTexFunction()
  }

  const currensyEx = async () => {
      let response = await fetch(apiUrlGetCurrency)
      let json1 = await response.json()
     setCurrencyEx(json1)
  }

  function start(){
    loadGuests().then(dataURl => {
      if(dataURl) {
        loadVegans(dataURl).then(()=>{
          order()
          currensyEx()          
        })
      }  
     })  
  }
 
  return (
    <div className="app">
      <Header />
      <ButtonLoad 
        loading ={loading}
        loadBtn = {loadBtn}
      />
      {loadText ? <Loading /> : ''}
      {guests.length === 0 || orders.length === 0 ? '' : 
      <>
        <Pizza guests={guests}  allGuests={allGuests}/>  
        <Table guests={guests} orders={orders} currencyEx={currencyEx}/>
      </> }
      
      <Footer />
    </div>
  );
}

export default App;
