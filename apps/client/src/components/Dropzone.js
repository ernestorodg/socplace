import React, { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';

export var filesToUpload = [];

function Dropzone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const { triggerCropModalState,
          handleDroppedImage } = props

  function transformReceivedImageToSrc(image, callback) {
    // Assuming only image
    if (image) {
      let reader = new FileReader();
      reader.onload = r => {
          callback(r.target.result);
      };
      reader.readAsDataURL(image);
    };
  };

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  filesToUpload = acceptedFiles;

  useEffect(() => {
    if (filesToUpload.length > 0) {
      triggerCropModalState(true)
      transformReceivedImageToSrc(filesToUpload[0], handleDroppedImage)
    }
  });

  return (
    <div>
      <section className="ui placeholder segment">
        <div {...getRootProps({className: 'ui icon header'})}>
          <input {...getInputProps()} />
          <i className="images icon"></i>
          <div>Drag 'n' drop some files here, or click to select files</div>
        </div>

      </section>
      <div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    </div>


  );
}
export default Dropzone;