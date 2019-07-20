import React, { Component } from 'react'
import WhenVisible from './WhenVisible'
import './Work.css'
import scrollTo from 'scroll-to'

const romanNumerals = 'i ii iii iv v vi vii viii ix x xi xii xiii xiv xv xvi xvii xviii xix xx'.split(' ')

const projects = [
  {
    image: require('./img/dai.png'),
    title: 'Recent Work',
    description: 'Most of my side-projects have been gathering dust for years. Click here to see my recent work on GitHub.',
    url: 'https://github.com/ethanbennett'
  },
  {
    image: require('./img/panda.jpeg'),
    title: 'Panda Exchange',
    description: "This automated market maker was one of the first dapps written in Viper (by Vitalik) to demo the capabilities of the language. I was hired to build this interface for it.",
    url: "http://pandaexchange.io"
  }
]

const talks = [
  {
    image: require('./img/bsw.png'),
    title: 'Credit, Lending, and Finance with Crypto',
    description: 'The ICO hype has faded, but in its wake, there’s a much more sophisticated financial infrastructure growing on Ethereum. From on-chain representations of securities to crypto credit systems and loan platforms, this talk covers the state of “decentralized finance,” how it might interact with existing markets, and why it matters for average people and struggling economies.',
    url: 'https://www.youtube.com/watch?v=l8c1oUkqV7E'
  },
  {
    image: require('./img/ethdenver.png'),
    title: 'Out-of-the-box UX Upgrades: Dai.js and DSProxy',
    description: "In this live-coding workshop, I walk through a design pattern that allows for frictionless user interfaces with minimal technical overhead. Using MakerDAO's JavaScript SDK, I demonstrate how to build a simple dapp that leverages proxy contracts to let users execute several transactions atomically. I also use the SDK's transaction manager to easily update the UI when transactions are mined and confirmed.",
    url: 'https://www.youtube.com/watch?v=ww9BC3V6dCU'
  }
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
        <a href={project.url} target="_blank">
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
          <h3 className="work-title">Work</h3><br />
          <ul className="projects">
            {projects.map((project, i) =>
              <Project project={project} i={i} key={i} isVisible={isVisible} />)}
          </ul>
          <h3 className="work-title">Talks</h3><br />
          <ul className="talks">
            {talks.map((talk, i) =>
              <Project project={talk} i={i} key={i} isVisible={isVisible} />)}
          </ul>
        </WhenVisible>
      </div>
    )
  }
}

export default Work
