import React, { Component } from 'react';
import '../styles/styles.css';

class Profile extends Component {

  render() {
    let artist = { name: '', followers: {total: ''}, images: [{ url: ''}], genres:[]};
    artist = this.props.artist !== null ? this.props.artist : artist;

    return(
      <div className="profile">
        <img
          src={artist.images[0].url}
          className="profile-img"
          alt="profile"
        />
      <div className="profile-info">
        <div className="profile-name">{artist.name}</div>
        <div className="profile-followers">{artist.followers.total} follower</div>
        <div className="profile-genre">
          {
            artist.genres.map((genre, k) => {
              genre = genre !== genre[genre.length-1] ? `${artist.genres},` : `& ${artist.genres}`;
              return(
                <span key={k}>{genre}</span>
              );
            })
          }
        </div>
      </div>
    </div>
    )
  }
}

export default Profile;
