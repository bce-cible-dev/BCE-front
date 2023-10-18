import axios from 'axios'
import React, { useState, useEffect } from 'react'

//import { useHistory } from 'react-router-dom';
const FileInputSectionFormation = () => {
 // const history = useHistory();

  const [file, setFile] = useState()
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    if (!file) {
      console.log('No file selected')
      return
    }

    const fd = new FormData()
    fd.append('excel_import[excelFile]', file)

    setIsUploading(true)

    axios
      .post('http://127.0.0.1:8000/api/module/excel/import', fd, {
        onUploadProgress: (progressEvent) => {
          const completedPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(completedPercentage)
        },
      })
      .then((res) => {
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) {
          fileInput.value = ''
        }
        console.log(res.data.message)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (isUploading) {
      const progressBarTimeout = setTimeout(() => {
        setIsUploading(false);
        window.location.reload(); 
     
      }, 4000)

      return () => {
        clearTimeout(progressBarTimeout)
      }
    }
  }, [isUploading])

  return (
    <div className='panel mb-30'>
      <div className='panel-header'>
        <h5>Importer</h5>
      </div>
      <div className='panel-body'>
        <div className='row g-3'>
          <div className='row'>
            <div className='col-8'>
              <label htmlFor='formFile' className='form-label '>
                Importer Fichier Excel sous Format (A: Title , B: credit) 
              </label>
              <input
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
                className='form-control'
                type='file'
                id='formFile'
              />
            </div>
            <div className='row col-4'>
              <button className='btn btn-sm btn-primary' onClick={handleUpload}>
                <i className='fa-light fa-file-import me-2'></i>
                Importer
              </button>
            </div>
            <div className='row'>
              {isUploading && <progress max='100' value={progress} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileInputSectionFormation
