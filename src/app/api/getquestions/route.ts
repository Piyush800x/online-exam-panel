import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, ObjectId } from "mongodb";

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await req.json();
    console.log(`API: ${JSON.stringify(data)}`);
    try {
        const questions = await db.collection('questions').find({_id: new ObjectId(data.id)}).toArray();
        console.log(`RES: ${JSON.stringify(questions)}`)
        return NextResponse.json({data: questions, success: true}, {status: 200});
    }   
    catch (error) {
        return NextResponse.json({success: false}, {status: 404});
    }
}