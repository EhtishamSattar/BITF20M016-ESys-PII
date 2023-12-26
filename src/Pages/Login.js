import { useState} from "react";
import { useNavigate } from "react-router-dom"



const Login = () => {

    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({ email: "", password: "" });

    //destructuring
    const { email, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("button clicked")
        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        //console.log(credentials.password," ",credentials.cpassword);
        // console.log(json.success,json.authToken);
        if (json.success) {
            //to redirect we are using useNavigate or useHistory hook from react router dom
            navigate("/addStudent");
            alert("You are about to Login ! Congratulations :)");

        } else {
            console.log(json);
            alert(json.error);

        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
        //console.log(credentials.password,"  ",credentials.cpassword);
    }
    return (
        <>
        <div className="w-full bg-green-400 text-black p-3 font-normal text-center">
            Use email : <span className="font-bold"> admin@gmail.com</span> and password : <span className="font-bold">admin</span>
        </div>
            <div className="bg-gray-100">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h1 className="text-xl font-semibold mb-4">Login to Student Interests System</h1>
                        <div className="mb-4">
                            <input onChange={onChange} name="email" type="email" placeholder="you@example.com" className="email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <input onChange={onChange} name="password" type="password" placeholder="*******" className="email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500" />
                        </div>
                        <button onClick={handleSubmit} className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none mb-2">Login As Admin</button>
                        <button onClick={()=>navigate("/studentListSheet")} className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none">Are you a Student?</button>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Login;