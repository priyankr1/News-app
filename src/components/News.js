import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.captalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchNews = async () => {
    console.log("calling");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2f54777a0e448e290a6325b00e97cef&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let pastData = await data.json();
    console.log(pastData);

    this.setState({
      articles: pastData.articles,
      totalResults: pastData.totalResults,
      loading: false,
    });
  };
// without infinite scroll pacakge
  // handleNextClick = async () => {
  //   console.log("Next");
  //   this.setState({ page: this.state.page + 1 }, this.fetchNews);
  // };

  // handlePrevClick = async () => {
  //   console.log("Previous");
  //   this.setState({ page: this.state.page - 1 }, this.fetchNews);
  // };
  fetchMoreData = async () => {
    
    this.setState((prevState) => ({ page: prevState.page + 1 }), async () => {

        this.setState({ loading: true });
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2f54777a0e448e290a6325b00e97cef&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let pastData = await data.json();
        console.log(pastData);
        
        this.setState({
            articles: this.state.articles.concat(pastData.articles),
            totalResults: pastData.totalResults,
            loading: false,
        });
    });
};


  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center">{`NewsMonkey - Top Headlines ${this.props.category}`}</h1>
        {/* {   {this.state.loading && <Spinner />} } */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
