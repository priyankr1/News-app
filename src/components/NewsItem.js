import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, discription, imageUrl, newsUrl , author,date} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
            <img src={!imageUrl?"https://th.bing.com/th/id/R.177c2aa34a39821464a08f108e577d3f?rik=E6on3EJVDGOmSg&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f4707746%2fimages%2fo-BREAKING-NEWS-facebook.jpg&ehk=aOZD%2b3ct2JGBC7gowQvtiafkD2%2fQugxJAKZDR7bzdJw%3d&risl=&pid=ImgRaw&r=0":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
            <div className="card-footer my-2">
        <small className="text-body-secondary">By {!author?" unkown":author} on {new Date(date).toGMTString()}</small>
      </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
