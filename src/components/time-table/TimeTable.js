import React from 'react';
import './timeTable.scss';
import Table from 'react-bootstrap/Table';

const TimeTable = ({tcoloumn}) => {

    const data = [
        {"Monday":["English","Tamil","Maths","Science","Social","Tamil","English","Science","Social"]},
        {"Tuesday":["Social","Tamil","Maths","PT","Social","Tamil","Maths","Science","Social"]},
        {"Wednesday":["PT","Tamil","Maths","Science","Social","Tamil","PT","Science","Social"]},
        {"Thursday":["English","PT","Maths","Science","Social","Tamil","Maths","Maths","Social"]},
        {"Friday":["Maths","Tamil","Maths","Science","Social","English","PT","Science","Social"]},
        {"Saturday":["Chemistry","Tamil","PT","Science","Social","Tamil","Maths","Science","PT"]}
    ];

    return (
        <div className='timeTableContainer'>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Days</th>
                        {Array.from({ length: tcoloumn }).map((_, index) => (
                            <th key={index}>{`Period-${index+1}`}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((itm,index)=>(
                            <tr key={index}>
                                <td className='weekdays'>{Object.keys(itm)}</td>
                                {Array.from({ length: tcoloumn }).map((_, index) => (
                                    <td key={index} className='subjects'>{itm[Object.keys(itm)][index]}</td>
                                ))}
                            </tr>   
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )

}

export default TimeTable;