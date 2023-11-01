import axios from 'axios'
import  { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAppContext } from '../../context/appContext'

const MySwal = withReactContent(Swal)
const FileInputSectionFormation = () => {
  const {authFetch} = useAppContext();
  const [file, setFile] = useState()
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const handleButtonClick = (alertType) => {
    switch (alertType) {
      case 'saPosition':
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "File imperted with success",
          showConfirmButton: !1,
          timer: 8000,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
          },
          
      })
     
        break;
        case 'saError':
        MySwal.fire({
          title: "Oops...",
          text: "Verifier  le Fichier avant de l'importer (si pas vide ou ne contient pas une colonne vide !)",
          icon: "error",
          confirmButtonClass: "btn btn-sm btn-primary",
          buttonsStyling: !1,
          
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
          },
      })
        break;}}
        const handleUpload = async () => {
          if (!file) {
            console.log('No file selected');
            return;
          }
      
          const fd = new FormData();
          fd.append('excel_import[excelFile]', file);
      
          setIsUploading(true);
      
          try {
            const response = await authFetch.post('/api/excel/import', fd, {
              onUploadProgress: (progressEvent) => {
                const completedPercentage = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(completedPercentage);
              },
            });
      
            // Reset the file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
              fileInput.value = '';
            }
      
            if (response.status === 200) {
              handleButtonClick('saPosition');
              window.location.reload( );
              console.log('Success:', response.data.message);
              // Consider showing a success message to the user
            } else if (response.status === 400) {
              console.log('Error 400:', response.data.message);
              // Consider showing a user-friendly error message
            }
          } catch (err) {
            handleButtonClick('saError');
            console.error('Upload failed:', err.response ? err.response.data : err.message);
            // Consider showing a user-friendly error message
          } finally {
            setIsUploading(false);
          }
      };
      

  useEffect(() => {
    if (isUploading) {
      const progressBarTimeout = setTimeout(() => {
        setIsUploading(false);
        
       
      }, 3000)

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
              Importer Fichier Excel sous Format (A: Client,  B: User,  C: dateDebut,  D: dateFin,  E: Module)
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
