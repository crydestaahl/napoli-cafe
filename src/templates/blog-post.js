import React from "react"
import { Link, graphql } from "gatsby"
import ImageGallery from 'react-image-gallery';

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import '../pages/style.css'

class BlogPostTemplate extends React.Component {
  
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    let disqusConfig = {
      identifier: post.id,
      title: siteTitle,
    }
    
    const images = [
      {
        original: `${post.frontmatter.featuredimage_1}`,
        thumbnail: `${post.frontmatter.featuredimage_1}`,
      },
      {
        original: `${post.frontmatter.featuredimage_2}`,
        thumbnail: `${post.frontmatter.featuredimage_2}`,
      },
    ]

    console.log(post.frontmatter.featuredimage_1)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              className="transition"
              style={{
                marginTop: rhythm(1.5),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>

          <p dangerouslySetInnerHTML={{ __html: post.frontmatter.widget }} />

          {
            post.frontmatter.featuredimage_1 ? 
            <ImageGallery lazyLoad={true} showNav={false} items={images} />
           : null
          }

          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <CommentCount config={disqusConfig} placeholder={'hej'} />

          <Disqus config={disqusConfig} />
          <footer></footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 200)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        widget
        featuredimage_1        
        featuredimage_2        
      }
    }
  }
`
