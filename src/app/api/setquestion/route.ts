'use server';
import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(data);
    const res = await SetQuestion(data);
    return NextResponse.json({message: res}, {status: 200});
}

export async function SetQuestion(data: any) {
    const client = await mongoClientPromise;
    const db = client.db("ExamQuestions")
    const questionCollection = db.collection('questions');

    const res = await questionCollection.insertOne({
        _id: new ObjectId,
        question: data.question,
        answers: data.options,
        examName: data.examName
    });
    return res.insertedId;
    
}