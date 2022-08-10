import {default as React, useEffect, useState} from "react";
import {saveRoleState} from "../../pages/state/slice/roleSlice";
import {formatDate} from "../../util/common";


interface Info {
    item: any
}

const ShowDate = ({item}: Info) => {

    const [time,setTime] = useState<string>('');

    useEffect(() => {
        let second = new Date(item.createTime.substring(0,19)).getTime()
        setTime(formatDate(second))

    }, [item]);


    return <div style={{color:'#868990',fontSize:11}}>{time}</div>;

};

export default ShowDate;