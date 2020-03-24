import React from 'react'; 
import { Link, useStaticQuery } from 'gatsby';
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"

import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const Shop = () => {
  const data = useStaticQuery(graphql`
    query productlist {
      site {
        siteMetadata {
          title
          author
        }
      }
      allMarkdownRemark(
        filter: {
          parent: { id: { eq: "69e3e96c-8afc-56da-b7e8-4cdf0a266dd5" } }
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
          }
        }
      }
    }
  `)


  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

    // Styles for Material Ui 
    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    });
    
    const classes = useStyles()
    
    return (
      <Layout location="/shop" title={siteTitle}>
        <SEO
          title="Shop"
          description="Shop official Napoli-Café products."
        />
        <h2>PRODUCTS</h2>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <Link to={edge.node.fields.slug}>
                  <CardMedia
                    className={classes.media}
                    image={edge.node.frontmatter.featuredimage_1}
                    title={edge.node.frontmatter.title}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {edge.node.frontmatter.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {edge.node.frontmatter.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={edge.node.fields.slug}>Buy now!</Link>
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </Layout>
    )
}

export default Shop; 

