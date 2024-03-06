import { NextRequest, NextResponse } from "next/server";
import Doctor from "@/models/Doctor";
import { ConnectToDB } from "@/libs/connectToDB";

export async function GET(req: NextRequest){
    console.log(req.url);
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || null;
    const s = searchParams.get("s") || null;

    try{
        await ConnectToDB();
        if(s && name && s!=="null" && name !=="null"){
            const name_reg = new RegExp(name, 'i');
            const doctors = await Doctor.find({
                $or:[
                    {firstName: {$regex: name_reg}},
                    {lastName: {$regex: name_reg}}
                ],
                specialization : s,
                verified: true
            }).lean();
            return NextResponse.json({
                data: doctors,
                status: 200
            });

        }
        if(s && s!=='null'){
            const doctors = await Doctor.find({specialization: s, verified: true}).lean();
            return NextResponse.json({
                data: doctors,
                status: 200
            });
        }
        else if(name && name!=="null"){
            const name_reg = new RegExp(name, 'i');
            const doctors = await Doctor.find({
                $or:[
                    {firstName: {$regex: name_reg}},
                    {lastName: {$regex: name_reg}}
                ],
                verified: true
            }).lean();
            return NextResponse.json({
                data: doctors,
                status: 200
            });
        }else throw new Error("Please specify specialization or name");
    }catch(error){
        if( error instanceof Error){
            return NextResponse.json({
                error: error.message,
                status: 404,
            });
        }
    }
}
