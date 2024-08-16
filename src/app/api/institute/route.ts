import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`API DATA: ${JSON.stringify(data)}`)

    try {
        const institutes = await db.collection('institutes').findOne({userAuthId: data.userAuthId});
        console.log(`API: ${JSON.stringify(institutes)}`)
        if (institutes == null) {
            return NextResponse.json({success: false}, {status: 400});
        }
        else if (`${institutes.userAuthId}` === `${data.userAuthId}`) {
            return NextResponse.json({data: institutes, success: true}, {status: 200});    
        }
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 404});
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');

    try {
        const institutes = await db.collection('institutes').insertOne(data);
        return NextResponse.json({data: institutes, success: true}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400});
    }
}