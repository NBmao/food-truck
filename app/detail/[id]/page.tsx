'use client'

import useApi from "@/app/hook/useApi"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button, Result, Descriptions, Spin } from "antd"
import styles from './page.module.css'


export default function Page({ params }: { params: { id: string } }) {

    const { id } = params;

    const { data, loading, error } = useApi(`/api?id=${id}`);
    const router = useRouter()

    if (loading) {
        return <Spin />
    } else if (error || data?.length !== 1) {
        return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
            />
        )
    }

    const info = data[0];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Button type="primary" onClick={() => router.back()}>Back</Button>
            </div>
            <h1>{info.applicant}</h1>
            <div className={styles.info}>
                <Image
                    src="/detail.jpg"
                    alt="Food Truck Detail"
                    width={225}
                    height={180}
                    className={styles.img}
                />

                <Descriptions bordered>
                    <Descriptions.Item label="Name">{info.applicant}</Descriptions.Item>
                    <Descriptions.Item label="Facility Type">{info.facilitytype}</Descriptions.Item>
                    <Descriptions.Item label="CNN">{info.cnn}</Descriptions.Item>
                    <Descriptions.Item label="Foods" span={3}>{info.fooditems}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>{info.address}</Descriptions.Item>
                    <Descriptions.Item label="(Todo:)" span={3}><Button type="link">Show In Google Map</Button></Descriptions.Item>
                </Descriptions>
            </div>

            <div className={styles.desc}>
                <h3>Description:</h3>
                <p>It is super delicious!</p>
            </div>       
        </div>
    )
}