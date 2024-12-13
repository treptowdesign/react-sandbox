import React, {useState} from 'react'
import './Baseline.sass'

const Baseline = () => {
    return (
        <>
            <div className="baseline">
                <h1>Baseline</h1>
                <div className="card">
                    <div className="card-content">
                        <p className="small">At, eligendi alias!</p>
                        <h3>Velit, Quo Incidunt Provident</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores accusamus dolorum quam, beatae inventore, aspernatur accusantium laboriosam dolore.</p>
                    </div>
                    <div className="card-footer">
                        <button className="btn-outline" onClick={() => alert('Button Click Message!')}>Ipsum dolor</button>
                        <button onClick={() => alert('Button Click Message!')}>Ametquam</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Baseline