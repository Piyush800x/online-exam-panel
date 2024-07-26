import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ExamBoard() {
    const questions = Array.from({ length: 100 }, (_, i) => i + 1);
    return (
        <div className="px-10 flex flex-row">
            <div className="">
                {/* EXAM */}
                <div>
                    <h1>Question {}</h1>
                    <br />
                    <Image src={""} alt={`Question ${''}`} width={240} height={120}/>
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"Option1"} id={"r1"}/>
                            <Label htmlFor={"r1"}>{"Option1"}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"Option2"} id={"r2"}/>
                            <Label htmlFor={"r2"}>{"Option2"}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"Option3"} id={"r3"}/>
                            <Label htmlFor={"r3"}>{"Option3"}</Label>
                        </div>
                    </RadioGroup>
                </div>
                {/* SUBMIT */}
                <div className="flex flex-row gap-x-3">
                    <Button>SAVE & NEXT</Button>
                    <Button>CLEAR</Button>
                    <Button>SAVE & MARK FOR REVIEW</Button>
                    <Button>MARK FOR REVIEW & NEXT</Button>
                </div>
            </div>
            <div className="">
                {/* INSTRUCTION TYPE */}
                <div className="border-2 border-black border-dotted px-5 py-5">
                    <div className="flex flex-row">
                        <div className="gap-x-2">
                            <div className="flex flex-row gap-x-2">
                                <div>{74}</div>
                                <div>Not Visited</div>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <div>{1}</div>
                                <div>Not Answered</div>
                            </div>
                        </div>
                        <div className="gap-x-2">
                            <div className="flex flex-row gap-x-2">
                                <div>{0}</div>
                                <div>Answered</div>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <div>{0}</div>
                                <div>Marked for Review</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-x-2">
                            <div>{0}</div>
                            <div>Answered & Marked for Review</div>
                        </div>
                    </div>
                </div>
                {/* ANSWER COUNT */}
                <div>
                    <div className="grid grid-cols-10 gap-2 p-4">
                        {questions.map(seat => (
                            <div
                            key={seat}
                            className={`flex items-center justify-center w-10 h-10 border rounded ${
                                seat === 1 ? 'bg-orange-500 text-white' : 'bg-gray-100'
                            }`}
                            >
                            {seat}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}