import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export function MapContainer (props) {
  const { posts } = props;
  console.log("posts no mapa: ")
  console.log(posts)


  // const state = {
  //   activeMarker: {},
  //   selectedPlace: {},
  //   showingInfoWindow: false
  // };

  // const onMarkerClick = (props, marker) =>
  //   this.setState({
  //     activeMarker: marker,
  //     selectedPlace: props,
  //     showingInfoWindow: true
  //   });

  // onInfoWindowClose = () =>
  //   this.setState({
  //     activeMarker: null,
  //     showingInfoWindow: false
  //   });

  // const onMapClicked = () => {
  //   if (this.state.showingInfoWindow)
  //     this.setState({
  //       activeMarker: null,
  //       showingInfoWindow: false
  //     });
  // };


  const defaultState = {
    data: [],
    loc_x: 0,
    loc_y: 0,
    locRendered: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    redirect: false,
    redirectId: 0
  }

  const [state, setState] = useState(defaultState)

  // const [selected, setSelected] = useState({lat: 0, lng: 0});
  const [selected, setSelected] = useState({});
  const [visibility, setVisibility] = useState(false);

  function showPosition (position) {
    setState({
        loc_x: position.coords.latitude,
        loc_y: position.coords.longitude,
        locRendered: true
    })
  }

  useEffect(() => {    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }, [])

  return (
    <div>
      {state.locRendered ? (
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={
            {
              lat: state.loc_x,
              lng: state.loc_y
            }
          }
        >
            
          {posts && (posts.map((post) => (
            <Marker
              key={post.id}
              position={{ lat: post.latitude, lng: post.longitude }}
              name={post.title}
              icon={{
                url: require('../icons/shop.png'),
                scaledSize:  new props.google.maps.Size(25,25)
              }}    
              onClick={() => {
                setSelected(post);
                setVisibility(true);
                console.log("Foi selecionado");
                console.log(selected)
              }}
            />
            )))}

                            
            {
              selected && (
              <InfoWindow
                position={{ 
                  lat: Number(selected.latitude), 
                  lng: Number(selected.longitude) 
                }}
                visible={visibility}
                onClose={() => {
                  console.log(selected)
                  console.log("fechou");
                  setSelected({});
                  setVisibility(false);
                }}
              >
                <div>
                  {selected.seller}
                </div>
              </InfoWindow>)
            }
      </Map>


      ) : null}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCpM964ClNLYCNd2-4dqLF7h7B2s7ALuOY'
})(MapContainer);

