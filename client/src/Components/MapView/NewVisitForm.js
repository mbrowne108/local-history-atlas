import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { addVisit } from "../../Redux/actions/visitActions"

function NewVisitForm({ site, user }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        site_id: site.id,
        comment: '',
        rating: 0
    })
    const [image, setImage] = useState(null)

    function handleChange(e) {
        let value = e.target.value
        setFormData({...formData, [e.target.name]: value})
    }

    function formSubmit(e) {
        e.preventDefault()
        const visit = site.visits.find(vst => vst.user.id === user.id)
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
                        <div className='mb-3'>
                            <label>Upload a photo of your visit</label>
                            <input type="file" accept="image/*" name="image" value={formData.image} onChange={(e) => setImage(e.target.files[0])} className='form-control'/>
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