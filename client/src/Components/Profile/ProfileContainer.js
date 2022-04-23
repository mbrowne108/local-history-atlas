import React from "react";

function ProfileContainer({ user }) {
  const visits = user.visits

  return (
    <div>
        <h2>{user.username}'s Profile</h2>
        {visits.map(visit => {
          return <li key={visit.id}>{visit.site.name} - Comment: {visit.comment} Rating: {visit.rating}/5</li>
        })}
    </div>
  );
}

export default ProfileContainer;
