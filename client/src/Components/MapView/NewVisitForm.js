import React, { useState } from "react";

function NewVisitForm({ site, user, onNewVisit }) {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })

    function handleChange(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    function formSubmit(e) {
        e.preventDefault()
        const visit = site.visits.find(vst => vst.user.id === user.id)
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

    return (
        <div className="modal-dialog container bg-light">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title h5">Visit to {site.name}</h1>
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
                        <div className='mb-3'>
                            <label>Comment:</label>
                            <input type="text" name="comment" value={formData.comment} onChange={handleChange} className='form-control'/>
                        </div>
                        <div className='mb-3'>
                            <label>Rating: <small>(between 0 and 5)</small></label>
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} className='form-control'/>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className='btn btn-primary col-4'>Add Visit</button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewVisitForm;