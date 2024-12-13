import {useState} from 'react'
import Navi from '@/components/Navi/Navi'

const Page = ({children}) => {
    return (
        <>
            <Navi />
            {children}
        </>
    )
}

export default Page