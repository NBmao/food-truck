'use client'

import useApi from "@/app/hook/useApi"
import { useRouter } from 'next/navigation'
import { Button, Result, Tag, Table, TableColumnsType } from "antd"
import { FoodTruck } from "@/interfaces";
import Link from "next/link";
import styles from './page.module.css'


export default function Page({ params }: { params: { keyword: string } }) {

    const { keyword } = params;

    const { data, loading, error } = useApi(`/api?keyword=${keyword}`);
    const router = useRouter()

    if (error) {
        return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
            />
        )
    }

    const columns: TableColumnsType<FoodTruck> = [
        {
            title: 'Applicant',
            dataIndex: 'applicant',
            key: 'applicant',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Food',
            dataIndex: 'fooditems',
            key: 'fooditems',
        },
        {
            title: 'Facility Type',
            dataIndex: 'facilitytype',
            key: 'facilitytype',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (

                <Link href={`/detail/${record.objectid}`}>
                    <Button type="link"> detail </Button>
                </Link>
            ),
        },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.keyword}>Search Results: <Tag color="#108ee9">{keyword}</Tag></div>
                <Button type="primary" onClick={() => router.push('/')}>Back</Button>
            </div>
            <Table columns={columns} dataSource={data ?? []} loading={loading} />
        </div>
    )
}