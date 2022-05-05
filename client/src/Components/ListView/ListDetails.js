import React, { useState } from "react";
import Geocode from "react-geocode";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux"
import { addVisit, deleteVisit, updateVisit } from "../../Redux/actions/visitActions"

function ListDetails({ site, images, user }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [address, setAddress] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [showEditComment, setShowEditComment] = useState(false)
    const [formData, setFormData] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })
    const [image, setImage] = useState(null)

    const visit = site.visits.find(vst => vst.user.id === user.id)
    const formattedDescription = site.description.split(/\r?\n/)

    function handleChange(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    function handleEdit(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    function handleDelete() {
        const visit = site.visits.find(vst => vst.user.id === user.id)
        const result = window.confirm(`Are you sure you want to delete this visit?`)
        if (result) {
            fetch(`/visits/${visit.id}`, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then((deletedVisit) => dispatch(deleteVisit(deletedVisit.id)))
        }
    }

    function handleShowAddress() {
        Geocode.fromLatLng(site.lat, site.lng).then(
            res => {
                setAddress(res.results[0].formatted_address)
            },
        (error) => console.error(error))
        setShowAddress(true)
    }

    function formSubmit(e) {
        e.preventDefault()
        if (visit) return alert("You've already visited here!")

        const form = new FormData()
        form.append('site_id', formData.site_id)
        form.append('comment', formData.comment)
        form.append('rating', formData.rating)
        if (image) form.append('image', image)

        fetch(`/visits`, {
            method: "POST",
            body: form,
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then((newVisit) => dispatch(addVisit(newVisit)))
                setFormData({
                    site_id: site.id,
                    comment: '',
                    rating: 0
                })
                setImage(null)
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
          body: JSON.stringify(formData),
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then((updatedVisit) => dispatch(updateVisit(updatedVisit)))
                setFormData({
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


    if (images.length > 1) {
        images = images.slice(1)
    }

    return (
        <div className="modal-dialog modal-dialog-scrollable modal-lg container bg-light">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title display-6">{site.name}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <Carousel>
                    {images.map((image, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <img className="img-fluid img-thumbnail d-block w-100" src={image} alt={i} style={{ height: '400px', width: '200px', objectFit: "cover" }}/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

                <div className="modal-body text-left">
                    <h6>Information</h6>
                    <div className="card p-2">
                        <h6>Location: 
                            {showAddress ? 
                                <small>
                                    {' ' + address + ' '}
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => setShowAddress(false)}>Show coordinates</button>  
                                </small> :
                                <small>
                                    {' ' + site.lat}, {site.lng + ' '}
                                    <button className="btn btn-sm btn-outline-primary" onClick={handleShowAddress}>Show address</button> 
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
                            <div className='col-md-8'>
                                <label>Comment:</label>
                                <input type="text" name="comment" value={formData.comment} onChange={handleChange} className='form-control'/>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <label>Rating: <small>(between 0 and 5)</small></label>
                                <input type="number" name="rating" value={formData.rating} onChange={handleChange} className='form-control'/>
                            </div>
                            <div className='mb-3'>
                                <label>Upload a photo of your visit</label>
                                <input type="file" accept="image/*" name="image" value={formData.image} onChange={(e) => setImage(e.target.files[0])} className='form-control'/>
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
                                                    <input type="text" name="comment" value={formData.comment} onChange={handleEdit} placeholder={visit.comment} className='form-control'/>
                                                    <input type="number" name="rating" value={formData.rating} onChange={handleEdit} placeholder={visit.rating} className='form-control'/>
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