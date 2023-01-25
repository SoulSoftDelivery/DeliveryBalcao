import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FuseSvgIcon from 'src/@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
// import './style.css';

function UploadDropzone({
  setUploadFile,
  // imgCapaUrl,
}) {
  const [selectFileUrl, setSelectFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);
    setSelectFileUrl(fileUrl);
    setUploadFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {/* <div className='className="w-32 sm:w-48 rounded"'>
        {
          selectFileUrl
          ? <img src={selectFileUrl} alt="Imagem de capa do produto" />
          : <img src={imgCapaUrl} alt="Produto sem imagem de capa" />
        }
      </div> */}

      <Button variant="contained"><FuseSvgIcon>heroicons-outline:upload</FuseSvgIcon> Imagem de Capa</Button>
      {/* <p>
        <FuseSvgIcon>heroicons-outline:upload</FuseSvgIcon>
        Clique ou arraste uma imagem para alterar
      </p> */}
    </div>
  );
}

export default UploadDropzone;
