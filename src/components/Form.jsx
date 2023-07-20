import { useState } from "react";
import axios from 'axios';  
import AudioStream from "./AudioStream.js";
import Loading from "./Loading.jsx";
const url="http://localhost:4000/user";
const apiKey="001268bc5711c98f31af0c528ce77545"
const voiceId = '21m00Tcm4TlvDq8ikWAM';
const voiceSettings = {
  stability: 0,
  similarity_boost: 0,
};
function Form(){
const[result,setresult]=useState({
    "feeling":"",
    "job":"",
    "issue":""
})
const [text,settext]=useState("");
const [loading,setloading]=useState(false);
const [medio,setmedio]=useState(true);
const handleChange = (e) => {
    const { name, value } = e.target;
    
    console.log(value);
    setresult((prevresult) => ({ ...prevresult, [name]: value }));
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setmedio((pre)=>(pre,false));

    setloading((pre)=>(pre,true));
    let {feeling,job,issue}=result;
    console.log(feeling,job,issue);
    let body={
            "usecase": "GPT_MEDITATION_CREATOR",
            "userInput": `feeling ${feeling} right now, they currently are ${job} and facing ${issue} issues today`
    }
    let response=await axios.post(url,body);
    let t=response.data;
    setloading((pre)=>(pre,false));
    settext((pretext)=>(pretext,t))
  }
return <>
<div id="detail">
{medio ? <form>
    <label>
How are you feeling right now? 
    </label>
    <input type="text" 
    placeholder="Enter here"
     name="feeling"
     onChange={handleChange} 
     ></input>
    <label>
    What do you do?
    </label>
    <input type="text"
     placeholder="Enter here" 
     name="job"
     onChange={handleChange}
      ></input>

    <label>
    What issues are you facing today?
    </label>
    <input type="text"
     placeholder="Enter here"
      name="issue"
       onChange={handleChange} 
       ></input>
<input className="submit" type="submit"
 onClick={handleSubmit}
 ></input>
</form> : loading ? <Loading /> :
<AudioStream 
voiceId={voiceId}
 text={text} 
 apiKey={apiKey} 
 voiceSettings={voiceSettings} />}
 </div>
</>
}
export default Form 