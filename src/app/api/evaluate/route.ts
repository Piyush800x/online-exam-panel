import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

interface Question {
    questionTitle: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
    answer: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`API DATA: ${JSON.stringify(data)}`)

    const query = {
        examName: data.examName,
        instituteCode: data.instituteCode
    }

    try {
        const students = await db.collection('answers').find(query).toArray();
        console.log(`API: ${JSON.stringify(students)}`)
        
        return NextResponse.json({data: students, success: true}, {status: 200});    
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 404});
    }
}

export async function POST(req: NextRequest) {
    const { studentData, formData } = await req.json();
    let correct = 0;
    let wrong = 0;
    let marks = 0;
    formData.forEach((question: any) => {
        const studentAnswer = studentData.answers.answers.find((answer: any) => answer.questionTitle === question.questionTitle);
        if (studentAnswer) {
            console.log(`${studentAnswer.answer} - ${JSON.stringify(question.questionMark)}`);
            if (`${studentAnswer.answer}` === `${question[question.answer]}`) {
                correct++;
                marks += Number(question.questionMark);
            } else {
                marks -= Number(question.negativeMark);
                wrong++;
            }
        }
    });

    return NextResponse.json({
        evaluation: { correct, wrong },
        marks: marks
    });
}