import React from 'react'
import Layout from '../components/Layout'

const Home = () => {
    return (
        <Layout>
            <div className="card w-96 glass bg-cyan-950">
                <figure><img src="/logo192.png" alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Learn now!</button>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Home