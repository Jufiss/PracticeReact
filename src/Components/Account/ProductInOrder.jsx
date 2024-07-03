import { React } from "react"
import { Link } from "react-router-dom"

const ProductInOrder = ({ product }) => {
  return (
    <div>
      <Link to={"/dress" + product.id}>
        <img
          src={product.image}
          style={{
            maxHeight: 70,
            aspectRatio: 1,
            objectFit: "cover",
          }}
        />
      </Link>
    </div>
  )
}

export default ProductInOrder
