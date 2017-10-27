import React, { Component } from 'react'
import WhenVisible from './WhenVisible'
import './Work.css'
import scrollTo from 'scroll-to'

const romanNumerals = 'i ii iii iv v vi vii viii ix x xi xii xiii xiv xv xvi xvii xviii xix xx'.split(' ')

const projects = [
  {
    image: require('./img/bookchain-screenshot.jpg'),
    title: 'Bookchain',
    description: 'Particles float about, connecting with neighbors, to form an intricate web.',
    url: 'https://bookchain.herokuapp.com'
  },
  {
    image: require('./img/bureau-screenshot.jpg'),
    title: 'Blockchain Credit Bureau',
    description: 'Particles react to forces, painting photographs to canvas.',
    url: 'https://blockchain-credit-bureau.herokuapp.com'
  },
  {
    image: require('./img/sourcery-screenshot.jpg'),
    title: 'Sourcery',
    description: 'All the Citi Bike trips from a single day visualized in WebGL.',
    url: 'https://sourcery-client.herokuapp.com'
  },
]

function Image ({ src, alt }) {
  return (
    <div className='Image' style={{ backgroundImage: `url(${src})` }} />
  )
}

class Project extends Component {
  constructor () {
    super()
    this.state = { show: false }
    this.delay = 150
  }
  componentWillReceiveProps ({ isVisible, i }) {
    if (!this.props.isVisible && isVisible) {
      this.timeoutToken = setTimeout(() => this.setState({ show: true }), i * this.delay)
    }
  }
  componentWillUnmount () {
    clearTimeout(this.timeoutToken)
  }
  render () {
    const { project, i } = this.props
    return (
      <li className='Project' style={{ opacity: this.state.show ? 1 : 0 }}>
        <a href={project.url}>
          <Image src={project.image} alt={`${project.title} - ${project.description}`} />
          <h2>
            <span>{romanNumerals[i]}.</span> {project.title}
          </h2>
          <p>{project.description}</p>
        </a>
      </li>
    )
  }
}

class Work extends Component {
  constructor () {
    super()
    this.state = { isVisible: false, isArrowFadedIn: false }
  }

  componentWillMount () {
    setTimeout(() => this.setState({ isArrowFadedIn: true }), 5000)
  }

  scrollDown () {
    const dest = this.workEl.getBoundingClientRect().top + (window.scrollY || 0)
    scrollTo(0, dest, {
      ease: 'in-out-quart',
      duration: 1000
    })
  }

  render () {
    const { isVisible, isArrowFadedIn } = this.state
    const showScrollIndicator = !isVisible && isArrowFadedIn
    const scrollIndicatorStyle = {
      opacity: showScrollIndicator ? 1 : 0,
      transform: showScrollIndicator ? 'translateY(0)' : 'translateY(-25px)',
      pointerEvents: showScrollIndicator ? 'auto' : 'none'
    }
    return (
      <div className='Work' ref={(el) => { this.workEl = el }}>
        <div className='scroll-indicator' style={scrollIndicatorStyle} onClick={() => this.scrollDown()}>
          <h3>WORK</h3>
          <div className='down-arrow' />
        </div>
        <WhenVisible onVisible={() => this.setState({ isVisible: true })}>
            <h3 className="work-title">Projects</h3><br />
          <ul>
            {projects.map((project, i) =>
              <Project project={project} i={i} key={i} isVisible={isVisible} />)}
          </ul>
        </WhenVisible>
      </div>
    )
  }
}

export default Work
