import React,{useState,useEffect} from 'react';
import './timeTable.scss';
import {useSelector} from 'react-redux';
import Table from 'react-bootstrap/Table';

const TimeTable = ({tcoloumn}) => {

    const[timeTable,setTimeTable] = useState([]);
    const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const timeTableData = useSelector((state)=>state?.timeTableReducer);

    useEffect(()=>{
        setTimeTable(timeTableData?.staffTimeTable);
        console.log(timeTableData?.staffTimeTable)
    },[timeTableData?.staffTimeTable])

    return (
        <div className='timeTableContainer'>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Days</th>
                        {Array.from({ length: tcoloumn }).map((_, rowIndex) => (
                            <th key={rowIndex}>{`Period-${rowIndex+1}`}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: DAYS.length }).map((_, rowIndex) => {
                            return (       
                                <tr key={rowIndex}>
                                    <td className="weekdays">{DAYS[rowIndex]}</td>
                                    {Array.from({ length: 8 }).map((_, colIndex) => (
                                        <td key={colIndex} className="subjects">
                                            {
                                                timeTable?.filter((data)=> (data.Day === DAYS[rowIndex] && data.Period === colIndex + 1)).map((itm,index)=>{
                                                    return (
                                                        <div key={index}>
                                                            <span>{itm?.Subjectname ? itm?.Subjectname : 'NA'}</span><br />
                                                            <span>{itm?.Classname}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    ))}
                                </tr>                     
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )

}

export default TimeTable;