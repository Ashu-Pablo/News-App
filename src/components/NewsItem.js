import React, { Component } from 'react'

export class NewsItem extends Component {
    

    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl === null ? "http://cdn.wionews.com/sites/default/files/2023/03/15/338776-untitled-design-2023-03-15t001804942.png" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...
                                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%', zIndex:'1'}}>{source}</span>
                            </h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-bg-info">By {author ? author : "unknown"} on {new Date (date).toGMTString()}</small></p>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
