'use client';
import { TailSpin } from 'react-loader-spinner';
import AddInstitute from "@/components/AddInstitute";
import NavBar from "@/components/NavBar";
import {SidebarMain} from "@/components/SidebarMain";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function InstitutePage() {
    const { isAuthenticated, user } = useKindeBrowserClient();
    const [loading, setLoading] = useState(true);
    const [isInstitute, setIsInstitute] = useState<boolean>(false);
    const [instituteCode, setInstituteCode] = useState<string | null>(null);
    const [exams, setExams] = useState();

    const [isMobile, setIsMobile] = useState(false);

    const verifyInstitute = async () => {
        const institute = localStorage.getItem('isInstitute');
        if (institute === 'true') {
            setIsInstitute(true);
            const instituteCodeLocal = localStorage.getItem('instituteCode');
            if (instituteCodeLocal === null) {
                setInstituteCode(null);    
            }
            else {
                setInstituteCode(instituteCodeLocal);
            }
            setLoading(false);
        } 
        else if (institute == null || institute === 'false') {
            const sendData = {
                userAuthId: user?.id
            };
            try {
                const res = await fetch('/api/institute', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Metadata': JSON.stringify(sendData)
                    },
                });
                const data = await res.json();
                if (data.success) {
                    localStorage.setItem('isInstitute', 'true');
                    setIsInstitute(true);
                    localStorage.setItem('instituteCode', `${data.data.instituteCode}`)
                    setInstituteCode(`${data.data.instituteCode}`)
                } else {
                    localStorage.setItem('isInstitute', 'false');
                }
            } catch (error) {
                console.error("Can't make API Call", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            verifyInstitute();
        }
        else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 768) { // Adjust this value if needed for mobile width
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
        };
    
        // Run the function on initial load
        handleResize();
    
        // Add event listener for resize
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobile) {
        return (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white text-center p-4">
            <div>
              <h1 className="text-2xl font-bold">Please open in desktop</h1>
              <p className="mt-2">This website is not optimized for mobile devices.</p>
            </div>
          </div>
        );
    }

    return (
        <main className="w-full h-screen overflow-y-hidden">
            <NavBar />
            {loading ? (
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
            ) : !isAuthenticated ?  (
                  <div className='flex flex-col items-center justify-center text-center'>
                      <div className=''>
                        <Image 
                          src={`/gifs/hello.gif`}
                          alt='hello.gif'
                          width={500}
                          height={500}
                          unoptimized
                        />
                      </div>
                      <h1 className='font-medium text-3xl'>Please login to access this page.</h1>
                  </div>
                ) :!isInstitute ?  (
                <div>
                    <AddInstitute/>
                </div>
            ) : (
                <div className="flex flex-col h-dvh">
                    <SidebarMain/>
                </div>
            )}
        </main>
    );
}
