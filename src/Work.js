import React, { Component } from 'react'
import WhenVisible from './WhenVisible'
import './Work.css'
import scrollTo from 'scroll-to'

const romanNumerals = 'i ii iii iv v vi vii viii ix x xi xii xiii xiv xv xvi xvii xviii xix xx'.split(' ')

const projects = [
  {
    image: require('./img/bookchain-screenshot.jpg'),
    title: 'Bookchain',
    description: 'A blockchain-powered library in use at Cognizant Accelerator. The desktop app is a searchable index of books and their availability, and the mobile app scans QR codes to check out and return books.',
    url: 'https://bookchain.herokuapp.com'
  },
  {
    image: require('./img/bureau-screenshot.jpg'),
    title: 'Blockchain Credit Bureau',
    description: 'A decentralized platform for data sharing among microfinance institutions, built to lower the risk involved in loaning to people who don\'t have the means to establish credit. Part of the Blockchain for Social Impact Hackathon.',
    url: 'https://blockchain-credit-bureau.herokuapp.com'
  },
  {
    image: require('./img/sourcery-screenshot.jpg'),
    title: 'Sourcery',
    description: 'A tool for establishing transparent supply chains on Ethereum.',
    url: 'https://sourcery-client.herokuapp.com'
  },
]

const writing = [
  {
    image: require('./img/identity-image.jpg'),
    title: 'Identity Politics: How Ethereum Could Save Us from Fake News',
    description: 'Blurb about this article',
    url: 'medium.com'
  },
  {
    image: require('./img/attacks-image.jpg'),
    title: 'Ethereum Attacks!',
    description: `This article is the first of many I’ll write as a consultant for Lunyr, and you can see the original publication there if you‘re participating in the private alpha. This is a formal, encyclopedia-style article about some of Ethereum's more common attack vectors.`,
    url: 'https://medium.com/@eth.anBennett/ethereum-attacks-802ddb4513ca'
  },
  {
    image: require('./img/ai-image.jpg'),
    title: "How \"Real\" is Artificial Intelligence?",
    description: "How soon can we expect to see an apocalyptic robot uprising? Asking for a friend.",
    url: 'https://hackernoon.com/dances-with-bees-how-we-get-from-image-recognition-to-westworld-72c3dc53a478'
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
          <h3 className="work-title">Projects</h3><br />
          <ul>
            {projects.map((project, i) =>
              <Project project={project} i={i} key={i} isVisible={isVisible} />)}
          </ul>
          <h3 className="work-title">Writing</h3><br />
          <ul>
            {writing.map((article, i) =>
              <Project project={article} i={i} key={i} isVisible={isVisible} />)}
          </ul>
        </WhenVisible>
      </div>
    )
  }
}

export default Work
