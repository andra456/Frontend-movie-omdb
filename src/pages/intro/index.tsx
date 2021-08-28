
import React from 'react'
import './_index.scss'


function Intro(props:any) {
  const ref = React.useRef(false)

    return (
        <section className="showcase">
          <div className="bg-container"></div>
        <div className="content">
          <h1>Frontend Test</h1>
          <h3>Create omdb movie review using React.JS & Typescript</h3>
          <a href="/explore" className="btn">Get started</a>
        </div>
      </section>
    )
}

export default Intro