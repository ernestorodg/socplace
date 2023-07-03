import React, { useState, useEffect } from 'react';
import { Modal } from 'semantic-ui-react';
import StyledCrop from './cropImage';


function CropImageModal(props) {
    const { cropModalState, droppedImage, setCroppedImage, triggerCropModalState } = props
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (cropModalState === true) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [cropModalState])

    return (
    <div>
 
        <Modal
            open={modalOpen}
            onClose = {() => setModalOpen(false)}
            onOpen = {() => setModalOpen(true)}
        >
            <Modal.Header>Crop your image</Modal.Header>
            <Modal.Content>
                {/* <StyledCrop /> */}
                {droppedImage &&  
                    <StyledCrop image={droppedImage} setCroppedImage={setCroppedImage} setModalOpen={setModalOpen}/>
                }
            </Modal.Content>
        </Modal>
    </div>
    );
}


export default CropImageModal;
