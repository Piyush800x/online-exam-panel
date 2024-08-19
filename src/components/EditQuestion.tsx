'use client';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

export default function EditQuestion(){
    const {isAuthenticated} = useKindeBrowserClient();
    const [formData, setFormData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedExam, setSelectedExam] = useState<Data | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [questionTitle, setQuestionTitle] = useState<string | undefined>('');

    const fetchQuestions = async () => {
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
                toast.success(`${questionTitle} Successfully Updated!`);
                setFormData(data.data);
                console.log(JSON.stringify(data.data));
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

    const handleEdit = async () => {
        if (selectedExam && selectedQuestion) {
            const instiCode = localStorage.getItem('instituteCode');
            const metadata = {
                institutionCode: instiCode,
                examName: selectedExam.examName,
                prevQuestionTitle: questionTitle
            };
    
            try {
                const res = await fetch('/api/question', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Metadata': JSON.stringify(metadata)
                    },
                    body: JSON.stringify(selectedQuestion)
                });
    
                const data = await res.json();
                if (data.success) {
                    toast.success("Question Updated Successfully!");
                } else {
                    toast.error("Failed to update the question.");
                }
            } catch (error) {
                toast.error("API call failed.");
            }
        }
    }

    const handleDelete = async () => {
        if (selectedExam && selectedQuestion) {
            const instiCode = localStorage.getItem('instituteCode');
            const metadata = {
                instituteCode: instiCode,
                examName: selectedExam.examName,
                questionTitle: questionTitle
            };
    
            try {
                const res = await fetch('/api/question', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(metadata)
                });
    
                const data = await res.json();
                if (data.success) {
                    toast.success("Question Removed Successfully!");
                } else {
                    toast.error("Failed to remove the question.");
                }
            } catch (error) {
                toast.error("API call failed.");
            }
        }
    }

    useEffect (() => {  
        fetchQuestions();
    }, [isAuthenticated])

    if (loading) {
        return (
            <div><h1>Loading...</h1></div>
        )
    }

    // if (examName === null) {
    //     return <AddExamName/>
    // }
    
    return (
        <div className="flex justify-center h-full mb-8">
            <Card className="w-2/5 mb-4">
                <CardHeader>
                    <CardTitle>Edit Questions</CardTitle>
                    <CardDescription>Edit the questions here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Select exam</Label>
                            <Select onValueChange={(value) => {
                                const exam = formData.find(item => item.examName === value);
                                setSelectedExam(exam || null);
                                setSelectedQuestion(null);
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
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Select question</Label>
                            <Select onValueChange={(value) => {
                                const question = selectedExam?.questions.find(q => q.questionTitle === value);
                                setSelectedQuestion(question || null);
                                setQuestionTitle(question?.questionTitle)
                            }}>
                                <SelectTrigger id="option">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                {selectedExam?.questions.map((question) => (
                                    <SelectItem key={question.questionTitle} value={question.questionTitle}>
                                        {question.questionTitle}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Question title</Label>
                            <Input 
                                id="questionTitle" placeholder="Edit question title"
                                value={selectedQuestion?.questionTitle || ''}
                                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionTitle: e.target.value } as Question)} 
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 1</Label>
                            <Input
                                id="optionOne"
                                placeholder="Edit Option 1"
                                value={selectedQuestion?.optionOne || ''}
                                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, optionOne: e.target.value } as Question)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 2</Label>
                            <Input
                                id="optionTwo"
                                placeholder="Edit Option 2"
                                value={selectedQuestion?.optionTwo || ''}
                                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, optionTwo: e.target.value } as Question)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 3</Label>
                            <Input
                                id="optionThree"
                                placeholder="Edit Option 3"
                                value={selectedQuestion?.optionThree || ''}
                                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, optionThree: e.target.value } as Question)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 4</Label>
                            <Input
                                id="optionFour"
                                placeholder="Edit Option 4"
                                value={selectedQuestion?.optionFour || ''}
                                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, optionFour: e.target.value } as Question)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Correct Answer</Label>
                            <Select onValueChange={(value) => {
                                    setSelectedQuestion({ ...selectedQuestion, answer: value } as Question);
                                }}>
                                <SelectTrigger id="correctAnswer">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="optionOne">Option 1</SelectItem>
                                    <SelectItem value="optionTwo">Option 2</SelectItem>
                                    <SelectItem value="optionThree">Option 3</SelectItem>
                                    <SelectItem value="optionFour">Option 4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <div className="flex gap-x-5">
                        <Button className="w-20" onClick={() => handleEdit()}>Edit</Button>
                        <Button onClick={() => handleDelete()}>Remove</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export function AddExamName() {
    const [examName, setExamName] = useState<string | null>(null);

    const handleSubmit = () => {
        localStorage.setItem('examName', `${examName}`);
    }

    return (
        <>
            <Toaster/>
            <div className="flex justify-center gap-4">
                <div className="flex flex-col w-2/5 space-y-1.5">
                    <Label htmlFor="name">Exam Name</Label>
                    <Input type="text" onChange={(e) => setExamName(e.target.value)} placeholder="Enter exam name" />
                    <Button onClick={() => handleSubmit()}>Submit</Button>
                </div>
            </div>
        </>
    )
}