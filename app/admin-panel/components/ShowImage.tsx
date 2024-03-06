import Image from 'next/image'
import React from 'react'

export default function ShowImage({source, class_}:any) {
  return (
    <Image src={source} width={100} height={100} alt="document" className={class_} />
  )
}
