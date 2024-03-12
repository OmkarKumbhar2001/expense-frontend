import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { VerifyMailApi } from '../../services/user-service';
import { toast } from 'sonner';
import { doLogin } from '../../auth';

const VerifyMail = () => {
    const { id, token } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        const preparedData = {
            token,
            user_id: id
        };
        VerifyMailApi(preparedData)
            .then(res => {
                doLogin(res?.data, () => {
                    toast.success("User Login In Successfully");
                   
                  });
                  navigate("/dashboard");
               
            })
            .catch(err => {
                if(err?.response?.status===400){
                    toast.error("Verification link is expired please try login")
                    navigate("/login")
                }
                
                console.error(err);
            });
    }, [id, token,navigate]); 
  return (
    <div>
         <h2>VerifyMail</h2>
      <p>User ID: {id}</p>
      <p>Token: {token}</p>
        
    </div>
  )
}

export default VerifyMail;