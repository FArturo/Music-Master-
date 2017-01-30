import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery';

import '../styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }
  onSearch() {
    // console.log('this.state', this.state);
    const URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`;

    fetch(FETCH_URL, {
      method: 'GET',

    }).then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log('artist', artist);
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, {
          method: 'GET'
        }).then(response => response.json())
          .then(json=> {
            console.log('artist, top tracks', json);
            const {tracks} = json;
            this.setState({tracks});
          })
      });
  }
  onKeyPress(e) {
    if(e.key === 'Enter') {
      this.onSearch();
    }
  }
  render() {
    return(
      <div className="app">
        <h1 className="app-title">Music Master</h1>

        <FormGroup>
          <InputGroup>
            <FormControl type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={e => {this.setState({query: e.target.value})}}
              onKeyPress={this.onKeyPress.bind(this)}/>
            <InputGroup.Addon onClick={ () => this.onSearch()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        {
          this.state.artist !== null
          ?
          <div>
            <Profile artist={this.state.artist}/>
            <Gallery tracks={this.state.tracks}/>
          </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
