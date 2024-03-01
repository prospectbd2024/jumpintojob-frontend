"use client"
import Home from "@/Home/Home/Home.jsx"
import { useUserContext } from "@/UserContext/UserContext"; 
import { useRouter ,useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
export default function HomeContainer() {
  const [loddedUserData,setLoddedUserData] = useState(null)
  const { setUserData } = useUserContext();
  const router = useRouter();
  const params = useSearchParams();
  useEffect(()=>{
    // setLoddedUserData(params.get('userData'));
    let userDatas = params.get('userData');
    // console.log(userDatas);
    if (userDatas){
      console.log(JSON.parse(userDatas))
      setUserData(JSON.parse(userDatas))
      router.push('/')

    }
  },[])
  return (<>

  <Home/>

  </>
  )
}
