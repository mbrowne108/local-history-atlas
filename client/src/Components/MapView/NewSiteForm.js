import React, { useState } from "react";
import Geocode from "react-geocode";

function NewSiteForm({ onNewSite }) {
    const [errors, setErrors] = useState([])
    const [address, setAddress] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        lat: 0.0,
        lng: 0.0,
        description: '',
        category: ''
    })

    function handleChange(e) {
        let value = e.target.value
        if (e.target.name === "address") {
            setAddress(e.target.value)
        }
        setFormData({...formData, [e.target.name]: value})
    }

    function handleCoords() {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
        Geocode.setLanguage("en");
        Geocode.setRegion("us");
        Geocode.enableDebug();
        Geocode.fromAddress(address).then(res => {
                const { lat, lng } = res.results[0].geometry.location;
                setFormData({...formData, lat: lat, lng: lng})
            }
        )
    }

    function formSubmit(e) {
        e.preventDefault()

        fetch(`/sites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then((newSite) => onNewSite(newSite))
                setFormData({
                    name: '',
                    lat: 0.0,
                    lng: 0.0,
                    description: '',
                    category: ''
                })
                setAddress('')
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    return (
        <div className="modal-dialog container bg-light">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title h5">New Site</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={formSubmit}>
                        <div>
                            {errors.map(err => {
                                return (
                                    <div className='alert alert-danger alert-dismissible fade show' key={err}>
                                        {err}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                    </div>)
                            })}
                        </div>
                        <div className='mb-2'>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className='form-control'/>
                        </div>
                        <div className='mb-2'>
                            <label>Address:</label>
                            <input type="text" name="address" value={address} onChange={handleChange} className='form-control'/>
                            <p type="button" className="btn btn-sm btn-outline-primary align-baseline" onClick={handleCoords}>Convert to coords</p>
                            <span className="pl-2"><small>({formData.lat}, {formData.lng})</small></span>
                        </div>
                        <div className='mb-2'>
                            <label>Description: <small>(at least 50 char)</small></label>
                            <textarea type="text" rows="5" name="description" value={formData.description} onChange={handleChange} className='form-control'/>
                        </div>
                        <div className='mb-2'>
                            <label>Category:</label>
                            <select className="form-select" name="category" onChange={handleChange}>
                                <option defaultValue="">Select a category...</option>
                                <option value='Architecture'>Architecture</option>
                                <option value='Events/Stories'>Events/Stories</option>
                                <option value='Object'>Object</option>
                                <option value='Food/Drink'>Food/Drink</option>
                                <option value='Nature'>Nature</option>
                            </select>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className='btn btn-primary col-4'>Add Site</button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewSiteForm;