import React from "react"
import { Link, graphql } from "gatsby"
import './style.css'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import AnimateHeight from 'react-animate-height';

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
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Tapes" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
             
              <header>
                <h1
                  style={{
                    marginBottom: rhythm(1 / 4)                
                  }}
                >
                  <Link style={{ 
                    boxShadow: `none`,
                    color: `#333`                
                  }} to={node.fields.slug}>                    
                  {title} 
                  </Link>
                </h1>
                
                <p>
                  {node.frontmatter.date}
                </p> 

              </header>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.widget
                  }}
                />

                <AnimateHeight
                  duration={800}
                  height={height}>  
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.excerpt
                    }}
                  />    
                </AnimateHeight>                     
                <button className="btn" onClick={this.toggle}>
                  {height === 0 ? 'Show Track List' : 'Hide Tracklist'}
                </button>                       
              </div>        
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
