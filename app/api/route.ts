import { searchFtById, searchFtsByKeyword } from "@/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (id) {
        return searchFtById(id);
    }
    const keyword = searchParams.get('keyword');

    return searchFtsByKeyword(keyword ?? '');
}
