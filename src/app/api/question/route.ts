import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, ObjectId } from "mongodb";

interface Question {
    questionTitle: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
    answer: string;
}

interface Exam {
    _id: ObjectId;
    instituteCode: string;
    examName: string;
    questions: Question[];
}

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`API: ${JSON.stringify(data)}`);
    try {
        const questions = await db.collection('questions').find({instituteCode: data.institutionCode}).toArray();
        console.log(`RES: ${questions}`)
        return NextResponse.json({data: questions, success: true}, {status: 200});
    }   
    catch (error) {
        return NextResponse.json({success: false}, {status: 404});
    }
}

// Ok
export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`API: ${JSON.stringify(data)}`);
    const {instituteCode, examName, ...question} = data;

    // This will create the entry of question if not exists
    try {
        const res = await db.collection('questions').updateOne(
            {instituteCode: data.instituteCode, examName: data.examName},
            {$push: {questions: question}},
            {upsert: true}
        );
        return NextResponse.json({data: res, success: true}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400});
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const metadata = JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`API: ${JSON.stringify(metadata)}`);

    const { institutionCode, examName, prevQuestionTitle } = metadata;
    const editedData = await req.json();
    console.log(`API: ${JSON.stringify(editedData)}`);

    try {
        const updatedResult = await db.collection('questions').updateOne(
            {
                instituteCode: institutionCode,
                examName: examName,
                'questions.questionTitle': prevQuestionTitle
            },
            {
                $set: {
                    'questions.$.questionTitle': editedData.questionTitle,
                    'questions.$.optionOne': editedData.optionOne,
                    'questions.$.optionTwo': editedData.optionTwo,
                    'questions.$.optionThree': editedData.optionThree,
                    'questions.$.optionFour': editedData.optionFour,
                    'questions.$.answer': editedData.answer
                }
            }
        );

        if (updatedResult.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const { instituteCode, examName, questionTitle } = await req.json();
    console.log(`API DATA: ${instituteCode} ${examName} ${questionTitle}`);
    
    try {
        const result = await db.collection<Exam>('questions').updateOne(
            {
                instituteCode: instituteCode,
                examName: examName,
            },
            {
                $pull: { "questions": { "questionTitle": questionTitle } as Question}
            }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete question:", error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}