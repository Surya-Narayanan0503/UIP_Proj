import React, { useState, useEffect } from "react";
import { getAllUsers, followUser, unFollowUser } from "../api";

import NavBar from "./NavBar";
import UserItem from "./UserItem";

const UsersPage = ({ currentUser }) => {

    const [users, setUsers] = useState([]);

    const handleUserFollowed = async ({
        isFollowed, followingId, followerId
    }) => {

        if (isFollowed) {
            const followed = await followUser(followingId, followerId);
            setUsers(users.map(u => {
                if (u._id === followerId) {
                    return followed.data._doc;
                }
                return u;
            }));
        }
        else {
            const unFollowed = await unFollowUser(followingId, followerId);
            setUsers(users.map(u => {
                if (u._id === followerId) {
                    return unFollowed.data._doc;
                }
                return u;
            }));
        }
    }

    useEffect(() => {
        async function fetchData() {
            var result = await getAllUsers();
            setUsers(result.data.filter(e => e._id !== currentUser.userId));
        }
        fetchData();
    }, []);

    return (
        <>
            <NavBar active={"users"} isLoggedIn={true} />
            <h1 className="m-3 text-center">ALL USERS</h1>
            {
                users.map(e =>
                    <UserItem
                        user={e}
                        currentUser={currentUser}
                        onButtonCicked={handleUserFollowed}
                    />
                )
            }
        </>
    );
}
export default UsersPage;