import ProductsBar from "../components/products/productsBar";
import ProductsList from "../components/products/productsList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { Box, List, ListItem, Typography } from "@mui/material";
const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <ProductsBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
      />
      <ProductsList
        status={status}
        error={error}
        filteredProducts={filteredProducts}
      />
      <Box sx={{ width: "94%", display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="h6" noWrap component="div">
          Count:
        </Typography>
        <Typography variant="h6" noWrap component="div">
          {" " + products?.length}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "94%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "2%",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          List Of Search History
        </Typography>
        <List>
          {searchHistory.map((term, index) => (
            <ListItem button key={index} onClick={() => setSearchTerm(term)}>
              {term}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Products;
