const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }

      allShopifyCollection {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  // Products
  pages.data.allShopifyProduct.edges.forEach(({ node: { id, handle } }) => {
    createPage({
      path: `/product/${handle}`,
      component: path.resolve("./src/templates/product-detail.js"),
      context: {
        id,
        handle,
      },
    })
  })

  // Collections
  pages.data.allShopifyCollection.edges.forEach(({ node: { id, handle } }) => {
    createPage({
      path: `/category/${handle}`,
      component: path.resolve("./src/templates/category-detail.js"),
      context: {
        id,
        handle,
      },
    })
  })
}
