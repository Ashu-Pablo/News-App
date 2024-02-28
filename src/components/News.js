import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bcd2053851446bba3fff50b2a33cecc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

        });
    }



    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        console.log("Previous");

        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next");

        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();

    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bcd2053851446bba3fff50b2a33cecc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
            // loading: false,


        });

    }


    render() {

        return (
            <>
                {/* <div className='container my-3'> */}

                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '80px' }}>HeadlineHub - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>

                {/* <Spinner loading={this.state.loading} /> */}
                
                {/* {this.state.loading && <Spinner />} */}
                {this.state.loading}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    //! loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/*!this.state.loading &&*/ this.state.articles.map((element) => {
                                const isImageAvailable = element.urlToImage && element.urlToImage.trim() !== '';
                                return isImageAvailable ? <div className='col-md-3 news' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div> : null;
                            })} 
                        </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between my-3">
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
                {/*  </div> */}
            </>
        )
    }
}

export default News
