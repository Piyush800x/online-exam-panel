import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Toaster, toast } from 'sonner'
import { ObjectId } from "mongodb";

export default function AddQuestions(){
    const [question, setQuestion] = useState({
        questionTitle: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        answer: "",
    });
    const {isAuthenticated, user} = useKindeBrowserClient();
    const [examName, setExamName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [institutionCode, setInstituteCode] = useState<string | null>(null);

    // const val = localStorage.getItem('examName');
    
    // if (val === null) {
    //     setExamName(null)
    //     return (
    //         <div>
    //             <AddExamName/>
    //         </div>
    //     )
    // }

    const handleAddDone = async () => {
        localStorage.removeItem("examName");
    };

    const handleSubmit = async () => {
        const sendData = {...question, examName: examName, instituteCode: institutionCode}
        console.log(JSON.stringify(question));

        try {
            const res = await fetch('/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                }
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`${question.questionTitle} Successfully Saved!`);
                setQuestion({
                    questionTitle: "",
                    optionOne: "",
                    optionTwo: "",
                    optionThree: "",
                    optionFour: "",
                    answer: "Option 1",
                });
            }
            else {
                toast.error("Can't Save!");
            }
        }
        catch (error) {
            console.error("Can't make API Call");
        }
    }

    useEffect (() => {
        console.log(`Auth: ${isAuthenticated}`);
        if (isAuthenticated) {
            const val = localStorage.getItem('examName');
            if (val === null) {
                setExamName(null)
            }
            else {
                setExamName(val);
            }
            const code = localStorage.getItem('instituteCode');
            if (code === null) {
                setInstituteCode(null)
            }
            else {
                setInstituteCode(code);
            }
        }
        setLoading(false);
    }, [isAuthenticated])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (examName === null) {
        return <AddExamName/>
    }

    return (
        <div className="flex justify-center">
            <Toaster/>
            <Card className="w-2/5 h-full">
                <CardHeader>
                    <CardTitle>Add Questions</CardTitle>
                    <CardDescription>Add the question and the options here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Question title</Label>
                                <Textarea value={question.questionTitle} onChange={(e) => setQuestion({...question, questionTitle: e.target.value})} placeholder="Enter question title" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Option 1</Label>
                                <Input type="text" value={question.optionOne} onChange={(e) => setQuestion({...question, optionOne: e.target.value})} placeholder="Specify Option 1" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Option 2</Label>
                                <Input type="text" value={question.optionTwo} onChange={(e) => setQuestion({...question, optionTwo: e.target.value})} placeholder="Specify Option 2" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Option 3</Label>
                                <Input type="text" value={question.optionThree} onChange={(e) => setQuestion({...question, optionThree: e.target.value})} placeholder="Specify Option 3" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Option 4</Label>
                                <Input type="text" value={question.optionFour} onChange={(e) => setQuestion({...question, optionFour: e.target.value})} placeholder="Specify Option 4" />
                            </div>
                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Answer</Label>
                                <Input type="text" value={question.answer} onChange={(e) => setQuestion({...question, answer: e.target.value})} placeholder="Specify the correct option" />
                            </div> */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Correct Answer</Label>
                                <Select onValueChange={(value) => {setQuestion({...question, answer: value})}}>
                                    <SelectTrigger id="option">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent defaultValue={`OptionOne`} position="popper">
                                        <SelectItem value={`optionOne`}>Option 1</SelectItem>
                                        <SelectItem value={`optionTwo`}>Option 2</SelectItem>
                                        <SelectItem value={`optionThree`}>Option 3</SelectItem>
                                        <SelectItem value={`optionFour`}>Option 4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Save and next</Button>
                    <Button onClick={() => handleAddDone()}>Finish Adding</Button>
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