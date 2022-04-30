import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

function ListDetails({ site, image, user, onNewVisit, onDeleteVisit, onUpdateVisit }) {
    const [showAddress, setShowAddress] = useState(false)
    const [address, setAddress] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [showEditComment, setShowEditComment] = useState(false)
    const [formData, setFormData] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })
    const visit = site.visits.find(vst => vst.user.id === user.id)
    const [editForm, setEditForm] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })
    const formattedDescription = site.description.split(/\r?\n/)

    function handleChange(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    function handleEdit(e) {
        let value = e.target.value
        setEditForm({...editForm, [e.target.name]: value})
    }

    function handleDelete() {
        const visit = site.visits.find(vst => vst.user.id === user.id)
        const result = window.confirm(`Are you sure you want to delete this visit?`)
        if (result) {
            fetch(`/visits/${visit.id}`, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then(() => onDeleteVisit(visit))
        }
    }

    function handleShowAddress() {
        setShowAddress(false)
        {Geocode.fromLatLng(site.lat, site.lng).then(
            res => {
                setAddress(res.results[0].formatted_address)
            },
        (error) => console.error(error))
        } 
    }

    function formSubmit(e) {
        e.preventDefault()
        if (visit) return alert("You've already visited here!")

        fetch(`/visits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then((newVisit) => onNewVisit(newVisit))
                setFormData({
                    site_id: site.id,
                    comment: '',
                    rating: 0
                })
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    function handleUpdate(e) {
        e.preventDefault()

        fetch(`/visits/${visit.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editForm),
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then((updatedVisit) => onUpdateVisit(updatedVisit))
                setEditForm({
                    site_id: site.id,
                    comment: '',
                    rating: 0
                })
                setShowEditComment(() => !showEditComment)
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }
    
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.enableDebug();

    // useEffect(() => {
    //     Geocode.fromLatLng(site.lat, site.lng).then(
    //         res => {
    //             setAddress(res.results[0].formatted_address)
    //         },
    //         (error) => console.error(error)
    //     );
    // }, [])

    return (
        <div className="modal-dialog modal-dialog-scrollable modal-lg container bg-light">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title display-6">{site.name}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="text-center">
                    <img className="img-fluid img-thumbnail" src={image} alt="site-image" style={{ height: '400px', width: 'auto' }}/>
                </div>
                <div className="modal-body text-left">
                    <h6>Information</h6>
                    <div className="card p-2">
                        <h6>Location: 
                            {showAddress ? 
                                <small>
                                    {' ' + address + ' '}
                                    <button className="btn btn-sm btn-outline-primary" onClick={handleShowAddress}>Show coordinates</button>  
                                </small> :
                                <small>
                                    {' ' + site.lat}, {site.lng + ' '}
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => setShowAddress(true)}>Show address</button> 
                                </small> 
                            }
                            <a 
                                className="btn btn-sm btn-outline-primary" 
                                href={`https://maps.google.com/?q=${site.lat},${site.lng}`} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    <img src={require("../Assets/Icons/map_icon.png")} alt="map icon"/>
                            </a>
                        </h6>
                        <h6>Category: {site.category}</h6>
                        {formattedDescription.map(para => <p key={para}>{para}</p>)}
                    </div>
                    {!visit ? 
                        <button className="btn btn-outline-primary" onClick={() => setShowForm(!showForm)}><img src={require("../Assets/Icons/map_pin_empty.png")} alt="pin_empty"/>Visit Here!</button> : null
                    }
                    <br/><br/>
                    {showForm ? 
                        <form className="row" onSubmit={formSubmit}>
                            <div>
                                {errors.map(err => {
                                    return (
                                        <div className='alert alert-danger alert-dismissible fade show' key={err}>
                                            {err}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                        </div>)
                                })}
                            </div>
                            <div className='col-8'>
                                <label>Comment:</label>
                                <input type="text" name="comment" value={formData.comment} onChange={handleChange} className='form-control'/>
                            </div>
                            <div className='col-4 mb-2'>
                                <label>Rating: <small>(between 0 and 5)</small></label>
                                <input type="number" name="rating" value={formData.rating} onChange={handleChange} className='form-control'/>
                            </div>
                            <div className='mb-2'>
                                <button type="submit" className='btn btn-primary col-4'>Add Visit</button>  
                            </div>
                        </form> : null
                    }
                    <div>
                        <h6>Visitor Comments</h6>
                        <ul className="list-group">
                            {site.visits.map(visit => {
                                const timestamp = new Date(visit.created_at).toLocaleString()
                                let starRating = ''
                                for (let i = 0; i < 5; i++) {
                                        i < visit.rating ? starRating += "★" : starRating += "☆"
                                }
                                if (visit.user.id === user.id) {
                                    return (
                                        <li className="list-group-item list-group-item-primary" key={visit.id}>
                                            <h6>Written by you: <small>{timestamp}</small> {' '}
                                                <button className="badge bg-secondary rounded-pill" onClick={() => setShowEditComment(!showEditComment)}>Edit</button> { }
                                                <button className="badge bg-secondary rounded-pill" onClick={handleDelete}>Delete</button>
                                            </h6>
                                            {showEditComment ? 
                                                <form className="col-sm-6" onSubmit={handleUpdate}>
                                                    <input type="text" name="comment" value={editForm.comment} onChange={handleEdit} placeholder={visit.comment} className='form-control'/>
                                                    <input type="number" name="rating" value={editForm.rating} onChange={handleEdit} placeholder={visit.rating} className='form-control'/>
                                                    <button className="btn btn-secondary">Submit Changes</button>
                                                </form> :
                                                <div>
                                                    <p>{visit.comment}</p>
                                                    <p>Rating: {starRating}</p>
                                                </div>
                                            }
                                            
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="list-group-item" key={visit.id}>
                                            <h6>Written by {visit.user.username}: <small>{timestamp}</small></h6>
                                            <p>{visit.comment}</p>
                                            <p>Rating: {starRating}</p>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDetails;