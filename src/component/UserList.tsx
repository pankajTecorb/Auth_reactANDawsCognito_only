import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPool from '../UserPool';
import AWS from 'aws-sdk';


const UserList = () => {
  const navigate = useNavigate();
  const [usersArray, setUsers] = useState<any>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken'); // Replace with your token retrieval logic

    if (!accessToken) {
      navigate('/');
    }
    // Simulated API call to fetch users
    const fetchUsers = async () => {
      try {
        AWS.config.update({
          region: 'ap-south-1',
          accessKeyId: "AKIA4EP6Z56ZSPKYBBC7",
          secretAccessKey: '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',
        });

        // Create an instance of the CognitoIdentityServiceProvider
        const cognitoISP = new AWS.CognitoIdentityServiceProvider();

        // Define the parameters for listing users
        const params = {
          UserPoolId: "ap-south-1_0iFVFeC4n",
          AttributesToGet: ['email', 'name'], // Optional: specify the attributes to retrieve
          Limit: 10, // Optional: specify the maximum number of users to retrieve
        };

        // List users
        const newData = cognitoISP.listUsers(params, (err, data) => {
          if (err) {
            console.error('Failed to list users:', err);
          } else {
           // console.log('Users:', data.Users);
           // console.log('Pagination Token:', data.PaginationToken);
            const resultData = data.Users
            setUsers(resultData);

          }

        });

      } catch (error) {
        console.error('Error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);




  // const deleteUser = async (email: string) => {
  //   try {
  //     const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/delete', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await response.json();
  //     if (data.code === 200) {
  //       //alert(data.message);
  //       toast.success(data.message)
  //       window.location.reload();
  //     } else {
  //       //alert(data.message);
  //       toast.error(data.message)
  //     }
  //   } catch (error:any) {
  //     console.error('Error occurred during Delete user:', error);
  //     //alert('Error occurred during OTP Delete user: ' + error);
  //     toast.error(error)
  //   }
  // };

  const handleLogout = async () => {
    const currentUser = UserPool.getCurrentUser();

    if (currentUser) {
      currentUser.signOut();
      console.log('User logged out successfully.');
      //alert(data.message);
      toast.success('User logged out successfully')
      // Clear any user session or tokens
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('email');
      localStorage.removeItem('RefreshToken');
      navigate('/');
    } else {
      console.log('No currently authenticated user.');
      toast.error('No currently authenticated user')
    }
  };

  const handleChangePassword = () => {
    navigate('/change-password')
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen py-8">
      <ToastContainer />
      <nav className="flex justify-between items-center max-w-4xl mx-auto px-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Users List</h2>
        </div>
        <div>
          <button
            onClick={handleChangePassword}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mr-2"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-white mb-6">User List</h2> */}
        {usersArray.length === 0 ? (
          <p className="text-gray-200">No users found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">ID</th> */}
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Name</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Email</th>
                  {/* <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Phone Number</th> */}
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Email Status</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">User Status</th>
                  {/* <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usersArray?.map((user: any, index: any) => {
                  return (
                    <tr key={index}>
                      {/* <td className="py-4 px-6 whitespace-nowrap">{user.Username}</td> */}
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[0]?.Value}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[1]?.Value}</td>
                      {/* <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[4]?.Value}</td> */}
                      <td className="py-4 px-6 whitespace-nowrap">{user?.UserStatus}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Enabled ? "Active" : "Deactive"}</td>
                      {/* <td className="py-4 px-6 whitespace-nowrap">
                        <button
                          onClick={() => deleteUser(user?.Attributes[5].Value)}
                          className="text-sm text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;


