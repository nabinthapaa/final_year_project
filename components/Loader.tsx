import React from 'react'

export default function Loader({show}:{show: boolean}) {
  return (
    <div className='absolute right-0 top-0 left-0 bottom-0 bg-black/60 z-1000' data-disabled={show}>Loader</div>
  )
}
