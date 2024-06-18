import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { useCallback, useState } from 'react';

type RegistrationPricingProps = {
  name: string
}

export function RegistrationPricing({name}: RegistrationPricingProps) {
  const [years, setYears] = useState(1)
  const increment = useCallback(() => {
    setYears(n => n + 1)
  }, [])
  const decrement = useCallback(() => {
    setYears(n => n > 1 ? n - 1 : n)
  }, [])
  return (
    <div className='flex justify-between max-w-[784px] w-screen mx-4 bg-[#F7F7F7] border border-line/20 rounded-xl p-6 text-gray/60'>
      <div>
        <p className='text-sm mb-2'>CLAIM FOR</p>
        <div className='flex items-center justify-between'>
          <button type="button" onClick={decrement} className='flex items-center justify-center rounded-full bg-gray/10 w-7 h-7'>
            <MinusIcon width="12" height="12" className='fill-gray/80' />
          </button>
          <span className='text-3xl mx-2 text-black'>
          {years} year{years > 1 && 's'}
          </span>
          <button type="button" onClick={increment} className='flex items-center justify-center rounded-full bg-gray/10 w-7 h-7'>
            <PlusIcon width="12" height="12" className='fill-gray/80' />
          </button>
        </div>
      </div>
      <div>
        <p className='text-sm mb-2'>AMOUNT</p>
        <div className='flex align-baseline'>
          <span className='text-3xl mx-2 text-black'>
            {0.01} ETH
          </span>
          <span className="text-xl text-gray/60">${3.82}</span>
        </div>
      </div>
      <button type="button" className='text-xl rounded-full py-3 px-8 text-illoblack bg-gray/10 border-line/20'>
        connect
      </button>
    </div>
  )
}