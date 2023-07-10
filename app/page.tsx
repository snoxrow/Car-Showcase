"use client";

import Hero from "@/components/Hero";
import { CustomFilter, SearchBar, ShowMore } from "@components";
import CarCard from "@components/CarCard";
import { fuels, yearsOfProduction } from "@constants";
import { useState, useEffect} from "react";
import { fetchCars } from "@utils";
import Image from "next/image";


export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  // search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  // filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022)

  // pagination state

  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true)

    try {
      const result = await await fetchCars({
        manufacturer: manufacturer || '', 
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || ''
      });

      
      setAllCars(result);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

  }



  useEffect(()=> {
    getCars();
  },[fuel, manufacturer, year, limit, model])
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '', 
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || ''
  // });

// const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className="mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

          <div className="home__filter-container">
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
          
          </div>  
        </div>    

      {allCars.length > 0 ? (
        <section >
          <div className="home__cars-wrapper">
            {allCars?.map((car)=> <CarCard
            car={car} />)}
          </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image src="/my-loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"/>
                </div>
              )

              }

          <ShowMore 
          pageNumber={limit / 10}
          isNext={limit >  allCars.length}
          setLimit={setLimit}/>
        </section> 
        ) : (
          <div className="home__error-container">
            <h2 className="text-black font-bold text-x1"> Oops no results</h2>
            <p>{allCars?.message}</p>
          </div> 

      )}

      </div>
    </main>
  )
}
