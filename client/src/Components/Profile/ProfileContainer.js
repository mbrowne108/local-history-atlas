import React from "react";

function ProfileContainer({ user }) {
  const visits = user.visits
  const profileCreateDate = new Date(user.created_at)

  return (
    <div className="row">
      <div className="card col-6">
        <div className="card-header">
          <h2>{user.username}'s Profile</h2>
          <h5>Member since {profileCreateDate.toLocaleDateString()}</h5>
        </div>
        <div className="card-body">
          <h6>Places Visited: {user.visits.length}</h6>
          <ul className="list-group col-8">
            {visits.map(visit => {
              const timestamp = new Date(visit.created_at).toLocaleString()
              return <li key={visit.id} className="list-group-item"><b>{visit.site.name} <small>{timestamp}</small></b><br/>Comment: {visit.comment}<br/><em>Rating: {visit.rating}/5</em></li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
