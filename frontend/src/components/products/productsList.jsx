import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";

const ProductsList = ({ status, error, filteredProducts }) => {
  return (
    <div>
      <Box
        sx={{
          marginTop: "2vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
          marginLeft: "2%",
          gap: "4%",
        }}
      >
        {status === "loading" ? (
          <Skeleton variant="rectangular" width={300} height={200} />
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          filteredProducts?.map((item) => (
            <Card
              key={item._id}
              sx={{
                width: "95%",
                height: "20vh",
                marginBottom: "2vh",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow:
                    "0px 6px 20px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.1)",
                },
                justifyContent: "space-between",
                position: "relative",
                borderRadius: "15px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                  }}
                >
                  {item?.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#666",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: "1vh",
                  }}
                >
                  {item?.description}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default ProductsList;
