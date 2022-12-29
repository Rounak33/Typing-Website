import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db,auth } from '../firebaseConfig';
import Graph from '../Components/Graph';

const ComparePage = () => {
    const {username} = useParams();
    const [loggedinUserData, setLoggedinUserData] = useState([]);
    const [loggedinUserGraphData, setLoggedinUserGraphData] = useState([]);

    const [compareUserData, setCompareUserData] = useState([]);
    const [compareUserGraphData, setCompareUserGraphData] = useState([]);
    const getUID = async()=>{
        const response = await db.collection('usernames').doc(username).get();
        return response.data().uid;
    }

    const getData = async()=>{
        const compareUserUID = await getUID();
        const {uid} = auth.currentUser;

        const resultsRef = db.collection('Results');
        let tempData = [];
        let tempGraphData = []
        resultsRef.where('userID','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log("working");
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
            });
            setLoggedinUserData(tempData);
            setLoggedinUserGraphData(tempGraphData.reverse());
        });

        let tempData1 = [];
        let tempGraphData1 = []
        resultsRef.where('userID','==',compareUserUID).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log("working");
                tempData1.push({...doc.data()});
                tempGraphData1.push([doc.data().timeStamp, doc.data().wpm]);
            });
            setCompareUserData(tempData1);
            setCompareUserGraphData(tempGraphData1.reverse());
        });

    }

    useEffect(()=>{
        getData();
    },[]);
  return (
    <div className='comparison'>
        <div className="graph">
            <div className="you">You </div>
            <Graph graphData={loggedinUserGraphData} type='date'/>
           
        </div>
        <hr />
        <div className="graph">
        <div className="comparingWith">{username}</div>
            <Graph graphData={compareUserGraphData} type='date'/>
        
        </div> 
    </div>
  )
}

export default ComparePage