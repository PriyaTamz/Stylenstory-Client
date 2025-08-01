import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAddresses = useCallback(async () => {
    if (!user) {
      setAddressList([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/address", { withCredentials: true });
      const addresses = response.data.addresses || [];
      setAddressList(addresses);
      if (addresses.length > 0) {
        const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
        setSelectedAddressId(defaultAddress._id);
      }
    } catch (error) {
      toast.error("Could not load your saved addresses.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (addressData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/address", addressData, { withCredentials: true });
      const newAddress = response.data.address;

      let updatedList = [...addressList];
      if (newAddress.isDefault) {
        updatedList = updatedList.map(addr => ({ ...addr, isDefault: false }));
      }

      setAddressList([newAddress, ...updatedList]);
      setSelectedAddressId(newAddress._id);
      
      toast.success("Address saved successfully!");
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to save address.";
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/address/${addressId}`, { withCredentials: true });
      
      setAddressList(prev => prev.filter(addr => addr._id !== addressId));
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }
      
      toast.success("Address deleted.");
    } catch (err) {
      toast.error("Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  const selectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };
  
  const value = {
    addressList,
    selectedAddressId,
    loading,
    fetchAddresses,
    addAddress,
    deleteAddress,
    selectAddress,
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};