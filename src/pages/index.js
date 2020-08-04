import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import AnimateHeight from 'react-animate-height'
import { ParallaxProvider } from 'react-scroll-parallax'
import Parser from 'html-react-parser'

import './style.css'
import Navbar from "../components/Navbar"

class BlogIndex extends React.Component {
 
  state = {
    height: 0,
  };

  toggle = () => {
    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0,
    });
  };
  
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { height } = this.state;
  
    return (
      <div style={{ overflowX: 'hidden'}}>
        <ParallaxProvider>  
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Tapes" />
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.fields.slug} style={{ marginTop: `40%`}}>              
                <header>               
                    <h1
                      style={{
                        marginBottom: rhythm(1 / 4)                
                      }}
                    >
                      <Link 
                        style={{ 
                        boxShadow: `none`,                                               
                      }} 
                        to={node.fields.slug}>                    
                        {title} 
                      </Link>
                    </h1>
                    <p>
                      {node.frontmatter.date}
                    </p> 
                </header>
                <div>                        

                <div className='widget'>{Parser(node.frontmatter.widget)}</div>             

                  <AnimateHeight
                    duration={800}
                    height={height}>  
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt
                      }}
                    />  
                  </AnimateHeight>                     
                  <button 
                    className="btn" 
                    onClick={this.toggle}
                    >
                    {height === 0 ? 'Show Tracklist' : 'Hide Tracklist'}                  
                  </button>                  
                </div>        
              </article>
            )
          })}
        </Layout>
        </ParallaxProvider>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
         query {
           site {
             siteMetadata {
               title
               menuLinks {
                 name
                 link
               }
             }
           }
           allMarkdownRemark(
             sort: { fields: [frontmatter___date], order: DESC }
             skip: 1
           ) {
             edges {
               node {
                 excerpt
                 fields {
                   slug
                 }
                 frontmatter {
                   date(formatString: "MMMM DD, YYYY")
                   title
                   widget
                 }
               }
             }
           }
         }
       `
