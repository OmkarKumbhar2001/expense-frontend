import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VerifyMailApi } from "../../services/user-service";
import { toast } from "sonner";
import { doLogin } from "../../auth";
import GridLines from "react-gridlines";
import "../css/verifymail.css"
import Footer from "../../components/Footer";
const VerifyMail = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
    const preparedData = {
      token,
      user_id: id,
    };
    VerifyMailApi(preparedData)
      .then((res) => {
        setLoading(false)
        doLogin(res?.data, () => {
          toast.success("User Login In Successfully");
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response?.status === 400) {
          toast.error("Verification link is expired please try login");
          navigate("/login");
        }

        console.error(err);
      });
  }, [id, token, navigate]);
  return (
    <GridLines
      className="grid-area"
      cellWidth={90}
      strokeWidth={0.1}
      cellWidth2={0}
    >
  
      <div className="verify-mail">
      {
      loading ? <h1>We Are verifying Your Mail Please Wait</h1>:<h1>Thank You For patience</h1>
    }
        <h2>Verify Mail</h2>
      </div>
      <Footer />
    </GridLines>
  );
};

export default VerifyMail;
