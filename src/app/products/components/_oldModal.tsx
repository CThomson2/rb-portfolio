import React, { useRef, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
// import { ReactComponent as Bottle } from "../../assets/svg/bottle.svg";
// Import graphics
import smallBtl from "../../assets/modal-icons/500ml.png";
import medBtl from "../../assets/modal-icons/1lt.png";
import largeBtl from "../../assets/modal-icons/2_5lt.png";

const ProductCard = ({ product, handleClose, visible, prices }) => {
  const cardRef = useRef(null);

  console.log(prices);

  // Close the card if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleClose(); // Trigger the close function
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <Card
      ref={cardRef}
      sx={{
        position: "fixed", // Fix the card to the viewport
        top: "50%", // Vertically center it
        left: "50%", // Horizontally center it
        boxShadow: "15px 15px 5px rgba(0, 0, 0, 0.25)",
        border: "1px solid black",
        width: "90%", // Adjust size based on the viewport, could be 90% or a fixed value
        maxWidth: "1000px", // Constrain max width if needed
        height: "fit-content",
        maxHeight: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        transition: "all 0.18s ease", // Smooth transition
        opacity: visible ? 1 : 0, // Fade effect when the card is not visible
        transform: visible
          ? "translate(-50%, -50%) scale(1)"
          : "translate(-50%, -50%) scale(0.25)",
        pointerEvents: visible ? "auto" : "none", // Disable pointer events when hidden
        // This is the part that changes when it's rendered
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontSize: "2rem",
            fontWeight: "600",
            paddingTop: "20px",
            marginBottom: "1rem",
            marginTop: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "block",
            textAlign: "center",
          }}
        >
          {product.name}
        </Typography>
        {/* <Typography
          variant="h4"
          component="div"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "400",
            fontStyle: 'italic',
            paddingTop: "20px",
            marginBottom: "1rem",
            marginTop: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "block",
            textAlign: "center",
            backgroundColor: "rgba(100, 150, 100, 0.2)",
          }}
        >
          Note to Self - Add EDIT / DELETE options to the card
        </Typography> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            paddingTop: "10px",
            // marginTop:
            // "@media (max-width: 660px)": {
            //   flexDirection: "column",
            //   ".separator": {
            //     display: "none",
            //   },
            // },
          }}
        >
          <Typography
            variant="body1"
            color="#694A4A"
            sx={{ fontSize: "1.2rem", fontWeight: "100%" }}
          >
            SKU:
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {product.sku}
          </Typography>
          <Typography
            className="separator"
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "2rem", fontWeight: "50%" }}
          >
            |
          </Typography>
          <Typography
            variant="body1"
            color="#694A4A"
            sx={{ fontSize: "1.2rem", fontWeight: "100%" }}
          >
            Grade:
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {product.grade}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "2rem", fontWeight: "50%" }}
          ></Typography>
        </Box>

        {/* 'X' to close button */}
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          X
        </Button>
      </CardContent>

      {/* Bottle Size Prices */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: "0",
          margin: "0",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* Second row: images */}
        <Box
          sx={{
            display: "flex",
            flex: "2 3 auto",
            justifyContent: "center", // ensures each column is spaced evenly
            alignItems: "center", // aligns items vertically in the middle
            flexDirection: "row", // ensures the columns stack vertically
            gap: "10px", // spacing between each row
            fontSize: "inherit",
            width: "fit-content",
            textAlign: "center",
            boxSizing: "border-box",
            margin: "auto 10px",
          }}
        >
          {Object.entries(prices).map(([vol, price]) => {
            return price ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // ensures each column is spaced evenly
                  alignItems: "center", // aligns items vertically in the middle
                  flexDirection: "column", // ensures the columns stack vertically
                  gap: "10px", // spacing between each row
                  textAlign: "center",
                }}
              >
                <img
                  key={vol}
                  src={
                    vol === "500mL"
                      ? smallBtl
                      : vol === "1L"
                      ? medBtl
                      : largeBtl
                  }
                  alt={vol}
                  width={150}
                  height="auto"
                />
                <Typography
                  sx={{
                    fontWeight: "regular",
                    fontFamily: "avenir",
                    fontSize: "20px",
                    color: "darkslategray",
                  }}
                >
                  {vol}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "avenir",
                    fontSize: "20px",
                  }}
                >
                  £{price}
                </Typography>
              </Box>
            ) : (
              <Box
                key={vol}
                sx={{
                  opacity: 0.25,
                  transform: "scale(1)",
                  translate: "0 -20px",
                  transition: "all 2s ease",
                }}
              >
                {/* Greyed out bottle */}
                <img
                  src={
                    vol === "500mL"
                      ? smallBtl
                      : vol === "1L"
                      ? medBtl
                      : largeBtl
                  }
                  alt={vol}
                  width={150}
                  height="auto"
                />
                <Typography
                  sx={{
                    // fontWeight: "bold",
                    fontFamily: "avenir",
                    fontSize: "22px",
                    color: "darkslategray",
                  }}
                >
                  {vol}
                </Typography>
                <Typography sx={{ display: "block" }}></Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
