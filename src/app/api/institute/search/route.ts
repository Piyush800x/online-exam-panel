import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db } from 'mongodb';
// Edit this
export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`data search: ${data.name}`)
    const query = {title: {$regex: data.name, $options: 'i'}};

    try {
        const products = await db.collection('products').find(query).toArray();
        console.log(products);
        return NextResponse.json({products, success: true}, {status: 200})
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400})
    }
}