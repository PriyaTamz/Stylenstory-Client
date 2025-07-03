import { FiX, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

const CartSidebar = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    cartTotal, 
    cartCount 
  } = useCart();

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${cartOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={() => setCartOpen(false)}
        ></div>
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shopping cart
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setCartOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <FiX size={24} />
                  </button>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cartCount === 0 ? (
                      <div className="text-center py-12">
                        <FiShoppingCart size={48} className="mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          Your cart is empty
                        </h3>
                        <p className="mt-1 text-gray-500">
                          Start adding some items to your cart
                        </p>
                        <button
                          onClick={() => setCartOpen(false)}
                          className="mt-6 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cartCount > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-secondary"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="text-primary font-medium hover:text-secondary"
                        onClick={() => setCartOpen(false)}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;