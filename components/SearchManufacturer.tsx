"use client";

import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, Fragment} from "react";
import { manufacturers } from "@constants";

interface ManuProps {
  manufacturer: string ; 
  setManufacturer: (manufacturer: string) => void;
}

const SearchManufacturer = ({manufacturer,setManufacturer} : ManuProps) => {

  const [query, setQuery] = useState('');

  const filteredManufacturers = query === '' ?
   manufacturers
    : manufacturers.filter((item)=> (
      item.toLocaleLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLocaleLowerCase().replace(/\s+/g, ''))))



  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image src="/car-logo.svg" alt="car logo" width={20} height={20} className="ml-4"/>
          </Combobox.Button>

          <Combobox.Input className="search-manufacturer__input" 
          placeholder="Volkswagen..."
          displayValue={(manufacturer : string )=> manufacturer}
          onChange={(e) => setQuery(e.target.value)}/>
        

        <Transition as={Fragment} leave="transition ease-in duration-100" 
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={()=> setQuery('')}> 

        <Combobox.Options>
          {
            filteredManufacturers.map((item) => (
              <Combobox.Option key={item} 
              value={item}
              className={({active}) => `relative search-manufacturer__option
              ${active ? 'bg-primary-blue text-white': 'text-gray-900'}`}>
                  {item}
              </Combobox.Option>
            ))
          }
        </Combobox.Options>
          
        </Transition>
        </div>
      </Combobox>
    </div>
    
  )
}

export default SearchManufacturer