import React from 'react'
//import { Link } from 'react-router-dom';

export default function Contact() {
    
    return (
        <div>
            <div className='container my-5'>
            <div className='row text-center'>
                <div className='col'>
                    <h1>Contact Us</h1>
                </div>
               
            </div>
            <p className='lead text-center'>Have any questions? We'd love to hear from you.</p>
            
            </div>
            <div className='container my-4'>
                <div className='row'>
                    <div className='col text-center'>
                    <h4><small>Reach out to any of us</small></h4>
                    </div>
                </div>
                <div className='row text-center my-4'>
                    <div className='col-4' >
                        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQEGdkjZsqSBvQ/profile-displayphoto-shrink_800_800/0/1609683161074?e=1643241600&v=beta&t=PxYrE2aoIS_DILVT-ZADbAiZQETJKNCDM3VJX6_m1IA"
                        height="180" width="180" style={{borderRadius:"50%"}}/>
                        <br/>
                        <p className='my-3'  style={{fontSize:"1.2em"}}>
                            <i class="fab fa-linkedin"></i> <a href='https://www.linkedin.com/in/chirag-sharma-2a43531b4/'>Chirag Sharma</a>
                        <br/>
                        <i class="fas fa-envelope"></i> cks.31000@gmail.com
                        </p>
                        
                    </div>
                    <div className='col-4' >
                        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHXaQZh3MzOPg/profile-displayphoto-shrink_800_800/0/1633764244537?e=1643241600&v=beta&t=pyemKOaFy7nWRw1TFDPkRAgbZPU9lALBHXaviAJzfXU"
                        height="180" width="180" style={{borderRadius:"50%"}}/>
                        <br/>
                        <p className='my-3' style={{fontSize:"1.2em"}}>
                            <i class="fab fa-linkedin"></i> <a href='https://www.linkedin.com/in/mananchhabra1402/'>Manan Chhabra</a>
                        <br/>
                        <i class="fas fa-envelope"></i> mananchhabra1402@gmail.com
                        </p>
                        
                    </div>
                    <div className='col-4' >
                        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGjqknL1aESsA/profile-displayphoto-shrink_800_800/0/1621717674024?e=1643241600&v=beta&t=Vct7tcZXl3GlU9Mm7RLK8zqxOtO8nMH9od998xjzyPc"
                        height="180" width="180" style={{borderRadius:"50%"}}/>
                        <br/>
                        <p className='my-3'  style={{fontSize:"1.2em"}}>
                            <i class="fab fa-linkedin"></i> <a href='https://www.linkedin.com/in/ekansh-gupta52/'>Ekansh Gupta</a>
                        <br/>
                        <i class="fas fa-envelope"></i> ekansh5200@gmail.com
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}