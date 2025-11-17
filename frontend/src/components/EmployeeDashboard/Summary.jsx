import 'react'
import { FaUser } from 'react-icons/fa';
import '../../styles/SummaryCard.css'; 
import { useAuth } from '../../context/authContext';


// eslint-disable-next-line react/prop-types
const SummaryCard = ({color}) => {
    const {user} = useAuth();
  return (
    <div className='p-6'>
    <div className='summary-card'>
        <div className={`summary-card-icon ${color}`}>
           <FaUser/>
        </div>
        <div className='summary-card-content'>
            <p className='summary-card-text'>Welcome back</p>
            <p className='summary-card-number'>{user.name}</p>
        </div>
    </div>
    </div>
  )
}

export default SummaryCard