import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

function ListDetails({ site, image, onNewVisit, user }) {
    const [address, setAddress] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })

    const visit = site.visits.find(vst => vst.user.id === user.id)

    const formattedDescription = site.description.split(/\r?\n/)

    function handleChange(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
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
    
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.enableDebug();
    useEffect(() => {
        Geocode.fromLatLng(site.lat, site.lng).then(
            res => {
                setAddress(res.results[0].formatted_address)
            },
            (error) => console.error(error)
        );
    }, [site.lat, site.lng])
    

    // USE THIS CODE TO CONVERT ADDRESS INTO COORDS

    // Geocode.fromAddress("310 first ave, new york, ny 10009").then(
    //     res => {
    //         const { lat, lng } = res.results[0].geometry.location
    //         console.log(lat, lng)
    //     }
    // )


    return (
        <div className="modal-dialog modal-dialog-scrollable modal-lg container text-center bg-light">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title display-6">{site.name}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="text-center">
                    <img className="img-fluid" src={image} alt="Placeholder"/>
                </div>
                <div className="modal-body text-left">
                    <h6>Information</h6>
                    <div className="card p-2">
                        <h6>Location: 
                            <small> {address} ({site.lat}, {site.lng}) </small> 
                            <a 
                                className="btn btn-sm btn-outline-primary" 
                                href={`https://maps.google.com/?q=${site.lat},${site.lng}`} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    <img src={require("./Placeholders/map_icon.png")} alt="map icon"/>
                            </a>
                        </h6>
                        <h6>Category: {site.category}</h6>
                        {formattedDescription.map(para => <p key={para}>{para}</p>)}
                    </div>
                    {!visit ? 
                        <button className="btn btn-outline-primary" onClick={() => setShowForm(!showForm)}>I visited here!</button> : 
                        <button className="btn btn-outline-primary" disabled >Already visited</button>
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
                                const date = new Date(visit.user.created_at)
                                return <li className="list-group-item" key={visit.id}>
                                    <h6>Written by {visit.user.username}: <small>{date.toDateString()}</small></h6>
                                    <p>{visit.comment}</p>
                                    <p>Rating: {visit.rating}/5</p>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDetails;