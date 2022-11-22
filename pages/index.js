import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createClient } from '@supabase/supabase-js'
import {useState,useEffect} from 'react'

// Create a single supabase client for interacting with your database
export default function Home() {
  const [supabase, setSupabase] = useState()
const [name, setName] = useState('')
const [text, setText] = useState('')
const [list, setList] = useState([])
const [count, setCount] = useState()

useEffect(() => {
  setSupabase(createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY))

  
}, [])
useEffect(()=>{
if(supabase)
  supabase.from('todo_list').select().then((result) => {
    console.log(result.data)
    setList(result.data)
  }).catch((err) => {
    console.log(err)
  });
  
},[supabase])

const handleSave=()=>{
  
  supabase.from('todo_list').insert([{name,text}]).then(res=>console.log(res) ).catch(err=>console.log(err))
}

const handleTest =()=>{
  supabase.rpc('test').then(result=>setCount(result.data))
}

  return (
    <div>
        <input value={name}  onChange={(e)=>setName(e.target.value)}/>
        <input value={text}  onChange={(e)=>setText(e.target.value)}/>
        <button onClick={handleSave}>save</button>
        {list?.map((el,index)=>(<div key={index}>{el.name} {el.text}</div>))}
        <button onClick={handleTest}>Supabase test</button>
   <div>Кол-во записей в бд</div> <span>{count}</span>
    </div>
  )
}
