'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { SearchOutlined } from '@ant-design/icons';
import {
  Input,
  Space,
  // ConfigProvider,
  // ThemeConfig,
  Button,
} from 'antd'
import styles from './page.module.css'

const HomePage = () => {

  const [value, setVal] = useState<string>();

  return (

    <div className={styles.home}>
      <Image
        src="/logo.jpg"
        alt="Food Truck Logo"
        width={319}
        height={174}
        priority
      />

      {/* <Search
        placeholder="what to eat today ?"
        allowClear
        enterButton="Search"
        size="large"
      /> */}
      <Space className={styles.search}>
        <Input
          placeholder='what to eat today ?'
          size='large'
          style={{ width: '60vw' }}
          value={value}
          onChange={e => setVal(e.target.value)}
        />
        <Link href={`/results/${value??'all'}`}>
          <Button icon={<SearchOutlined />} size='large' type='primary'>Search</Button>
        </Link>
      </Space>

    </div>
  )
}
export default HomePage