import React from "react"
import { Link } from "gatsby"
import Hp from './../../content/assets/Napolicafé.png'
import { rhythm, scale } from "../utils/typography"
import Fade from 'react-reveal/Fade'
import { Parallax } from 'react-scroll-parallax'

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0 
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
   
    if (location.pathname === rootPath) {
      
      header = (
        
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            color: `#333`
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `#333 !important`,
            }}
            to={`/`}
          >
            <Parallax className="custom-class" y={[-50, 20]} tagOuter="figure">              
            <img src={Hp} alt="Napoli Café Logo"
              style={{
                marginTop: `${this.state.width > 420 ? 25 : 61}%`,              
              }}
            >
            </img>                        
            </Parallax>
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `#333`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,        
        }}
      >
        <Fade cascade>
          <header
            style={{
              // height: `${this.state.width > 375 ? 90 : 80}vh`
            }}
          >
          {header}
          </header> 
         
          <main>{children}</main>
          
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a> edited by acidCode
          </footer>
        </Fade>  
      </div>
    )
  }
}

export default Layout
