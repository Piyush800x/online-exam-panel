'use client';
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from 'sonner'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"
import { ObjectId } from "mongodb";


interface Question {
    questionTitle: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
    answer: string;
}

interface Data {
    institutionCode: string;
    examName: string;
    questions: Question[];
}


interface StudentData {
    _id: ObjectId;
    candidateFirstName: string;
    candidateLastName: string;
    candidateEmail: string;
    answers: {
        answers: { questionTitle: string; answer: string; markedForReview: boolean; }[];
    };
    examName: string;
    instituteCode: string;
    candidateAuthId: string;
}

export default function EvaluateResult() {
    const [formData, setFormData] = useState<Data[]>([]);
    const [selectedExam, setSelectedExam] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [examNames, setExamNames] = useState<string[]>([]);
    const {user, isAuthenticated} = useKindeBrowserClient();
    const [students, setStudents] = useState<StudentData[]>([]);
    const [evaluationResult, setEvaluationResult] = useState<Record<string, { correct: number; wrong: number }>>({});
    const [marksResult, setMarksResult] = useState<Record<string, "">>({});
    const [pubState, setPubState] = useState<boolean>(true);

    const fetchExams = async () => {
        const instiCode = localStorage.getItem('instituteCode');
        const sendData = {
            institutionCode: instiCode
        }

        try {
            const res = await fetch('/api/question', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                }
            });
            const data = await res.json();
            if (data.success) {
                // toast.success(`${questionTitle} Successfully Updated!`);
                setFormData(data.data);
                console.log(JSON.stringify(data.data));

                const exams: string[] = [];
                data.data.map((item: Data) => (
                    exams.push(item.examName)
                ))
                console.log(`Exams: ${exams}`);
                setExamNames(exams);
            }
            else {
                toast.error("Can't Update!");
            }
        }
        catch (error) {
            console.error("Can't make API Call");
        }
        finally {
            setLoading(false);
        }
    }

    const fetchStudents = async () => {
        setLoading(true);
        const sendData = {
            examName: selectedExam?.examName,
            instituteCode: localStorage.getItem('instituteCode')
        }

        try {
            const res = await fetch(`/api/evaluate`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                }
            });
            const data = await res.json();
            if (data.success) {
                setStudents(data.data);
                console.log(`Students: ${data.data}`)
                toast.success(`Students fetched successfully!`)
            } else {
                toast.error("Failed to fetch students");
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const evaluateStudent = async (studentData: StudentData) => {
        try {
            const res = await fetch('/api/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentData, formData: selectedExam?.questions }),
            });
            const result = await res.json();
            setEvaluationResult(prevState => ({
                ...prevState,
                [`${studentData._id}`]: result.evaluation,
            }));
            setMarksResult(prevState => ({
                ...prevState,
                [`${studentData._id}`]: result.marks,
            }));
        } catch (error) {
            console.error("Error evaluating student:", error);
        }
        finally {
            setPubState(false)
        }
    };

    const publishData = async (
        authId: string, 
        correct: string, 
        wrong: string, 
        marks: string,
        candidateFirstName: string, 
        candidateLastName: string,
        candidateEmail: string
    ) => {
        const sendData = {
            instituteCode: localStorage.getItem('instituteCode'),
            examName: selectedExam?.examName,
            candidateAuthId: authId,
            correct: correct,
            wrong: wrong,
            marks: marks,
            candidateFirstName: candidateFirstName,
            candidateLastName: candidateLastName,
            candidateEmail: candidateEmail,
            questionLength: selectedExam?.questions.length
        }
        try {
            const res = await fetch('/api/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData)
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`${candidateFirstName}'s result published successfully!`);
                console.log(JSON.stringify(data.data));
            }
            else {
                toast.error("Can't Publish!");
            }
        }
        catch (error) {
            console.error("Can't make API Call");
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchExams();
            // getExams();
        }
    }, [isAuthenticated])
    
    return (
        <div className="flex flex-col justify-center items-center h-full mb-8">
            <Toaster/>
            <div className="flex flex-col space-y-1.5 w-2/5">
                <Label htmlFor="framework">Select exam</Label>
                <Select onValueChange={(value) => {
                    const exam = formData.find(item => item.examName === value);
                    setSelectedExam(exam || null);
                }}>
                    <SelectTrigger id="option">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent defaultValue={`Option 1`} position="popper">
                        {formData.map((item) => (
                            <SelectItem key={`${item.examName}`} value={`${item.examName}`}>{item.examName}</SelectItem>    
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={() => fetchStudents()}>Submit</Button>
            </div>
            <Separator className="mt-4 mb-3 w-4/5"/>
            {students.length > 0 && (
                <>
                    <h2 className="text-2xl mb-2 font-bold">Students</h2>
                    <div className="w-full">
                        <div className="w-auto flex justify-between text-slate-500 rounded-md py-2 px-5 mx-3">
                            <p>Name & Email</p>
                            <p>Total Marks</p>
                            <p>Evaluate</p>
                        </div>
                        <div className="flex flex-col w-full gap-2 list-none">
                            {students.map((student, index) => (
                                <div key={index} className="w-full">
                                    <div className="flex flex-row gap-4 border rounded-md mx-3 p-2">
                                        <div className="w-full px-3 flex flex-row items-center justify-between gap-2">
                                            <div>
                                                <p className="font-semibold">{student.candidateFirstName} {student.candidateLastName}</p> 
                                                <p>{student.candidateEmail}</p>
                                            </div>
                                            <div className="flex gap-2 ">
                                                {evaluationResult[`${student._id}`] && (
                                                    <p>Correct Answers: {evaluationResult[`${student._id}`].correct}</p>
                                                )}
                                                <Separator orientation="vertical"/>
                                                {evaluationResult[`${student._id}`] && (
                                                    <p>Wrong Answers: {evaluationResult[`${student._id}`].wrong}</p>
                                                )}
                                            </div>
                                            {evaluationResult[`${student._id}`] && (
                                                    <p className="border rounded-md p-3">
                                                        {marksResult[`${student._id}`]}
                                                    </p>
                                            )}
                                            <Button onClick={() => evaluateStudent(student)}>Evaluate</Button>
                                            <Button onClick={() =>
                                                publishData(
                                                    `${student.candidateAuthId}`,
                                                    `${evaluationResult[`${student._id}`].correct}`,
                                                    `${evaluationResult[`${student._id}`].wrong}`,
                                                    `${marksResult[`${student._id}`]}`,
                                                    `${student.candidateFirstName}`,
                                                    `${student.candidateLastName}`,
                                                    `${student.candidateEmail}`,
                                                )}
                                                disabled={pubState}>Publish</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}