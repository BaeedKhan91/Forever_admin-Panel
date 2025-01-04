import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { message, Popconfirm } from 'antd';

function List({token}) {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
        
      }
      else{
        message.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      message.error(error.message)
      
    }
  }

  const removeProduct = async (id) => {
    try {
      const respone = await axios.post(backendUrl + '/api/product/remove', {id},{headers:{token}})

      if (respone.data.success) {
        message.success(respone.data.message)
        await fetchList();
         
      }
      else{
        message.error(respone.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error(error.message)
      
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
    <p className='mb-2'>All Product List</p>
    <div className='flex flex-col gap-2'>
      {/* List Tabli Title */}

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/* Product List  */}

      {
        list.map((item ,index)=>(
          <div className='grid grid-col-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <Popconfirm
              title="Delete the product"
              description="Are you sure you want to delete this product?"
              onConfirm={() => removeProduct(item._id)}
              onCancel={''}
              okText="Yes"
              cancelText="No"
            >
              <p className='text-right md:text-center cursor-pointer text-lg'>
                X
              </p>
            </Popconfirm>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List