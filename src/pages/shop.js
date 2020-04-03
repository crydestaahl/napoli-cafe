import React from 'react'; 
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from '../components/Products'

const Shop = () => {
                     const data = useStaticQuery(graphql`
                       query {
                         site {
                           siteMetadata {
                             title
                             author
                           }
                         }
                         allMarkdownRemark(
                           filter: {
                             id: { eq: "b0f4608e-bac2-557d-8adb-b4f8a5f0ddb5" }
                           }
                         ) {
                           edges {
                             node {
                               frontmatter {
                                 title
                                 featuredimage_1
                                 featuredimage_2
                                 description
                               }
                               internal {
                                 content
                               }
                               fields {
                                 slug
                               }
                               id
                             }
                           }
                         }
                       }
                     `)

                    
                     const siteTitle = data.site.siteMetadata.title
                     //const slug = console.log(data.allMarkdownRemark.edges.fields.slug)

                     return (
                       <Layout location="/shop" title={siteTitle}>
                         <SEO
                           title="Shop"
                           description="Shop official Napoli-Café products."
                         />
                         <h2>PRODUCTS</h2>

                         <Products />
                       </Layout>
                     )
                   }

export default Shop; 

