import React,{useState} from 'react';
import datas from './datas.json';

const Data = () => {
    const[nData,setnData]=useState(datas);
    // console.log(datas[1].salary)
    const handleclick=()=>{
      setnData([])
        
    }
    const handleremove=(itemId)=>{
      setnData(nData.filter(item=>item.id!==itemId))

    }
    const handleupdate=(itemId)=>{
      setnData(nData.map(items=>{
        if(items.id==itemId){
          return{name:"newName"}
        }
        else{
          return items;
        }
      }))

    }
  return (
    <div>
      <ul>
      {
        // datas.map((items)=>{
        //   <li key={items.id}>
        //     {console.log(items.id)}
        //   </li>
        nData.map(items=>
          <li key={items.id}>
            {items.name}
            <br/>
            <button onClick={()=>{
              handleupdate(items.id)}}>Update
              </button>
            <button onClick={()=>{
              handleremove(items.id)}}>Remove</button>

          </li>

          

        )
      }

      </ul>
      
      <button onClick={handleclick}>Clear</button>
    </div>
  )
}

export default Data
