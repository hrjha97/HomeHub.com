import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import {Swiper , SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules"
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';



function Home() {
  const[offerListings ,setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const[rentListings,setRentListings] = useState([]);
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListings = async()=>{
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
        
      } catch (error) {
        console.log(error)
        
      }

    }
    const fetchRentListings =async()=>{
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
        
      } catch (error) {
        console.log(error)
        
      }

    }
    const fetchSaleListings = async()=>{
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data =await res.json();
        setSaleListings(data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchOfferListings();

  },[])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl
      mx-auto'>
        <h1 className=' text-3xl text-slate-700 font-bold
        lg:text-6xl'>
        Welcome to HomeHub.com
        </h1>
        <h1 className='text-3xl text-slate-900 font-bold'>
        Discover Your <span className='text-slate-500'>Perfect</span><br /> Home Today!
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        At HomeHub.com, we're dedicated to simplifying your journey in finding, buying, renting, or selling a home. Whether you're a first-time buyer, seasoned investor, or looking for a cozy rental, we have the tools and resources to make 
        
        <br/>your real estate experience seamless and rewarding.

        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Let's get Started...

        </Link>
      </div>
      <Swiper navigation>
      {
        offerListings && offerListings.length>0 && 
        offerListings.map((listing)=>(
          <SwiperSlide>
            <div style={{background : `url(${listing.imageUrls[0]})center no-repeat`, backgroundSize : 'cover'}} className='h-[500px] key = {listing._id}'>

            </div>
          </SwiperSlide>

        ))
      }

      </Swiper>
      <div className='mx-auto max-w-6xl p-3 flex flex-col gap-8
      my-10'>
      {offerListings && offerListings.length>0 &&(
        <div>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-800'>Recent Offers</h2>
          <Link className='text-sm text-blue-900 hover:underline' to={'/search?offer=true'}>
            Show More Offers...
          </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
          {
            offerListings.map((listing)=>(
              <ListingItem listing={listing}key={listing._id}/>
            ))
          }
        </div>
        </div>

      )}
      {rentListings && rentListings.length>0 &&(
        <div>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-800'>Recent places for Rent</h2>
          <Link className='text-sm text-blue-900 hover:underline' to={'/search?type=rent'}>
            Show More places for rent.
          </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
          {
            rentListings.map((listing)=>(
              <ListingItem listing={listing}key={listing._id}/>
            ))
          }
        </div>
        </div>

      )}
      {saleListings && saleListings.length>0 &&(
        <div>
        <div className='my-3'>
          <h2 className='text-2xl font-semibold text-slate-800'>Recent places for Sale</h2>
          <Link className='text-sm text-blue-900 hover:underline' to={'/search?type=sale'}>
            Show More places for sale.
          </Link>
        </div>
        <div className='flex flex-wrap gap-4'>
          {
            saleListings.map((listing)=>(
              <ListingItem listing={listing}key={listing._id}/>
            ))
          }
        </div>
        </div>

      )}



      </div>
      

    </div>
  )
}

export default Home