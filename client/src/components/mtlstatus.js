import React from "react";
import { GiBrickWall } from 'react-icons/gi'
import { HiCheck } from 'react-icons/hi'
import { FaDollarSign } from 'react-icons/fa'

const MtlStatus = ( { status } ) => {
  switch ( status ){
    case 'tbd':
      return (
        <span><HiCheck className='success'/><GiBrickWall className='success' /></span>
      );
    case 'stock':
      return (
        <span><HiCheck className='success' /><GiBrickWall className='success' /></span>
      );
    case 'need-order':
      return (
        <span><FaDollarSign className='fail' /><GiBrickWall className='fail' /></span>
      );
    case 'ordered':
      return (
        <span><FaDollarSign className='ordered' /><GiBrickWall className='ordered' /></span>
      );
    case 'ordered-confirmed':
        return (
          <span ><FaDollarSign className='success' /><GiBrickWall className='success' /></span>
        );
    case 'ordered-received':
        return (
          <span><HiCheck className='success' /><GiBrickWall className='success' /></span>
        );
    default:
      return
  }
};

export default MtlStatus;
