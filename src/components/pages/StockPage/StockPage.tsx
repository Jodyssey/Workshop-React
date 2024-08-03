import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridToolbarQuickFilter, GridValueGetterParams } from "@mui/x-data-grid";
import { imageUrl } from "../../../Constants";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import * as stockActions from "../../../actions/stock.action";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { Add, AddShoppingCart, AssignmentReturn, Clear, Edit, NewReleases, Search, Star } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product.type";
import StockCard from "../../layouts/StockCard";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        href="/stock/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}

export default function StockPage() {
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useAppDispatch();
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(stockActions.loadStockByKeyword(keywordSearch))
  }, [keywordSearch]);


  React.useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  const columns: GridColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 50,
    },
    {
      headerName: "IMG",
      field: "image",
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => {
        return (
          <img
            src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
            style={{ width: 70, height: 70, borderRadius: "5%" }}
          />
        );
      },
    },
    {
      headerName: "NAME",
      field: "name",
      width: 400,
    },
    {
      headerName: "STOCK",
      width: 120,
      field: "stock",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: "PRICE",
      field: "price",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "TIME",
      field: "createdAt",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              navigate("/stock/edit/" + row.id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];


  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(String(selectedProduct!.id!)));
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${selectedProduct.image}?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the product? : {selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">You cannot restore deleted product.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>

      <Grid container style={{ marginBottom: 16 }} spacing={7}>
        <Grid item lg={3} md={6}>
          <StockCard icon={AddShoppingCart} title="TOTAL" subtitle="112 THB" color="#00a65a" />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard icon={NewReleases} title="EMPTY" subtitle="9 PCS." color="#f39c12" />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard icon={AssignmentReturn} title="RETURN" subtitle="1 PCS." color="#dd4b39" />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard icon={Star} title="LOSS" subtitle="5 PCS." color="#00c0ef" />
        </Grid>
      </Grid>

      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSearchNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
              // dispatch(stockActions.loadStockByKeyword(e.target.value));
            },
            clearSearch: () => {
              setKeywordSearch("");
              setKeywordSearchNoDelay("");
            },
          },
        }}
        sx={{ backgroundColor: "white", height: "80vh" }}
        rows={stockReducer.result}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      {showDialog()}
    </Box>
  );
}
