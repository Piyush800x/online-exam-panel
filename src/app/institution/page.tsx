'use client';
import AddInstitute from "@/components/AddInstitute";
import AddQuestions from "@/components/AddQuestions";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export default function InstitutePage() {
    const { isAuthenticated, user } = useKindeBrowserClient();
    const [loading, setLoading] = useState(true);
    const [isInstitute, setIsInstitute] = useState<boolean>(false);
    const [instituteCode, setInstituteCode] = useState<string | null>(null);
    const [exams, setExams] = useState();

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
    }, [isAuthenticated]);

    return (
        <main>
            <NavBar />
            {loading ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) :!isInstitute ?  (
                <div>
                    <AddInstitute/>
                </div>
            ) : (
                <div className="flex flex-col w-full ">
                    {/* <SearchBar/> */}
                    <AddQuestions/>
                    {`Institute: ${isInstitute}`}
                </div>
            )}
        </main>
    );
}
