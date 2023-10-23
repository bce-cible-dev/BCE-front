import Footer from '../components/footer/Footer'
import AttestationsHeader from '../components/header/AttestationsHeader'
import AttestationsTable from '../components/dashboard/AttestationsTable'
import AddNewAttestationsModal from '../components/modal/AddNewAttestationsModal'
import EditAttestationsModal from '../components/modal/EditAttestationsModal'
import ViewAttestationsModal from '../components/modal/ViewAttestationsModal'
import AttestationsTableFilter from '../components/filter/AttestationsTableFilter'
const AttestationsMainContent = () => {
  return (
    <div className='main-content'>
      <div className='row'>
        <div className='col-12'>
          <div className='panel'>
            <AttestationsHeader />
            <div className='panel-body'>
              <AttestationsTableFilter />
            <AttestationsTable />
            </div>
          </div>
        </div>
      </div>
      <AddNewAttestationsModal />
      <EditAttestationsModal />
      <ViewAttestationsModal />
      <Footer />
    </div>
  )
}

export default AttestationsMainContent
