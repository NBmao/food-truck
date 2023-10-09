import dbData from './db.json';
import { NextResponse } from 'next/server';


export function searchFtById(id: string) {
    try {
        const item = dbData.find(record => record.objectid === id);
        return NextResponse.json({ body: [item] }, { status: 200 });

    } catch {
        return NextResponse.json({ error: 'cannot find this foodtruck id' }, { status: 500 });
    }

}

export function searchFtsByKeyword(keyword: string) {
    try {
        if (keyword === 'all') {
            return NextResponse.json({ body: dbData }, { status: 200 });
        } else {
            const filterItems = dbData.filter(item => item.applicant.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));

            return NextResponse.json({ body: filterItems }, { status: 200 });
        }

    } catch {
        return NextResponse.json({ body: [] }, { status: 200 });
    }

}