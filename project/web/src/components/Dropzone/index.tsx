import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

//FC = Function Component
//que aceita as propriedades do "interface Props"
const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(''); 

  const onDrop = useCallback(acceptedFiles => {
    //sendo somente um arquivo ele fica na posição 0
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])

  const {getRootProps, getInputProps, } = useDropzone({
    onDrop,
    accept:'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>
      {
        selectedFileUrl 
          ? <img src={selectedFileUrl} alt="Point thumbmail" />
          :(
            <p>
              <FiUpload/>
              Arraste a imagem do estabelecimento aqui.
            </p>
          )
      }
    </div>
  )
}

export default Dropzone; 