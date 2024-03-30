import React from 'react'

import roomOne from "../assets/img/room1.jpg"
import roomTwo from "../assets/img/room2.jpg"
import personLogo from "../assets/img/personLogo.png"
import goldBed from "../assets/img/goldBed.png"
const Room = () => {
    console.log('ss ')
    return (
        <div className='mt-[6%] flex justify-center px-[15%]'>

            <div className='grid grid-cols-2 w-full font-sans '>
                <div className='col-span-1 h-[80vh] px-10 border-r-2'>
                    <p className='font-bold text-2xl text-[#BB8B00] '>Elegant White Room</p>
                    <div className='flex items-center gap-4'>
                        <img src={personLogo} className='h-5' alt="" />
                        <p className='text-[#BB8B00] text-md'>Pax: 2 Adult</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img src={goldBed} className='h-4 w-6' alt="" />
                        <p className='text-[#BB8B00] text-md'>Bed: 1 Queen Size</p>
                    </div>
                    <p className='text-[#36454F]'> <span className='font-bold'>Roon Inclusions:</span> 28m²• Limited view• Shower over bath• Air conditioned• Cable/Satellite TV• Room Service• Internet Access• Linen and Towels Provided• Telephone• Spa• Lift/Elevator Access• Desk• Room Safe• Television• Tea/Coffee Maker• Iron/Ironing board• Hairdryer• Bathrobes Provided</p>
                    <p></p>
                    <p></p>
                    <div className='h-[60%]'
                        style={{
                            backgroundImage: `url(${roomOne})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '10px' // Adjust the value as needed
                        }} >
                    </div>

                </div>

                <div className='col-span-1 h-[80vh] px-10'>
                    <p className='font-bold text-2xl text-[#BB8B00] '>Elegant White Room</p>
                    <div className='flex items-center gap-4'>
                        <img src={personLogo} className='h-5' alt="" />
                        <p className='text-[#BB8B00] text-md'>Pax: 2 Adult</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img src={goldBed} className='h-4 w-6' alt="" />
                        <p className='text-[#BB8B00] text-md'>Bed: 1 Queen Size</p>
                    </div>
                    <p className='text-[#36454F]'> <span className='font-bold'>Roon Inclusions:</span> 28m²• Limited view• Shower over bath• Air conditioned• Cable/Satellite TV• Room Service• Internet Access• Linen and Towels Provided• Telephone• Spa• Lift/Elevator Access• Desk• Room Safe• Television• Tea/Coffee Maker• Iron/Ironing board• Hairdryer• Bathrobes Provided</p>
                    <p></p>
                    <p></p>
                    <div className='h-[60%]'
                        style={{
                            backgroundImage: `url(${roomOne})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '10px' // Adjust the value as needed
                        }} >
                    </div>

                </div>






            </div>

        </div>
    )
}

export default Room