"use client"
import Map, { Projection } from '@/openlayers'
import { Controls } from '@/openlayers/controls'
import { Layers, TileLayer, VectorLayer } from '@/openlayers/layers'
import { osm, xyz } from '@/openlayers/source'
import { Box, IconButton, IconButtonProps, styled } from '@mui/material'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { usePageHooks } from './hooks'
import { StyledIconButton } from '@/components/mui'
import Autocomplete from '@/components/mui/Autocomplete'


export default function Home() {
  const {
    center,
    map,
    setMap,
    vectorSource,
    FeatureStylesFunc,
    setOriginChosenAddress,
    setOriginSuggestionInfo,
    setDestinyChosenAddress,
    setDestinySuggestionInfo,
    getDirection,
    handleCurrentLocation,
  } = usePageHooks()


  return (
    <Box component="main" sx={{
      position: 'relative',
      width: '100%',
      height: '100vh'
    }}>
      <Map
        map={map}
        setMap={setMap}
        width={'100%'}
        height={'100%'}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 'auto',
        }}
        center={{
          longitude: center[0],
          latitude: center[1],
        }}
        zoom={18}
        projection={
          new Projection({
            code: 'EPSG:3857',
            units: 'm',
          })
        }
      >
        <Controls>
        </Controls>
        <Layers>
          <TileLayer
            source={
              // osm()
              xyz({
                url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
              })
            } />
          <VectorLayer
            source={vectorSource.current}
            style={FeatureStylesFunc}
          />
        </Layers>
      </Map>

      <Box
        sx={{
          position: 'absolute',
          insetBlockStart: 20,
          insetInlineStart: 20,
          backgroundColor: 'Background',
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
        <Autocomplete
          onChosen={(c) => {
            setOriginChosenAddress(c)
            getDirection()
          }}
          onSuggestionFind={(data) => setOriginSuggestionInfo(data)}
          label='orgin'
        />
        <Autocomplete
          onChosen={(c) => {
            setDestinyChosenAddress(c)
            getDirection()
          }}
          onSuggestionFind={(data) => setDestinySuggestionInfo(data)}
          label='destiny'
        />
      </Box>

      <StyledIconButton
        onClick={() => handleCurrentLocation()}
        sx={{
          position: 'absolute',
          insetBlockEnd: '5rem',
          insetInlineEnd: '3rem',
        }}
        backgroundcolor='#c0c0c0'>
        <LocationSearchingIcon />
      </StyledIconButton>
    </Box>
  )
}
