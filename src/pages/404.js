import React from 'react'
import Layout from '../components/layout'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>NOT FOUND</h1>
      <img src="https://http.cat/404" alt="404 Cat" />
      <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export default NotFoundPage
