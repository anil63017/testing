// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from '../account-settings/Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import AccountTabContent from '../account-settings/AccountTabContent'
import SecurityTabContent from '../account-settings/SecurityTabContent'


// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import BillingTabContent from '../account-settings/BillingTabContent'

const Profile = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')
  const [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    axios.get('/account-setting/data').then(response => setData(response.data))
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='Profile Settings' data={[ { title: 'Profile Settings' }]} />
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent data={data.general} />
              </TabPane>
              <TabPane tabId='2'>
                <SecurityTabContent />
              </TabPane>
              <TabPane tabId='3'>
                <BillingTabContent />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default Profile
