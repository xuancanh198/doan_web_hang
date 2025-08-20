'use client' 
import React from 'react'
import {formatDateToDMY} from "@/helpers/ConvertDate"
interface Date{ 
    date : string
}
function ConvertYYMMDD({date} : Date) {
  return (
    <>
        {formatDateToDMY(date)}
    </>
  )
}

export default ConvertYYMMDD
