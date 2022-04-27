import React from "react";

function ProfileContainer({ user }) {
  const visits = user.visits
  const profileCreateDate = new Date(user.created_at)

  return (
    <div className="row">
      <div className="card col-6">
        <div className="card-header">
          <h2>{user.username}'s Profile</h2>
          <h5>Member since {profileCreateDate.toDateString()}</h5>
        </div>
        <div className="card-body">
          <h6>Places Visited: {user.visits.length}</h6>
          <ul className="list-group col-8">
            {visits.map(visit => {
              const date = new Date(visit.user.created_at)
              return <li key={visit.id} className="list-group-item"><b>{visit.site.name} <small>{date.toDateString()}</small></b><br/>Comment: {visit.comment}<br/><em>Rating: {visit.rating}/5</em></li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
