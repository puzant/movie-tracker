import React, { Component } from 'react';
import Movie from '../Movie/Movie'

class UpComingMovies extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      UpComingMovies: []
    }
  }

  componentDidMount() {
    
  }

  render() { 
    return ( 
      <div className="upcoming-movies-container">
        {/* <Movie /> */}
      </div>
     );
  }
}
 
export default UpComingMovies;