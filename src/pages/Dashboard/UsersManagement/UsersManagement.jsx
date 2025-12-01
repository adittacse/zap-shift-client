import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        const roleInfo = {
            role: "admin"
        };

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as an Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
            }
        });
    }

    const handleRemoveAdmin = (user) => {
        const roleInfo = {
            role: "admin"
        };

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove from Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} removed from Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
            }
        });
    }

    return (
        <div>
            <h2 className="text-5xl font-extrabold text-secondary mb-[40px]">Manage Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Name & Email</th>
                        <th>Role</th>
                        <th>Admin Actions</th>
                        <th>Other Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user?.photoURL} alt={user?.displayName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.displayName}</div>
                                            <div className="text-sm opacity-50">{user?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.role}</td>
                                <td>
                                    {
                                        user.role === "admin" ?
                                            <button onClick={() => handleRemoveAdmin(user)} className="btn bg-red-400">
                                                <FiShieldOff />
                                            </button> :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-400">
                                                <FaUserShield />
                                            </button>
                                    }
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;