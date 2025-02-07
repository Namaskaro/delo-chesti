import {computed,map} from 'nanostores';

type CartStore = {
	quantity: number;
	item: CartItem;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  img: string[];
  selectedColor: string;
}

export type Color = {
  value: string;
  hex: string;
};

type ShopItem = {
  id: number;
  title: string;
  price: number;
  img: string[];
  colors: Color[]; 
}

export const $cart = map<Record<number,CartStore | undefined>>({});

export function addItemToCart(item: ShopItem) {
  const cartItem = $cart.get()[item.id];
 const quantity = cartItem ? cartItem.quantity : 0;

 $cart.setKey(item.id, {
  //@ts-ignore
  item,
  quantity: quantity + 1
 })
 localStorage.setItem('cart', JSON.stringify($cart))
}

export function removeItemFromCart(itemId: number) {
  //@ts-ignore
  $cart.setKey(itemId, undefined)
  localStorage.setItem('cart', JSON.stringify($cart))
}



export const subtotal = computed($cart, (entries) => {
  let subtotal = 0;
  Object.values(entries).forEach((entry) => {
    if(!entry) {
      return
    }

    subtotal += entry.quantity * entry.item.price
  })

  return  subtotal
})