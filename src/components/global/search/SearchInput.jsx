import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import search from '../../../assets/svg/search.svg'
import onlyPlus from '../../../assets/svg/onlyPlus.svg'
const SearchInput = ( { setShow, filterSomething, placeHolder} ) => {

  const handleOnChange = (e) => {
    filterSomething(e.target.value);
  }

  return (
    <div className='search-bar'>
        <InputGroup>
            <Form.Control 
                placeholder={placeHolder}
                onChange={(e)=> handleOnChange(e) }
            />
        <img className='img-search-bar' src={search} alt="icon-search" />
        </InputGroup>
        <div className='btn-new' onClick={() => setShow(true)}>
          <img src={onlyPlus} alt="" />
          <button className='btn-main' >
            Nuevo</button>
        </div>
    </div>
  )
}

export default SearchInput;