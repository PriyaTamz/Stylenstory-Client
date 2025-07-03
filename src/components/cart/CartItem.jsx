import { useCart } from '../../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.color} / {item.size}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
            >
              -
            </button>
            <span className="px-2 py-1">{item.quantity}</span>
            <button
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-red-600 hover:text-red-500 flex items-center"
              onClick={() => removeFromCart(item.id, item.size, item.color)}
            >
              <FiTrash2 className="mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;