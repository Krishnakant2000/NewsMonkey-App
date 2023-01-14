import React, { useEffect, useState } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalresults, setTotalResults] = useState(0)


  // if not using updateNews() function then uncomment commented code in componentDidMount, handleNext and handlePrev functions
  const updateNews = async() => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setloading(true);
      props.setProgress(30);
      let res = await fetch(url);
      props.setProgress(50);
      const data = await res.json();
      props.setProgress(70);
      setarticles(data.articles);
      setTotalResults(data.totalResults);
      setloading(false);
      props.setProgress(100);

    }
    catch (e) {
      console.log("something is not working");
    }
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [] )

  // const handlePrevClick = async () => {
        // setPage(page-1);
  //   updateNews();

  // }
  // const handleNextClick = async () => {
        // setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {  
      setPage(page+1);
      try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      // setloading(true);
      let res = await fetch(url);
      const data = await res.json();
      setarticles(articles.concat(data.articles));
      setTotalResults(data.totalResults);
    }
    catch (e) {
      console.log("something is not working");
    }
  };

    return (
      <>
    {/*   <div className='container my-3'>  */}
        <h1 className='text-center' style={{ margin: "30px 0px", marginTop:"90px" }}>NewsMonkey - Top {props.category} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalresults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
       {/* </div>  */}
       </>
    )
  
}

News.defaultPropTypes = {
  country: "in",
  pageSize: 9,
  category: "General"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
