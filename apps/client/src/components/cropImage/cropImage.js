import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import getCroppedImg from '../../util/cropImage'
import { styles } from './styles'


function CropImage(props) {
  const { classes, image, setCroppedImage, setModalOpen } = props

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isImageCropped, changeIsImageCropped] = useState(false)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      // const newImage = await createImage(croppedImage)
      console.log('donee', croppedImage)
      setCroppedImage(croppedImage)
      setModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation, setCroppedImage, image])

  // const onClose = useCallback(() => {
  //   setCroppedImage(null)
  // }, [])

  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={3 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ root: classes.slider }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Crop
        </Button>
      </div>
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </div>
  )
}
const StyledDemo = withStyles(styles)(CropImage)

export default StyledDemo;

// const rootElement = document.getElementById('root')
// ReactDOM.render(<StyledDemo />, rootElement)
