import React, { Component } from 'react';
import './Cover.css';
import _ from 'lodash';

export default class Cover extends Component {
    constructor(props) {
      super(props);
      this.state = { image_size: this.imageSize(window.innerWidth), mouseOver: false }
    }

    static propTypes = {
      comicData: React.PropTypes.object.isRequired,
      upVote: React.PropTypes.func.isRequired,
      upVoted: React.PropTypes.bool.isRequired
    }

    handleResize() {
      this.setState({ image_size: this.imageSize(window.innerWidth) });
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }

    imageSize(width) {
      return (width < 768) ? 'portrait_uncanny' : 'portrait_fantastic' ;
    }

    showDetails(show) {
      this.setState({ mouseOver: show })
    }

    coverDate() {
      const date = _.find(this.props.comicData.dates, ['type', 'onsaleDate']);
      return new Date(date.date).getFullYear();
    }

    coverUpvoted() {
      if(!this.props.upVoted) { return null; }

      return (<div className="cover-upvoted">
          <div className="cover-heart-on"></div>
        </div>)
    }

    renderDetail() {
      if (!this.state.mouseOver) { return null; }

      return (
        <div>
          <div className="cover-heart" onClick={ this.props.upVote.bind(this) }></div>
          <div className="cover-detail">
            <div className="cover-footer">
              <div className="cover-title">
                { this.props.comicData.title }
              </div>
              <button onClick={ this.showFullDetails.bind(this) }>more details</button>
              <div>
                <span className="cover-issue"># { this.props.comicData.issueNumber }</span>
                <span className="cover-year">{ this.coverDate.call(this) }</span>
              </div>
            </div>
          </div>
        </div>
        );
    }

    showFullDetails() {
      this.refs.fulldetails.removeAttribute('hidden');
    }

    hideFullDetails() {
      this.refs.fulldetails.setAttribute('hidden', 'hidden')
    }

    renderFullDetails() {
      return (
        <div className="comic-details" hidden ref="fulldetails">
          <button className="close-button" onClick={ this.hideFullDetails.bind(this) }>Close</button>
          <h2>Full Details: { this.props.comicData.title }</h2>
          <dl>
            <dt>ISBN:</dt>
            <dd>{  this.props.comicData.isbn ? this.props.comicData.isbn : 'not available' }</dd>

            <dt>Variant Description:</dt>
            <dd>{ this.props.comicData.variantDescription }</dd>

            <dt>Characters:</dt>
            <dd><ul>{ this.props.comicData.characters.items.map( (character) => {
                return (
                  <li>{ character.name }</li>
                );
            }) }</ul></dd>
            <dt>Creators:</dt>
            <dd><ul>{this.props.comicData.creators.items.map( (creator) => {
              return (
                <li>{ creator.name }</li>
              );
            }) }</ul></dd>
            <dt>images:</dt>
            <dd>{this.props.comicData.images.map( (image) => {
              var uri = `${ image.path }/portrait_uncanny.${ image.extension }`;
              return (
                <img src={ uri } width="150" />
              );
            } )}</dd>
        </dl>

        </div>
      );
    }

    coverImage() {
      return `${this.props.comicData.thumbnail.path}/${this.state.image_size}.${this.props.comicData.thumbnail.extension}`;
    }

    render() {
      return (
        <div className="pure-u-23-24 pure-u-md-1-4 pure-u-lg-1-5"
          onMouseEnter={ this.showDetails.bind(this, true) }
          onMouseLeave={ this.showDetails.bind(this, false) }>
          <div className="cover">
            <img className="cover-image" alt={ this.props.comicData.title } src={ this.coverImage.call(this) } />
            { this.renderDetail() }
            { this.coverUpvoted() }
            { this.renderFullDetails() }
          </div>
        </div>
      );
    }
}