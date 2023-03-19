import React, { useEffect , useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {
    const [articles, setArticles]= useState([])
    const [loading, setLoading]= useState(true)   
    const [page, setPage]= useState(1)
    const [totalResults, setTotalResults]= useState(0)
    

  const updateNews= async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page}&pageSize=${props.pageSize}`;
    setLoading(true );
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

  // const handlePrevClick = async () => {
  //   console.log("Previous");

  //   await setPage(page - 1);
  //   await updateNews();
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page-1}&pageSize=${props.pageSize}`

    // setState({loading: true})
    //  let data= await fetch(url)
    //   let parsedData= await data.json()
    //   console.log(parsedData);

    //   setState({
    //     page:state.page-1,
    //     articles:parsedData.articles,
    //     loading:false
    //   })
  //};

  // const handleNextClick = async () => {
  //   console.log("next");
  //   await setPage(page+1)
  //   await updateNews();

    // if(!(state.page+1> Math.ceil(this.state.totalResults/props.pagesize)))  {

    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`
    //   this.setState({loading: true})
    //   let data= await fetch(url)
    //   let parsedData= await data.json()
    //   console.log(parsedData);

    //   this.setState({
    //   page:this.state.page+1,
    //   articles:parsedData.articles,
    //   loading:false
    // })

    //}
  //};

  useEffect(()=>{
    document.title = `${props.category} - NewsMonkey`;
    updateNews()
  }, [])

  // async componentDidMount() {
  //   // console.log("cdm")

  //   // this.setState({loading: true})
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`

  //   // let data= await fetch(url)
  //   // let parsedData= await data.json()
  //   // console.log(parsedData);
  //   // this.setState({articles:parsedData.articles, totalResults:parsedData.totalResult,loading:false})
  //   this.updateNews();
  // }

  const fetchMoreData= async() =>{
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

    return (
      // <div className="container text-center my-3">
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" , marginTop: '90px'}}>
          NewsMonkey - Top {props.category} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row ">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                 <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn  btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pagesize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      {/* </div> */}
      </>
    );
  }


News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
