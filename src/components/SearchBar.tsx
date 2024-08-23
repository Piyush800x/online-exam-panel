'use client';
import { TailSpin } from 'react-loader-spinner';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { ObjectId } from 'mongodb';
import Link from 'next/link';

interface SearchResult {
    _id: ObjectId;
    instituteCode: string;
    examName: string;
    questions: {
        questionTitle: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        answer: string;
    }[];
}

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchQuery.length > 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const id = setTimeout(() => {
                setLoading(true);
                const fetchData = async () => {
                    try {
                        const response = await fetch(`/api/search?field=instituteCode&value=${searchQuery}`);
                        const data = await response.json();
                        if (data.success) {
                            setSearchResults(data.data);
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchData();
        }, 0);
            setTimeoutId(id)
        }
        else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <div className='flex flex-col w-full items-center'>
            <div className='relative w-full flex flex-col items-center'>
                <div className='relative w-full'>
                    <Input
                        type="text"
                        placeholder="Search by Institute Code or Exam Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className=''
                    />
                </div>

                {loading && (
                    <div className="absolute text-center w-full top-0 mt-16 z-20 bg-white rounded-md shadow-lg p-2 border">
                       <div className='h-dvh flex items-center justify-center'>
                        <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            color="#2A91EB"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        </div>
                    </div>
                )}
                {!loading && searchResults.length > 0 && (
                    <div className="absolute w-full top-0 mt-16 z-20 bg-white rounded-md shadow-lg p-2 border">
                        {searchResults.map((result, index) => (
                            <Link key={index} href={`/exam/${result._id}`}>
                                <div className="flex flex-col h-max bg-slate-50 hover:bg-slate-100 border text-slate-900 transition ease-in-out rounded-md mb-2">
                                    <div className='p-2'>
                                        <h3>{result.examName}</h3>
                                        <p>{result.instituteCode}</p>
                                    </div>
                                    {/* <div>
                                        {result.questions.map((question, idx) => (
                                            <li key={idx}>{question.questionTitle}</li>
                                        ))}
                                    </div> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}