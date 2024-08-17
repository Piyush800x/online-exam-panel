import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, ObjectId } from "mongodb";


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

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    const editedData = await req.json();

    const { _id, ...updateData } = editedData;
    const id = {_id: data}
    console.log(`data: ${id}`)
    console.log(`editedData: ${editedData.description}`);

    try {
        const updatedResult = await db.collection('questions').updateOne(
            {'_id': new ObjectId(data)},
            {$set: updateData}
        )
        console.log(`updatedResult: ${updatedResult}`)
        if (updatedResult.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ success: false }, { status: 400 });
    }
}