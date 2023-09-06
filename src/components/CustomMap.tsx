import React from 'react';
import GoogleMapReact from 'google-map-react';
import Farm from '../types';

interface CustomMapProps {
  farm: Farm
}
const CustomMap: React.FC<CustomMapProps> = ({ farm, options }) => {
  const handleApiLoaded = (map: any, maps: any) => {
    const managementAreas = JSON.parse(farm.managementAreasGeoJSON);

    let maxLat = -90;
    let minLat = 90;
    let maxLng = -180;
    let minLng = 180;

    managementAreas.map((area: any) => {
      let sumLat = 0;
      let sumLng = 0;
      let count = 0;
      if (Array.isArray(area.geometry.coordinates[0][0][0])) {
        area.geometry.coordinates[0][0].forEach(([lng, lat]: [number, number]) => {
          minLat = lat < minLat ? lat : minLat;
          maxLat = lat > maxLat ? lat : maxLat;
          minLng = lng < minLng ? lng : minLng;
          maxLng = lng > maxLng ? lng : maxLng;
          sumLat += lat;
          sumLng += lng;
          count++;
        });
      } else {
        area.geometry.coordinates[0].forEach(([lng, lat]: [number, number]) => {
          minLat = lat < minLat ? lat : minLat;
          maxLat = lat > maxLat ? lat : maxLat;
          minLng = lng < minLng ? lng : minLng;
          maxLng = lng > maxLng ? lng : maxLng;
          sumLat += lat;
          sumLng += lng;
          count++;
        });
      }
      if (options.showMarker) {
        let marker = new maps.Marker({
          position: { lat: sumLat / count, lng: sumLng / count },
          map,
          title: area?.properties?.P_Area || area?.properties?.name || area?.properties?.Area_name
        });
      }
    });

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    map.setCenter(new maps.LatLng(centerLat, centerLng));

    managementAreas.map((area: any) => {
      let polygonCoordinates = [];
      if (Array.isArray(area.geometry.coordinates[0][0][0])) {
        polygonCoordinates = area.geometry.coordinates[0][0].map(([lng, lat]: [number, number]) => ({ lng, lat }));
      } else {
        polygonCoordinates = area.geometry.coordinates[0].map(([lng, lat]: [number, number]) => ({ lng, lat }));
      }

      let polygon = new maps.Polygon({
        paths: polygonCoordinates,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFFFFF",
        fillOpacity: 0.35
      });
      polygon.setMap(map);


    });
  }

  const getMapOptions = (maps: Maps) => {
    return {
      streetViewControl: false,
      scaleControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }
      ],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
      draggable: false,
      minZoom: 1,
      maxZoom: 18,

      mapTypeControl: false,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID
        ]
      },

      zoomControl: options.zoomControl || false,
      clickableIcons: false
    };
  }

  return (
    <div className='m-auto rounded-lg w-full h-full'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{ lat: farm.latitude, lng: farm.longitude }}
        defaultZoom={options.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={getMapOptions}
      >
      </GoogleMapReact>
    </div>
  );
};

export default CustomMap;
