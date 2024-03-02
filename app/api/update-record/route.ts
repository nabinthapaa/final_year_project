import { NextRequest, NextResponse } from "next/server";
import { ConnectToDB } from "@/libs/connectToDB";
import Record from "@/models/Record";

export async function POST(req: NextRequest){
    try{
        const record = await req.json();
        await ConnectToDB();
        await Record.create({...record});
        return NextResponse.json({
            message:"Record updated succesfully",
            status: 200
        });
    }catch(error){
        if(error instanceof Error){
        return NextResponse.json({
            message:"Record updated succesfully",
            status: 404
        });
        }
    }
}
