import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function NonUserNavbar() {

return(
	  <div className='mb-3'>
		<div className="flex flex-wrap items-center justify-between px-2 bg-emerald-600 shadow-md sticky top-0 z-0 ">
		  <div className="p-3 lg:px-4 w-full">
			<div className=" lg:w-auto px-4 flex justify-center lg:static lg:block lg:justify-start">
			  {/* <Link href="/dashboard"> */}
				<p className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
				  Owner-Operator
				</p>
			  {/* </Link> */}
			</div>    
		  </div>
		</div>
	  </div>
	)
  }

