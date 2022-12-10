import React, { useState, useEffect, Fragment } from 'react';
import { MapContainer, GeoJSON, TileLayer, Marker, FeatureGroup, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const JobsMap = ({jobs}) => {
  const [map, setMap] = useState(null);
  const [group, setGroup] = useState(null);

  const center = [
    jobs[0]?.field?.location?.latitude || 39.0,
    jobs[0]?.field?.location?.longitude || 80.5,
  ];

  useEffect(() => {
    if (jobs.length) {
      map?.fitBounds(group.getBounds());
    }
  }, [map, group, jobs.length]);

  return (
    <MapContainer zoom={16} center={center} ref={setMap}>
      <TileLayer
        attribution='<a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/zubae/cl3d4tjb6004x15p5exofs8pk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoienViYWUiLCJhIjoiY2wzdTVuOHAzMGVjcjNrbnA0N2F5YjliNiJ9.3G7zstZilVBlGV4cpUcs5Q"
      />
      <FeatureGroup ref={setGroup}>
        {jobs.map((job, index) => (
          <Fragment key={index}>
            <GeoJSON data={JSON.parse(job?.field?.boundary)} />
          </Fragment>
        ))}
        {jobs.map((job, index) => (
          <Fragment key={index}>
            {job?.samplingPoints?.map((point, index) => (
              <Fragment key={index}>
                <Marker position={[point.pointLocation.latitude, point.pointLocation.longitude]}>
                  <Popup>
                    Point Reference: {point.clientReference} <br />
                    Job Reference: {point.jobClientReference}
                  </Popup>
                </Marker>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default JobsMap;
