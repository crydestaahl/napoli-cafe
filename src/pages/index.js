import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(data)
  
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
                    marginBottom: rhythm(1 / 4),                  
                  }}
                >
                  <Link style={{ 
                    boxShadow: `none`,
                    color: `#333`                
                  }} to={node.fields.slug}>                    
                  {title} 
                  </Link>
                </h1>
                
                <p>{node.frontmatter.date}</p> 

              </header>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.widget
                  }}
                />

{/* 
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,                    
                  }}
                />
*/}                     
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
