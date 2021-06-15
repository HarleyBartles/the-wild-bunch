import React from 'react'
import Header from './Home/Header'
import Footer from './Home/Footer'

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <div className='row'>
                    <main className='col'>
                        {props.children}
                    </main>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout