import React, { useState } from "react";

const UserItem = ({ user, onButtonCicked, currentUser }) => {

    console.log(user);
    const isCurrentUserAlreadyAFollower = () => {
        return user.followers.includes(currentUser.userId);
    }

    const [isFollowed, setIsFollowed] = useState(
        isCurrentUserAlreadyAFollower()
    );

    const [followerCount, setFollowerCount] = useState(
        user.followers.length
    );

    const handleChange = () => {
        setIsFollowed(!isFollowed);

        if (!isFollowed) {
            setFollowerCount(followerCount + 1);
        }
        else {
            if (followerCount >= 1)
                setFollowerCount(followerCount - 1);
        }

        onButtonCicked({
            isFollowed: !isFollowed,
            followerId: currentUser.userId,
            followingId: user._id
        });
    }

    return (
        <div className="card m-3">
            <div className="card-header">
                {user.username}
            </div>
            <div className="card-body">
                <h5 className="card-title">Following Tab</h5>
                <p className="card-text">
                    Followers : {followerCount}
                </p>
                <p className="card-text">
                    Following : {user.following.length}
                </p>
                <button
                    onClick={handleChange}
                    className={`btn ${isFollowed ? 'btn-danger' : 'btn-primary'} `}>
                    {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    );
}

export default UserItem;