'use client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { useState } from 'react'
 
interface SearchbarProps {
    setExams: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Searchbar({setExams}: SearchbarProps) {
    const [inputData, setInputData] = useState({
        name: ''
    })


    const handleSumbit = async () => {
        console.log(`inputData: ${inputData.name}`);
        const res = await fetch(`/api/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(inputData)
            },
        })
        const data = await res.json();
        setExams(data.products)
    }

    return (
        <div className='flex w-auto items-center'>
            <div className='relative flex items-center w-full'>
                <MagnifyingGlassIcon className='absolute left-2 text-gray-500 w-5 h-5' />
                <Input 
                    name='name' 
                    onChange={(e) => setInputData({...inputData, name: e.target.value})} 
                    className='pl-10 w-full'  
                    placeholder='Search'
                    onClick={handleSumbit}
                />
            </div>
        </div>

    )
}