import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    };

    return (
    <div className="product-page">
        
        <div className="back-button">
            <Link to="/">
                <span className="material-icons">arrow_back</span> Back
            </Link>
        </div>

        {loading ? (
            <div className="loading-box">Loading...</div>
        ) : error ? (
            <div className="error-box">{error}</div>
        ) : (
            <div className="product-container">

                {/* LEFT SIDE IMAGE */}
                <div className="product-image-card">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* RIGHT SIDE INFO */}
                <div className="product-info-card">
                    <h4 className="product-brand">{product.brand}</h4>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="product-rating">
                        ⭐ {product.rating} / 5 ({product.numReviews} Reviews)
                    </div>

                    <div className="product-price">
                        <span className="price">$ {product.price}</span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-qty">
                        <label>Quantity:</label>
                        <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        >
                            {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="product-stock">
                        {product.countInStock > 0 ? (
                            <span className="in-stock">In Stock</span>
                        ) : (
                            <span className="out-stock">Unavailable</span>
                        )}
                    </div>

                    {product.countInStock > 0 && (
                        <button
                            onClick={handleAddToCart}
                            className="add-cart-btn"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        )}
    </div>
);

}
export default ProductScreen;
