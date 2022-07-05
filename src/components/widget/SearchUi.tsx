import * as React from "react";
import {RowItemCenterWrapper} from "../../theme/commonStyle";
import TextareaAutosize from 'react-textarea-autosize';
import SearchIcon from "../../img/search.png";

interface Info {
    inputValue:string,
    setInputValue:any
}

const SearchUi = ({inputValue, setInputValue}:Info) => {


    return <RowItemCenterWrapper className='search-body'>

        <img style={{width:40,height:30,padding:'5px 10px'}} src={SearchIcon}/>

        <TextareaAutosize
            className='search-input'
            rows={1}
            onChange={e => setInputValue(e.target.value!)}
            placeholder={""}
            value={inputValue}
        />


    </RowItemCenterWrapper>


};

export default SearchUi;