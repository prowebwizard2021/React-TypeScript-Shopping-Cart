import React, { useState } from 'react';
import { useQuery } from 'react-query';
//Components
import Item from './components/Item/Item';
import Cart from './components/Cart/Cart';
import { 
  LinearProgress,
  Drawer,
  Grid,
  Badge
} from '@material-ui/core/';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//Styles
import { Wrapper, StyledButton } from './App.styles';
import NavBar from './components/NavBar/NavBar';
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, items) => ack + items.amount, 0);
  };

  const handelAddCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if(isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1}
            : item
        );
      };

      return [ ...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}];
        }else{
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ));
  };

  if ( isLoading ) return <LinearProgress />;
  if ( error ) return <div>Something is wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems} 
          addToCart={handelAddCart}
          removeFromCart={handleRemoveFromCart} 
        />
      </Drawer>
      <NavBar>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
      </NavBar>
      <div id="main-container">
        <Grid container spacing={3}>
          {data?.map((item: CartItemType) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handelAddCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Wrapper>
  );
}

export default App;
