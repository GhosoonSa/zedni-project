import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const themeColors = {
  primary: "#8D6E63",
  secondary: "#F5EDE4",
  light: "#FDF9F6",
  text: "#6B5D4D",
  white: "#FFFFFF",
  hover: "#F9F3EE",
  success: "#6BBF70",
  error: "#f44336",
};

export const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: themeColors.light,
  },
  "&:hover": {
    backgroundColor: themeColors.hover,
  },
});

export const ScrollableContent = styled("div")(({ theme }) => ({
  maxHeight: "120px",
  overflowY: "auto",
  width: "100%",
  paddingLeft: "8px",
  textAlign: "right",
  wordBreak: "keep-all",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: themeColors.primary,
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: themeColors.light,
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "80px",
    padding: "4px",
    whiteSpace: "normal",
  },
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  paddingLeft: "8px",
  textAlign: "right",
  wordBreak: "break-word",
  whiteSpace: "normal",
  [theme.breakpoints.down("sm")]: {
    padding: "4px",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${themeColors.secondary}`,
  color: themeColors.text,
  fontWeight: "500",
  padding: "14px 16px",
  fontSize: "0.95rem",
  textAlign: "right",
  verticalAlign: "top",
  whiteSpace: "normal",
  height: "auto",
  minHeight: "60px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 12px",
    fontSize: "0.85rem",
    minWidth: "150px",
  },
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: themeColors.primary,
  color: themeColors.white,
  fontWeight: "500",
  fontSize: "0.95rem",
  padding: "14px 16px",
  borderRight: `1px solid ${themeColors.secondary}`,
  textAlign: "right",
  wordBreak: "keep-all",
  whiteSpace: "nowrap",
  "&:last-child": {
    borderRight: "none",
  },
  "&:last-of-type": {
    borderRight: `1px solid ${themeColors.secondary}`,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 12px",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  },
}));
